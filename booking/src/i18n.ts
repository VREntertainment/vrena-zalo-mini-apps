export const languageCodes = ['en', 'vi', 'ko', 'ja', 'fr', 'de', 'it', 'zh'] as const
export type LanguageCode = typeof languageCodes[number]

type Copy = {
  languageName: string
  eyebrow: string
  title: string
  intro: string
  venueTitle: string
  venueHint: string
  haDoAddress: string
  haDoHours: string
  thaoDienAddress: string
  thaoDienHours: string
  selected: string
  book: string
  bookingNote: string
  confirmed: string
  accountOptional: string
  insideZalo: string
  privacy: string
  terms: string
  openError: string
}

export const copy: Record<LanguageCode, Copy> = {
  en: {
    languageName: 'English', eyebrow: 'VRENA TICKETS', title: 'Book your VR experience',
    intro: 'VRena is a social VR playground for immersive games and shared experiences.',
    venueTitle: 'Choose a venue', venueHint: 'Your selection opens the matching live availability.',
    haDoAddress: 'Iris 4, Hà Đô Centrosa, District 10, Ho Chi Minh City', haDoHours: 'Open daily · 9:00–22:00',
    thaoDienAddress: '8–10 Street 54, An Khánh, Ho Chi Minh City', thaoDienHours: 'Open daily · 15:30–23:00',
    selected: 'Selected', book: 'Continue to tickets',
    bookingNote: 'Your booking is confirmed only after the server accepts the selected time. Contact details are requested only in the booking form.',
    confirmed: 'Server-confirmed availability', accountOptional: 'Guest booking available', insideZalo: 'Secure view inside Zalo',
    privacy: 'Privacy Policy', terms: 'Terms & Conditions', openError: 'Please open this Mini App inside Zalo and try again.',
  },
  vi: {
    languageName: 'Tiếng Việt', eyebrow: 'VÉ VRENA', title: 'Đặt trải nghiệm VR của bạn',
    intro: 'VRena là sân chơi thực tế ảo cộng đồng dành cho trò chơi nhập vai và trải nghiệm cùng nhau.',
    venueTitle: 'Chọn địa điểm', venueHint: 'Lựa chọn của bạn sẽ mở lịch trống trực tiếp của địa điểm.',
    haDoAddress: 'Iris 4, Hà Đô Centrosa, Quận 10, TP.HCM', haDoHours: 'Mở hằng ngày · 09:00–22:00',
    thaoDienAddress: '8–10 Đường số 54, An Khánh, TP.HCM', thaoDienHours: 'Mở hằng ngày · 15:30–23:00',
    selected: 'Đã chọn', book: 'Tiếp tục đặt vé',
    bookingNote: 'Đặt chỗ chỉ được xác nhận sau khi máy chủ chấp nhận khung giờ đã chọn. Thông tin liên hệ chỉ được yêu cầu trong biểu mẫu đặt vé.',
    confirmed: 'Lịch trống được máy chủ xác nhận', accountOptional: 'Có thể đặt vé không cần tài khoản', insideZalo: 'Mở an toàn trong Zalo',
    privacy: 'Chính sách bảo mật', terms: 'Điều khoản & Điều kiện', openError: 'Vui lòng mở Mini App này trong Zalo và thử lại.',
  },
  ko: {
    languageName: '한국어', eyebrow: 'VRENA 티켓', title: 'VR 체험을 예약하세요',
    intro: 'VRena는 몰입형 게임과 함께 즐기는 경험을 위한 소셜 VR 플레이그라운드입니다.',
    venueTitle: '지점 선택', venueHint: '선택한 지점의 실시간 예약 가능 시간이 열립니다.',
    haDoAddress: '호찌민시 10군, Hà Đô Centrosa, Iris 4', haDoHours: '매일 영업 · 09:00–22:00',
    thaoDienAddress: '호찌민시 An Khánh, 54번 도로 8–10', thaoDienHours: '매일 영업 · 15:30–23:00',
    selected: '선택됨', book: '티켓 예약 계속',
    bookingNote: '선택한 시간이 서버에서 승인된 후에만 예약이 확정됩니다. 연락처는 예약 양식에서만 요청됩니다.',
    confirmed: '서버 확인 예약 가능 시간', accountOptional: '비회원 예약 가능', insideZalo: 'Zalo 내 보안 화면',
    privacy: '개인정보 처리방침', terms: '이용약관', openError: 'Zalo 안에서 이 Mini App을 열고 다시 시도하세요.',
  },
  ja: {
    languageName: '日本語', eyebrow: 'VRENA チケット', title: 'VR体験を予約',
    intro: 'VRenaは、没入型ゲームとみんなで楽しむ体験のためのソーシャルVRプレイグラウンドです。',
    venueTitle: '店舗を選択', venueHint: '選択した店舗の最新の空き状況を開きます。',
    haDoAddress: 'ホーチミン市10区、Hà Đô Centrosa、Iris 4', haDoHours: '毎日営業 · 9:00–22:00',
    thaoDienAddress: 'ホーチミン市An Khánh、54番通り8–10', thaoDienHours: '毎日営業 · 15:30–23:00',
    selected: '選択中', book: 'チケット予約へ',
    bookingNote: '選択時間がサーバーで承認された後にのみ予約が確定します。連絡先は予約フォーム内でのみ求められます。',
    confirmed: 'サーバー確認済み空き状況', accountOptional: 'ゲスト予約可能', insideZalo: 'Zalo内の安全な画面',
    privacy: 'プライバシーポリシー', terms: '利用規約', openError: 'Zalo内でこのMini Appを開いて、もう一度お試しください。',
  },
  fr: {
    languageName: 'Français', eyebrow: 'BILLETS VRENA', title: 'Réservez votre expérience VR',
    intro: 'VRena est un terrain de jeu VR social dédié aux jeux immersifs et aux expériences à partager.',
    venueTitle: 'Choisir un site', venueHint: 'Votre choix ouvre les disponibilités en direct du site.',
    haDoAddress: 'Iris 4, Hà Đô Centrosa, District 10, Hô Chi Minh-Ville', haDoHours: 'Ouvert tous les jours · 9h–22h',
    thaoDienAddress: '8–10 rue 54, An Khánh, Hô Chi Minh-Ville', thaoDienHours: 'Ouvert tous les jours · 15h30–23h',
    selected: 'Sélectionné', book: 'Continuer vers les billets',
    bookingNote: 'La réservation est confirmée uniquement après validation du créneau par le serveur. Les coordonnées sont demandées seulement dans le formulaire.',
    confirmed: 'Disponibilité confirmée par serveur', accountOptional: 'Réservation sans compte', insideZalo: 'Vue sécurisée dans Zalo',
    privacy: 'Politique de confidentialité', terms: 'Conditions générales', openError: 'Ouvrez cette Mini App dans Zalo et réessayez.',
  },
  de: {
    languageName: 'Deutsch', eyebrow: 'VRENA TICKETS', title: 'VR-Erlebnis buchen',
    intro: 'VRena ist ein sozialer VR-Spielplatz für immersive Spiele und gemeinsame Erlebnisse.',
    venueTitle: 'Standort wählen', venueHint: 'Deine Auswahl öffnet die aktuelle Verfügbarkeit des Standorts.',
    haDoAddress: 'Iris 4, Hà Đô Centrosa, Bezirk 10, Ho-Chi-Minh-Stadt', haDoHours: 'Täglich geöffnet · 09:00–22:00',
    thaoDienAddress: 'Straße 54, Nr. 8–10, An Khánh, Ho-Chi-Minh-Stadt', thaoDienHours: 'Täglich geöffnet · 15:30–23:00',
    selected: 'Ausgewählt', book: 'Weiter zur Buchung',
    bookingNote: 'Die Buchung wird erst nach Serverbestätigung des Zeitfensters verbindlich. Kontaktdaten werden nur im Buchungsformular abgefragt.',
    confirmed: 'Serverbestätigte Verfügbarkeit', accountOptional: 'Gastbuchung möglich', insideZalo: 'Sichere Ansicht in Zalo',
    privacy: 'Datenschutzrichtlinie', terms: 'Allgemeine Geschäftsbedingungen', openError: 'Bitte öffne diese Mini App in Zalo und versuche es erneut.',
  },
  it: {
    languageName: 'Italiano', eyebrow: 'BIGLIETTI VRENA', title: 'Prenota la tua esperienza VR',
    intro: 'VRena è uno spazio VR sociale per giochi immersivi ed esperienze da condividere.',
    venueTitle: 'Scegli una sede', venueHint: 'La selezione apre la disponibilità aggiornata della sede.',
    haDoAddress: 'Iris 4, Hà Đô Centrosa, Distretto 10, Ho Chi Minh City', haDoHours: 'Aperto ogni giorno · 09:00–22:00',
    thaoDienAddress: '8–10 Street 54, An Khánh, Ho Chi Minh City', thaoDienHours: 'Aperto ogni giorno · 15:30–23:00',
    selected: 'Selezionato', book: 'Continua ai biglietti',
    bookingNote: 'La prenotazione è confermata solo dopo l’accettazione dell’orario da parte del server. I contatti sono richiesti solo nel modulo.',
    confirmed: 'Disponibilità confermata dal server', accountOptional: 'Prenotazione senza account', insideZalo: 'Vista sicura in Zalo',
    privacy: 'Informativa sulla privacy', terms: 'Termini e condizioni', openError: 'Apri questa Mini App dentro Zalo e riprova.',
  },
  zh: {
    languageName: '中文', eyebrow: 'VRENA 门票', title: '预订您的 VR 体验',
    intro: 'VRena 是一个社交 VR 乐园，提供沉浸式游戏和共享体验。',
    venueTitle: '选择门店', venueHint: '系统将打开所选门店的实时可预约时间。',
    haDoAddress: '胡志明市第十郡 Hà Đô Centrosa，Iris 4', haDoHours: '每日营业 · 09:00–22:00',
    thaoDienAddress: '胡志明市 An Khánh，54 号街 8–10 号', thaoDienHours: '每日营业 · 15:30–23:00',
    selected: '已选择', book: '继续预订门票',
    bookingNote: '只有服务器接受所选时间后，预订才会确认。联系方式仅在预订表单中填写。',
    confirmed: '服务器确认的可预约时间', accountOptional: '支持访客预订', insideZalo: 'Zalo 内安全页面',
    privacy: '隐私政策', terms: '条款与条件', openError: '请在 Zalo 内打开此 Mini App 后重试。',
  },
}

export function initialLanguage(): LanguageCode {
  const stored = window.localStorage.getItem('vrena-booking-language')
  if (stored && languageCodes.includes(stored as LanguageCode)) return stored as LanguageCode
  const browserLanguage = window.navigator.language.toLowerCase()
  const exact = languageCodes.find((code) => browserLanguage === code || browserLanguage.startsWith(`${code}-`))
  return exact ?? 'vi'
}
