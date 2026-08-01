# VRena Zalo Mini Apps

Independent Zalo Mini App clients used by VR Entertainment:

- `employee-attendance/` — staff attendance and workplace verification.
- `player-auth/` — player sign-in and account creation with a Zalo-verified phone number.

Each client has its own setup, build, and Zalo deployment instructions in its directory.

The server-side APIs, Supabase migrations, and secrets remain in
[`VREntertainment/vrena-booking`](https://github.com/VREntertainment/vrena-booking).
The clients communicate with that deployed backend over HTTPS; they are not bundled into
the Next.js web application.
