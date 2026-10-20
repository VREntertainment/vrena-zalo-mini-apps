# VRena Player — Zalo Mini App

This customer-facing Mini App explains VRena player membership and optionally
creates a new profile using the verified, app-scoped Zalo user identifier.
It does not request a phone number or email address.

The Zalo Mini App ID is `2586740010836800026`, under the verified parent Zalo
App `VRena Attendance` (`675490363839227109`).

## Compliant registration flow

1. The initial screen is available without a VRena login or phone permission.
2. A user who wants a new profile selects `Đăng ký thành viên VRena`.
3. The Mini App explains that only the app-scoped Zalo user identifier is used
   and collects legal consent before profile creation.
4. The Mini App obtains the current Zalo access token and app-scoped user ID,
   then sends them to `/api/zalo/player-auth` without requesting phone access.
5. The server verifies the access token with the mandatory `appsecret_proof`,
   confirms the server-verified user ID matches the Mini App user ID, and
   creates a normal Supabase Auth user plus a VRena profile.
6. The completed profile is displayed inside the Mini App. The Mini App does
   not navigate to an external web app and does not link an existing
   traditionally authenticated account.

The Supabase service-role key and Zalo App Secret stay on the booking server.
The Mini App never receives either credential. Existing VRena accounts are not
silently linked; account linking remains a separate action after a traditional
VRena login.

## Languages

The header language selector covers the same seven languages as the VRena web
app: English, Vietnamese, Korean, Japanese, French, German and Italian. The
selection is saved under `vrena-language`, and changes the registration flow,
errors, completed profile, Privacy Policy and Terms of Use without navigating
away from the Mini App.

## Local preview

```bash
npm install
npm run dev
```

Use `?preview=registered` to render the returning-player state without a Zalo mobile
runtime. The default local preview renders the new-player state.

## Build and deploy

```bash
npm run build
zmp login
zmp deploy --existing --testing --desc "Create VRena profiles with verified Zalo Mini App user ID; no phone-number access" --outputDir dist
```

Set `VITE_API_BASE_URL` only when targeting a booking backend other than
`https://booking.vre-vietnam.com`.

Zalo version review also requires the booking backend webhook
`https://booking.vre-vietnam.com/api/zalo/webhook`. Configure its
`ZALO_OPEN_API_KEY` server environment variable with the Open API key shown by
Zalo after the Mini App review settings are complete.
