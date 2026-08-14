import { useEffect, useState } from 'react'
import {
  PlayerAuthError,
  registerPlayer,
  type PlayerAuthErrorCode,
  type PlayerStatus,
} from './api'
import {
  getInitialLanguage,
  languageChoices,
  storeLanguage,
  translations,
  type LanguageCode,
  type LegalDocument,
  type PlayerCopy,
} from './i18n'

function errorCode(error: unknown): PlayerAuthErrorCode {
  return error instanceof PlayerAuthError ? error.code : 'unknown'
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
  copy,
  document,
  onClose,
}: {
  copy: PlayerCopy
  document: LegalDocument
  onClose: () => void
}) {
  const content = copy.legal[document]
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
      <section aria-labelledby={titleId} aria-modal="true" className="legal-modal" role="dialog">
        <header className="legal-modal-header">
          <div>
            <span className="eyebrow">VRENA PLAYER</span>
            <h2 id={titleId}>{content.title}</h2>
            <p>{content.updated}</p>
          </div>
          <button
            aria-label={`${copy.closeLabel}: ${content.title}`}
            autoFocus
            className="legal-modal-close"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </header>
        <div className="legal-modal-body">
          <p className="legal-modal-note">{copy.legalNote}</p>
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
  const [language, setLanguage] = useState<LanguageCode>(getInitialLanguage)
  const [status, setStatus] = useState<PlayerStatus | null>(null)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [registrationOpen, setRegistrationOpen] = useState(false)
  const [activeLegalDocument, setActiveLegalDocument] = useState<LegalDocument | null>(null)
  const [busy, setBusy] = useState(false)
  const [activeErrorCode, setActiveErrorCode] = useState<PlayerAuthErrorCode | null>(null)
  const copy = translations[language]

  useEffect(() => {
    window.document.documentElement.lang = language
    storeLanguage(language)
  }, [language])

  function startRegistration() {
    setActiveErrorCode(null)
    setRegistrationOpen(true)
  }

  async function handleRegistration() {
    if (!acceptedTerms) {
      setActiveErrorCode('consentRequired')
      return
    }

    setBusy(true)
    setActiveErrorCode(null)
    try {
      const nextStatus = await registerPlayer(acceptedTerms)
      setStatus(nextStatus)
      setRegistrationOpen(false)
    } catch (registrationError) {
      setActiveErrorCode(errorCode(registrationError))
    } finally {
      setBusy(false)
    }
  }

  function openLegalDocument(document: LegalDocument) {
    setActiveErrorCode(null)
    setActiveLegalDocument(document)
  }

  return (
    <main className="player-app" aria-busy={busy}>
      <div className="brand-shell">
        <img className="brand-logo" src="/brand/vrena-logo-full-light.svg" alt="VRena" />
        <div className="brand-actions">
          <span className="player-label">PLAYER</span>
          <label className="language-picker">
            <span className="visually-hidden">{copy.languageLabel}</span>
            <select
              aria-label={copy.languageLabel}
              value={language}
              onChange={(event) => setLanguage(event.target.value as LanguageCode)}
            >
              {languageChoices.map((choice) => (
                <option key={choice.code} value={choice.code}>{choice.label}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <section className="hero-art" aria-hidden="true">
        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />
        <img src="/brand/vrena-mark-light.svg" alt="" />
        <span className="verified-orb"><ShieldIcon /></span>
      </section>

      <section className="content-card">
        {status?.registered ? (
          <>
            <span className="eyebrow">{copy.memberEyebrow}</span>
            <h1>{copy.readyTitle}</h1>
            <p className="lead">{copy.readyGreeting.replace('{name}', status.displayName || copy.defaultPlayer)}</p>
            <div className="phone-row">
              <span className="phone-icon"><PhoneIcon /></span>
              <div><small>{copy.memberPhone}</small><strong>{status.maskedPhone}</strong></div>
              <span className="check-icon"><ShieldIcon /></span>
            </div>
            <div className="member-note"><strong>{copy.profileBenefits}</strong><p>{copy.profileBenefitsBody}</p></div>
            <div className="legal-links" aria-label={copy.legalAriaLabel}>
              <button type="button" onClick={() => openLegalDocument('privacyPolicy')}>{copy.privacyLink}</button>
              <button type="button" onClick={() => openLegalDocument('termsAndConditions')}>{copy.termsLink}</button>
            </div>
          </>
        ) : registrationOpen ? (
          <>
            <span className="eyebrow">{copy.registerEyebrow}</span>
            <h1>{copy.registerTitle}</h1>
            <p className="lead">{copy.registerIntro}</p>
            <div className="benefit-row">
              <span className="benefit-icon"><PhoneIcon /></span>
              <div><strong>{copy.phoneWhy}</strong><p>{copy.phoneWhyBody}</p></div>
            </div>
            <label className="consent-row">
              <input type="checkbox" checked={acceptedTerms} onChange={(event) => setAcceptedTerms(event.target.checked)} />
              <span>
                {copy.consentBeforePrivacy}
                <button className="legal-inline-button" onClick={() => openLegalDocument('privacyPolicy')} type="button">{copy.privacyLink}</button>
                {copy.consentBetweenLegal}
                <button className="legal-inline-button" onClick={() => openLegalDocument('termsAndConditions')} type="button">{copy.termsLink}</button>
                {copy.consentAfterTerms}
              </span>
            </label>
            {activeErrorCode ? <div className="message error-message" role="alert">{copy.errors[activeErrorCode]}</div> : null}
            <button className="primary-button" type="button" disabled={busy} onClick={() => void handleRegistration()}>
              <span className="button-label">{busy ? copy.registering : copy.registerWithZalo}</span><span aria-hidden="true">→</span>
            </button>
            <button
              className="secondary-button"
              type="button"
              disabled={busy}
              onClick={() => {
                setRegistrationOpen(false)
                setAcceptedTerms(false)
                setActiveErrorCode(null)
              }}
            >
              {copy.continueWithoutRegistering}
            </button>
          </>
        ) : (
          <>
            <span className="eyebrow">VRENA PLAYER</span>
            <h1>{copy.welcomeTitle}</h1>
            <p className="lead">{copy.welcomeBody}</p>
            <div className="benefit-row">
              <span className="benefit-icon"><PhoneIcon /></span>
              <div><strong>{copy.identifyTitle}</strong><p>{copy.identifyBody}</p></div>
            </div>
            <div className="benefit-row benefit-row-secondary">
              <span className="benefit-icon"><ShieldIcon /></span>
              <div><strong>{copy.optionalTitle}</strong><p>{copy.optionalBody}</p></div>
            </div>
            {activeErrorCode ? <div className="message error-message" role="alert">{copy.errors[activeErrorCode]}</div> : null}
            <button className="primary-button" type="button" disabled={busy} onClick={startRegistration}>
              <span className="button-label">{copy.startRegistration}</span><span aria-hidden="true">→</span>
            </button>
            <p className="registration-disclaimer">{copy.registrationDisclaimer}</p>
            <div className="legal-links" aria-label={copy.legalAriaLabel}>
              <button type="button" onClick={() => openLegalDocument('privacyPolicy')}>{copy.privacyLink}</button>
              <button type="button" onClick={() => openLegalDocument('termsAndConditions')}>{copy.termsLink}</button>
            </div>
          </>
        )}
      </section>

      <footer><ShieldIcon /><span>{copy.footer}</span></footer>

      {activeLegalDocument ? (
        <LegalModal copy={copy} document={activeLegalDocument} onClose={() => setActiveLegalDocument(null)} />
      ) : null}
    </main>
  )
}
