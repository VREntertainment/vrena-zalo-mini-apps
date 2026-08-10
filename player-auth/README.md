# VRena Player — Zalo Mini App

This customer-facing Mini App explains VRena player membership and optionally
creates a new VRena player profile using a Zalo-verified Vietnamese phone
number. Guests can use the informational Mini App without signing in or sharing
a phone number. Email is not requested.

The Zalo Mini App ID is `2586740010836800026`, under the verified parent Zalo
App `VRena Attendance` (`675490363839227109`).

## Compliant registration flow

1. The initial screen is available without login or personal-data permission.
2. A user who wants a new profile selects `Đăng ký thành viên VRena`.
3. The Mini App checks whether the Zalo user already has a VRena profile by
   sending the current Zalo access token to `/api/zalo/player-auth`.
4. Only for a new registration, the Mini App explains the purpose, collects
   legal consent, checks the current phone permission with `getSetting`, and
   requests `scope.userPhonenumber` in context.
5. The server verifies the Zalo access token with the mandatory
   `appsecret_proof`, decodes the one-time phone token with `ZALO_APP_SECRET`,
   and creates a normal Supabase Auth user plus a VRena profile.
6. The completed profile is displayed inside the Mini App. The Mini App does
   not navigate to an external web app and does not link an existing
   traditionally authenticated account.

The Supabase service-role key and Zalo App Secret stay on the booking server.
The Mini App never receives either credential. Existing VRena accounts are not
silently taken over based only on a matching phone number; staff support is
required for an existing-account case.

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
zmp deploy --existing --testing --desc "Guest-first VRena member registration compliant with Zalo policies 6.1, 6.3, 6.4 and 6.5" --outputDir dist
```

Set `VITE_API_BASE_URL` only when targeting a booking backend other than
`https://booking.vre-vietnam.com`.

Zalo version review also requires the booking backend webhook
`https://booking.vre-vietnam.com/api/zalo/webhook`. Configure its
`ZALO_OPEN_API_KEY` server environment variable with the Open API key shown by
Zalo after the Mini App review settings are complete.
