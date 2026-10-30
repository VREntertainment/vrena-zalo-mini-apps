# VRena Player — Zalo Mini App

This customer-facing Mini App is an account-free guide to the VRena player
experience. It does not request a phone number, email address or Zalo user
identifier, and it does not call the VRena registration backend.

The Zalo Mini App ID is `2586740010836800026`, under the verified parent Zalo
App `VRena Attendance` (`675490363839227109`).

## Account-free flow

1. The guide renders immediately without a VRena login or Zalo permission.
2. It explains that no online registration is performed and that staff can
   assist in person at a VRena venue.
3. The in-page guide expands locally. Privacy Policy and Terms of Use are also
   displayed locally inside the Mini App.
4. The only persisted value is the user's language choice in local storage.
5. No registration API, Zalo access token or Zalo user identifier is used.

## Languages

The header language selector covers the same seven languages as the VRena web
app: English, Vietnamese, Korean, Japanese, French, German and Italian. The
selection is saved under `vrena-language`, and changes the guide, Privacy
Policy and Terms of Use without navigating away from the Mini App.

## Local preview

```bash
npm install
npm run dev
```

The local preview uses the same account-free flow as the Zalo runtime.

## Build and deploy

```bash
npm run build
zmp login
zmp deploy --existing --testing --desc "Account-free VRena Player guide; no personal data or registration service" --outputDir dist
```

This build does not require a backend URL, webhook, Zalo access token, Zalo App
Secret or Supabase service-role key.
