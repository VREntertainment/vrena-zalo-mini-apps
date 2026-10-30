import { useEffect, useState } from 'react'
import {
  getInitialLanguage,
  languageChoices,
  storeLanguage,
  translations,
  type LanguageCode,
  type LegalDocument,
  type PlayerCopy,
} from './i18n'

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3 5.5 5.6v5.9c0 4.1 2.6 7.8 6.5 9.5 3.9-1.7 6.5-5.4 6.5-9.5V5.6L12 3Z" />
      <path d="m9.2 12 1.8 1.8 3.9-4" />
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
  const [guideOpen, setGuideOpen] = useState(false)
  const [activeLegalDocument, setActiveLegalDocument] = useState<LegalDocument | null>(null)
  const copy = translations[language]

  useEffect(() => {
    window.document.documentElement.lang = language
    storeLanguage(language)
  }, [language])

  function openLegalDocument(document: LegalDocument) {
    setActiveLegalDocument(document)
  }

  return (
    <main className="player-app">
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
        <span className="eyebrow">{copy.eyebrow}</span>
        <h1>{copy.title}</h1>
        <p className="lead">{copy.intro}</p>

        <div className="benefit-row">
          <span className="benefit-icon"><ShieldIcon /></span>
          <div><strong>{copy.noAccountTitle}</strong><p>{copy.noAccountBody}</p></div>
        </div>
        <div className="benefit-row benefit-row-secondary">
          <span className="benefit-icon"><ShieldIcon /></span>
          <div><strong>{copy.venueHelpTitle}</strong><p>{copy.venueHelpBody}</p></div>
        </div>

        <button
          aria-expanded={guideOpen}
          className="primary-button"
          type="button"
          onClick={() => setGuideOpen((open) => !open)}
        >
          <span className="button-label">{guideOpen ? copy.closeGuide : copy.openGuide}</span>
          <span aria-hidden="true">{guideOpen ? '↑' : '→'}</span>
        </button>

        {guideOpen ? (
          <section aria-live="polite" className="guide-panel">
            <h2>{copy.guideTitle}</h2>
            <ol>
              {copy.guideSteps.map((step, index) => (
                <li key={step}>
                  <span>{index + 1}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        <p className="registration-disclaimer">{copy.disclaimer}</p>
        <div className="legal-links" aria-label={copy.legalAriaLabel}>
          <button type="button" onClick={() => openLegalDocument('privacyPolicy')}>{copy.privacyLink}</button>
          <button type="button" onClick={() => openLegalDocument('termsAndConditions')}>{copy.termsLink}</button>
        </div>
      </section>

      <footer><ShieldIcon /><span>{copy.footer}</span></footer>

      {activeLegalDocument ? (
        <LegalModal copy={copy} document={activeLegalDocument} onClose={() => setActiveLegalDocument(null)} />
      ) : null}
    </main>
  )
}
