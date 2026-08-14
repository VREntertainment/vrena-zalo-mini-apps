import { authorize, getAccessToken, getPhoneNumber, getSetting, getUserID } from 'zmp-sdk'

export type PlayerStatus = {
  registered: boolean
  displayName: string
  maskedPhone: string | null
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

function withTimeout<T>(promise: Promise<T>, timeoutMs: number, message: string) {
  let timeoutId: number | undefined
  const timeout = new Promise<never>((_, reject) => {
    timeoutId = window.setTimeout(() => reject(new Error(message)), timeoutMs)
  })

  return Promise.race([promise, timeout]).finally(() => {
    if (timeoutId !== undefined) window.clearTimeout(timeoutId)
  })
}

function previewState(): PlayerStatus | null {
  if (!import.meta.env.DEV) return null
  const registered = new URLSearchParams(window.location.search).get('preview') === 'registered'
  return registered
    ? {
        registered: true,
        displayName: 'Người chơi',
        maskedPhone: '+84 ••• ••• 789',
      }
    : {
        registered: false,
        displayName: 'Người chơi',
        maskedPhone: null,
      }
}

async function getZaloSession(): Promise<ZaloSession> {
  const [accessToken, zaloUserId] = await Promise.all([
    withTimeout(
      getAccessToken(),
      ZALO_SDK_TIMEOUT_MS,
      'Zalo chưa phản hồi. Vui lòng đóng và mở lại Mini App, sau đó thử lại.',
    ),
    withTimeout(
      getUserID(),
      ZALO_SDK_TIMEOUT_MS,
      'Zalo chưa phản hồi thông tin người dùng. Vui lòng đóng và mở lại Mini App.',
    ),
  ])
  if (!accessToken) throw new Error('Không thể bắt đầu phiên Zalo an toàn. Vui lòng mở lại Mini App.')
  if (!zaloUserId) throw new Error('Không thể xác định người dùng Zalo. Vui lòng mở lại Mini App.')

  return { accessToken, zaloUserId }
}

async function apiRequest(
  action: 'status' | 'register',
  options: { phoneToken?: string; acceptedTerms?: boolean } = {},
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
          maskedPhone: preview.maskedPhone || '+84 ••• ••• 789',
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
    throw new Error(
      controller.signal.aborted
        ? 'VRena phản hồi quá chậm. Vui lòng thử lại.'
        : 'Không thể kết nối với VRena. Vui lòng kiểm tra mạng và thử lại.',
    )
  } finally {
    window.clearTimeout(timeoutId)
  }
  const payload = await response.json().catch(() => null) as (PlayerStatus & { error?: string }) | null

  if (!response.ok || !payload) {
    throw new Error(payload?.error || 'Không thể kết nối dịch vụ đăng ký VRena.')
  }

  return payload
}

export function loadPlayerStatus() {
  return apiRequest('status')
}

async function ensurePhonePermission() {
  try {
    const { authSetting } = await withTimeout(
      getSetting(),
      ZALO_SDK_TIMEOUT_MS,
      'Zalo chưa phản hồi trạng thái quyền. Vui lòng thử lại.',
    )
    if (!authSetting['scope.userPhonenumber']) {
      const granted = await withTimeout(
        authorize({ scopes: ['scope.userPhonenumber'] }),
        ZALO_SDK_TIMEOUT_MS,
        'Zalo chưa phản hồi yêu cầu quyền số điện thoại. Vui lòng thử lại.',
      )
      if (!granted['scope.userPhonenumber']) {
        throw new Error('Bạn chưa cấp quyền số điện thoại. Bạn vẫn có thể xem thông tin trong Mini App.')
      }
    }
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('Zalo chưa phản hồi')) throw error
    if (error instanceof Error && error.message.startsWith('Bạn chưa cấp quyền')) throw error
    throw new Error('Bạn chưa cấp quyền số điện thoại. Bạn vẫn có thể xem thông tin trong Mini App.')
  }
}

async function requestPhoneToken() {
  const response = await withTimeout(
    getPhoneNumber(),
    ZALO_SDK_TIMEOUT_MS,
    'Zalo chưa phản hồi yêu cầu số điện thoại. Vui lòng thử lại.',
  )
  if (!response.token) throw new Error('Zalo không trả về mã xác minh số điện thoại.')
  return response.token
}

export async function registerPlayer(acceptedTerms: boolean) {
  if (import.meta.env.DEV) return apiRequest('register', { acceptedTerms })

  await ensurePhonePermission()
  // Zalo's server-side phone API requires the one-time phone code and the
  // access token from the same active Mini App session. Capture the access
  // token immediately before requesting the code, then reuse that exact pair.
  const session = await getZaloSession()
  const phoneToken = await requestPhoneToken()
  return apiRequest('register', { phoneToken, acceptedTerms }, session)
}
