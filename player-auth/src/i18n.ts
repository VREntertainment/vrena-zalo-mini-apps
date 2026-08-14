import type { PlayerAuthErrorCode } from './api'

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
  memberEyebrow: string
  readyTitle: string
  readyGreeting: string
  defaultPlayer: string
  memberPhone: string
  profileBenefits: string
  profileBenefitsBody: string
  registerEyebrow: string
  registerTitle: string
  registerIntro: string
  phoneWhy: string
  phoneWhyBody: string
  consentBeforePrivacy: string
  consentBetweenLegal: string
  consentAfterTerms: string
  registering: string
  registerWithZalo: string
  continueWithoutRegistering: string
  welcomeTitle: string
  welcomeBody: string
  identifyTitle: string
  identifyBody: string
  optionalTitle: string
  optionalBody: string
  startRegistration: string
  registrationDisclaimer: string
  footer: string
  errors: Record<PlayerAuthErrorCode, string>
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
    languageLabel: 'Language',
    closeLabel: 'Close',
    legalNote: 'This document is displayed inside VRena Player and contains no link that navigates outside the Mini App.',
    legalAriaLabel: 'Legal documents',
    privacyLink: 'Privacy Policy',
    termsLink: 'Terms of Use',
    memberEyebrow: 'VRENA MEMBER',
    readyTitle: 'Your profile is ready',
    readyGreeting: 'Hello {name}. Your member profile has been securely recognized in VRena Player.',
    defaultPlayer: 'Player',
    memberPhone: 'Member phone number',
    profileBenefits: 'Profile benefits',
    profileBenefitsBody: 'Your profile helps VRena recognize you and protect your activity history when you use services at a VRena venue.',
    registerEyebrow: 'NEW PROFILE REGISTRATION',
    registerTitle: 'Become a member',
    registerIntro: 'Only for people without an existing VRena account. This Mini App does not use this function to link an existing account.',
    phoneWhy: 'Why is a phone number needed?',
    phoneWhyBody: 'VRena uses your Zalo phone number to create, protect and identify a new member profile. Email is optional.',
    consentBeforePrivacy: 'I voluntarily register a new profile and agree that VRena may receive and use my Zalo phone number for the purpose above. I have read the ',
    consentBetweenLegal: ' and agree to the ',
    consentAfterTerms: '.',
    registering: 'Registering…',
    registerWithZalo: 'Register with Zalo phone number',
    continueWithoutRegistering: 'Not now, continue viewing information',
    welcomeTitle: 'Your VRena player profile',
    welcomeBody: 'Explore member-profile benefits. You can view information in this Mini App without signing in or sharing your phone number.',
    identifyTitle: 'Member recognition',
    identifyBody: 'One profile helps VRena recognize you when you join activities at a VRena venue.',
    optionalTitle: 'Registration is optional',
    optionalBody: 'Phone permission is requested only after you open new-profile registration and confirm your consent.',
    startRegistration: 'Register as a VRena member',
    registrationDisclaimer: 'For new profiles only. Declining registration does not interrupt other Mini App content.',
    footer: 'Protected data · No advertising · No external navigation',
    errors: {
      zaloTimeout: 'Zalo is not responding. Close and reopen the Mini App, then try again.',
      sessionUnavailable: 'A secure Zalo session could not be established. Please reopen the Mini App.',
      serverTimeout: 'VRena is taking too long to respond. Please try again.',
      networkUnavailable: 'VRena could not be reached. Check your connection and try again.',
      serviceUnavailable: 'VRena registration is temporarily unavailable. Please try again later.',
      permissionTimeout: 'Zalo did not respond to the phone-permission request. Please try again.',
      permissionDenied: 'Phone permission was not granted. You can still view information in the Mini App.',
      phoneTimeout: 'Zalo did not respond to the phone-number request. Please try again.',
      phoneVerificationUnavailable: 'Zalo phone verification is temporarily unavailable. Please try again later.',
      tooManyAttempts: 'Too many attempts. Please wait one minute before trying again.',
      existingAccount: 'This phone number already has a VRena profile. Please ask VRena staff at the venue for help.',
      identityMismatch: 'The Zalo session does not match this registration. Close and reopen the Mini App.',
      revokedAccount: 'This Zalo profile has been revoked. Please contact VRena for support.',
      consentRequired: 'Please accept the Privacy Policy and Terms of Use before registering.',
      unknown: 'The VRena profile could not be registered. Please try again.',
    },
    legal: {
      privacyPolicy: {
        title: 'VRena Player Privacy Policy',
        updated: 'Updated 10 August 2026',
        sections: [
          { heading: '1. Scope', body: 'This policy explains how VR ENTERTAINMENT CO., LTD. processes personal information when a user voluntarily registers a new player profile in VRena Player.' },
          { heading: '2. Data processed', body: 'With your permission, VRena receives your Zalo phone number, Zalo user identifier and verification data required to create a new profile. Verification data is used only during verification. The Mini App does not request contacts, camera, microphone or location.' },
          { heading: '3. Purpose', body: 'The data is used to create and identify a new player profile, protect it, prevent fraud and support the user. Email is not required in this registration flow.' },
          { heading: '4. Consent and choice', body: 'You may view information and benefits without registering or sharing your phone number. Refusal only stops new-profile registration. You may withdraw consent or request access, correction or deletion as permitted by law.' },
          { heading: '5. Data sharing', body: 'VRena does not sell or rent personal data. Data is shared only with service providers required for operation and security, or with authorities when required by law.' },
          { heading: '6. Retention and security', body: 'VRena applies appropriate technical and organizational safeguards. Data is retained only as long as necessary for the purposes above or as required by law.' },
          { heading: '7. Contact', body: 'For personal-data requests, contact VR ENTERTAINMENT CO., LTD. at contact@vre-vietnam.com or 0981 152 315.' },
        ],
      },
      termsAndConditions: {
        title: 'VRena Player Terms of Use',
        updated: 'Updated 10 August 2026',
        sections: [
          { heading: '1. Scope', body: 'VRena Player is a Mini App of VR ENTERTAINMENT CO., LTD. Information and benefits are available without signing in. A user may voluntarily create a new player profile with a Zalo phone number; email is optional.' },
          { heading: '2. Permission and data', body: 'The Mini App requests phone permission only after the user opens member registration, reads the stated purpose, accepts these documents and chooses to register with a Zalo phone number.' },
          { heading: '3. User choice', body: 'You may refuse phone permission and continue viewing information. Refusal stops only new-profile registration and does not imply consent for another purpose.' },
          { heading: '4. User accounts', body: 'This function creates only a new player profile and does not link a phone number to an existing VRena account. Existing users should ask VRena staff at the venue for support.' },
          { heading: '5. Security and sharing', body: 'VRena uses reasonable safeguards, does not sell or rent personal data, and shares it only when required for operation or by law.' },
          { heading: '6. Changes and availability', body: 'VRena may update the Mini App or these terms for service, safety or legal reasons. The service may be temporarily unavailable for maintenance, incident response or user protection.' },
          { heading: '7. Governing law and contact', body: 'These terms are governed by Vietnamese law. Contact contact@vre-vietnam.com or 0981 152 315 for support.' },
        ],
      },
    },
  },
  vi: {
    languageLabel: 'Ngôn ngữ', closeLabel: 'Đóng',
    legalNote: 'Tài liệu này được hiển thị trực tiếp trong VRena Player và không chứa liên kết điều hướng ra ngoài Mini App.',
    legalAriaLabel: 'Tài liệu pháp lý', privacyLink: 'Chính sách quyền riêng tư', termsLink: 'Điều khoản sử dụng',
    memberEyebrow: 'THÀNH VIÊN VRENA', readyTitle: 'Hồ sơ đã sẵn sàng',
    readyGreeting: 'Xin chào {name}. Hồ sơ thành viên của bạn đã được nhận diện an toàn trong VRena Player.', defaultPlayer: 'Người chơi',
    memberPhone: 'Số điện thoại thành viên', profileBenefits: 'Quyền lợi hồ sơ',
    profileBenefitsBody: 'Hồ sơ giúp VRena nhận diện thành viên và bảo vệ lịch sử hoạt động khi bạn sử dụng dịch vụ tại địa điểm VRena.',
    registerEyebrow: 'ĐĂNG KÝ HỒ SƠ MỚI', registerTitle: 'Đăng ký thành viên',
    registerIntro: 'Chỉ dành cho người chưa có tài khoản VRena. Mini App không dùng chức năng này để liên kết tài khoản có sẵn.',
    phoneWhy: 'Vì sao cần số điện thoại?', phoneWhyBody: 'VRena dùng số điện thoại Zalo để tạo, bảo vệ và nhận diện hồ sơ thành viên mới. Email không bắt buộc.',
    consentBeforePrivacy: 'Tôi tự nguyện đăng ký hồ sơ mới và đồng ý cho VRena nhận, sử dụng số điện thoại Zalo cho mục đích nêu trên. Tôi đã đọc ',
    consentBetweenLegal: ' và đồng ý với ', consentAfterTerms: '.', registering: 'Đang đăng ký…',
    registerWithZalo: 'Đăng ký bằng số điện thoại Zalo', continueWithoutRegistering: 'Để sau, tiếp tục xem thông tin',
    welcomeTitle: 'Hồ sơ người chơi VRena', welcomeBody: 'Khám phá quyền lợi hồ sơ thành viên. Bạn có thể xem thông tin trong Mini App mà không cần đăng nhập hoặc cấp số điện thoại.',
    identifyTitle: 'Nhận diện thành viên', identifyBody: 'Một hồ sơ thống nhất giúp VRena nhận diện bạn khi tham gia hoạt động tại địa điểm VRena.',
    optionalTitle: 'Đăng ký có lựa chọn', optionalBody: 'Quyền số điện thoại chỉ được hỏi sau khi bạn chủ động mở phần đăng ký hồ sơ mới và xác nhận đồng ý.',
    startRegistration: 'Đăng ký thành viên VRena', registrationDisclaimer: 'Dành cho hồ sơ mới. Từ chối đăng ký không làm gián đoạn nội dung khác của Mini App.',
    footer: 'Dữ liệu được bảo vệ · Không quảng cáo · Không điều hướng ra ngoài',
    errors: {
      zaloTimeout: 'Zalo chưa phản hồi. Vui lòng đóng và mở lại Mini App, sau đó thử lại.', sessionUnavailable: 'Không thể bắt đầu phiên Zalo an toàn. Vui lòng mở lại Mini App.',
      serverTimeout: 'VRena phản hồi quá chậm. Vui lòng thử lại.', networkUnavailable: 'Không thể kết nối với VRena. Vui lòng kiểm tra mạng và thử lại.',
      serviceUnavailable: 'Dịch vụ đăng ký VRena đang tạm thời gián đoạn. Vui lòng thử lại sau.', permissionTimeout: 'Zalo chưa phản hồi yêu cầu quyền số điện thoại. Vui lòng thử lại.',
      permissionDenied: 'Bạn chưa cấp quyền số điện thoại. Bạn vẫn có thể xem thông tin trong Mini App.', phoneTimeout: 'Zalo chưa phản hồi yêu cầu số điện thoại. Vui lòng thử lại.',
      phoneVerificationUnavailable: 'Dịch vụ xác minh số điện thoại Zalo đang tạm thời gián đoạn. Vui lòng thử lại sau.', tooManyAttempts: 'Bạn đã thử quá nhiều lần. Vui lòng chờ một phút rồi thử lại.',
      existingAccount: 'Số điện thoại này đã có hồ sơ VRena. Vui lòng liên hệ nhân viên VRena tại quầy để được hỗ trợ.', identityMismatch: 'Phiên Zalo không khớp với đăng ký này. Vui lòng đóng và mở lại Mini App.',
      revokedAccount: 'Hồ sơ Zalo này đã bị thu hồi. Vui lòng liên hệ VRena để được hỗ trợ.', consentRequired: 'Vui lòng đồng ý với Chính sách quyền riêng tư và Điều khoản sử dụng trước khi đăng ký.',
      unknown: 'Không thể đăng ký hồ sơ VRena. Vui lòng thử lại.',
    },
    legal: {
      privacyPolicy: {
        title: 'Chính sách quyền riêng tư VRena Player', updated: 'Cập nhật ngày 10/08/2026',
        sections: [
          { heading: '1. Phạm vi', body: 'Chính sách này giải thích cách CÔNG TY TNHH VR ENTERTAINMENT xử lý thông tin cá nhân khi người dùng tự nguyện đăng ký một hồ sơ người chơi mới trong Mini App VRena Player.' },
          { heading: '2. Dữ liệu được xử lý', body: 'Khi người dùng chủ động cấp quyền, VRena nhận số điện thoại Zalo, mã người dùng Zalo và dữ liệu xác thực cần thiết để tạo hồ sơ mới. Dữ liệu xác thực chỉ được xử lý trong quá trình xác minh. Mini App không yêu cầu vị trí, danh bạ, camera hoặc micro.' },
          { heading: '3. Mục đích sử dụng', body: 'Dữ liệu được dùng để tạo và nhận diện hồ sơ người chơi mới, bảo vệ hồ sơ, phòng chống gian lận và hỗ trợ người dùng. Email không bắt buộc trong luồng đăng ký này.' },
          { heading: '4. Sự đồng ý và lựa chọn', body: 'Người dùng có thể xem thông tin và quyền lợi mà không cần đăng ký hoặc cấp số điện thoại. Từ chối chỉ dừng đăng ký hồ sơ mới. Người dùng có thể rút lại sự đồng ý hoặc yêu cầu truy cập, chỉnh sửa hay xóa dữ liệu theo quy định.' },
          { heading: '5. Chia sẻ dữ liệu', body: 'VRena không bán hoặc cho thuê dữ liệu cá nhân. Dữ liệu chỉ được chia sẻ với nhà cung cấp dịch vụ cần thiết cho vận hành, bảo mật hoặc với cơ quan có thẩm quyền khi pháp luật yêu cầu.' },
          { heading: '6. Lưu giữ và bảo mật', body: 'VRena áp dụng biện pháp kỹ thuật và tổ chức phù hợp. Dữ liệu chỉ được lưu trong thời gian cần thiết cho mục đích nêu trên hoặc theo yêu cầu pháp luật.' },
          { heading: '7. Liên hệ', body: 'Yêu cầu về dữ liệu cá nhân có thể gửi tới CÔNG TY TNHH VR ENTERTAINMENT qua contact@vre-vietnam.com hoặc 0981 152 315.' },
        ],
      },
      termsAndConditions: {
        title: 'Điều khoản sử dụng VRena Player', updated: 'Cập nhật ngày 10/08/2026',
        sections: [
          { heading: '1. Phạm vi', body: 'VRena Player là Mini App của CÔNG TY TNHH VR ENTERTAINMENT. Người dùng có thể xem thông tin mà không cần đăng nhập và có thể tự nguyện tạo hồ sơ mới bằng số điện thoại Zalo; email không bắt buộc.' },
          { heading: '2. Quyền và dữ liệu', body: 'Mini App chỉ yêu cầu quyền số điện thoại sau khi người dùng mở phần đăng ký, đọc mục đích sử dụng, đồng ý với tài liệu này và chọn đăng ký bằng số điện thoại Zalo.' },
          { heading: '3. Lựa chọn của người dùng', body: 'Người dùng có thể từ chối cấp số điện thoại và vẫn xem thông tin. Việc từ chối chỉ dừng đăng ký hồ sơ mới và không đồng nghĩa với chấp thuận mục đích khác.' },
          { heading: '4. Tài khoản người dùng', body: 'Chức năng này chỉ tạo hồ sơ mới và không liên kết số điện thoại với tài khoản VRena có sẵn. Người đã có tài khoản có thể liên hệ nhân viên VRena tại địa điểm để được hỗ trợ.' },
          { heading: '5. Bảo mật và chia sẻ', body: 'VRena áp dụng biện pháp hợp lý, không bán hoặc cho thuê dữ liệu cá nhân và chỉ chia sẻ khi cần thiết cho vận hành hoặc theo yêu cầu pháp luật.' },
          { heading: '6. Thay đổi và gián đoạn', body: 'VRena có thể cập nhật Mini App hoặc điều khoản vì lý do dịch vụ, an toàn hoặc pháp luật. Dịch vụ có thể tạm ngừng để bảo trì, xử lý sự cố hoặc bảo vệ người dùng.' },
          { heading: '7. Luật áp dụng và liên hệ', body: 'Các điều khoản này được điều chỉnh bởi pháp luật Việt Nam. Liên hệ contact@vre-vietnam.com hoặc 0981 152 315 để được hỗ trợ.' },
        ],
      },
    },
  },
  ko: {
    languageLabel: '언어', closeLabel: '닫기', legalNote: '이 문서는 VRena Player 안에서 표시되며 미니앱 외부로 이동하는 링크가 없습니다.', legalAriaLabel: '법적 문서', privacyLink: '개인정보 처리방침', termsLink: '이용약관',
    memberEyebrow: 'VRENA 회원', readyTitle: '프로필이 준비되었습니다', readyGreeting: '안녕하세요, {name}님. VRena Player에서 회원 프로필을 안전하게 확인했습니다.', defaultPlayer: '플레이어', memberPhone: '회원 전화번호',
    profileBenefits: '프로필 혜택', profileBenefitsBody: 'VRena 매장에서 서비스를 이용할 때 회원을 식별하고 활동 기록을 보호하는 데 사용됩니다.',
    registerEyebrow: '새 프로필 등록', registerTitle: '회원 등록', registerIntro: '기존 VRena 계정이 없는 분만 이용할 수 있습니다. 이 미니앱은 기존 계정 연결에 이 기능을 사용하지 않습니다.',
    phoneWhy: '전화번호가 왜 필요한가요?', phoneWhyBody: 'VRena는 Zalo 전화번호로 새 회원 프로필을 생성·보호·식별합니다. 이메일은 선택 사항입니다.',
    consentBeforePrivacy: '새 프로필 등록을 자발적으로 신청하며 위 목적을 위해 VRena가 Zalo 전화번호를 수신하고 사용하는 데 동의합니다. ', consentBetweenLegal: '을 읽었으며 ', consentAfterTerms: '에 동의합니다.',
    registering: '등록 중…', registerWithZalo: 'Zalo 전화번호로 등록', continueWithoutRegistering: '나중에, 정보 계속 보기',
    welcomeTitle: 'VRena 플레이어 프로필', welcomeBody: '회원 프로필 혜택을 확인하세요. 로그인하거나 전화번호를 제공하지 않아도 미니앱의 정보를 볼 수 있습니다.',
    identifyTitle: '회원 식별', identifyBody: '하나의 프로필로 VRena 매장 활동 참여 시 회원을 확인할 수 있습니다.', optionalTitle: '선택적 등록', optionalBody: '새 프로필 등록을 직접 열고 동의한 후에만 전화번호 권한을 요청합니다.',
    startRegistration: 'VRena 회원 등록', registrationDisclaimer: '새 프로필 전용입니다. 등록을 거부해도 다른 미니앱 콘텐츠 이용에는 영향이 없습니다.', footer: '데이터 보호 · 광고 없음 · 외부 이동 없음',
    errors: {
      zaloTimeout: 'Zalo가 응답하지 않습니다. 미니앱을 닫았다가 다시 열어 주세요.', sessionUnavailable: '안전한 Zalo 세션을 시작할 수 없습니다. 미니앱을 다시 열어 주세요.', serverTimeout: 'VRena 응답이 지연되고 있습니다. 다시 시도해 주세요.',
      networkUnavailable: 'VRena에 연결할 수 없습니다. 네트워크를 확인해 주세요.', serviceUnavailable: 'VRena 등록 서비스를 일시적으로 이용할 수 없습니다.', permissionTimeout: 'Zalo가 전화번호 권한 요청에 응답하지 않았습니다.', permissionDenied: '전화번호 권한이 허용되지 않았습니다. 정보는 계속 볼 수 있습니다.',
      phoneTimeout: 'Zalo가 전화번호 요청에 응답하지 않았습니다.', phoneVerificationUnavailable: 'Zalo 전화번호 확인 서비스를 일시적으로 이용할 수 없습니다.', tooManyAttempts: '시도 횟수가 너무 많습니다. 1분 후 다시 시도해 주세요.', existingAccount: '이 전화번호에는 이미 VRena 프로필이 있습니다. 매장 직원에게 문의해 주세요.',
      identityMismatch: 'Zalo 세션과 등록 사용자가 일치하지 않습니다. 미니앱을 다시 열어 주세요.', revokedAccount: '이 Zalo 프로필은 해지되었습니다. VRena에 문의해 주세요.', consentRequired: '등록 전에 개인정보 처리방침과 이용약관에 동의해 주세요.', unknown: 'VRena 프로필을 등록할 수 없습니다. 다시 시도해 주세요.',
    },
    legal: {
      privacyPolicy: { title: 'VRena Player 개인정보 처리방침', updated: '2026년 8월 10일 업데이트', sections: [
        { heading: '1. 적용 범위', body: '본 방침은 사용자가 VRena Player에서 새 플레이어 프로필을 자발적으로 등록할 때 VR ENTERTAINMENT CO., LTD.가 개인정보를 처리하는 방법을 설명합니다.' },
        { heading: '2. 처리 데이터', body: '동의 시 새 프로필 생성에 필요한 Zalo 전화번호, Zalo 사용자 식별자 및 인증 데이터를 수신합니다. 인증 데이터는 확인 과정에서만 사용하며 연락처, 카메라, 마이크 또는 위치는 요청하지 않습니다.' },
        { heading: '3. 이용 목적', body: '새 프로필 생성 및 식별, 보호, 부정 사용 방지와 사용자 지원에 사용합니다. 이메일은 필수가 아닙니다.' },
        { heading: '4. 동의와 선택', body: '등록 또는 전화번호 제공 없이 정보를 볼 수 있습니다. 거부하면 새 프로필 등록만 중단됩니다. 법률에 따라 동의 철회, 열람, 수정 또는 삭제를 요청할 수 있습니다.' },
        { heading: '5. 데이터 공유', body: '개인정보를 판매하거나 대여하지 않습니다. 운영·보안에 필요한 서비스 제공자 또는 법률상 요구되는 기관과만 공유합니다.' },
        { heading: '6. 보관과 보안', body: '적절한 기술적·관리적 보호조치를 적용하며 목적 달성 또는 법적 의무에 필요한 기간만 보관합니다.' },
        { heading: '7. 문의', body: '개인정보 문의: contact@vre-vietnam.com 또는 0981 152 315.' },
      ] },
      termsAndConditions: { title: 'VRena Player 이용약관', updated: '2026년 8월 10일 업데이트', sections: [
        { heading: '1. 적용 범위', body: 'VRena Player는 VR ENTERTAINMENT CO., LTD.의 미니앱입니다. 로그인 없이 정보를 볼 수 있고 Zalo 전화번호로 새 프로필을 자발적으로 만들 수 있습니다.' },
        { heading: '2. 권한과 데이터', body: '등록 화면을 열고 목적과 문서를 확인한 뒤 동의하고 등록을 선택한 경우에만 전화번호 권한을 요청합니다.' },
        { heading: '3. 사용자 선택', body: '전화번호 권한을 거부해도 정보를 계속 볼 수 있으며 새 프로필 등록만 중단됩니다.' },
        { heading: '4. 사용자 계정', body: '이 기능은 새 프로필만 만들며 기존 VRena 계정과 연결하지 않습니다. 기존 사용자는 매장 직원에게 문의해 주세요.' },
        { heading: '5. 보안과 공유', body: '합리적인 보호조치를 적용하고 개인정보를 판매·대여하지 않으며 운영 또는 법률상 필요한 경우에만 공유합니다.' },
        { heading: '6. 변경과 이용 가능성', body: '서비스, 안전 또는 법적 사유로 미니앱과 약관을 변경할 수 있으며 유지보수나 사용자 보호를 위해 일시 중단될 수 있습니다.' },
        { heading: '7. 준거법과 문의', body: '베트남 법률이 적용됩니다. 문의: contact@vre-vietnam.com 또는 0981 152 315.' },
      ] },
    },
  },
  ja: {
    languageLabel: '言語', closeLabel: '閉じる', legalNote: 'この文書はVRena Player内に表示され、ミニアプリ外へ移動するリンクは含まれません。', legalAriaLabel: '法的文書', privacyLink: 'プライバシーポリシー', termsLink: '利用規約',
    memberEyebrow: 'VRENAメンバー', readyTitle: 'プロフィールの準備ができました', readyGreeting: 'こんにちは、{name}さん。VRena Playerでメンバープロフィールを安全に確認しました。', defaultPlayer: 'プレイヤー', memberPhone: '会員電話番号',
    profileBenefits: 'プロフィールの特典', profileBenefitsBody: 'VRena店舗でサービスを利用する際の会員識別と活動履歴の保護に役立ちます。',
    registerEyebrow: '新規プロフィール登録', registerTitle: 'メンバー登録', registerIntro: '既存のVRenaアカウントをお持ちでない方専用です。この機能は既存アカウントの連携には使用しません。',
    phoneWhy: 'なぜ電話番号が必要ですか？', phoneWhyBody: 'Zalo電話番号は、新しい会員プロフィールの作成・保護・識別に使用します。メールは任意です。',
    consentBeforePrivacy: '新しいプロフィールへの登録を自発的に申し込み、上記目的でVRenaがZalo電話番号を受領・使用することに同意します。', consentBetweenLegal: 'を読み、', consentAfterTerms: 'に同意します。',
    registering: '登録中…', registerWithZalo: 'Zalo電話番号で登録', continueWithoutRegistering: '後で、情報を引き続き見る',
    welcomeTitle: 'VRenaプレイヤープロフィール', welcomeBody: '会員プロフィールの特典をご覧ください。ログインや電話番号の共有なしで情報を閲覧できます。',
    identifyTitle: '会員識別', identifyBody: '1つのプロフィールでVRena店舗のアクティビティ参加時に会員を識別できます。', optionalTitle: '登録は任意です', optionalBody: '新規登録を開いて同意した後にのみ電話番号の権限を求めます。',
    startRegistration: 'VRenaメンバーに登録', registrationDisclaimer: '新規プロフィール専用です。登録を断っても他のコンテンツには影響しません。', footer: 'データ保護 · 広告なし · 外部遷移なし',
    errors: {
      zaloTimeout: 'Zaloが応答していません。ミニアプリを閉じて再度開いてください。', sessionUnavailable: '安全なZaloセッションを開始できません。ミニアプリを再度開いてください。', serverTimeout: 'VRenaの応答に時間がかかっています。再試行してください。', networkUnavailable: 'VRenaに接続できません。ネットワークを確認してください。',
      serviceUnavailable: 'VRena登録サービスは一時的に利用できません。', permissionTimeout: 'Zaloが電話番号権限の要求に応答しませんでした。', permissionDenied: '電話番号の権限が許可されていません。情報は引き続き閲覧できます。', phoneTimeout: 'Zaloが電話番号要求に応答しませんでした。',
      phoneVerificationUnavailable: 'Zalo電話番号確認は一時的に利用できません。', tooManyAttempts: '試行回数が多すぎます。1分後に再試行してください。', existingAccount: 'この電話番号には既にVRenaプロフィールがあります。店舗スタッフにお問い合わせください。', identityMismatch: 'Zaloセッションが登録ユーザーと一致しません。ミニアプリを再度開いてください。',
      revokedAccount: 'このZaloプロフィールは失効しています。VRenaにお問い合わせください。', consentRequired: '登録前にプライバシーポリシーと利用規約に同意してください。', unknown: 'VRenaプロフィールを登録できません。再試行してください。',
    },
    legal: {
      privacyPolicy: { title: 'VRena Player プライバシーポリシー', updated: '2026年8月10日更新', sections: [
        { heading: '1. 適用範囲', body: '本方針は、VRena Playerで新しいプロフィールを任意登録する際にVR ENTERTAINMENT CO., LTD.が個人情報を処理する方法を説明します。' },
        { heading: '2. 処理するデータ', body: '同意に基づき、Zalo電話番号、Zaloユーザー識別子、プロフィール作成に必要な確認データを受領します。確認データは確認時のみ使用し、連絡先、カメラ、マイク、位置情報は求めません。' },
        { heading: '3. 利用目的', body: '新しいプロフィールの作成・識別・保護、不正防止、利用者支援に使用します。メールは必須ではありません。' },
        { heading: '4. 同意と選択', body: '登録や電話番号の提供なしで情報を閲覧できます。拒否すると新規登録のみ停止します。法令に従い、同意撤回、閲覧、訂正、削除を請求できます。' },
        { heading: '5. データ共有', body: '個人情報を販売・貸与しません。運営・安全に必要な事業者または法令上必要な機関とのみ共有します。' },
        { heading: '6. 保管と安全', body: '適切な技術的・組織的対策を講じ、目的または法的義務に必要な期間のみ保管します。' },
        { heading: '7. お問い合わせ', body: '個人情報に関する連絡先：contact@vre-vietnam.com または 0981 152 315。' },
      ] },
      termsAndConditions: { title: 'VRena Player 利用規約', updated: '2026年8月10日更新', sections: [
        { heading: '1. 適用範囲', body: 'VRena PlayerはVR ENTERTAINMENT CO., LTD.のミニアプリです。ログインなしで情報を閲覧し、Zalo電話番号で新しいプロフィールを任意作成できます。' },
        { heading: '2. 権限とデータ', body: '登録画面を開き、目的と文書を確認して同意し、登録を選択した後にのみ電話番号権限を求めます。' },
        { heading: '3. 利用者の選択', body: '電話番号権限を拒否しても情報を閲覧でき、新規登録のみ停止します。' },
        { heading: '4. ユーザーアカウント', body: 'この機能は新規プロフィールのみ作成し、既存VRenaアカウントとは連携しません。既存ユーザーは店舗スタッフへお問い合わせください。' },
        { heading: '5. 安全と共有', body: '合理的な保護措置を講じ、個人情報を販売・貸与せず、運営または法令上必要な場合のみ共有します。' },
        { heading: '6. 変更と提供', body: 'サービス、安全、法的理由でミニアプリや規約を変更し、保守や利用者保護のため一時停止する場合があります。' },
        { heading: '7. 準拠法と連絡先', body: 'ベトナム法が適用されます。contact@vre-vietnam.com または 0981 152 315へご連絡ください。' },
      ] },
    },
  },
  fr: {
    languageLabel: 'Langue', closeLabel: 'Fermer', legalNote: 'Ce document est affiché dans VRena Player et ne contient aucun lien menant hors de la Mini App.', legalAriaLabel: 'Documents juridiques', privacyLink: 'Politique de confidentialité', termsLink: "Conditions d’utilisation",
    memberEyebrow: 'MEMBRE VRENA', readyTitle: 'Votre profil est prêt', readyGreeting: 'Bonjour {name}. Votre profil membre a été identifié de manière sécurisée dans VRena Player.', defaultPlayer: 'Joueur', memberPhone: 'Téléphone du membre',
    profileBenefits: 'Avantages du profil', profileBenefitsBody: "Votre profil aide VRena à vous reconnaître et à protéger votre historique d’activité lorsque vous utilisez les services d’un établissement VRena.",
    registerEyebrow: 'NOUVEAU PROFIL', registerTitle: 'Devenir membre', registerIntro: "Réservé aux personnes sans compte VRena existant. Cette fonction ne sert pas à associer un compte existant.",
    phoneWhy: 'Pourquoi un numéro de téléphone ?', phoneWhyBody: 'VRena utilise votre numéro Zalo pour créer, protéger et identifier un nouveau profil. L’e-mail est facultatif.',
    consentBeforePrivacy: 'Je demande volontairement un nouveau profil et accepte que VRena reçoive et utilise mon numéro Zalo aux fins indiquées. J’ai lu la ', consentBetweenLegal: ' et j’accepte les ', consentAfterTerms: '.',
    registering: 'Inscription…', registerWithZalo: 'S’inscrire avec le numéro Zalo', continueWithoutRegistering: 'Plus tard, continuer à consulter',
    welcomeTitle: 'Votre profil joueur VRena', welcomeBody: 'Découvrez les avantages du profil membre. Consultez les informations sans vous connecter ni communiquer votre numéro.',
    identifyTitle: 'Identification du membre', identifyBody: 'Un profil unique permet à VRena de vous reconnaître lors des activités en établissement.', optionalTitle: 'Inscription facultative', optionalBody: 'L’autorisation du téléphone est demandée uniquement après ouverture de l’inscription et confirmation de votre accord.',
    startRegistration: 'Devenir membre VRena', registrationDisclaimer: 'Uniquement pour un nouveau profil. Refuser ne bloque pas les autres contenus.', footer: 'Données protégées · Sans publicité · Sans navigation externe',
    errors: {
      zaloTimeout: 'Zalo ne répond pas. Fermez et rouvrez la Mini App.', sessionUnavailable: 'Impossible d’établir une session Zalo sécurisée. Rouvrez la Mini App.', serverTimeout: 'VRena met trop de temps à répondre. Réessayez.', networkUnavailable: 'Impossible de joindre VRena. Vérifiez votre connexion.', serviceUnavailable: 'Le service d’inscription VRena est temporairement indisponible.',
      permissionTimeout: 'Zalo n’a pas répondu à la demande d’autorisation du téléphone.', permissionDenied: 'L’autorisation du téléphone n’a pas été accordée. Vous pouvez continuer à consulter les informations.', phoneTimeout: 'Zalo n’a pas répondu à la demande du numéro.', phoneVerificationUnavailable: 'La vérification du numéro Zalo est temporairement indisponible.',
      tooManyAttempts: 'Trop de tentatives. Attendez une minute avant de réessayer.', existingAccount: 'Ce numéro possède déjà un profil VRena. Demandez de l’aide au personnel sur place.', identityMismatch: 'La session Zalo ne correspond pas à cette inscription. Rouvrez la Mini App.', revokedAccount: 'Ce profil Zalo a été révoqué. Contactez VRena.', consentRequired: 'Acceptez la Politique de confidentialité et les Conditions d’utilisation avant de vous inscrire.', unknown: 'Impossible d’inscrire le profil VRena. Réessayez.',
    },
    legal: {
      privacyPolicy: { title: 'Politique de confidentialité VRena Player', updated: 'Mise à jour le 10 août 2026', sections: [
        { heading: '1. Champ d’application', body: 'Cette politique explique comment VR ENTERTAINMENT CO., LTD. traite les données personnelles lorsqu’un utilisateur inscrit volontairement un nouveau profil dans VRena Player.' },
        { heading: '2. Données traitées', body: 'Avec votre accord, VRena reçoit votre numéro Zalo, votre identifiant Zalo et les données de vérification nécessaires. Ces dernières sont utilisées uniquement pendant la vérification. Contacts, caméra, micro et localisation ne sont pas demandés.' },
        { heading: '3. Finalités', body: 'Les données servent à créer, identifier et protéger le profil, prévenir la fraude et assister l’utilisateur. L’e-mail n’est pas obligatoire.' },
        { heading: '4. Consentement et choix', body: 'Vous pouvez consulter les informations sans inscription ni numéro. Le refus arrête uniquement la création du profil. Vous pouvez demander retrait, accès, rectification ou suppression selon la loi.' },
        { heading: '5. Partage', body: 'VRena ne vend ni ne loue les données. Elles sont partagées uniquement avec les prestataires nécessaires ou les autorités lorsque la loi l’exige.' },
        { heading: '6. Conservation et sécurité', body: 'VRena applique des mesures adaptées et conserve les données uniquement pendant la durée nécessaire ou légale.' },
        { heading: '7. Contact', body: 'Demandes relatives aux données : contact@vre-vietnam.com ou 0981 152 315.' },
      ] },
      termsAndConditions: { title: "Conditions d’utilisation VRena Player", updated: 'Mise à jour le 10 août 2026', sections: [
        { heading: '1. Champ d’application', body: 'VRena Player est une Mini App de VR ENTERTAINMENT CO., LTD. Les informations sont accessibles sans connexion et un nouveau profil peut être créé volontairement avec un numéro Zalo.' },
        { heading: '2. Autorisation et données', body: 'L’autorisation du téléphone est demandée uniquement après ouverture de l’inscription, lecture de la finalité et des documents, accord et choix de l’inscription.' },
        { heading: '3. Choix de l’utilisateur', body: 'Vous pouvez refuser le téléphone et continuer à consulter les informations. Seule la création du nouveau profil est arrêtée.' },
        { heading: '4. Comptes utilisateur', body: 'Cette fonction crée uniquement un nouveau profil et ne relie pas un compte existant. Les utilisateurs existants doivent demander de l’aide au personnel VRena.' },
        { heading: '5. Sécurité et partage', body: 'VRena applique des mesures raisonnables, ne vend ni ne loue les données et ne les partage que pour l’exploitation ou selon la loi.' },
        { heading: '6. Modifications et disponibilité', body: 'La Mini App ou les conditions peuvent évoluer pour des raisons de service, sécurité ou droit, et être temporairement indisponibles pour maintenance ou protection.' },
        { heading: '7. Droit applicable et contact', body: 'Le droit vietnamien s’applique. Contact : contact@vre-vietnam.com ou 0981 152 315.' },
      ] },
    },
  },
  de: {
    languageLabel: 'Sprache', closeLabel: 'Schließen', legalNote: 'Dieses Dokument wird in VRena Player angezeigt und enthält keine Links aus der Mini App heraus.', legalAriaLabel: 'Rechtliche Dokumente', privacyLink: 'Datenschutzerklärung', termsLink: 'Nutzungsbedingungen',
    memberEyebrow: 'VRENA-MITGLIED', readyTitle: 'Dein Profil ist bereit', readyGreeting: 'Hallo {name}. Dein Mitgliedsprofil wurde in VRena Player sicher erkannt.', defaultPlayer: 'Spieler', memberPhone: 'Telefonnummer des Mitglieds',
    profileBenefits: 'Profilvorteile', profileBenefitsBody: 'Das Profil hilft VRena, dich zu erkennen und deinen Aktivitätsverlauf bei der Nutzung eines VRena-Standorts zu schützen.',
    registerEyebrow: 'NEUES PROFIL', registerTitle: 'Mitglied werden', registerIntro: 'Nur für Personen ohne bestehendes VRena-Konto. Diese Funktion verknüpft kein vorhandenes Konto.',
    phoneWhy: 'Warum wird eine Telefonnummer benötigt?', phoneWhyBody: 'VRena verwendet deine Zalo-Nummer, um ein neues Profil zu erstellen, zu schützen und zu identifizieren. E-Mail ist optional.',
    consentBeforePrivacy: 'Ich registriere freiwillig ein neues Profil und stimme zu, dass VRena meine Zalo-Nummer für den genannten Zweck empfängt und verwendet. Ich habe die ', consentBetweenLegal: ' gelesen und akzeptiere die ', consentAfterTerms: '.',
    registering: 'Registrierung…', registerWithZalo: 'Mit Zalo-Telefonnummer registrieren', continueWithoutRegistering: 'Später, Informationen weiter ansehen',
    welcomeTitle: 'Dein VRena-Spielerprofil', welcomeBody: 'Entdecke die Vorteile des Mitgliedsprofils. Informationen sind ohne Anmeldung oder Telefonnummer verfügbar.',
    identifyTitle: 'Mitgliedererkennung', identifyBody: 'Ein Profil hilft VRena, dich bei Aktivitäten am Standort zu erkennen.', optionalTitle: 'Registrierung ist freiwillig', optionalBody: 'Die Telefonberechtigung wird erst nach dem Öffnen der Registrierung und deiner Zustimmung angefragt.',
    startRegistration: 'Als VRena-Mitglied registrieren', registrationDisclaimer: 'Nur für neue Profile. Eine Ablehnung beeinträchtigt keine anderen Inhalte.', footer: 'Geschützte Daten · Keine Werbung · Keine externe Navigation',
    errors: {
      zaloTimeout: 'Zalo antwortet nicht. Schließe und öffne die Mini App erneut.', sessionUnavailable: 'Eine sichere Zalo-Sitzung konnte nicht hergestellt werden.', serverTimeout: 'VRena antwortet zu langsam. Bitte erneut versuchen.', networkUnavailable: 'VRena ist nicht erreichbar. Prüfe die Verbindung.', serviceUnavailable: 'Die VRena-Registrierung ist vorübergehend nicht verfügbar.', permissionTimeout: 'Zalo hat auf die Telefonberechtigung nicht geantwortet.',
      permissionDenied: 'Die Telefonberechtigung wurde nicht erteilt. Informationen bleiben verfügbar.', phoneTimeout: 'Zalo hat auf die Telefonnummernanfrage nicht geantwortet.', phoneVerificationUnavailable: 'Die Zalo-Telefonverifizierung ist vorübergehend nicht verfügbar.', tooManyAttempts: 'Zu viele Versuche. Bitte eine Minute warten.', existingAccount: 'Für diese Nummer besteht bereits ein VRena-Profil. Bitte das Personal vor Ort fragen.', identityMismatch: 'Die Zalo-Sitzung passt nicht zu dieser Registrierung.', revokedAccount: 'Dieses Zalo-Profil wurde widerrufen. Bitte VRena kontaktieren.', consentRequired: 'Bitte vor der Registrierung Datenschutzerklärung und Nutzungsbedingungen akzeptieren.', unknown: 'Das VRena-Profil konnte nicht registriert werden.',
    },
    legal: {
      privacyPolicy: { title: 'VRena Player Datenschutzerklärung', updated: 'Aktualisiert am 10. August 2026', sections: [
        { heading: '1. Geltungsbereich', body: 'Diese Erklärung beschreibt, wie VR ENTERTAINMENT CO., LTD. personenbezogene Daten bei der freiwilligen Registrierung eines neuen Profils in VRena Player verarbeitet.' },
        { heading: '2. Verarbeitete Daten', body: 'Mit Zustimmung erhält VRena Zalo-Telefonnummer, Zalo-Nutzerkennung und notwendige Prüfdaten. Prüfdaten werden nur zur Verifizierung verwendet. Kontakte, Kamera, Mikrofon und Standort werden nicht angefragt.' },
        { heading: '3. Zweck', body: 'Die Daten dienen der Erstellung, Erkennung und Sicherung des Profils, der Betrugsprävention und dem Support. E-Mail ist nicht erforderlich.' },
        { heading: '4. Einwilligung und Wahl', body: 'Informationen sind ohne Registrierung oder Telefonnummer verfügbar. Eine Ablehnung stoppt nur das neue Profil. Nach geltendem Recht können Widerruf, Auskunft, Berichtigung oder Löschung verlangt werden.' },
        { heading: '5. Weitergabe', body: 'VRena verkauft oder vermietet keine Daten. Eine Weitergabe erfolgt nur an notwendige Dienstleister oder gesetzlich zuständige Behörden.' },
        { heading: '6. Speicherung und Sicherheit', body: 'VRena setzt angemessene Schutzmaßnahmen ein und speichert Daten nur so lange wie für Zweck oder Rechtspflicht nötig.' },
        { heading: '7. Kontakt', body: 'Datenschutzanfragen: contact@vre-vietnam.com oder 0981 152 315.' },
      ] },
      termsAndConditions: { title: 'VRena Player Nutzungsbedingungen', updated: 'Aktualisiert am 10. August 2026', sections: [
        { heading: '1. Geltungsbereich', body: 'VRena Player ist eine Mini App von VR ENTERTAINMENT CO., LTD. Informationen sind ohne Anmeldung verfügbar; ein neues Profil kann freiwillig mit einer Zalo-Nummer erstellt werden.' },
        { heading: '2. Berechtigung und Daten', body: 'Die Telefonberechtigung wird erst angefragt, nachdem Registrierung, Zweck und Dokumente geöffnet, akzeptiert und die Registrierung gewählt wurden.' },
        { heading: '3. Wahl des Nutzers', body: 'Die Telefonberechtigung kann abgelehnt werden; Informationen bleiben verfügbar. Nur das neue Profil wird nicht erstellt.' },
        { heading: '4. Benutzerkonten', body: 'Diese Funktion erstellt nur ein neues Profil und verknüpft kein bestehendes Konto. Bestehende Nutzer wenden sich an das Personal vor Ort.' },
        { heading: '5. Sicherheit und Weitergabe', body: 'VRena nutzt angemessene Schutzmaßnahmen, verkauft oder vermietet keine Daten und gibt sie nur für Betrieb oder gesetzliche Anforderungen weiter.' },
        { heading: '6. Änderungen und Verfügbarkeit', body: 'Mini App und Bedingungen können aus Service-, Sicherheits- oder Rechtsgründen geändert und für Wartung oder Schutz vorübergehend ausgesetzt werden.' },
        { heading: '7. Recht und Kontakt', body: 'Es gilt vietnamesisches Recht. Kontakt: contact@vre-vietnam.com oder 0981 152 315.' },
      ] },
    },
  },
  it: {
    languageLabel: 'Lingua', closeLabel: 'Chiudi', legalNote: 'Questo documento è mostrato dentro VRena Player e non contiene link che portano fuori dalla Mini App.', legalAriaLabel: 'Documenti legali', privacyLink: 'Informativa sulla privacy', termsLink: 'Termini di utilizzo',
    memberEyebrow: 'MEMBRO VRENA', readyTitle: 'Il tuo profilo è pronto', readyGreeting: 'Ciao {name}. Il tuo profilo membro è stato riconosciuto in modo sicuro in VRena Player.', defaultPlayer: 'Giocatore', memberPhone: 'Telefono del membro',
    profileBenefits: 'Vantaggi del profilo', profileBenefitsBody: 'Il profilo aiuta VRena a riconoscerti e a proteggere lo storico delle attività quando usi i servizi in una sede VRena.',
    registerEyebrow: 'NUOVO PROFILO', registerTitle: 'Diventa membro', registerIntro: 'Solo per chi non possiede già un account VRena. Questa funzione non collega un account esistente.',
    phoneWhy: 'Perché serve il numero di telefono?', phoneWhyBody: 'VRena usa il numero Zalo per creare, proteggere e identificare un nuovo profilo. L’e-mail è facoltativa.',
    consentBeforePrivacy: 'Richiedo volontariamente un nuovo profilo e accetto che VRena riceva e utilizzi il mio numero Zalo per lo scopo indicato. Ho letto la ', consentBetweenLegal: ' e accetto i ', consentAfterTerms: '.',
    registering: 'Registrazione…', registerWithZalo: 'Registrati con il numero Zalo', continueWithoutRegistering: 'Non ora, continua a vedere le informazioni',
    welcomeTitle: 'Il tuo profilo giocatore VRena', welcomeBody: 'Scopri i vantaggi del profilo membro. Puoi vedere le informazioni senza accedere o condividere il numero.',
    identifyTitle: 'Riconoscimento del membro', identifyBody: 'Un solo profilo aiuta VRena a riconoscerti durante le attività in sede.', optionalTitle: 'Registrazione facoltativa', optionalBody: 'Il permesso del telefono viene richiesto solo dopo aver aperto la registrazione e confermato il consenso.',
    startRegistration: 'Registrati come membro VRena', registrationDisclaimer: 'Solo per nuovi profili. Rifiutare non interrompe gli altri contenuti.', footer: 'Dati protetti · Nessuna pubblicità · Nessuna navigazione esterna',
    errors: {
      zaloTimeout: 'Zalo non risponde. Chiudi e riapri la Mini App.', sessionUnavailable: 'Impossibile avviare una sessione Zalo sicura.', serverTimeout: 'VRena impiega troppo tempo a rispondere. Riprova.', networkUnavailable: 'Impossibile contattare VRena. Controlla la connessione.', serviceUnavailable: 'La registrazione VRena è temporaneamente non disponibile.', permissionTimeout: 'Zalo non ha risposto alla richiesta di autorizzazione del telefono.',
      permissionDenied: 'Il permesso del telefono non è stato concesso. Puoi continuare a vedere le informazioni.', phoneTimeout: 'Zalo non ha risposto alla richiesta del numero.', phoneVerificationUnavailable: 'La verifica del numero Zalo è temporaneamente non disponibile.', tooManyAttempts: 'Troppi tentativi. Attendi un minuto.', existingAccount: 'Questo numero ha già un profilo VRena. Chiedi assistenza allo staff in sede.', identityMismatch: 'La sessione Zalo non corrisponde a questa registrazione.', revokedAccount: 'Questo profilo Zalo è stato revocato. Contatta VRena.', consentRequired: 'Accetta Informativa sulla privacy e Termini di utilizzo prima di registrarti.', unknown: 'Impossibile registrare il profilo VRena. Riprova.',
    },
    legal: {
      privacyPolicy: { title: 'Informativa sulla privacy VRena Player', updated: 'Aggiornata il 10 agosto 2026', sections: [
        { heading: '1. Ambito', body: 'Questa informativa spiega come VR ENTERTAINMENT CO., LTD. tratta i dati personali quando un utente registra volontariamente un nuovo profilo in VRena Player.' },
        { heading: '2. Dati trattati', body: 'Con il consenso, VRena riceve numero Zalo, identificativo utente Zalo e dati di verifica necessari. I dati di verifica sono usati solo durante il controllo. Non vengono richiesti contatti, fotocamera, microfono o posizione.' },
        { heading: '3. Finalità', body: 'I dati servono a creare, identificare e proteggere il profilo, prevenire frodi e assistere l’utente. L’e-mail non è obbligatoria.' },
        { heading: '4. Consenso e scelta', body: 'Puoi vedere le informazioni senza registrarti o fornire il numero. Il rifiuto interrompe solo il nuovo profilo. Puoi chiedere revoca, accesso, rettifica o cancellazione secondo la legge.' },
        { heading: '5. Condivisione', body: 'VRena non vende né affitta i dati. Li condivide solo con fornitori necessari o autorità quando richiesto dalla legge.' },
        { heading: '6. Conservazione e sicurezza', body: 'VRena adotta misure adeguate e conserva i dati solo per il tempo necessario allo scopo o agli obblighi di legge.' },
        { heading: '7. Contatti', body: 'Richieste sui dati: contact@vre-vietnam.com o 0981 152 315.' },
      ] },
      termsAndConditions: { title: 'Termini di utilizzo VRena Player', updated: 'Aggiornati il 10 agosto 2026', sections: [
        { heading: '1. Ambito', body: 'VRena Player è una Mini App di VR ENTERTAINMENT CO., LTD. Le informazioni sono visibili senza accesso e un nuovo profilo può essere creato volontariamente con un numero Zalo.' },
        { heading: '2. Permesso e dati', body: 'Il permesso del telefono viene richiesto solo dopo aver aperto la registrazione, letto finalità e documenti, accettato e scelto di registrarsi.' },
        { heading: '3. Scelta dell’utente', body: 'Puoi negare il telefono e continuare a vedere le informazioni. Si interrompe solo la creazione del nuovo profilo.' },
        { heading: '4. Account utente', body: 'Questa funzione crea solo un nuovo profilo e non collega account esistenti. Gli utenti esistenti devono chiedere assistenza allo staff VRena.' },
        { heading: '5. Sicurezza e condivisione', body: 'VRena adotta misure ragionevoli, non vende né affitta dati e li condivide solo per il funzionamento o per obblighi di legge.' },
        { heading: '6. Modifiche e disponibilità', body: 'Mini App e termini possono cambiare per servizio, sicurezza o legge ed essere sospesi temporaneamente per manutenzione o protezione.' },
        { heading: '7. Legge e contatti', body: 'Si applica la legge vietnamita. Contatti: contact@vre-vietnam.com o 0981 152 315.' },
      ] },
    },
  },
}
