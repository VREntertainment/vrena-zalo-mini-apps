# VRena Zalo Mini Apps

Independent Zalo Mini App clients used by VR Entertainment:

- `employee-attendance/` — staff attendance and workplace verification.
- `player-auth/` — account-free VRena Player information guide.

Each client has its own setup, build, and Zalo deployment instructions in its directory.

Server-backed Mini Apps keep their APIs, Supabase migrations and secrets in
[`VREntertainment/vrena-booking`](https://github.com/VREntertainment/vrena-booking).
The account-free Player guide does not call that backend.
