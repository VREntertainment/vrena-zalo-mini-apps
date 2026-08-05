import { getAccessToken, getPhoneNumber, openWebview } from 'zmp-sdk'

export type PlayerStatus = {
  linked: boolean
  displayName: string
  maskedPhone: string | null
  handoffUrl?: string
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
  const linked = new URLSearchParams(window.location.search).get('preview') === 'linked'
  return linked
    ? {
        linked: true,
        displayName: 'Người chơi',
        maskedPhone: '+84 ••• ••• 789',
      }
    : {
        linked: false,
        displayName: 'Người chơi',
        maskedPhone: null,
      }
}

async function apiRequest(
  action: 'status' | 'continue',
  options: { phoneToken?: string; acceptedTerms?: boolean } = {},
) {
  const preview = previewState()
  if (preview) {
    await new Promise((resolve) => window.setTimeout(resolve, 350))
    return action === 'status'
      ? preview
      : {
          linked: true,
          displayName: preview.displayName,
          maskedPhone: preview.maskedPhone || '+84 ••• ••• 789',
        }
  }

  const accessToken = await withTimeout(
    getAccessToken(),
    ZALO_SDK_TIMEOUT_MS,
    'Zalo chưa phản hồi. Vui lòng đóng và mở lại Mini App, sau đó thử lại.',
  )
  if (!accessToken) throw new Error('Không thể bắt đầu phiên Zalo an toàn. Vui lòng mở lại Mini App.')

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
      body: JSON.stringify({ action, ...options }),
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
    throw new Error(payload?.error || 'Không thể kết nối tài khoản VRena.')
  }

  return payload
}

export function loadPlayerStatus() {
  return apiRequest('status')
}

export async function continueWithZalo(linked: boolean, acceptedTerms: boolean) {
  let phoneToken: string | undefined
  if (!linked && !import.meta.env.DEV) {
    const response = await withTimeout(
      getPhoneNumber(),
      ZALO_SDK_TIMEOUT_MS,
      'Zalo chưa phản hồi yêu cầu số điện thoại. Vui lòng thử lại.',
    )
    phoneToken = response.token
    if (!phoneToken) throw new Error('Zalo không trả về mã xác minh số điện thoại.')
  }

  return apiRequest('continue', { phoneToken, acceptedTerms })
}

export async function openVrena(handoffUrl: string | undefined) {
  if (!handoffUrl) {
    if (import.meta.env.DEV) return
    throw new Error('VRena chưa tạo được liên kết đăng nhập an toàn.')
  }

  await openWebview({
    url: handoffUrl,
    config: {
      style: 'normal',
      leftButton: 'back',
    },
  })
}
