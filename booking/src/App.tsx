import { useCallback, useEffect, useMemo, useState } from 'react'
import { EventName, Payment, events } from 'zmp-sdk/apis'
import { bookingCopy, copy, initialLanguage, languageCodes, type LanguageCode } from './i18n'
import { legalCopy, type LegalDocument } from './legal'

type VenueId = 'ha-do-centrosa' | 'cafe-des-stagiaires'
type TicketType = 'individual' | 'birthday'
type Step = 'venue' | 'booking' | 'confirmed'

type AvailabilityTime = { value: string; label: string; remaining: number }
type Confirmation = {
  reference: string
  sessionId: string
  totalPrice: number
  displayTotal: number
  requiresStaffConfirmation: boolean
  venue: VenueId
  date: string
  time: string
}

type PreparedCheckout = {
  checkoutToken: string
  order: {
    amount: number
    desc: string
    item: Array<Record<string, string | number>>
    extradata: string
    method: string
    mac: string
  }
}

type PendingCheckout = { checkoutToken: string; orderId?: string }

const BOOKING_API_URL = import.meta.env.VITE_BOOKING_API_URL || 'https://booking.vre-vietnam.com/api/zalo/tickets'
const PENDING_CHECKOUT_KEY = 'vrena-booking-pending-checkout'

function readPendingCheckout(): PendingCheckout | null {
  const saved = window.sessionStorage.getItem(PENDING_CHECKOUT_KEY)
  if (!saved) return null
  try {
    const parsed = JSON.parse(saved) as PendingCheckout
    return parsed?.checkoutToken ? parsed : null
  } catch {
    return { checkoutToken: saved }
  }
}

function savePendingCheckout(value: PendingCheckout) {
  window.sessionStorage.setItem(PENDING_CHECKOUT_KEY, JSON.stringify(value))
}

const venues: Array<{ id: VenueId; name: string }> = [
  { id: 'ha-do-centrosa', name: 'VRena Hà Đô Centrosa' },
  { id: 'cafe-des-stagiaires', name: 'VRena Thao Dien' },
]

const birthdayPackages = [
  { id: 'mini-mission', name: 'Mini Birthday', players: 4, price: 1_900_000, arenas: 1 },
  { id: 'birthday-squad', name: 'Birthday Squad', players: 8, price: 3_600_000, arenas: 1 },
  { id: 'epic-birthday', name: 'Epic Birthday', players: 12, price: 4_500_000, arenas: 2 },
] as const

function vietnamDate(daysAhead = 0) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Ho_Chi_Minh', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(new Date(Date.now() + daysAhead * 86_400_000))
  const part = (name: string) => parts.find((item) => item.type === name)?.value || ''
  return `${part('year')}-${part('month')}-${part('day')}`
}

function vnd(value: number) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(value)
}

function unitPrice(date: string, time: string, venue: VenueId) {
  const day = new Date(`${date}T12:00:00+07:00`).getDay()
  const minutes = Number(time.slice(0, 2)) * 60 + Number(time.slice(3, 5))
  if (venue === 'cafe-des-stagiaires') {
    if (day === 0 || day === 6) return minutes >= 20 * 60 ? 290_000 : 240_000
    if (minutes >= 20 * 60) return 290_000
    if (minutes >= 16 * 60) return 240_000
    return 190_000
  }
  if (day === 0 || day === 6) return minutes >= 20 * 60 ? 390_000 : 330_000
  return minutes >= 20 * 60 ? 290_000 : 260_000
}

function minimumDuration(players: number, arenaCount: number, venue: VenueId) {
  const arenaCapacity = venue === 'cafe-des-stagiaires' ? 8 : 4
  return Math.max(30, Math.ceil(players / (arenaCapacity * 2 * arenaCount)) * 30)
}

function individualPrice(date: string, time: string, players: number, duration: number, arenaCount: number, venue: VenueId) {
  if (!date || !time) return 0
  const capacity = (venue === 'cafe-des-stagiaires' ? 8 : 4) * arenaCount
  const chargedPerBlock = Math.min(players, capacity)
  const chargedSpots = chargedPerBlock * Math.max(1, duration / 30)
  const gross = unitPrice(date, time, venue) * chargedSpots
  const discountRate = chargedSpots >= 5 && chargedSpots <= 16 ? 0.05 : 0
  return Math.round(gross * (1 - discountRate))
}

export default function App() {
  const [language, setLanguage] = useState<LanguageCode>(initialLanguage)
  const [venue, setVenue] = useState<VenueId>('ha-do-centrosa')
  const [step, setStep] = useState<Step>('venue')
  const [ticketType, setTicketType] = useState<TicketType>('individual')
  const [birthdayPackageId, setBirthdayPackageId] = useState('mini-mission')
  const [date, setDate] = useState(() => vietnamDate(1))
  const [time, setTime] = useState('')
  const [duration, setDuration] = useState(30)
  const [players, setPlayers] = useState(2)
  const [arenaCount, setArenaCount] = useState(1)
  const [guestName, setGuestName] = useState('')
  const [guestPhone, setGuestPhone] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [times, setTimes] = useState<AvailabilityTime[]>([])
  const [isLoadingTimes, setIsLoadingTimes] = useState(false)
  const [isBooking, setIsBooking] = useState(false)
  const [error, setError] = useState('')
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null)
  const [legalDocument, setLegalDocument] = useState<LegalDocument | null>(null)
  const [quotedPrice, setQuotedPrice] = useState<number | null>(null)
  const text = copy[language]
  const formText = bookingCopy[language]
  const legal = legalCopy[language]
  const activeLegal = legalDocument === 'privacy'
    ? { title: legal.privacyTitle, sections: legal.privacySections }
    : { title: legal.termsTitle, sections: legal.termsSections }
  const selectedPackage = birthdayPackages.find((item) => item.id === birthdayPackageId) || birthdayPackages[0]

  const localPrice = useMemo(() => {
    if (ticketType === 'birthday') return selectedPackage.price
    return individualPrice(date, time, players, duration, arenaCount, venue)
  }, [arenaCount, date, duration, players, selectedPackage.price, ticketType, time, venue])
  const price = quotedPrice ?? localPrice

  const checkCheckoutToken = useCallback(async (checkoutToken: string, attempts = 1) => {
    for (let attempt = 0; attempt < attempts; attempt += 1) {
      try {
        const response = await fetch(BOOKING_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'status', checkoutToken }),
        })
        const payload = await response.json()
        if (payload.data?.status === 'confirmed' && payload.data.confirmation) {
          const next = payload.data.confirmation as Confirmation
          window.sessionStorage.removeItem(PENDING_CHECKOUT_KEY)
          setConfirmation(next)
          setVenue(next.venue)
          setDate(next.date)
          setTime(next.time)
          setStep('confirmed')
          setError('')
          setIsBooking(false)
          window.scrollTo({ top: 0, behavior: 'smooth' })
          return true
        }
        if (payload.data?.status === 'failed' || (!response.ok && response.status !== 404)) {
          window.sessionStorage.removeItem(PENDING_CHECKOUT_KEY)
          setError(payload.error?.message || formText.bookingError)
          setIsBooking(false)
          return false
        }
      } catch {
        if (attempt === attempts - 1) setError(formText.bookingError)
      }
      if (attempt < attempts - 1) await new Promise((resolve) => window.setTimeout(resolve, 1_200))
    }
    setIsBooking(false)
    return false
  }, [formText.bookingError])

  const registerCheckoutOrder = useCallback(async (pending: PendingCheckout) => {
    if (!pending.orderId) return
    await fetch(BOOKING_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'register', ...pending }),
    })
  }, [])

  useEffect(() => {
    const resumeCheckout = () => {
      const pending = readPendingCheckout()
      if (!pending) return
      void registerCheckoutOrder(pending).finally(() => checkCheckoutToken(pending.checkoutToken, 6))
    }
    events.on(EventName.OpenApp, resumeCheckout)
    events.on(EventName.PaymentClose, resumeCheckout)
    window.addEventListener('focus', resumeCheckout)
    resumeCheckout()
    return () => {
      events.off(EventName.OpenApp, resumeCheckout)
      events.off(EventName.PaymentClose, resumeCheckout)
      window.removeEventListener('focus', resumeCheckout)
    }
  }, [checkCheckoutToken, registerCheckoutOrder])

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

  useEffect(() => {
    if (ticketType === 'birthday') {
      setPlayers(selectedPackage.players)
      setDuration(60)
      setArenaCount(venue === 'cafe-des-stagiaires' ? 1 : selectedPackage.arenas)
      return
    }
    setPlayers((current) => Math.max(current, 1))
    setArenaCount((current) => venue === 'cafe-des-stagiaires' ? 1 : current)
  }, [selectedPackage, ticketType, venue])

  useEffect(() => {
    if (ticketType === 'birthday') return
    const nextMinimum = minimumDuration(players, arenaCount, venue)
    setDuration((current) => Math.max(current, nextMinimum))
  }, [arenaCount, players, ticketType, venue])

  useEffect(() => {
    if (step !== 'booking' || !date) return
    const controller = new AbortController()
    setIsLoadingTimes(true)
    setError('')
    void fetch(BOOKING_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'availability', venue, date, durationMinutes: duration, arenaCount }),
      signal: controller.signal,
    })
      .then(async (response) => {
        const payload = await response.json()
        if (!response.ok || payload.error) throw new Error(payload.error?.message || formText.bookingError)
        const nextTimes = Array.isArray(payload.data?.times) ? payload.data.times : []
        setTimes(nextTimes)
        setTime((current) => nextTimes.some((item: AvailabilityTime) => item.value === current) ? current : (nextTimes[0]?.value || ''))
      })
      .catch((requestError) => {
        if (requestError instanceof DOMException && requestError.name === 'AbortError') return
        setTimes([])
        setTime('')
        setError(requestError instanceof Error ? requestError.message : formText.bookingError)
      })
      .finally(() => setIsLoadingTimes(false))
    return () => controller.abort()
  }, [arenaCount, date, duration, formText.bookingError, step, venue])

  useEffect(() => {
    setQuotedPrice(null)
    if (step !== 'booking' || !time) return
    const controller = new AbortController()
    void fetch(BOOKING_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'quote',
        selection: {
          venue, ticketType, date, time, durationMinutes: duration, players, arenaCount,
          birthdayPackageId: ticketType === 'birthday' ? birthdayPackageId : null,
        },
      }),
      signal: controller.signal,
    }).then(async (response) => {
      const payload = await response.json()
      const total = Number(payload.data?.displayTotal)
      if (response.ok && Number.isInteger(total) && total > 0) setQuotedPrice(total)
    }).catch(() => undefined)
    return () => controller.abort()
  }, [arenaCount, birthdayPackageId, date, duration, players, step, ticketType, time, venue])

  function changeLanguage(next: LanguageCode) {
    window.localStorage.setItem('vrena-booking-language', next)
    setLanguage(next)
  }

  function changeTicketType(next: TicketType) {
    setTicketType(next)
    setError('')
    if (next === 'individual') {
      setPlayers(2)
      setDuration(30)
      setArenaCount(1)
    }
  }

  async function book() {
    if (!time) {
      setError(formText.chooseTimeError)
      return
    }
    const phoneDigits = guestPhone.replace(/\D/g, '').length
    if (phoneDigits < 8 || phoneDigits > 15) {
      setError(formText.phoneError)
      return
    }
    if (!acceptedTerms) {
      setError(formText.consentError)
      return
    }
    setIsBooking(true)
    setError('')
    try {
      const response = await fetch(BOOKING_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'prepare',
          selection: {
            venue, ticketType, date, time, durationMinutes: duration, players, arenaCount,
            guestName, guestPhone, birthdayPackageId: ticketType === 'birthday' ? birthdayPackageId : null,
            acceptedTerms,
          },
        }),
      })
      const payload = await response.json()
      if (!response.ok || payload.error) throw new Error(payload.error?.message || formText.bookingError)
      const prepared = payload.data as PreparedCheckout
      savePendingCheckout({ checkoutToken: prepared.checkoutToken })
      const { orderId } = await Payment.createOrder(prepared.order)
      const pending = { checkoutToken: prepared.checkoutToken, orderId }
      savePendingCheckout(pending)
      await registerCheckoutOrder(pending)
      void checkCheckoutToken(prepared.checkoutToken, 10)
    } catch (requestError) {
      const pending = readPendingCheckout()
      if (pending && !pending.orderId) window.sessionStorage.removeItem(PENDING_CHECKOUT_KEY)
      setError(requestError instanceof Error ? requestError.message : formText.bookingError)
    } finally {
      setIsBooking(false)
    }
  }

  function startOver() {
    setConfirmation(null)
    setError('')
    setTime('')
    setStep('venue')
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

      {step === 'venue' && (
        <>
          <section className="hero">
            <span className="eyebrow">{text.eyebrow}</span>
            <h1>{text.title}</h1>
            <p>{text.intro}</p>
          </section>

          <section className="booking-card" aria-labelledby="venue-title">
            <div className="section-heading">
              <h2 id="venue-title">{text.venueTitle}</h2>
              <span className="step-badge">1 / 2</span>
            </div>
            <div className="venue-list" role="radiogroup" aria-label={text.venueTitle}>
              {venues.map((item) => {
                const selected = item.id === venue
                return (
                  <button key={item.id} className={`venue-card${selected ? ' is-selected' : ''}`} type="button" role="radio" aria-checked={selected} onClick={() => setVenue(item.id)}>
                    <span className="venue-radio" aria-hidden="true"><span /></span>
                    <span className="venue-copy">
                      <strong>{item.name}</strong>
                      <small>{item.id === 'ha-do-centrosa' ? text.haDoHours : text.thaoDienHours}</small>
                      <span>{item.id === 'ha-do-centrosa' ? text.haDoAddress : text.thaoDienAddress}</span>
                    </span>
                    {selected && <span className="selected-label">{text.selected}</span>}
                  </button>
                )
              })}
            </div>
            <button className="primary-button" type="button" onClick={() => { setStep('booking'); setError(''); window.scrollTo({ top: 0 }) }}>
              <span>{text.book}</span><span aria-hidden="true">→</span>
            </button>
          </section>
        </>
      )}

      {step === 'booking' && (
        <section className="booking-card form-card" aria-labelledby="booking-form-title">
          <button className="back-button" type="button" onClick={() => { setStep('venue'); setError('') }}>← {formText.back}</button>
          <div className="section-heading">
            <h1 id="booking-form-title">{formText.formTitle}</h1>
            <span className="step-badge">2 / 2</span>
          </div>
          <p className="venue-summary">{venues.find((item) => item.id === venue)?.name}</p>

          <fieldset className="choice-group">
            <legend>{formText.ticketType}</legend>
            <div className="segmented-control">
              {(['individual', 'birthday'] as const).map((type) => (
                <button key={type} type="button" className={ticketType === type ? 'is-active' : ''} onClick={() => changeTicketType(type)}>{formText[type]}</button>
              ))}
            </div>
          </fieldset>

          {ticketType === 'birthday' && (
            <fieldset className="choice-group package-list">
              <legend>{formText.birthdayPackage}</legend>
              {birthdayPackages.map((item) => (
                <button key={item.id} type="button" className={birthdayPackageId === item.id ? 'is-active' : ''} onClick={() => setBirthdayPackageId(item.id)}>
                  <span><strong>{item.name}</strong><small>{item.players} {formText.playersUnit} · 60 min</small></span>
                  <strong>{vnd(item.price)}</strong>
                </button>
              ))}
            </fieldset>
          )}

          <div className="field-grid two-columns">
            <label><span>{formText.date}</span><input type="date" min={vietnamDate()} value={date} onChange={(event) => setDate(event.target.value)} /></label>
            <label><span>{formText.time}</span>
              <select value={time} onChange={(event) => setTime(event.target.value)} disabled={isLoadingTimes || times.length === 0}>
                {isLoadingTimes && <option value="">{formText.loadingTimes}</option>}
                {!isLoadingTimes && times.length === 0 && <option value="">{formText.noTimes}</option>}
                {times.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
              </select>
            </label>
          </div>

          {ticketType !== 'birthday' && (
            <div className="field-grid two-columns">
              <label><span>{formText.duration}</span>
                <select value={duration} onChange={(event) => setDuration(Number(event.target.value))}>
                  {[30, 60, 90, 120, 150, 180].filter((minutes) => minutes >= minimumDuration(players, arenaCount, venue)).map((minutes) => <option key={minutes} value={minutes}>{minutes} min</option>)}
                </select>
              </label>
              <label><span>{formText.players}</span><input type="number" min={1} max={16} value={players} onChange={(event) => setPlayers(Number(event.target.value))} /></label>
            </div>
          )}

          {venue === 'ha-do-centrosa' && ticketType !== 'birthday' && players > 4 && (
            <label className="field-block"><span>{formText.arenas}</span>
              <select value={arenaCount} onChange={(event) => setArenaCount(Number(event.target.value))}><option value="1">1</option><option value="2">2</option></select>
            </label>
          )}

          <div className="price-summary">
            <span>{formText.price}</span>
            <strong>{vnd(price)}</strong>
            <small>{formText.payAtVenue}</small>
          </div>

          <div className="field-grid">
            <label><span>{formText.name}</span><input type="text" maxLength={80} value={guestName} placeholder={formText.namePlaceholder} onChange={(event) => setGuestName(event.target.value)} autoComplete="name" /></label>
            <label><span>{formText.phone}</span><input type="tel" maxLength={24} value={guestPhone} placeholder={formText.phonePlaceholder} onChange={(event) => setGuestPhone(event.target.value)} autoComplete="tel" /></label>
          </div>

          <label className="consent-row">
            <input type="checkbox" checked={acceptedTerms} onChange={(event) => setAcceptedTerms(event.target.checked)} />
            <span>{formText.consentPrefix} <button type="button" onClick={(event) => { event.preventDefault(); setLegalDocument('privacy') }}>{text.privacy}</button> {formText.and} <button type="button" onClick={(event) => { event.preventDefault(); setLegalDocument('terms') }}>{text.terms}</button>.</span>
          </label>

          {error && <p className="error-message" role="alert">{error}</p>}
          <button className="primary-button" type="button" disabled={isBooking || isLoadingTimes || !time} onClick={() => void book()}>
            <span>{isBooking ? formText.booking : formText.checkout}</span><span aria-hidden="true">→</span>
          </button>
          <p className="inside-note">{formText.insideZalo}</p>
        </section>
      )}

      {step === 'confirmed' && confirmation && (
        <section className="booking-card confirmation-card" aria-live="polite">
          <div className="confirmation-icon" aria-hidden="true">✓</div>
          <span className="eyebrow">{text.eyebrow}</span>
          <h1>{formText.confirmedTitle}</h1>
          <p>{formText.confirmedBody}</p>
          <dl>
            <div><dt>{formText.reference}</dt><dd>{confirmation.reference}</dd></div>
            <div><dt>{formText.venue}</dt><dd>{venues.find((item) => item.id === confirmation.venue)?.name}</dd></div>
            <div><dt>{formText.dateTime}</dt><dd>{confirmation.date} · {confirmation.time}</dd></div>
          </dl>
          <button className="primary-button" type="button" onClick={startOver}><span>{formText.newBooking}</span><span aria-hidden="true">↻</span></button>
        </section>
      )}

      <footer>
        <button type="button" onClick={() => setLegalDocument('privacy')}>{text.privacy}</button>
        <span aria-hidden="true">·</span>
        <button type="button" onClick={() => setLegalDocument('terms')}>{text.terms}</button>
      </footer>

      {legalDocument && (
        <div className="legal-overlay" role="presentation" onClick={() => setLegalDocument(null)}>
          <section className="legal-panel" role="dialog" aria-modal="true" aria-labelledby="legal-title" onClick={(event) => event.stopPropagation()}>
            <header className="legal-header"><h2 id="legal-title">{activeLegal.title}</h2><button type="button" aria-label={legal.close} onClick={() => setLegalDocument(null)}>×</button></header>
            <div className="legal-content">{activeLegal.sections.map((section) => <section key={section.title}><h3>{section.title}</h3><p>{section.body}</p></section>)}</div>
            <button className="legal-close" type="button" onClick={() => setLegalDocument(null)}>{legal.close}</button>
          </section>
        </div>
      )}
    </main>
  )
}
