import { useEffect, useState } from 'react'
import {
  continueWithZalo,
  loadPlayerStatus,
  openVrena,
  type PlayerStatus,
} from './api'

type LegalDocument = 'privacyPolicy' | 'termsAndConditions'

const legalDocuments: Record<LegalDocument, {
  title: string
  updated: string
  sections: Array<{ heading: string; body: string }>
}> = {
  privacyPolicy: {
    title: 'Chính sách quyền riêng tư',
    updated: 'Cập nhật ngày 03/08/2026',
    sections: [
      {
        heading: '1. Phạm vi',
        body: 'Chính sách này giải thích cách CÔNG TY TNHH VR ENTERTAINMENT xử lý thông tin cá nhân khi người dùng tạo hoặc liên kết tài khoản VRena qua Mini App VRena Player.',
      },
      {
        heading: '2. Dữ liệu được xử lý',
        body: 'Khi người dùng chủ động đồng ý, VRena nhận số điện thoại Zalo, mã người dùng Zalo và mã xác thực cần thiết để tạo hoặc liên kết tài khoản. Mã xác thực chỉ được xử lý trong quá trình xác minh. Mini App không yêu cầu vị trí, danh bạ, camera hoặc micro cho chức năng này.',
      },
      {
        heading: '3. Mục đích sử dụng',
        body: 'Dữ liệu được dùng để tạo hoặc nhận diện tài khoản VRena, xác minh đăng nhập, duy trì an toàn tài khoản, phòng chống gian lận và hỗ trợ người dùng. Email không bắt buộc trong luồng này.',
      },
      {
        heading: '4. Sự đồng ý và lựa chọn',
        body: 'Người dùng có thể từ chối cấp số điện thoại. Khi từ chối, chức năng tạo hoặc liên kết tài khoản bằng Zalo sẽ không hoạt động. Người dùng có thể rút lại sự đồng ý hoặc yêu cầu truy cập, chỉnh sửa hay xóa dữ liệu theo quy định áp dụng.',
      },
      {
        heading: '5. Chia sẻ dữ liệu',
        body: 'VRena không bán hoặc cho thuê dữ liệu cá nhân. Dữ liệu chỉ được chia sẻ với nhà cung cấp dịch vụ cần thiết cho việc vận hành, bảo mật hoặc với cơ quan có thẩm quyền khi pháp luật yêu cầu.',
      },
      {
        heading: '6. Lưu giữ và bảo mật',
        body: 'VRena áp dụng các biện pháp kỹ thuật và tổ chức phù hợp để bảo vệ dữ liệu. Dữ liệu chỉ được lưu trong thời gian cần thiết cho mục đích nêu trên hoặc theo yêu cầu của pháp luật.',
      },
      {
        heading: '7. Liên hệ',
        body: 'Yêu cầu về dữ liệu cá nhân có thể gửi tới CÔNG TY TNHH VR ENTERTAINMENT qua email contact@vre-vietnam.com hoặc số điện thoại 0981 152 315.',
      },
    ],
  },
  termsAndConditions: {
    title: 'Điều khoản sử dụng',
    updated: 'Cập nhật ngày 03/08/2026',
    sections: [
      {
        heading: '1. Phạm vi',
        body: 'VRena Player là Mini App của CÔNG TY TNHH VR ENTERTAINMENT, cho phép người dùng tạo hoặc liên kết tài khoản VRena bằng số điện thoại Zalo mà không bắt buộc email. Việc tiếp tục sử dụng Mini App đồng nghĩa người dùng chấp nhận các điều khoản này.',
      },
      {
        heading: '2. Quyền và dữ liệu được sử dụng',
        body: 'Sau khi người dùng chủ động chọn Tiếp tục với Zalo, Mini App mới yêu cầu quyền truy cập số điện thoại. Nếu người dùng đồng ý, VRena xử lý số điện thoại, mã người dùng Zalo và mã xác thực cần thiết để tạo hoặc liên kết tài khoản và bảo vệ quá trình đăng nhập.',
      },
      {
        heading: '3. Sự đồng ý của người dùng',
        body: 'Người dùng có thể từ chối cấp số điện thoại. Việc từ chối chỉ làm chức năng tạo hoặc liên kết tài khoản bằng Zalo không hoạt động và không đồng nghĩa với việc chấp thuận bất kỳ mục đích nào khác.',
      },
      {
        heading: '4. Tài khoản người dùng',
        body: 'Người dùng chịu trách nhiệm cung cấp thông tin chính xác, sử dụng tài khoản đúng pháp luật và thông báo cho VRena khi phát hiện truy cập trái phép. VRena có thể tạm ngừng tài khoản khi có dấu hiệu gian lận, vi phạm điều khoản hoặc rủi ro an ninh.',
      },
      {
        heading: '5. Bảo mật và chia sẻ',
        body: 'VRena áp dụng biện pháp hợp lý để bảo vệ dữ liệu, không bán hoặc cho thuê dữ liệu cá nhân và chỉ chia sẻ dữ liệu khi cần thiết cho vận hành hoặc theo yêu cầu của pháp luật.',
      },
      {
        heading: '6. Thay đổi và gián đoạn dịch vụ',
        body: 'VRena có thể cập nhật Mini App hoặc các điều khoản này để đáp ứng thay đổi về dịch vụ, an toàn hoặc pháp luật. Dịch vụ có thể tạm ngừng để bảo trì, xử lý sự cố hoặc bảo vệ người dùng.',
      },
      {
        heading: '7. Luật áp dụng và liên hệ',
        body: 'Các điều khoản này được điều chỉnh bởi pháp luật Việt Nam. Câu hỏi hoặc yêu cầu hỗ trợ có thể gửi tới CÔNG TY TNHH VR ENTERTAINMENT qua email contact@vre-vietnam.com hoặc số điện thoại 0981 152 315.',
      },
    ],
  },
}

function errorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : 'Không thể kết nối tài khoản VRena. Vui lòng thử lại.'
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3 5.5 5.6v5.9c0 4.1 2.6 7.8 6.5 9.5 3.9-1.7 6.5-5.4 6.5-9.5V5.6L12 3Z" />
      <path d="m9.2 12 1.8 1.8 3.9-4" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7.3 3.8 5.1 5.1c-1.2.7-.7 4.2 1.5 8 2.2 3.8 5 6.4 6.2 5.7l2.2-1.3c.8-.4.9-1.4.4-2.1l-1.7-2.2c-.4-.6-1.2-.7-1.8-.4l-.9.5c-.6-.5-1.2-1.2-1.7-2.1-.5-.8-.8-1.7-1-2.4l.9-.5c.6-.3.9-1.1.6-1.8L8.9 4.4c-.3-.8-1-1-1.6-.6Z" />
    </svg>
  )
}

function LegalModal({
  document,
  onClose,
}: {
  document: LegalDocument
  onClose: () => void
}) {
  const content = legalDocuments[document]
  const titleId = `legal-${document}-title`

  useEffect(() => {
    const previousOverflow = window.document.body.style.overflow
    window.document.body.style.overflow = 'hidden'

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => {
      window.removeEventListener('keydown', closeOnEscape)
      window.document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  return (
    <div
      className="legal-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        aria-labelledby={titleId}
        aria-modal="true"
        className="legal-modal"
        role="dialog"
      >
        <header className="legal-modal-header">
          <div>
            <span className="eyebrow">VRENA PLAYER</span>
            <h2 id={titleId}>{content.title}</h2>
            <p>{content.updated}</p>
          </div>
          <button
            aria-label={`Đóng ${content.title}`}
            autoFocus
            className="legal-modal-close"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </header>
        <div className="legal-modal-body">
          <p className="legal-modal-note">
            Tài liệu này được hiển thị trực tiếp trong VRena Player và không chứa
            liên kết điều hướng ra ngoài Mini App.
          </p>
          {content.sections.map((section) => (
            <section key={section.heading}>
              <h3>{section.heading}</h3>
              <p>{section.body}</p>
            </section>
          ))}
        </div>
      </section>
    </div>
  )
}

export default function App() {
  const [status, setStatus] = useState<PlayerStatus | null>(null)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [activeLegalDocument, setActiveLegalDocument] = useState<LegalDocument | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function checkZaloSession() {
    setBusy(true)
    setError('')
    try {
      setStatus(await loadPlayerStatus())
    } catch (refreshError) {
      setError(errorMessage(refreshError))
    } finally {
      setBusy(false)
    }
  }

  async function handleContinue() {
    if (status && !status.linked && !acceptedTerms) {
      setError(
        'Vui lòng đồng ý cho VRena sử dụng số điện thoại Zalo của bạn và xác nhận Chính sách quyền riêng tư cùng Điều khoản sử dụng.',
      )
      return
    }

    setBusy(true)
    setError('')
    try {
      const nextStatus = await continueWithZalo(Boolean(status?.linked), acceptedTerms)
      setStatus(nextStatus)
      await openVrena(nextStatus.handoffUrl)
    } catch (continueError) {
      setError(errorMessage(continueError))
    } finally {
      setBusy(false)
    }
  }

  function openLegalDocument(document: LegalDocument) {
    setError('')
    setActiveLegalDocument(document)
  }

  return (
    <main className="player-app" aria-busy={busy}>
      <div className="brand-shell">
        {/* The Mini App is Vite-based, so Next.js image optimization is unavailable here. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="brand-logo"
          src="/brand/vrena-logo-full-light.svg"
          alt="VRena"
        />
        <span>PLAYER</span>
      </div>

      <section className="hero-art" aria-hidden="true">
        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/vrena-mark-light.svg" alt="" />
        <span className="verified-orb">
          <ShieldIcon />
        </span>
      </section>

      <section className="content-card">
        {busy && !status ? (
          <div className="loading-state" aria-live="polite">
            <span className="spinner" />
            <h1>Đang kết nối với Zalo…</h1>
            <p>VRena đang kiểm tra phiên đăng nhập an toàn của bạn.</p>
          </div>
        ) : status?.linked ? (
          <>
            <span className="eyebrow">TÀI KHOẢN ĐÃ XÁC MINH</span>
            <h1>Xin chào, {status.displayName || 'Người chơi'}</h1>
            <p className="lead">Tài khoản VRena của bạn đã sẵn sàng.</p>

            <div className="phone-row">
              <span className="phone-icon"><PhoneIcon /></span>
              <div>
                <small>Số điện thoại Zalo</small>
                <strong>{status.maskedPhone}</strong>
              </div>
              <span className="check-icon"><ShieldIcon /></span>
            </div>

            {error && <div className="message error-message" role="alert">{error}</div>}

            <button className="primary-button" type="button" disabled={busy} onClick={() => void handleContinue()}>
              {busy ? 'Đang mở VRena…' : 'Mở VRena'}
              <span aria-hidden="true">→</span>
            </button>
          </>
        ) : status ? (
          <>
            <span className="eyebrow">TÀI KHOẢN VRENA</span>
            <h1>Chào mừng đến VRena</h1>
            <p className="lead">
              Dùng số điện thoại Zalo để tạo hồ sơ VRena. Không cần email.
            </p>

            <div className="benefit-row">
              <span className="benefit-icon"><PhoneIcon /></span>
              <div>
                <strong>Dữ liệu được sử dụng</strong>
                <p>
                  VRena nhận số điện thoại Zalo để tạo, bảo vệ và nhận diện tài khoản.
                  Email không bắt buộc.
                </p>
              </div>
            </div>

            <label className="consent-row">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(event) => setAcceptedTerms(event.target.checked)}
              />
              <span>
                Tôi đồng ý cho VRena nhận và sử dụng số điện thoại Zalo của tôi cho
                mục đích nêu trên. Tôi đã đọc và đồng ý với{' '}
                <button
                  className="legal-inline-button"
                  onClick={() => openLegalDocument('privacyPolicy')}
                  type="button"
                >
                  Chính sách quyền riêng tư
                </button>{' '}
                và{' '}
                <button
                  className="legal-inline-button"
                  onClick={() => openLegalDocument('termsAndConditions')}
                  type="button"
                >
                  Điều khoản sử dụng
                </button>
                .
              </span>
            </label>

            {error && <div className="message error-message" role="alert">{error}</div>}

            <button className="primary-button" type="button" disabled={busy} onClick={() => void handleContinue()}>
              {busy ? 'Đang xác minh…' : 'Tiếp tục với Zalo'}
              <span aria-hidden="true">→</span>
            </button>
          </>
        ) : (
          <>
            <span className="eyebrow">TÀI KHOẢN VRENA</span>
            <h1>Chào mừng đến VRena</h1>
            <p className="lead">
              Kết nối tài khoản VRena của bạn bằng Zalo. Không cần email.
            </p>

            <div className="benefit-row">
              <span className="benefit-icon"><ShieldIcon /></span>
              <div>
                <strong>Bắt đầu an toàn</strong>
                <p>
                  Chọn Tiếp tục để kiểm tra phiên Zalo. VRena chỉ yêu cầu số điện
                  thoại nếu bạn cần tạo tài khoản mới.
                </p>
              </div>
            </div>

            {error && <div className="message error-message" role="alert">{error}</div>}

            <button
              className="primary-button"
              type="button"
              disabled={busy}
              onClick={() => void checkZaloSession()}
            >
              {error ? 'Thử lại' : 'Tiếp tục với Zalo'}
              <span aria-hidden="true">→</span>
            </button>
          </>
        )}
      </section>

      <footer>
        <ShieldIcon />
        <span>Kết nối được mã hóa · Tài khoản VRena vĩnh viễn</span>
      </footer>

      {activeLegalDocument ? (
        <LegalModal
          document={activeLegalDocument}
          onClose={() => setActiveLegalDocument(null)}
        />
      ) : null}
    </main>
  )
}
