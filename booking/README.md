# VRena Booking Zalo Mini App

Mini App ID: `2401555387563548266`

This package gives Zalo users a complete in-app guest booking flow. Venue selection, current ticket types, birthday packages, live availability, contact details, legal consent, and server confirmation all stay inside the Mini App. It does not request Zalo profile, phone, email, or identity permissions.

Privacy Policy and Terms & Conditions are rendered inside the Mini App in all eight languages. They do not navigate to the public website or another third-party page.

## User flow

1. Choose one of the two active VRena booking venues.
2. Tap **Continue to tickets**.
3. Choose the ticket type, date, live time, duration, and party size inside the Mini App.
4. Enter a contact phone number and accept the in-app Privacy Policy and Terms.
5. Submit the booking to the production guest-booking API without opening another page.
6. The Mini App shows the reference only after the production server accepts the selected time.

## Local validation

```bash
npm ci
npm run build
npm run dev
```

The release verifier rejects `openWebview`, external ticket-page navigation, and public legal links.
