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
3. The Mini App explains the purpose and collects legal consent before making
   any permission request.
4. After the user selects `Đăng ký bằng số điện thoại Zalo`, the Mini App checks
   the current phone permission with `getSetting` and requests
   `scope.userPhonenumber` in context. It does not call the account-status API
   before this authorization step.
5. The Mini App then obtains the current Zalo access token and app-scoped user
   ID before requesting the one-time phone token, and sends that exact session
   pair to `/api/zalo/player-auth`.
6. The server first decodes the one-time phone token with `ZALO_APP_SECRET`,
   verifies the access token with the mandatory `appsecret_proof`, confirms the
   server-verified user ID matches the Mini App user ID, and creates a normal
   Supabase Auth user plus a VRena profile.
7. The completed profile is displayed inside the Mini App. The Mini App does
   not navigate to an external web app and does not link an existing
   traditionally authenticated account.

The Supabase service-role key and Zalo App Secret stay on the booking server.
The Mini App never receives either credential. Existing VRena accounts are not
silently taken over based only on a matching phone number; staff support is
required for an existing-account case.

## Languages

The header language selector covers the same seven languages as the VRena web
app: English, Vietnamese, Korean, Japanese, French, German and Italian. The
selection is saved under `vrena-language`, and changes the registration flow,
errors, completed profile, Privacy Policy and Terms of Use without navigating
away from the Mini App.

## Zalo phone-decoding infrastructure

Zalo restricts personal-user-data responses, including decoded phone numbers,
to backend requests whose public egress IP is located in Vietnam. The production
`/api/zalo/player-auth` route must therefore decode the one-time phone token
through Vietnam-origin infrastructure. A deployment running only from Vercel's
US region cannot complete phone registration and receives Zalo error `-501`.

Keep `ZALO_APP_SECRET` server-side. Do not move phone-token decoding into the
Mini App to bypass this restriction.

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
