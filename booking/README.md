# VRena Booking Zalo Mini App

Mini App ID: `2401555387563548266`

This package gives Zalo users a branded venue selector and opens the current production ticket flow with Zalo's supported `openWebview` API. It does not request Zalo profile, phone, email, or identity permissions.

Privacy Policy and Terms & Conditions are rendered inside the Mini App in all eight languages. They do not navigate to the public website or another third-party page.

## User flow

1. Choose one of the two active VRena booking venues.
2. Tap **Continue to tickets**.
3. Complete the existing guest or account booking flow inside Zalo's full-screen webview.
4. The booking is confirmed only after the production server accepts the selected time.

## Local validation

```bash
npm ci
npm run build
npm run dev
```

The `openWebview` call can only be validated in Zalo Device or a deployed Testing version.
