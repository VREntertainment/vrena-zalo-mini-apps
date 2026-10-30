export type LanguageCode = 'en' | 'vi' | 'ko' | 'ja' | 'fr' | 'de' | 'it'
export type LegalDocument = 'privacyPolicy' | 'termsAndConditions'

type LegalContent = {
  title: string
  updated: string
  sections: Array<{ heading: string; body: string }>
}

export type PlayerCopy = {
  languageLabel: string
  closeLabel: string
  legalNote: string
  legalAriaLabel: string
  privacyLink: string
  termsLink: string
  eyebrow: string
  title: string
  intro: string
  noAccountTitle: string
  noAccountBody: string
  venueHelpTitle: string
  venueHelpBody: string
  openGuide: string
  closeGuide: string
  guideTitle: string
  guideSteps: [string, string, string]
  disclaimer: string
  footer: string
  legal: Record<LegalDocument, LegalContent>
}

export const languageChoices: ReadonlyArray<{ code: LanguageCode; label: string }> = [
  { code: 'en', label: 'English' },
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'ko', label: '한국어' },
  { code: 'ja', label: '日本語' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'it', label: 'Italiano' },
]

const languageCodes = new Set<LanguageCode>(languageChoices.map(({ code }) => code))
const LANGUAGE_STORAGE_KEY = 'vrena-language'

function detectLanguage(locale: string | null | undefined): LanguageCode {
  const value = (locale || '').toLowerCase().slice(0, 2) as LanguageCode
  return languageCodes.has(value) ? value : 'en'
}

export function getInitialLanguage(): LanguageCode {
  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY) as LanguageCode | null
  if (stored && languageCodes.has(stored)) return stored

  for (const locale of navigator.languages?.length ? navigator.languages : [navigator.language]) {
    const detected = detectLanguage(locale)
    if (detected !== 'en') return detected
  }
  return 'en'
}

export function storeLanguage(language: LanguageCode) {
  window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
}

export const translations: Record<LanguageCode, PlayerCopy> = {
  en: {
    languageLabel: 'Language', closeLabel: 'Close', legalAriaLabel: 'Legal documents',
    legalNote: 'This document is displayed inside VRena Player and contains no link that navigates outside the Mini App.',
    privacyLink: 'Privacy Policy', termsLink: 'Terms of Use', eyebrow: 'VRENA PLAYER GUIDE',
    title: 'Explore VRena Player', intro: 'View player information and learn how to get help at a VRena venue. No account is required.',
    noAccountTitle: 'No online registration', noAccountBody: 'This Mini App does not request your phone number, email or Zalo user identifier.',
    venueHelpTitle: 'Help at the venue', venueHelpBody: 'If you need membership assistance, the VRena team can help you in person.',
    openGuide: 'How it works at VRena', closeGuide: 'Hide the guide', guideTitle: 'At the venue',
    guideSteps: ['Choose the VR activity you want to experience.', 'Ask the VRena team if you need game or membership guidance.', 'Enjoy your session; no Mini App account is needed.'],
    disclaimer: 'This Mini App provides information only and does not create or link a VRena account.',
    footer: 'No account required · No advertising · No external navigation',
    legal: {
      privacyPolicy: { title: 'VRena Player Privacy Policy', updated: 'Updated 31 October 2026', sections: [
        { heading: '1. Scope', body: 'VRena Player is an informational Mini App operated by VR ENTERTAINMENT CO., LTD. It does not provide online account registration.' },
        { heading: '2. Data processed', body: 'The Mini App does not request, receive or store your phone number, email, contacts, camera, microphone, location or Zalo user identifier. Your language choice is stored only on your device.' },
        { heading: '3. Service operation', body: 'The Mini App does not call the VRena registration service, show advertising or direct you to an external website.' },
        { heading: '4. Contact', body: 'For privacy questions, contact VR ENTERTAINMENT CO., LTD. at contact@vre-vietnam.com or 0981 152 315.' },
      ] },
      termsAndConditions: { title: 'VRena Player Terms of Use', updated: 'Updated 31 October 2026', sections: [
        { heading: '1. Service', body: 'VRena Player provides information about the in-venue player experience. No Mini App account is required or created.' },
        { heading: '2. Use', body: 'Use the guide for general information and ask VRena staff at the venue for current game, session or membership assistance.' },
        { heading: '3. Availability and changes', body: 'VRena may update this guide for service, safety or legal reasons. Venue availability and activities may change.' },
        { heading: '4. Governing law and contact', body: 'These terms are governed by Vietnamese law. Contact contact@vre-vietnam.com or 0981 152 315 for support.' },
      ] },
    },
  },
  vi: {
    languageLabel: 'Ngôn ngữ', closeLabel: 'Đóng', legalAriaLabel: 'Tài liệu pháp lý',
    legalNote: 'Tài liệu này được hiển thị trực tiếp trong VRena Player và không chứa liên kết điều hướng ra ngoài Mini App.',
    privacyLink: 'Chính sách quyền riêng tư', termsLink: 'Điều khoản sử dụng', eyebrow: 'CẨM NANG VRENA PLAYER',
    title: 'Khám phá VRena Player', intro: 'Xem thông tin người chơi và cách nhận hỗ trợ tại địa điểm VRena. Không cần tạo tài khoản.',
    noAccountTitle: 'Không đăng ký trực tuyến', noAccountBody: 'Mini App không yêu cầu số điện thoại, email hoặc mã người dùng Zalo của bạn.',
    venueHelpTitle: 'Hỗ trợ tại địa điểm', venueHelpBody: 'Nếu cần hỗ trợ về thành viên, đội ngũ VRena sẽ hướng dẫn trực tiếp.',
    openGuide: 'Cách sử dụng tại VRena', closeGuide: 'Ẩn hướng dẫn', guideTitle: 'Tại địa điểm VRena',
    guideSteps: ['Chọn hoạt động VR mà bạn muốn trải nghiệm.', 'Hỏi đội ngũ VRena nếu bạn cần tư vấn trò chơi hoặc thành viên.', 'Tận hưởng buổi chơi; không cần tài khoản Mini App.'],
    disclaimer: 'Mini App chỉ cung cấp thông tin và không tạo hoặc liên kết tài khoản VRena.',
    footer: 'Không cần tài khoản · Không quảng cáo · Không điều hướng ra ngoài',
    legal: {
      privacyPolicy: { title: 'Chính sách quyền riêng tư VRena Player', updated: 'Cập nhật ngày 31/10/2026', sections: [
        { heading: '1. Phạm vi', body: 'VRena Player là Mini App cung cấp thông tin do CÔNG TY TNHH VR ENTERTAINMENT vận hành. Mini App không có chức năng đăng ký tài khoản trực tuyến.' },
        { heading: '2. Dữ liệu được xử lý', body: 'Mini App không yêu cầu, nhận hoặc lưu số điện thoại, email, danh bạ, camera, micro, vị trí hoặc mã người dùng Zalo. Lựa chọn ngôn ngữ chỉ được lưu trên thiết bị của bạn.' },
        { heading: '3. Vận hành dịch vụ', body: 'Mini App không gọi dịch vụ đăng ký VRena, không hiển thị quảng cáo và không điều hướng người dùng đến trang web bên ngoài.' },
        { heading: '4. Liên hệ', body: 'Câu hỏi về quyền riêng tư có thể gửi tới CÔNG TY TNHH VR ENTERTAINMENT qua contact@vre-vietnam.com hoặc 0981 152 315.' },
      ] },
      termsAndConditions: { title: 'Điều khoản sử dụng VRena Player', updated: 'Cập nhật ngày 31/10/2026', sections: [
        { heading: '1. Dịch vụ', body: 'VRena Player cung cấp thông tin về trải nghiệm người chơi tại địa điểm. Mini App không yêu cầu hoặc tạo tài khoản.' },
        { heading: '2. Sử dụng', body: 'Hướng dẫn này cung cấp thông tin chung. Vui lòng hỏi nhân viên VRena tại địa điểm để biết thông tin hiện tại về trò chơi, buổi chơi hoặc thành viên.' },
        { heading: '3. Tính khả dụng và thay đổi', body: 'VRena có thể cập nhật hướng dẫn vì lý do dịch vụ, an toàn hoặc pháp luật. Hoạt động và tình trạng phục vụ tại địa điểm có thể thay đổi.' },
        { heading: '4. Luật áp dụng và liên hệ', body: 'Các điều khoản này được điều chỉnh bởi pháp luật Việt Nam. Liên hệ contact@vre-vietnam.com hoặc 0981 152 315 để được hỗ trợ.' },
      ] },
    },
  },
  ko: {
    languageLabel: '언어', closeLabel: '닫기', legalAriaLabel: '법적 문서',
    legalNote: '이 문서는 VRena Player 안에서 표시되며 미니앱 외부로 이동하는 링크가 없습니다.',
    privacyLink: '개인정보 처리방침', termsLink: '이용약관', eyebrow: 'VRENA PLAYER 안내',
    title: 'VRena Player 알아보기', intro: '플레이어 정보를 확인하고 VRena 매장에서 도움받는 방법을 알아보세요. 계정은 필요하지 않습니다.',
    noAccountTitle: '온라인 가입 없음', noAccountBody: '이 미니앱은 전화번호, 이메일 또는 Zalo 사용자 식별자를 요청하지 않습니다.',
    venueHelpTitle: '매장 지원', venueHelpBody: '멤버십 도움이 필요하면 VRena 직원이 현장에서 안내해 드립니다.',
    openGuide: 'VRena 이용 방법', closeGuide: '안내 숨기기', guideTitle: 'VRena 매장에서',
    guideSteps: ['체험하고 싶은 VR 활동을 선택하세요.', '게임 또는 멤버십 안내가 필요하면 VRena 직원에게 문의하세요.', '미니앱 계정 없이 세션을 즐기세요.'],
    disclaimer: '이 미니앱은 정보만 제공하며 VRena 계정을 생성하거나 연결하지 않습니다.',
    footer: '계정 불필요 · 광고 없음 · 외부 이동 없음',
    legal: {
      privacyPolicy: { title: 'VRena Player 개인정보 처리방침', updated: '2026년 10월 31일 업데이트', sections: [
        { heading: '1. 범위', body: 'VRena Player는 VR ENTERTAINMENT CO., LTD.가 운영하는 정보 제공용 미니앱이며 온라인 계정 가입 기능을 제공하지 않습니다.' },
        { heading: '2. 처리하는 데이터', body: '전화번호, 이메일, 연락처, 카메라, 마이크, 위치 또는 Zalo 사용자 식별자를 요청·수신·저장하지 않습니다. 언어 선택은 기기에만 저장됩니다.' },
        { heading: '3. 서비스 운영', body: 'VRena 가입 서비스를 호출하지 않으며 광고를 표시하거나 외부 웹사이트로 이동시키지 않습니다.' },
        { heading: '4. 문의', body: '개인정보 문의: contact@vre-vietnam.com 또는 0981 152 315.' },
      ] },
      termsAndConditions: { title: 'VRena Player 이용약관', updated: '2026년 10월 31일 업데이트', sections: [
        { heading: '1. 서비스', body: 'VRena Player는 매장 내 플레이어 경험에 관한 정보를 제공합니다. 미니앱 계정은 필요하지 않으며 생성되지 않습니다.' },
        { heading: '2. 이용', body: '일반 안내는 이 가이드를 이용하고 최신 게임, 세션 또는 멤버십 정보는 매장 직원에게 문의하세요.' },
        { heading: '3. 제공 및 변경', body: '서비스, 안전 또는 법적 이유로 안내가 변경될 수 있으며 매장 활동과 이용 가능 여부도 달라질 수 있습니다.' },
        { heading: '4. 준거법 및 문의', body: '베트남 법률이 적용됩니다. 지원: contact@vre-vietnam.com 또는 0981 152 315.' },
      ] },
    },
  },
  ja: {
    languageLabel: '言語', closeLabel: '閉じる', legalAriaLabel: '法的文書',
    legalNote: 'この文書はVRena Player内に表示され、ミニアプリ外へ移動するリンクはありません。',
    privacyLink: 'プライバシーポリシー', termsLink: '利用規約', eyebrow: 'VRENA PLAYER ガイド',
    title: 'VRena Playerを体験', intro: 'プレイヤー向け情報とVRena店舗でサポートを受ける方法をご案内します。アカウントは不要です。',
    noAccountTitle: 'オンライン登録なし', noAccountBody: '電話番号、メールアドレス、Zaloユーザー識別子を要求しません。',
    venueHelpTitle: '店舗でのサポート', venueHelpBody: 'メンバーシップについてはVRenaスタッフが店舗でご案内します。',
    openGuide: 'VRenaでの利用方法', closeGuide: 'ガイドを閉じる', guideTitle: 'VRena店舗で',
    guideSteps: ['体験したいVRアクティビティを選びます。', 'ゲームやメンバーシップについてVRenaスタッフに相談します。', 'ミニアプリアカウントなしでセッションを楽しみます。'],
    disclaimer: 'このミニアプリは情報のみを提供し、VRenaアカウントの作成や連携は行いません。',
    footer: 'アカウント不要 · 広告なし · 外部移動なし',
    legal: {
      privacyPolicy: { title: 'VRena Playerプライバシーポリシー', updated: '2026年10月31日更新', sections: [
        { heading: '1. 範囲', body: 'VRena PlayerはVR ENTERTAINMENT CO., LTD.が運営する情報提供用ミニアプリで、オンラインアカウント登録機能はありません。' },
        { heading: '2. 取り扱うデータ', body: '電話番号、メール、連絡先、カメラ、マイク、位置情報、Zaloユーザー識別子を要求・受信・保存しません。言語設定は端末内にのみ保存されます。' },
        { heading: '3. サービス運用', body: 'VRena登録サービスへの通信、広告表示、外部サイトへの誘導は行いません。' },
        { heading: '4. お問い合わせ', body: 'プライバシーに関するお問い合わせ: contact@vre-vietnam.com または 0981 152 315。' },
      ] },
      termsAndConditions: { title: 'VRena Player利用規約', updated: '2026年10月31日更新', sections: [
        { heading: '1. サービス', body: 'VRena Playerは店舗でのプレイヤー体験に関する情報を提供します。ミニアプリアカウントは不要で、作成もされません。' },
        { heading: '2. 利用', body: '一般情報は本ガイドをご覧ください。ゲーム、セッション、メンバーシップの最新情報は店舗スタッフにご確認ください。' },
        { heading: '3. 提供と変更', body: 'サービス、安全、法的理由によりガイドを更新する場合があります。店舗の活動や提供状況も変更されることがあります。' },
        { heading: '4. 準拠法と連絡先', body: 'ベトナム法を準拠法とします。サポート: contact@vre-vietnam.com または 0981 152 315。' },
      ] },
    },
  },
  fr: {
    languageLabel: 'Langue', closeLabel: 'Fermer', legalAriaLabel: 'Documents juridiques',
    legalNote: 'Ce document est affiché dans VRena Player et ne contient aucun lien quittant la Mini App.',
    privacyLink: 'Politique de confidentialité', termsLink: 'Conditions d’utilisation', eyebrow: 'GUIDE VRENA PLAYER',
    title: 'Découvrez VRena Player', intro: 'Consultez les informations joueur et découvrez comment obtenir de l’aide dans un centre VRena. Aucun compte requis.',
    noAccountTitle: 'Aucune inscription en ligne', noAccountBody: 'La Mini App ne demande ni téléphone, ni e-mail, ni identifiant utilisateur Zalo.',
    venueHelpTitle: 'Aide sur place', venueHelpBody: 'Pour toute aide concernant l’adhésion, l’équipe VRena vous accompagne sur place.',
    openGuide: 'Comment ça marche chez VRena', closeGuide: 'Masquer le guide', guideTitle: 'Dans un centre VRena',
    guideSteps: ['Choisissez l’activité VR que vous souhaitez essayer.', 'Demandez conseil à l’équipe VRena pour les jeux ou l’adhésion.', 'Profitez de votre session sans compte Mini App.'],
    disclaimer: 'Cette Mini App fournit uniquement des informations et ne crée ni ne lie de compte VRena.',
    footer: 'Aucun compte · Aucune publicité · Aucune navigation externe',
    legal: {
      privacyPolicy: { title: 'Politique de confidentialité VRena Player', updated: 'Mise à jour le 31 octobre 2026', sections: [
        { heading: '1. Champ d’application', body: 'VRena Player est une Mini App d’information exploitée par VR ENTERTAINMENT CO., LTD. Elle ne propose aucune inscription en ligne.' },
        { heading: '2. Données traitées', body: 'La Mini App ne demande, ne reçoit et ne conserve ni téléphone, e-mail, contacts, caméra, microphone, localisation ou identifiant Zalo. Le choix de langue reste uniquement sur votre appareil.' },
        { heading: '3. Fonctionnement', body: 'La Mini App n’appelle pas le service d’inscription VRena, n’affiche pas de publicité et ne redirige pas vers un site externe.' },
        { heading: '4. Contact', body: 'Questions de confidentialité : contact@vre-vietnam.com ou 0981 152 315.' },
      ] },
      termsAndConditions: { title: 'Conditions d’utilisation VRena Player', updated: 'Mise à jour le 31 octobre 2026', sections: [
        { heading: '1. Service', body: 'VRena Player fournit des informations sur l’expérience joueur en centre. Aucun compte Mini App n’est requis ni créé.' },
        { heading: '2. Utilisation', body: 'Consultez ce guide pour les informations générales et demandez à l’équipe sur place les informations actuelles sur les jeux, sessions ou adhésions.' },
        { heading: '3. Disponibilité et modifications', body: 'VRena peut mettre à jour ce guide pour des raisons de service, de sécurité ou légales. Les activités et disponibilités peuvent changer.' },
        { heading: '4. Droit applicable et contact', body: 'Le droit vietnamien s’applique. Assistance : contact@vre-vietnam.com ou 0981 152 315.' },
      ] },
    },
  },
  de: {
    languageLabel: 'Sprache', closeLabel: 'Schließen', legalAriaLabel: 'Rechtliche Dokumente',
    legalNote: 'Dieses Dokument wird in VRena Player angezeigt und enthält keinen Link außerhalb der Mini App.',
    privacyLink: 'Datenschutzerklärung', termsLink: 'Nutzungsbedingungen', eyebrow: 'VRENA PLAYER GUIDE',
    title: 'VRena Player entdecken', intro: 'Spielerinformationen und Hilfe vor Ort bei VRena. Kein Konto erforderlich.',
    noAccountTitle: 'Keine Online-Registrierung', noAccountBody: 'Die Mini App fragt weder Telefonnummer, E-Mail noch Zalo-Nutzerkennung ab.',
    venueHelpTitle: 'Hilfe vor Ort', venueHelpBody: 'Bei Fragen zur Mitgliedschaft hilft das VRena-Team persönlich vor Ort.',
    openGuide: 'So funktioniert es bei VRena', closeGuide: 'Guide ausblenden', guideTitle: 'Bei VRena vor Ort',
    guideSteps: ['Wähle die gewünschte VR-Aktivität.', 'Frage das VRena-Team nach Spiel- oder Mitgliedschaftsberatung.', 'Genieße deine Session ohne Mini-App-Konto.'],
    disclaimer: 'Diese Mini App informiert nur und erstellt oder verknüpft kein VRena-Konto.',
    footer: 'Kein Konto · Keine Werbung · Keine externe Navigation',
    legal: {
      privacyPolicy: { title: 'VRena Player Datenschutzerklärung', updated: 'Aktualisiert am 31. Oktober 2026', sections: [
        { heading: '1. Geltungsbereich', body: 'VRena Player ist eine Informations-Mini-App von VR ENTERTAINMENT CO., LTD. Eine Online-Kontoregistrierung wird nicht angeboten.' },
        { heading: '2. Verarbeitete Daten', body: 'Telefonnummer, E-Mail, Kontakte, Kamera, Mikrofon, Standort und Zalo-Nutzerkennung werden weder angefragt noch empfangen oder gespeichert. Die Sprachauswahl bleibt nur auf deinem Gerät.' },
        { heading: '3. Betrieb', body: 'Die Mini App ruft keinen VRena-Registrierungsdienst auf, zeigt keine Werbung und leitet nicht auf externe Websites weiter.' },
        { heading: '4. Kontakt', body: 'Datenschutzfragen: contact@vre-vietnam.com oder 0981 152 315.' },
      ] },
      termsAndConditions: { title: 'VRena Player Nutzungsbedingungen', updated: 'Aktualisiert am 31. Oktober 2026', sections: [
        { heading: '1. Dienst', body: 'VRena Player informiert über das Spielerlebnis vor Ort. Ein Mini-App-Konto ist nicht erforderlich und wird nicht erstellt.' },
        { heading: '2. Nutzung', body: 'Nutze den Guide für allgemeine Informationen und frage das Team vor Ort nach aktuellen Spielen, Sessions oder Mitgliedschaften.' },
        { heading: '3. Verfügbarkeit und Änderungen', body: 'VRena kann den Guide aus Service-, Sicherheits- oder Rechtsgründen aktualisieren. Aktivitäten und Verfügbarkeit vor Ort können sich ändern.' },
        { heading: '4. Recht und Kontakt', body: 'Es gilt vietnamesisches Recht. Support: contact@vre-vietnam.com oder 0981 152 315.' },
      ] },
    },
  },
  it: {
    languageLabel: 'Lingua', closeLabel: 'Chiudi', legalAriaLabel: 'Documenti legali',
    legalNote: 'Questo documento è mostrato in VRena Player e non contiene link che portano fuori dalla Mini App.',
    privacyLink: 'Informativa sulla privacy', termsLink: 'Termini di utilizzo', eyebrow: 'GUIDA VRENA PLAYER',
    title: 'Scopri VRena Player', intro: 'Consulta le informazioni per i giocatori e scopri come ricevere assistenza in una sede VRena. Nessun account richiesto.',
    noAccountTitle: 'Nessuna registrazione online', noAccountBody: 'La Mini App non richiede telefono, e-mail o identificativo utente Zalo.',
    venueHelpTitle: 'Assistenza in sede', venueHelpBody: 'Per assistenza sull’iscrizione, il team VRena ti aiuta di persona.',
    openGuide: 'Come funziona da VRena', closeGuide: 'Nascondi la guida', guideTitle: 'In una sede VRena',
    guideSteps: ['Scegli l’attività VR che vuoi provare.', 'Chiedi al team VRena consigli su giochi o iscrizione.', 'Goditi la sessione senza un account Mini App.'],
    disclaimer: 'Questa Mini App fornisce solo informazioni e non crea né collega account VRena.',
    footer: 'Nessun account · Nessuna pubblicità · Nessuna navigazione esterna',
    legal: {
      privacyPolicy: { title: 'Informativa sulla privacy VRena Player', updated: 'Aggiornata il 31 ottobre 2026', sections: [
        { heading: '1. Ambito', body: 'VRena Player è una Mini App informativa gestita da VR ENTERTAINMENT CO., LTD. e non offre registrazione online.' },
        { heading: '2. Dati trattati', body: 'La Mini App non richiede, riceve o conserva telefono, e-mail, contatti, fotocamera, microfono, posizione o identificativo Zalo. La lingua scelta resta solo sul dispositivo.' },
        { heading: '3. Funzionamento', body: 'La Mini App non chiama il servizio di registrazione VRena, non mostra pubblicità e non rimanda a siti esterni.' },
        { heading: '4. Contatti', body: 'Domande sulla privacy: contact@vre-vietnam.com o 0981 152 315.' },
      ] },
      termsAndConditions: { title: 'Termini di utilizzo VRena Player', updated: 'Aggiornati il 31 ottobre 2026', sections: [
        { heading: '1. Servizio', body: 'VRena Player fornisce informazioni sull’esperienza in sede. Non richiede né crea un account Mini App.' },
        { heading: '2. Utilizzo', body: 'Usa la guida per informazioni generali e chiedi al team in sede i dettagli aggiornati su giochi, sessioni o iscrizioni.' },
        { heading: '3. Disponibilità e modifiche', body: 'VRena può aggiornare la guida per motivi di servizio, sicurezza o legge. Attività e disponibilità possono cambiare.' },
        { heading: '4. Legge e contatti', body: 'Si applica la legge vietnamita. Assistenza: contact@vre-vietnam.com o 0981 152 315.' },
      ] },
    },
  },
}
