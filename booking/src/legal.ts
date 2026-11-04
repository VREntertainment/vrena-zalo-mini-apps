import type { LanguageCode } from './i18n'

export type LegalDocument = 'privacy' | 'terms'

type LegalSection = {
  title: string
  body: string
}

type LegalCopy = {
  close: string
  privacyTitle: string
  privacySections: LegalSection[]
  termsTitle: string
  termsSections: LegalSection[]
}

export const legalCopy: Record<LanguageCode, LegalCopy> = {
  en: {
    close: 'Close',
    privacyTitle: 'Privacy Policy',
    privacySections: [
      { title: 'Who operates this Mini App', body: 'VR Entertainment Company Limited operates VRena Booking for the VRena venues in Ho Chi Minh City.' },
      { title: 'Data we use', body: 'This Mini App stores only your selected language on your device. If you continue to the booking form, the name, phone number, venue, date, time and group details you enter are processed by the VRena booking service. We do not request your Zalo profile, Zalo phone number, email, contacts or location.' },
      { title: 'Why we use it', body: 'Booking information is used to check availability, create and manage your reservation, contact you about changes, prevent duplicate bookings and meet legal or operational requirements.' },
      { title: 'Sharing and retention', body: 'We do not sell personal data or use it for advertising. Data is shared only with service providers needed to operate the booking service and is retained only as long as required for booking operations and applicable law.' },
      { title: 'Your choices', body: 'You may request access, correction or deletion, subject to legal retention duties, by contacting contact@vre-vietnam.com.' },
    ],
    termsTitle: 'Terms & Conditions',
    termsSections: [
      { title: 'Service', body: 'VRena Booking helps you select a venue and continue to the official VRena ticket flow. A reservation is confirmed only when the booking service accepts the selected time and returns a confirmation.' },
      { title: 'Prices and payment', body: 'Current prices and available packages are shown in the booking form. Payment is made at the venue. Birthday and event arrangements may require staff confirmation.' },
      { title: 'Your responsibility', body: 'The person booking must be at least 18 years old, provide accurate information and follow the age, guardian and safety rules shown for each experience.' },
      { title: 'Changes and cancellations', body: 'Availability can change until confirmation. Contact the selected VRena venue or VRena Official Account as soon as possible to request a change or cancellation.' },
      { title: 'Contact', body: 'For booking, privacy or terms questions, contact contact@vre-vietnam.com.' },
    ],
  },
  vi: {
    close: 'Đóng',
    privacyTitle: 'Chính sách bảo mật',
    privacySections: [
      { title: 'Đơn vị vận hành', body: 'Công ty TNHH VR Entertainment vận hành VRena Booking cho các địa điểm VRena tại Thành phố Hồ Chí Minh.' },
      { title: 'Dữ liệu được sử dụng', body: 'Mini App này chỉ lưu ngôn ngữ bạn chọn trên thiết bị. Nếu tiếp tục đến biểu mẫu đặt vé, tên, số điện thoại, địa điểm, ngày, giờ và thông tin nhóm do bạn nhập sẽ được hệ thống đặt vé VRena xử lý. Chúng tôi không yêu cầu hồ sơ Zalo, số điện thoại Zalo, email, danh bạ hoặc vị trí của bạn.' },
      { title: 'Mục đích sử dụng', body: 'Thông tin đặt vé được dùng để kiểm tra chỗ trống, tạo và quản lý đặt chỗ, liên hệ khi có thay đổi, ngăn đặt trùng và đáp ứng yêu cầu pháp lý hoặc vận hành.' },
      { title: 'Chia sẻ và lưu giữ', body: 'Chúng tôi không bán dữ liệu cá nhân hoặc dùng dữ liệu cho quảng cáo. Dữ liệu chỉ được chia sẻ với nhà cung cấp cần thiết để vận hành dịch vụ đặt vé và chỉ được lưu trong thời gian cần thiết cho hoạt động đặt vé và quy định pháp luật.' },
      { title: 'Quyền của bạn', body: 'Bạn có thể yêu cầu truy cập, chỉnh sửa hoặc xóa dữ liệu, tùy nghĩa vụ lưu giữ theo pháp luật, bằng cách liên hệ contact@vre-vietnam.com.' },
    ],
    termsTitle: 'Điều khoản & Điều kiện',
    termsSections: [
      { title: 'Dịch vụ', body: 'VRena Booking giúp bạn chọn địa điểm và tiếp tục đến luồng đặt vé chính thức của VRena. Đặt chỗ chỉ được xác nhận khi hệ thống chấp nhận khung giờ đã chọn và trả về xác nhận.' },
      { title: 'Giá và thanh toán', body: 'Giá hiện hành và các gói đang áp dụng được hiển thị trong biểu mẫu đặt vé. Thanh toán được thực hiện tại địa điểm. Gói sinh nhật và sự kiện có thể cần nhân viên xác nhận.' },
      { title: 'Trách nhiệm của người đặt', body: 'Người đặt phải từ 18 tuổi, cung cấp thông tin chính xác và tuân thủ quy định về độ tuổi, người giám hộ và an toàn của từng trải nghiệm.' },
      { title: 'Thay đổi và hủy', body: 'Chỗ trống có thể thay đổi cho đến khi được xác nhận. Hãy liên hệ địa điểm VRena đã chọn hoặc Official Account VRena sớm nhất có thể để yêu cầu thay đổi hoặc hủy.' },
      { title: 'Liên hệ', body: 'Mọi câu hỏi về đặt vé, quyền riêng tư hoặc điều khoản vui lòng gửi đến contact@vre-vietnam.com.' },
    ],
  },
  ko: {
    close: '닫기',
    privacyTitle: '개인정보 처리방침',
    privacySections: [
      { title: '운영 주체', body: 'VR Entertainment Company Limited는 호찌민시 VRena 지점을 위한 VRena Booking을 운영합니다.' },
      { title: '사용하는 데이터', body: '이 Mini App은 기기에 선택한 언어만 저장합니다. 예약 양식으로 이동하면 사용자가 입력한 이름, 전화번호, 지점, 날짜, 시간 및 그룹 정보가 VRena 예약 서비스에서 처리됩니다. Zalo 프로필, Zalo 전화번호, 이메일, 연락처 또는 위치 권한은 요청하지 않습니다.' },
      { title: '이용 목적', body: '예약 정보는 잔여 시간 확인, 예약 생성 및 관리, 변경 안내, 중복 예약 방지와 법적 또는 운영상 의무를 위해 사용됩니다.' },
      { title: '공유 및 보관', body: '개인정보를 판매하거나 광고에 사용하지 않습니다. 예약 서비스 운영에 필요한 제공업체에만 공유하며 운영 및 관련 법률상 필요한 기간 동안만 보관합니다.' },
      { title: '사용자 권리', body: '법적 보관 의무 범위 내에서 contact@vre-vietnam.com으로 열람, 수정 또는 삭제를 요청할 수 있습니다.' },
    ],
    termsTitle: '이용약관',
    termsSections: [
      { title: '서비스', body: 'VRena Booking은 지점을 선택하고 공식 VRena 티켓 예약으로 이동하도록 돕습니다. 선택한 시간이 예약 서비스에서 승인되고 확인이 반환된 경우에만 예약이 확정됩니다.' },
      { title: '가격 및 결제', body: '현재 가격과 이용 가능한 패키지는 예약 양식에 표시됩니다. 결제는 현장에서 진행되며 생일 및 이벤트 예약은 직원 확인이 필요할 수 있습니다.' },
      { title: '예약자 책임', body: '예약자는 만 18세 이상이어야 하며 정확한 정보를 제공하고 각 체험의 연령, 보호자 및 안전 규정을 따라야 합니다.' },
      { title: '변경 및 취소', body: '확정 전까지 이용 가능 시간이 변경될 수 있습니다. 변경 또는 취소는 선택한 VRena 지점이나 VRena Official Account로 가능한 한 빨리 문의하세요.' },
      { title: '문의', body: '예약, 개인정보 또는 약관 문의는 contact@vre-vietnam.com으로 보내주세요.' },
    ],
  },
  ja: {
    close: '閉じる',
    privacyTitle: 'プライバシーポリシー',
    privacySections: [
      { title: '運営者', body: 'VR Entertainment Company Limitedが、ホーチミン市のVRena店舗向けにVRena Bookingを運営します。' },
      { title: '利用するデータ', body: 'このMini Appは選択した言語のみ端末に保存します。予約フォームへ進むと、入力した氏名、電話番号、店舗、日付、時間、グループ情報がVRena予約サービスで処理されます。Zaloプロフィール、Zalo電話番号、メール、連絡先、位置情報は要求しません。' },
      { title: '利用目的', body: '予約情報は空き状況の確認、予約の作成・管理、変更連絡、重複予約の防止、法令または運営上の要件に使用します。' },
      { title: '共有と保存', body: '個人データを販売したり広告に利用したりしません。予約サービスの運営に必要な事業者とのみ共有し、運営および法令上必要な期間だけ保存します。' },
      { title: 'お客様の権利', body: '法令上の保存義務に従い、contact@vre-vietnam.comへアクセス、訂正、削除を依頼できます。' },
    ],
    termsTitle: '利用規約',
    termsSections: [
      { title: 'サービス', body: 'VRena Bookingは店舗選択から公式VRenaチケット予約への移動を支援します。選択時間が予約サービスに受理され、確認が返された場合のみ予約が確定します。' },
      { title: '料金と支払い', body: '現在の料金と利用可能なパッケージは予約フォームに表示されます。支払いは店舗で行い、誕生日やイベントはスタッフ確認が必要な場合があります。' },
      { title: '予約者の責任', body: '予約者は18歳以上で、正確な情報を提供し、各体験の年齢、保護者、安全ルールに従う必要があります。' },
      { title: '変更とキャンセル', body: '確定までは空き状況が変わる場合があります。変更やキャンセルは、選択したVRena店舗またはVRena Official Accountへ早めにご連絡ください。' },
      { title: 'お問い合わせ', body: '予約、プライバシー、規約に関するお問い合わせはcontact@vre-vietnam.comまでお送りください。' },
    ],
  },
  fr: {
    close: 'Fermer',
    privacyTitle: 'Politique de confidentialité',
    privacySections: [
      { title: 'Responsable du Mini App', body: 'VR Entertainment Company Limited exploite VRena Booking pour les sites VRena à Hô Chi Minh-Ville.' },
      { title: 'Données utilisées', body: 'Ce Mini App conserve uniquement la langue choisie sur votre appareil. Si vous ouvrez le formulaire, le nom, le téléphone, le site, la date, l’heure et les informations de groupe que vous saisissez sont traités par le service de réservation VRena. Nous ne demandons ni profil Zalo, ni numéro Zalo, ni e-mail, ni contacts, ni localisation.' },
      { title: 'Finalités', body: 'Les informations servent à vérifier les disponibilités, créer et gérer la réservation, communiquer les changements, éviter les doublons et respecter les obligations légales ou opérationnelles.' },
      { title: 'Partage et conservation', body: 'Nous ne vendons pas les données et ne les utilisons pas pour la publicité. Elles sont partagées uniquement avec les prestataires nécessaires au service et conservées pendant la durée requise par les opérations et la loi.' },
      { title: 'Vos droits', body: 'Vous pouvez demander accès, rectification ou suppression, sous réserve des obligations légales, à contact@vre-vietnam.com.' },
    ],
    termsTitle: 'Conditions générales',
    termsSections: [
      { title: 'Service', body: 'VRena Booking permet de choisir un site et de poursuivre vers la réservation officielle VRena. La réservation est confirmée uniquement lorsque le service accepte le créneau et renvoie une confirmation.' },
      { title: 'Prix et paiement', body: 'Les prix actuels et forfaits disponibles figurent dans le formulaire. Le paiement s’effectue sur place. Les anniversaires et événements peuvent nécessiter une confirmation de l’équipe.' },
      { title: 'Responsabilité du client', body: 'La personne qui réserve doit avoir au moins 18 ans, fournir des informations exactes et respecter les règles d’âge, d’accompagnement et de sécurité.' },
      { title: 'Modifications et annulations', body: 'La disponibilité peut changer avant confirmation. Contactez rapidement le site VRena choisi ou le compte officiel VRena pour demander une modification ou une annulation.' },
      { title: 'Contact', body: 'Pour toute question sur la réservation, la confidentialité ou les conditions, écrivez à contact@vre-vietnam.com.' },
    ],
  },
  de: {
    close: 'Schließen',
    privacyTitle: 'Datenschutzrichtlinie',
    privacySections: [
      { title: 'Betreiber', body: 'VR Entertainment Company Limited betreibt VRena Booking für die VRena-Standorte in Ho-Chi-Minh-Stadt.' },
      { title: 'Verwendete Daten', body: 'Diese Mini App speichert nur die gewählte Sprache auf Ihrem Gerät. Im Buchungsformular eingegebene Namen, Telefonnummern, Standorte, Termine und Gruppendaten werden vom VRena-Buchungsdienst verarbeitet. Wir fordern kein Zalo-Profil, keine Zalo-Telefonnummer, E-Mail, Kontakte oder Standortdaten an.' },
      { title: 'Zweck', body: 'Buchungsdaten dienen der Verfügbarkeitsprüfung, Erstellung und Verwaltung Ihrer Buchung, Änderungsmitteilungen, Vermeidung von Doppelbuchungen sowie rechtlichen und betrieblichen Anforderungen.' },
      { title: 'Weitergabe und Speicherung', body: 'Wir verkaufen keine personenbezogenen Daten und nutzen sie nicht für Werbung. Sie werden nur mit erforderlichen Dienstleistern geteilt und nur so lange gespeichert, wie Betrieb und geltendes Recht es verlangen.' },
      { title: 'Ihre Rechte', body: 'Sie können vorbehaltlich gesetzlicher Aufbewahrungspflichten unter contact@vre-vietnam.com Auskunft, Berichtigung oder Löschung verlangen.' },
    ],
    termsTitle: 'Allgemeine Geschäftsbedingungen',
    termsSections: [
      { title: 'Dienst', body: 'VRena Booking hilft bei der Standortwahl und führt zur offiziellen VRena-Ticketbuchung. Eine Buchung ist erst bestätigt, wenn der Dienst die gewählte Zeit annimmt und eine Bestätigung zurückgibt.' },
      { title: 'Preise und Zahlung', body: 'Aktuelle Preise und verfügbare Pakete stehen im Buchungsformular. Die Zahlung erfolgt vor Ort. Geburtstags- und Veranstaltungsbuchungen können eine Bestätigung durch das Team erfordern.' },
      { title: 'Verantwortung', body: 'Die buchende Person muss mindestens 18 Jahre alt sein, richtige Angaben machen und Alters-, Begleit- und Sicherheitsregeln der Erlebnisse beachten.' },
      { title: 'Änderungen und Stornierung', body: 'Die Verfügbarkeit kann sich bis zur Bestätigung ändern. Wenden Sie sich für Änderungen oder Stornierungen frühzeitig an den gewählten VRena-Standort oder den offiziellen VRena-Account.' },
      { title: 'Kontakt', body: 'Fragen zu Buchung, Datenschutz oder Bedingungen senden Sie an contact@vre-vietnam.com.' },
    ],
  },
  it: {
    close: 'Chiudi',
    privacyTitle: 'Informativa sulla privacy',
    privacySections: [
      { title: 'Gestore', body: 'VR Entertainment Company Limited gestisce VRena Booking per le sedi VRena di Ho Chi Minh City.' },
      { title: 'Dati utilizzati', body: 'Questa Mini App salva sul dispositivo solo la lingua scelta. Se prosegui al modulo, nome, telefono, sede, data, ora e dati del gruppo inseriti vengono trattati dal servizio di prenotazione VRena. Non richiediamo profilo Zalo, numero Zalo, e-mail, contatti o posizione.' },
      { title: 'Finalità', body: 'I dati servono a verificare la disponibilità, creare e gestire la prenotazione, comunicare modifiche, evitare duplicati e rispettare esigenze legali o operative.' },
      { title: 'Condivisione e conservazione', body: 'Non vendiamo i dati personali e non li usiamo per pubblicità. Sono condivisi solo con i fornitori necessari e conservati per il tempo richiesto dalle operazioni e dalla legge.' },
      { title: 'I tuoi diritti', body: 'Puoi chiedere accesso, correzione o cancellazione, nel rispetto degli obblighi di conservazione, scrivendo a contact@vre-vietnam.com.' },
    ],
    termsTitle: 'Termini e condizioni',
    termsSections: [
      { title: 'Servizio', body: 'VRena Booking consente di scegliere una sede e proseguire alla prenotazione ufficiale VRena. La prenotazione è confermata solo quando il servizio accetta l’orario e restituisce una conferma.' },
      { title: 'Prezzi e pagamento', body: 'Prezzi correnti e pacchetti disponibili sono mostrati nel modulo. Il pagamento avviene in sede. Compleanni ed eventi possono richiedere conferma dello staff.' },
      { title: 'Responsabilità del cliente', body: 'Chi prenota deve avere almeno 18 anni, fornire dati corretti e rispettare le regole di età, accompagnamento e sicurezza di ogni esperienza.' },
      { title: 'Modifiche e cancellazioni', body: 'La disponibilità può cambiare prima della conferma. Contatta al più presto la sede VRena scelta o l’Official Account VRena per richiedere modifiche o cancellazioni.' },
      { title: 'Contatti', body: 'Per domande su prenotazione, privacy o condizioni scrivi a contact@vre-vietnam.com.' },
    ],
  },
  zh: {
    close: '关闭',
    privacyTitle: '隐私政策',
    privacySections: [
      { title: '运营方', body: 'VR Entertainment Company Limited 为胡志明市的 VRena 门店运营 VRena Booking。' },
      { title: '使用的数据', body: '本 Mini App 仅在设备上保存所选语言。进入预订表单后，您填写的姓名、电话、门店、日期、时间和团队信息由 VRena 预订服务处理。我们不会申请 Zalo 个人资料、Zalo 电话号码、电子邮件、通讯录或位置权限。' },
      { title: '使用目的', body: '预订信息用于检查空位、创建和管理预订、通知变更、防止重复预订以及满足法律或运营要求。' },
      { title: '共享与保留', body: '我们不会出售个人数据或将其用于广告。数据仅与运营预订服务所需的服务商共享，并仅在运营和适用法律要求的期限内保留。' },
      { title: '您的权利', body: '在遵守法定保留义务的前提下，您可以通过 contact@vre-vietnam.com 申请访问、更正或删除数据。' },
    ],
    termsTitle: '条款与条件',
    termsSections: [
      { title: '服务', body: 'VRena Booking 帮助您选择门店并进入 VRena 官方门票预订流程。只有预订服务接受所选时间并返回确认后，预订才成立。' },
      { title: '价格与付款', body: '当前价格和可用套餐显示在预订表单中。付款在门店完成。生日及活动安排可能需要工作人员确认。' },
      { title: '预订人责任', body: '预订人必须年满 18 岁，提供准确信息，并遵守每项体验的年龄、监护人和安全规定。' },
      { title: '更改与取消', body: '确认前空位可能发生变化。如需更改或取消，请尽快联系所选 VRena 门店或 VRena Official Account。' },
      { title: '联系', body: '有关预订、隐私或条款的问题，请发送至 contact@vre-vietnam.com。' },
    ],
  },
}
