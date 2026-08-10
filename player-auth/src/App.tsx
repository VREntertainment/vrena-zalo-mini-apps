import { useEffect, useState } from 'react'
import {
  registerPlayer,
  type PlayerStatus,
} from './api'

type LegalDocument = 'privacyPolicy' | 'termsAndConditions'

const legalDocuments: Record<LegalDocument, {
  title: string
  updated: string
  sections: Array<{ heading: string; body: string }>
}> = {
  privacyPolicy: {
    title: 'Chính sách quyền riêng tư VRena Player',
    updated: 'Cập nhật ngày 10/08/2026',
    sections: [
      {
        heading: '1. Phạm vi',
        body: 'Chính sách này giải thích cách CÔNG TY TNHH VR ENTERTAINMENT xử lý thông tin cá nhân khi người dùng tự nguyện đăng ký một hồ sơ người chơi mới trong Mini App VRena Player.',
      },
      {
        heading: '2. Dữ liệu được xử lý',
        body: 'Khi người dùng chủ động chọn đăng ký và đồng ý cấp quyền, VRena nhận số điện thoại Zalo, mã người dùng Zalo và mã xác thực cần thiết để tạo hồ sơ mới. Mã xác thực chỉ được xử lý trong quá trình xác minh. Mini App không yêu cầu vị trí, danh bạ, camera hoặc micro.',
      },
      {
        heading: '3. Mục đích sử dụng',
        body: 'Dữ liệu được dùng để tạo và nhận diện hồ sơ người chơi mới, bảo vệ hồ sơ, phòng chống gian lận và hỗ trợ người dùng. Email không bắt buộc trong luồng đăng ký này.',
      },
      {
        heading: '4. Sự đồng ý và lựa chọn',
        body: 'Người dùng có thể xem thông tin và quyền lợi trong Mini App mà không cần đăng ký hoặc cấp số điện thoại. Khi từ chối, chỉ chức năng đăng ký hồ sơ mới không thực hiện. Người dùng có thể rút lại sự đồng ý hoặc yêu cầu truy cập, chỉnh sửa hay xóa dữ liệu theo quy định áp dụng.',
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
    title: 'Điều khoản sử dụng VRena Player',
    updated: 'Cập nhật ngày 10/08/2026',
    sections: [
      {
        heading: '1. Phạm vi',
        body: 'VRena Player là Mini App của CÔNG TY TNHH VR ENTERTAINMENT. Người dùng có thể xem thông tin quyền lợi mà không cần đăng nhập. Nếu có nhu cầu, người dùng có thể tự nguyện đăng ký một hồ sơ người chơi mới bằng số điện thoại Zalo mà không bắt buộc email.',
      },
      {
        heading: '2. Quyền và dữ liệu được sử dụng',
        body: 'Mini App chỉ yêu cầu quyền số điện thoại sau khi người dùng mở phần Đăng ký thành viên, đọc mục đích sử dụng dữ liệu, đồng ý với tài liệu này và chọn Đăng ký bằng số điện thoại Zalo. Nếu đồng ý, VRena xử lý số điện thoại, mã người dùng Zalo và mã xác thực để tạo hồ sơ mới.',
      },
      {
        heading: '3. Sự đồng ý của người dùng',
        body: 'Người dùng có thể từ chối cấp số điện thoại và vẫn xem thông tin trong Mini App. Việc từ chối chỉ dừng đăng ký hồ sơ mới và không đồng nghĩa với việc chấp thuận bất kỳ mục đích nào khác.',
      },
      {
        heading: '4. Tài khoản người dùng',
        body: 'Chức năng đăng ký trong Mini App chỉ tạo hồ sơ người chơi mới, không liên kết số điện thoại với tài khoản VRena có sẵn. Người đã có tài khoản VRena có thể liên hệ nhân viên tại địa điểm VRena để được hỗ trợ. Người dùng chịu trách nhiệm sử dụng hồ sơ đúng pháp luật và thông báo khi phát hiện truy cập trái phép.',
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
    : 'Không thể đăng ký hồ sơ VRena. Vui lòng thử lại.'
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
  const [registrationOpen, setRegistrationOpen] = useState(false)
  const [activeLegalDocument, setActiveLegalDocument] = useState<LegalDocument | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  function startRegistration() {
    setError('')
    setRegistrationOpen(true)
  }

  async function handleRegistration() {
    if (!acceptedTerms) {
      setError(
        'Vui lòng xác nhận Chính sách quyền riêng tư và Điều khoản sử dụng trước khi đăng ký.',
      )
      return
    }

    setBusy(true)
    setError('')
    try {
      const nextStatus = await registerPlayer(acceptedTerms)
      setStatus(nextStatus)
      setRegistrationOpen(false)
    } catch (registrationError) {
      setError(errorMessage(registrationError))
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
        {status?.registered ? (
          <>
            <span className="eyebrow">THÀNH VIÊN VRENA</span>
            <h1>Hồ sơ đã sẵn sàng</h1>
            <p className="lead">
              Xin chào {status.displayName || 'Người chơi'}. Hồ sơ thành viên của
              bạn đã được nhận diện an toàn trong VRena Player.
            </p>

            <div className="phone-row">
              <span className="phone-icon"><PhoneIcon /></span>
              <div>
                <small>Số điện thoại thành viên</small>
                <strong>{status.maskedPhone}</strong>
              </div>
              <span className="check-icon"><ShieldIcon /></span>
            </div>

            <div className="member-note">
              <strong>Quyền lợi hồ sơ</strong>
              <p>
                Hồ sơ giúp VRena nhận diện thành viên và bảo vệ lịch sử hoạt động
                khi bạn sử dụng dịch vụ tại địa điểm VRena.
              </p>
            </div>

            <div className="legal-links" aria-label="Tài liệu pháp lý">
              <button type="button" onClick={() => openLegalDocument('privacyPolicy')}>
                Chính sách quyền riêng tư
              </button>
              <button type="button" onClick={() => openLegalDocument('termsAndConditions')}>
                Điều khoản sử dụng
              </button>
            </div>
          </>
        ) : registrationOpen ? (
          <>
            <span className="eyebrow">ĐĂNG KÝ HỒ SƠ MỚI</span>
            <h1>Đăng ký thành viên</h1>
            <p className="lead">
              Chỉ dành cho người chưa có tài khoản VRena. Mini App không dùng
              chức năng này để liên kết tài khoản có sẵn.
            </p>

            <div className="benefit-row">
              <span className="benefit-icon"><PhoneIcon /></span>
              <div>
                <strong>Vì sao cần số điện thoại?</strong>
                <p>
                  VRena dùng số điện thoại Zalo để tạo, bảo vệ và nhận diện hồ sơ
                  thành viên mới. Email không bắt buộc.
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
                Tôi tự nguyện đăng ký hồ sơ mới và đồng ý cho VRena nhận, sử dụng
                số điện thoại Zalo cho mục đích nêu trên. Tôi đã đọc{' '}
                <button
                  className="legal-inline-button"
                  onClick={() => openLegalDocument('privacyPolicy')}
                  type="button"
                >
                  Chính sách quyền riêng tư
                </button>{' '}
                và đồng ý với{' '}
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

            <button className="primary-button" type="button" disabled={busy} onClick={() => void handleRegistration()}>
              {busy ? 'Đang đăng ký…' : 'Đăng ký bằng số điện thoại Zalo'}
              <span aria-hidden="true">→</span>
            </button>

            <button
              className="secondary-button"
              type="button"
              disabled={busy}
              onClick={() => {
                setRegistrationOpen(false)
                setAcceptedTerms(false)
                setError('')
              }}
            >
              Để sau, tiếp tục xem thông tin
            </button>
          </>
        ) : (
          <>
            <span className="eyebrow">VRENA PLAYER</span>
            <h1>Hồ sơ người chơi VRena</h1>
            <p className="lead">
              Khám phá quyền lợi hồ sơ thành viên. Bạn có thể xem thông tin trong
              Mini App mà không cần đăng nhập hoặc cấp số điện thoại.
            </p>

            <div className="benefit-row">
              <span className="benefit-icon"><PhoneIcon /></span>
              <div>
                <strong>Nhận diện thành viên</strong>
                <p>
                  Một hồ sơ thống nhất giúp VRena nhận diện bạn khi tham gia hoạt
                  động tại địa điểm VRena.
                </p>
              </div>
            </div>

            <div className="benefit-row benefit-row-secondary">
              <span className="benefit-icon"><ShieldIcon /></span>
              <div>
                <strong>Đăng ký có lựa chọn</strong>
                <p>
                  Quyền số điện thoại chỉ được hỏi sau khi bạn chủ động mở phần
                  đăng ký hồ sơ mới và xác nhận đồng ý.
                </p>
              </div>
            </div>

            {error && <div className="message error-message" role="alert">{error}</div>}

            <button
              className="primary-button"
              type="button"
              disabled={busy}
              onClick={startRegistration}
            >
              Đăng ký thành viên VRena
              <span aria-hidden="true">→</span>
            </button>

            <p className="registration-disclaimer">
              Dành cho hồ sơ mới. Từ chối đăng ký không làm gián đoạn nội dung
              khác của Mini App.
            </p>

            <div className="legal-links" aria-label="Tài liệu pháp lý">
              <button type="button" onClick={() => openLegalDocument('privacyPolicy')}>
                Chính sách quyền riêng tư
              </button>
              <button type="button" onClick={() => openLegalDocument('termsAndConditions')}>
                Điều khoản sử dụng
              </button>
            </div>
          </>
        )}
      </section>

      <footer>
        <ShieldIcon />
        <span>Dữ liệu được bảo vệ · Không quảng cáo · Không điều hướng ra ngoài</span>
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
