export type PlayerStatus = {
  registered: boolean
  displayName: string
}

export type PlayerAuthErrorCode =
  | 'zaloTimeout'
  | 'sessionUnavailable'
  | 'serverTimeout'
  | 'networkUnavailable'
  | 'serviceUnavailable'
  | 'tooManyAttempts'
  | 'identityMismatch'
  | 'revokedAccount'
  | 'consentRequired'
  | 'unknown'

export class PlayerAuthError extends Error {
  constructor(readonly code: PlayerAuthErrorCode, fallbackMessage: string) {
    super(fallbackMessage)
    this.name = 'PlayerAuthError'
  }
}

const legacyApiBaseUrl = 'https://vrena-booking.vercel.app'
const canonicalApiBaseUrl = 'https://booking.vre-vietnam.com'
const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL || canonicalApiBaseUrl
const apiBaseUrl = (configuredApiBaseUrl === legacyApiBaseUrl
  ? canonicalApiBaseUrl
  : configuredApiBaseUrl
).replace(/\/$/, '')
const ZALO_SDK_TIMEOUT_MS = 12_000
const API_TIMEOUT_MS = 12_000

type ZaloSession = {
  accessToken: string
  zaloUserId: string
}

function withTimeout<T>(promise: Promise<T>, timeoutMs: number, timeoutError: string | Error) {
  let timeoutId: number | undefined
  const timeout = new Promise<never>((_, reject) => {
    timeoutId = window.setTimeout(
      () => reject(typeof timeoutError === 'string' ? new Error(timeoutError) : timeoutError),
      timeoutMs,
    )
  })

  return Promise.race([promise, timeout]).finally(() => {
    if (timeoutId !== undefined) window.clearTimeout(timeoutId)
  })
}

function authError(code: PlayerAuthErrorCode, fallbackMessage: string) {
  return new PlayerAuthError(code, fallbackMessage)
}

function serverErrorCode(message: string): PlayerAuthErrorCode {
  const normalized = message.toLocaleLowerCase('vi')
  if (normalized.includes('quá nhiều lần')) return 'tooManyAttempts'
  if (normalized.includes('không khớp')) return 'identityMismatch'
  if (normalized.includes('đã bị thu hồi')) return 'revokedAccount'
  if (normalized.includes('phiên zalo')) return 'sessionUnavailable'
  return 'serviceUnavailable'
}

function previewState(): PlayerStatus | null {
  if (!import.meta.env.DEV) return null
  const registered = new URLSearchParams(window.location.search).get('preview') === 'registered'
  return registered
    ? {
        registered: true,
        displayName: 'Người chơi',
      }
    : {
        registered: false,
        displayName: 'Người chơi',
      }
}

async function getZaloSession(): Promise<ZaloSession> {
  const { getAccessToken, getUserID } = await import('zmp-sdk')
  const [accessToken, zaloUserId] = await Promise.all([
    withTimeout(
      getAccessToken(),
      ZALO_SDK_TIMEOUT_MS,
      authError('zaloTimeout', 'Zalo chưa phản hồi. Vui lòng đóng và mở lại Mini App, sau đó thử lại.'),
    ),
    withTimeout(
      getUserID(),
      ZALO_SDK_TIMEOUT_MS,
      authError('zaloTimeout', 'Zalo chưa phản hồi thông tin người dùng. Vui lòng đóng và mở lại Mini App.'),
    ),
  ])
  if (!accessToken) throw authError('sessionUnavailable', 'Không thể bắt đầu phiên Zalo an toàn. Vui lòng mở lại Mini App.')
  if (!zaloUserId) throw authError('sessionUnavailable', 'Không thể xác định người dùng Zalo. Vui lòng mở lại Mini App.')

  return { accessToken, zaloUserId }
}

async function apiRequest(
  action: 'status' | 'register',
  options: { acceptedTerms?: boolean } = {},
  suppliedSession?: ZaloSession,
) {
  const preview = previewState()
  if (preview) {
    await new Promise((resolve) => window.setTimeout(resolve, 350))
    return action === 'status'
      ? preview
      : {
          registered: true,
          displayName: preview.displayName,
        }
  }

  const { accessToken, zaloUserId } = suppliedSession || await getZaloSession()

  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => controller.abort(), API_TIMEOUT_MS)
  let response: Response
  try {
    response = await fetch(`${apiBaseUrl}/api/zalo/player-auth`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action, zaloUserId, ...options }),
      signal: controller.signal,
    })
  } catch {
    throw authError(
      controller.signal.aborted
        ? 'serverTimeout'
        : 'networkUnavailable',
      controller.signal.aborted
        ? 'VRena phản hồi quá chậm. Vui lòng thử lại.'
        : 'Không thể kết nối với VRena. Vui lòng kiểm tra mạng và thử lại.',
    )
  } finally {
    window.clearTimeout(timeoutId)
  }
  const payload = await response.json().catch(() => null) as (PlayerStatus & { error?: string }) | null

  if (!response.ok || !payload) {
    const message = payload?.error || 'Không thể kết nối dịch vụ đăng ký VRena.'
    throw authError(serverErrorCode(message), message)
  }

  return payload
}

export function loadPlayerStatus() {
  return apiRequest('status')
}

export async function registerPlayer(acceptedTerms: boolean) {
  if (import.meta.env.DEV) return apiRequest('register', { acceptedTerms })
  return apiRequest('register', { acceptedTerms })
}
