import { useEffect, useState } from 'react'
import { copy, initialLanguage, languageCodes, type LanguageCode } from './i18n'
import { legalCopy, type LegalDocument } from './legal'

type VenueId = 'ha-do-centrosa' | 'cafe-des-stagiaires'

const BOOKING_BASE_URL = 'https://booking.vre-vietnam.com/tickets'

const venues: Array<{ id: VenueId; name: string }> = [
  { id: 'ha-do-centrosa', name: 'VRena Hà Đô Centrosa' },
  { id: 'cafe-des-stagiaires', name: 'VRena Thao Dien' },
]

function bookingUrl(venue: VenueId) {
  const url = new URL(BOOKING_BASE_URL)
  url.searchParams.set('venue', venue)
  url.searchParams.set('utm_source', 'zalo')
  url.searchParams.set('utm_medium', 'miniapp')
  url.searchParams.set('utm_campaign', 'booking')
  return url.toString()
}

export default function App() {
  const [language, setLanguage] = useState<LanguageCode>(initialLanguage)
  const [venue, setVenue] = useState<VenueId>('ha-do-centrosa')
  const [error, setError] = useState('')
  const [legalDocument, setLegalDocument] = useState<LegalDocument | null>(null)
  const text = copy[language]
  const legal = legalCopy[language]
  const activeLegal = legalDocument === 'privacy'
    ? { title: legal.privacyTitle, sections: legal.privacySections }
    : { title: legal.termsTitle, sections: legal.termsSections }

  useEffect(() => {
    if (!legalDocument) return
    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLegalDocument(null)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [legalDocument])

  function changeLanguage(next: LanguageCode) {
    window.localStorage.setItem('vrena-booking-language', next)
    setLanguage(next)
  }

  async function openInsideZalo(url: string) {
    setError('')
    const inZalo = 'ZaloMiniAppSDK' in window || window.navigator.userAgent.toLowerCase().includes('zalo')
    if (!inZalo) {
      setError(text.openError)
      return
    }
    try {
      const { openWebview } = await import('zmp-sdk/apis')
      await openWebview({ url, config: { style: 'normal' } })
    } catch {
      setError(text.openError)
    }
  }

  return (
    <main className="booking-app">
      <header className="topbar">
        <img className="brand-logo" src="./brand/vrena-logo-primary.svg" alt="VRena" />
        <label className="language-control">
          <span className="sr-only">Language</span>
          <select value={language} onChange={(event) => changeLanguage(event.target.value as LanguageCode)}>
            {languageCodes.map((code) => <option key={code} value={code}>{copy[code].languageName}</option>)}
          </select>
        </label>
      </header>

      <section className="hero">
        <span className="eyebrow">{text.eyebrow}</span>
        <h1>{text.title}</h1>
        <p>{text.intro}</p>
      </section>

      <section className="booking-card" aria-labelledby="venue-title">
        <div className="section-heading">
          <div>
            <h2 id="venue-title">{text.venueTitle}</h2>
          </div>
          <span className="step-badge">1 / 2</span>
        </div>

        <div className="venue-list" role="radiogroup" aria-label={text.venueTitle}>
          {venues.map((item) => {
            const selected = item.id === venue
            const address = item.id === 'ha-do-centrosa' ? text.haDoAddress : text.thaoDienAddress
            const hours = item.id === 'ha-do-centrosa' ? text.haDoHours : text.thaoDienHours
            return (
              <button
                key={item.id}
                className={`venue-card${selected ? ' is-selected' : ''}`}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setVenue(item.id)}
              >
                <span className="venue-radio" aria-hidden="true"><span /></span>
                <span className="venue-copy">
                  <strong>{item.name}</strong>
                  <small>{hours}</small>
                  <span>{address}</span>
                </span>
                {selected && <span className="selected-label">{text.selected}</span>}
              </button>
            )
          })}
        </div>

        {error && <p className="error-message" role="alert">{error}</p>}

        <button className="primary-button" type="button" onClick={() => void openInsideZalo(bookingUrl(venue))}>
          <span>{text.book}</span>
          <span aria-hidden="true">→</span>
        </button>
      </section>

      <footer>
        <button type="button" onClick={() => setLegalDocument('privacy')}>{text.privacy}</button>
        <span aria-hidden="true">·</span>
        <button type="button" onClick={() => setLegalDocument('terms')}>{text.terms}</button>
      </footer>

      {legalDocument && (
        <div className="legal-overlay" role="presentation" onClick={() => setLegalDocument(null)}>
          <section
            className="legal-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="legal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="legal-header">
              <h2 id="legal-title">{activeLegal.title}</h2>
              <button type="button" aria-label={legal.close} onClick={() => setLegalDocument(null)}>×</button>
            </header>
            <div className="legal-content">
              {activeLegal.sections.map((section) => (
                <section key={section.title}>
                  <h3>{section.title}</h3>
                  <p>{section.body}</p>
                </section>
              ))}
            </div>
            <button className="legal-close" type="button" onClick={() => setLegalDocument(null)}>{legal.close}</button>
          </section>
        </div>
      )}
    </main>
  )
}
