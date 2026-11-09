export const languageCodes = ['en', 'vi', 'ko', 'ja', 'fr', 'de', 'it', 'zh'] as const
export type LanguageCode = typeof languageCodes[number]

type Copy = {
  languageName: string
  eyebrow: string
  title: string
  intro: string
  venueTitle: string
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
    intro: 'VRena is a social VR playground for immersive games and shared experiences. Unlike stationary VR, you move freely through shared virtual worlds.',
    venueTitle: 'Choose a venue',
    haDoAddress: 'Iris 4, Hà Đô Centrosa, District 10, Ho Chi Minh City', haDoHours: 'Open daily · 9:00–22:00',
    thaoDienAddress: '8–10 Street 54, An Khánh, Ho Chi Minh City', thaoDienHours: 'Open daily · 15:30–23:00',
    selected: 'Selected', book: 'Continue to tickets',
    bookingNote: 'Your booking is confirmed only after the server accepts the selected time. Contact details are requested only in the booking form.',
    confirmed: 'Server-confirmed availability', accountOptional: 'Guest booking available', insideZalo: 'Secure view inside Zalo',
    privacy: 'Privacy Policy', terms: 'Terms & Conditions', openError: 'Please open this Mini App inside Zalo and try again.',
  },
  vi: {
    languageName: 'Tiếng Việt', eyebrow: 'VÉ VRENA', title: 'Đặt trải nghiệm VR của bạn',
    intro: 'VRena là sân chơi thực tế ảo cộng đồng dành cho trò chơi nhập vai và trải nghiệm cùng nhau. Khác với VR cố định, bạn tự do di chuyển trong thế giới ảo cùng mọi người.',
    venueTitle: 'Chọn địa điểm',
    haDoAddress: 'Iris 4, Hà Đô Centrosa, Quận 10, TP.HCM', haDoHours: 'Mở hằng ngày · 09:00–22:00',
    thaoDienAddress: '8–10 Đường số 54, An Khánh, TP.HCM', thaoDienHours: 'Mở hằng ngày · 15:30–23:00',
    selected: 'Đã chọn', book: 'Tiếp tục đặt vé',
    bookingNote: 'Đặt chỗ chỉ được xác nhận sau khi máy chủ chấp nhận khung giờ đã chọn. Thông tin liên hệ chỉ được yêu cầu trong biểu mẫu đặt vé.',
    confirmed: 'Lịch trống được máy chủ xác nhận', accountOptional: 'Có thể đặt vé không cần tài khoản', insideZalo: 'Mở an toàn trong Zalo',
    privacy: 'Chính sách bảo mật', terms: 'Điều khoản & Điều kiện', openError: 'Vui lòng mở Mini App này trong Zalo và thử lại.',
  },
  ko: {
    languageName: '한국어', eyebrow: 'VRENA 티켓', title: 'VR 체험을 예약하세요',
    intro: 'VRena는 몰입형 게임과 함께 즐기는 경험을 위한 소셜 VR 플레이그라운드입니다. 제자리에서 즐기는 VR과 달리, 함께하는 가상 세계를 자유롭게 움직입니다.',
    venueTitle: '지점 선택',
    haDoAddress: '호찌민시 10군, Hà Đô Centrosa, Iris 4', haDoHours: '매일 영업 · 09:00–22:00',
    thaoDienAddress: '호찌민시 An Khánh, 54번 도로 8–10', thaoDienHours: '매일 영업 · 15:30–23:00',
    selected: '선택됨', book: '티켓 예약 계속',
    bookingNote: '선택한 시간이 서버에서 승인된 후에만 예약이 확정됩니다. 연락처는 예약 양식에서만 요청됩니다.',
    confirmed: '서버 확인 예약 가능 시간', accountOptional: '비회원 예약 가능', insideZalo: 'Zalo 내 보안 화면',
    privacy: '개인정보 처리방침', terms: '이용약관', openError: 'Zalo 안에서 이 Mini App을 열고 다시 시도하세요.',
  },
  ja: {
    languageName: '日本語', eyebrow: 'VRENA チケット', title: 'VR体験を予約',
    intro: 'VRenaは、没入型ゲームとみんなで楽しむ体験のためのソーシャルVRプレイグラウンドです。定位置で遊ぶVRとは異なり、仲間と共有する仮想世界を自由に動けます。',
    venueTitle: '店舗を選択',
    haDoAddress: 'ホーチミン市10区、Hà Đô Centrosa、Iris 4', haDoHours: '毎日営業 · 9:00–22:00',
    thaoDienAddress: 'ホーチミン市An Khánh、54番通り8–10', thaoDienHours: '毎日営業 · 15:30–23:00',
    selected: '選択中', book: 'チケット予約へ',
    bookingNote: '選択時間がサーバーで承認された後にのみ予約が確定します。連絡先は予約フォーム内でのみ求められます。',
    confirmed: 'サーバー確認済み空き状況', accountOptional: 'ゲスト予約可能', insideZalo: 'Zalo内の安全な画面',
    privacy: 'プライバシーポリシー', terms: '利用規約', openError: 'Zalo内でこのMini Appを開いて、もう一度お試しください。',
  },
  fr: {
    languageName: 'Français', eyebrow: 'BILLETS VRENA', title: 'Réservez votre expérience VR',
    intro: 'VRena est un terrain de jeu VR social dédié aux jeux immersifs et aux expériences à partager. Contrairement à la VR statique, vous vous déplacez librement dans des mondes virtuels partagés.',
    venueTitle: 'Choisir un site',
    haDoAddress: 'Iris 4, Hà Đô Centrosa, District 10, Hô Chi Minh-Ville', haDoHours: 'Ouvert tous les jours · 9h–22h',
    thaoDienAddress: '8–10 rue 54, An Khánh, Hô Chi Minh-Ville', thaoDienHours: 'Ouvert tous les jours · 15h30–23h',
    selected: 'Sélectionné', book: 'Continuer vers les billets',
    bookingNote: 'La réservation est confirmée uniquement après validation du créneau par le serveur. Les coordonnées sont demandées seulement dans le formulaire.',
    confirmed: 'Disponibilité confirmée par serveur', accountOptional: 'Réservation sans compte', insideZalo: 'Vue sécurisée dans Zalo',
    privacy: 'Politique de confidentialité', terms: 'Conditions générales', openError: 'Ouvrez cette Mini App dans Zalo et réessayez.',
  },
  de: {
    languageName: 'Deutsch', eyebrow: 'VRENA TICKETS', title: 'VR-Erlebnis buchen',
    intro: 'VRena ist ein sozialer VR-Spielplatz für immersive Spiele und gemeinsame Erlebnisse. Anders als bei stationärer VR bewegst du dich frei durch gemeinsame virtuelle Welten.',
    venueTitle: 'Standort wählen',
    haDoAddress: 'Iris 4, Hà Đô Centrosa, Bezirk 10, Ho-Chi-Minh-Stadt', haDoHours: 'Täglich geöffnet · 09:00–22:00',
    thaoDienAddress: 'Straße 54, Nr. 8–10, An Khánh, Ho-Chi-Minh-Stadt', thaoDienHours: 'Täglich geöffnet · 15:30–23:00',
    selected: 'Ausgewählt', book: 'Weiter zur Buchung',
    bookingNote: 'Die Buchung wird erst nach Serverbestätigung des Zeitfensters verbindlich. Kontaktdaten werden nur im Buchungsformular abgefragt.',
    confirmed: 'Serverbestätigte Verfügbarkeit', accountOptional: 'Gastbuchung möglich', insideZalo: 'Sichere Ansicht in Zalo',
    privacy: 'Datenschutzrichtlinie', terms: 'Allgemeine Geschäftsbedingungen', openError: 'Bitte öffne diese Mini App in Zalo und versuche es erneut.',
  },
  it: {
    languageName: 'Italiano', eyebrow: 'BIGLIETTI VRENA', title: 'Prenota la tua esperienza VR',
    intro: 'VRena è uno spazio VR sociale per giochi immersivi ed esperienze da condividere. A differenza della VR da fermi, ti muovi liberamente in mondi virtuali condivisi.',
    venueTitle: 'Scegli una sede',
    haDoAddress: 'Iris 4, Hà Đô Centrosa, Distretto 10, Ho Chi Minh City', haDoHours: 'Aperto ogni giorno · 09:00–22:00',
    thaoDienAddress: '8–10 Street 54, An Khánh, Ho Chi Minh City', thaoDienHours: 'Aperto ogni giorno · 15:30–23:00',
    selected: 'Selezionato', book: 'Continua ai biglietti',
    bookingNote: 'La prenotazione è confermata solo dopo l’accettazione dell’orario da parte del server. I contatti sono richiesti solo nel modulo.',
    confirmed: 'Disponibilità confermata dal server', accountOptional: 'Prenotazione senza account', insideZalo: 'Vista sicura in Zalo',
    privacy: 'Informativa sulla privacy', terms: 'Termini e condizioni', openError: 'Apri questa Mini App dentro Zalo e riprova.',
  },
  zh: {
    languageName: '中文', eyebrow: 'VRENA 门票', title: '预订您的 VR 体验',
    intro: 'VRena 是一个社交 VR 乐园，提供沉浸式游戏和共享体验。与固定站位的 VR 不同，您可以在共享的虚拟世界中自由移动。',
    venueTitle: '选择门店',
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

type BookingCopy = {
  back: string
  formTitle: string
  ticketType: string
  individual: string
  birthday: string
  corporate: string
  birthdayPackage: string
  playersUnit: string
  date: string
  time: string
  loadingTimes: string
  noTimes: string
  duration: string
  players: string
  arenas: string
  price: string
  staffConfirmation: string
  name: string
  namePlaceholder: string
  phone: string
  phonePlaceholder: string
  consentPrefix: string
  and: string
  confirmBooking: string
  booking: string
  bookingError: string
  chooseTimeError: string
  phoneError: string
  consentError: string
  insideZalo: string
  confirmedTitle: string
  confirmedBody: string
  reference: string
  venue: string
  dateTime: string
  newBooking: string
}

export const bookingCopy: Record<LanguageCode, BookingCopy> = {
  en: {
    back: 'Back', formTitle: 'Complete your booking', ticketType: 'Ticket type', individual: 'Individual', birthday: 'Birthday', corporate: 'Corporate',
    birthdayPackage: 'Birthday package', playersUnit: 'players', date: 'Date', time: 'Available time', loadingTimes: 'Checking availability…', noTimes: 'No time available',
    duration: 'Duration', players: 'Players', arenas: 'Arenas', price: 'Estimated total', staffConfirmation: 'Final details confirmed by the VRena team',
    name: 'Name (optional)', namePlaceholder: 'Booking name', phone: 'Phone number', phonePlaceholder: '070 000 0000',
    consentPrefix: 'I agree to the', and: 'and', confirmBooking: 'Confirm booking', booking: 'Confirming…', bookingError: 'Booking is temporarily unavailable. Please try again.',
    chooseTimeError: 'Choose an available time.', phoneError: 'Enter a valid phone number.', consentError: 'Accept the Privacy Policy and Terms before booking.',
    insideZalo: 'This booking stays inside the Zalo Mini App.', confirmedTitle: 'Booking confirmed', confirmedBody: 'Your time is reserved. Keep this reference for your visit.',
    reference: 'Booking reference', venue: 'Venue', dateTime: 'Date and time', newBooking: 'Make another booking',
  },
  vi: {
    back: 'Quay lại', formTitle: 'Hoàn tất đặt vé', ticketType: 'Loại vé', individual: 'Cá nhân', birthday: 'Sinh nhật', corporate: 'Doanh nghiệp',
    birthdayPackage: 'Gói sinh nhật', playersUnit: 'người', date: 'Ngày', time: 'Giờ còn trống', loadingTimes: 'Đang kiểm tra lịch trống…', noTimes: 'Không còn giờ trống',
    duration: 'Thời lượng', players: 'Số người', arenas: 'Số sân', price: 'Tổng dự kiến', staffConfirmation: 'Chi tiết cuối cùng được đội ngũ VRena xác nhận',
    name: 'Tên (không bắt buộc)', namePlaceholder: 'Tên người đặt vé', phone: 'Số điện thoại', phonePlaceholder: '070 000 0000',
    consentPrefix: 'Tôi đồng ý với', and: 'và', confirmBooking: 'Xác nhận đặt vé', booking: 'Đang xác nhận…', bookingError: 'Tạm thời chưa thể đặt vé. Vui lòng thử lại.',
    chooseTimeError: 'Vui lòng chọn giờ còn trống.', phoneError: 'Vui lòng nhập số điện thoại hợp lệ.', consentError: 'Vui lòng đồng ý với Chính sách bảo mật và Điều khoản.',
    insideZalo: 'Toàn bộ quy trình đặt vé diễn ra trong Zalo Mini App.', confirmedTitle: 'Đặt vé thành công', confirmedBody: 'Khung giờ của bạn đã được giữ. Vui lòng lưu mã đặt vé này.',
    reference: 'Mã đặt vé', venue: 'Địa điểm', dateTime: 'Ngày và giờ', newBooking: 'Đặt vé khác',
  },
  ko: {
    back: '뒤로', formTitle: '예약 완료', ticketType: '티켓 종류', individual: '개인', birthday: '생일', corporate: '기업', birthdayPackage: '생일 패키지', playersUnit: '명',
    date: '날짜', time: '예약 가능 시간', loadingTimes: '예약 가능 시간 확인 중…', noTimes: '예약 가능한 시간이 없습니다', duration: '이용 시간', players: '인원', arenas: '아레나', price: '예상 합계',
    staffConfirmation: '최종 세부 사항은 VRena 팀이 확인합니다', name: '이름(선택)', namePlaceholder: '예약자 이름', phone: '전화번호', phonePlaceholder: '070 000 0000',
    consentPrefix: '다음에 동의합니다:', and: '및', confirmBooking: '예약 확인', booking: '확인 중…', bookingError: '현재 예약할 수 없습니다. 다시 시도하세요.', chooseTimeError: '예약 가능한 시간을 선택하세요.',
    phoneError: '유효한 전화번호를 입력하세요.', consentError: '예약 전 개인정보 처리방침과 이용약관에 동의하세요.', insideZalo: '예약은 Zalo Mini App 안에서 완료됩니다.',
    confirmedTitle: '예약 확정', confirmedBody: '시간이 예약되었습니다. 방문 시 예약 번호를 보관하세요.', reference: '예약 번호', venue: '지점', dateTime: '날짜 및 시간', newBooking: '다른 예약 만들기',
  },
  ja: {
    back: '戻る', formTitle: '予約を完了', ticketType: 'チケット種類', individual: '個人', birthday: '誕生日', corporate: '法人', birthdayPackage: '誕生日パッケージ', playersUnit: '名',
    date: '日付', time: '空き時間', loadingTimes: '空き状況を確認中…', noTimes: '空き時間がありません', duration: '時間', players: '人数', arenas: 'アリーナ', price: '予定合計',
    staffConfirmation: '最終内容はVRenaチームが確認します', name: '名前（任意）', namePlaceholder: '予約者名', phone: '電話番号', phonePlaceholder: '070 000 0000',
    consentPrefix: '以下に同意します：', and: 'および', confirmBooking: '予約を確定', booking: '確認中…', bookingError: '現在予約できません。もう一度お試しください。', chooseTimeError: '空き時間を選択してください。',
    phoneError: '有効な電話番号を入力してください。', consentError: '予約前にプライバシーポリシーと利用規約に同意してください。', insideZalo: '予約はZalo Mini App内で完了します。',
    confirmedTitle: '予約確定', confirmedBody: '時間を確保しました。来店時まで予約番号を保管してください。', reference: '予約番号', venue: '店舗', dateTime: '日時', newBooking: '別の予約をする',
  },
  fr: {
    back: 'Retour', formTitle: 'Finaliser la réservation', ticketType: 'Type de billet', individual: 'Individuel', birthday: 'Anniversaire', corporate: 'Entreprise', birthdayPackage: 'Forfait anniversaire', playersUnit: 'joueurs',
    date: 'Date', time: 'Horaire disponible', loadingTimes: 'Vérification des disponibilités…', noTimes: 'Aucun horaire disponible', duration: 'Durée', players: 'Joueurs', arenas: 'Arènes', price: 'Total estimé',
    staffConfirmation: 'Détails finaux confirmés par l’équipe VRena', name: 'Nom (facultatif)', namePlaceholder: 'Nom de réservation', phone: 'Téléphone', phonePlaceholder: '070 000 0000',
    consentPrefix: 'J’accepte la', and: 'et les', confirmBooking: 'Confirmer', booking: 'Confirmation…', bookingError: 'Réservation temporairement indisponible. Réessayez.', chooseTimeError: 'Choisissez un horaire disponible.',
    phoneError: 'Saisissez un numéro valide.', consentError: 'Acceptez la politique de confidentialité et les conditions.', insideZalo: 'La réservation reste dans la Mini App Zalo.',
    confirmedTitle: 'Réservation confirmée', confirmedBody: 'Votre horaire est réservé. Conservez cette référence.', reference: 'Référence', venue: 'Site', dateTime: 'Date et heure', newBooking: 'Nouvelle réservation',
  },
  de: {
    back: 'Zurück', formTitle: 'Buchung abschließen', ticketType: 'Ticketart', individual: 'Einzeln', birthday: 'Geburtstag', corporate: 'Firma', birthdayPackage: 'Geburtstagspaket', playersUnit: 'Personen',
    date: 'Datum', time: 'Verfügbare Zeit', loadingTimes: 'Verfügbarkeit wird geprüft…', noTimes: 'Keine Zeit verfügbar', duration: 'Dauer', players: 'Personen', arenas: 'Arenen', price: 'Voraussichtlicher Gesamtpreis',
    staffConfirmation: 'Endgültige Details bestätigt das VRena-Team', name: 'Name (optional)', namePlaceholder: 'Buchungsname', phone: 'Telefonnummer', phonePlaceholder: '070 000 0000',
    consentPrefix: 'Ich akzeptiere die', and: 'und die', confirmBooking: 'Buchung bestätigen', booking: 'Wird bestätigt…', bookingError: 'Buchung vorübergehend nicht verfügbar. Bitte erneut versuchen.', chooseTimeError: 'Wähle eine verfügbare Zeit.',
    phoneError: 'Gib eine gültige Telefonnummer ein.', consentError: 'Akzeptiere Datenschutz und Bedingungen.', insideZalo: 'Die Buchung bleibt in der Zalo Mini App.',
    confirmedTitle: 'Buchung bestätigt', confirmedBody: 'Deine Zeit ist reserviert. Bewahre diese Referenz auf.', reference: 'Buchungsnummer', venue: 'Standort', dateTime: 'Datum und Zeit', newBooking: 'Weitere Buchung',
  },
  it: {
    back: 'Indietro', formTitle: 'Completa la prenotazione', ticketType: 'Tipo di biglietto', individual: 'Individuale', birthday: 'Compleanno', corporate: 'Aziendale', birthdayPackage: 'Pacchetto compleanno', playersUnit: 'giocatori',
    date: 'Data', time: 'Orario disponibile', loadingTimes: 'Verifica disponibilità…', noTimes: 'Nessun orario disponibile', duration: 'Durata', players: 'Giocatori', arenas: 'Arene', price: 'Totale stimato',
    staffConfirmation: 'Dettagli finali confermati dal team VRena', name: 'Nome (facoltativo)', namePlaceholder: 'Nome prenotazione', phone: 'Telefono', phonePlaceholder: '070 000 0000',
    consentPrefix: 'Accetto la', and: 'e i', confirmBooking: 'Conferma prenotazione', booking: 'Conferma…', bookingError: 'Prenotazione temporaneamente non disponibile. Riprova.', chooseTimeError: 'Scegli un orario disponibile.',
    phoneError: 'Inserisci un numero valido.', consentError: 'Accetta informativa privacy e condizioni.', insideZalo: 'La prenotazione resta nella Mini App Zalo.',
    confirmedTitle: 'Prenotazione confermata', confirmedBody: 'Il tuo orario è riservato. Conserva questo riferimento.', reference: 'Riferimento', venue: 'Sede', dateTime: 'Data e ora', newBooking: 'Nuova prenotazione',
  },
  zh: {
    back: '返回', formTitle: '完成预订', ticketType: '门票类型', individual: '个人', birthday: '生日', corporate: '企业', birthdayPackage: '生日套餐', playersUnit: '人',
    date: '日期', time: '可预约时间', loadingTimes: '正在查询空余时间…', noTimes: '暂无可预约时间', duration: '时长', players: '人数', arenas: '场地数', price: '预计总价',
    staffConfirmation: '最终细节由VRena团队确认', name: '姓名（可选）', namePlaceholder: '预订姓名', phone: '电话号码', phonePlaceholder: '070 000 0000',
    consentPrefix: '我同意', and: '及', confirmBooking: '确认预订', booking: '确认中…', bookingError: '暂时无法预订，请重试。', chooseTimeError: '请选择可预约时间。',
    phoneError: '请输入有效电话号码。', consentError: '预订前请同意隐私政策和条款。', insideZalo: '整个预订流程均在Zalo Mini App内完成。',
    confirmedTitle: '预订已确认', confirmedBody: '您的时间已保留，请保存预订编号。', reference: '预订编号', venue: '门店', dateTime: '日期和时间', newBooking: '再次预订',
  },
}
