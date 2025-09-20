# WAEC Quiz Platform

Welcome to the WAEC Quiz Platform — a Next.js frontend and an Express + TypeScript backend that let users practice past WAEC questions and compete live.

This README focuses on local setup, environment variables, and how to run the apps for development. For deployment, see the `infra/` folder.

## Repository layout

- `apps/web` — Next.js frontend
- `apps/api` — Express backend (TypeScript)
- `packages/shared` — shared UI/components/types
- `infra` — Docker and Kubernetes manifests
- `scripts` — helper scripts (migrations/seed)

## Environment variables

The project includes a root `.env.example` describing required values. Local development helpers have been added at:

- `apps/api/.env.local` — example local variables for the API
- `apps/web/.env.local` — example local variables for the Web app

Required variables (summary):

- `DATABASE_URL` — Postgres connection string used by the API/Prisma
- `GOOGLE_CLIENT_ID` — Google OAuth client id (used by API and web)
- `GOOGLE_CLIENT_SECRET` — Google OAuth client secret (used by API)
- `JWT_SECRET` — Secret for signing JWTs in the API
- `NEXT_PUBLIC_API_URL` — Client-side API base URL (exposed to browser)
- `NEXT_PUBLIC_GOOGLE_LOGIN_REDIRECT` — Client redirect URL for Google OAuth
- `PORT` — API port (default 5000)
- `NODE_ENV` — environment (development/production)

Notes:
- Files named `.env.local` in `apps/web` and `apps/api` are ignored by Git and are automatically loaded by Next.js and (for the API) by `dotenv` which is already wired into `apps/api/src/index.ts`.
- Any variables that must be available in the browser should be prefixed with `NEXT_PUBLIC_`.

## Running locally (development)

You can use `npm`, `pnpm`, or `yarn` depending on your preference. Examples below use `npm`.

1) Install dependencies

From the repo root (this is a monorepo — use your preferred workspace workflow):

```bash
# Option A: install top-level with pnpm workspace
pnpm install

# Option B: install per-package (if not using a workspace manager)
cd apps/api && npm install
cd ../web && npm install
```

2) Ensure environment variables are set

Edit `apps/api/.env.local` and `apps/web/.env.local` with your values (do not commit these files).

3) Start the API and Web apps

Open two terminals (or use a multiplexer):

Terminal A — API

```bash
cd apps/api
npm run dev
```

Terminal B — Web

```bash
cd apps/web
npm run dev
```

By default, Next.js runs on `http://localhost:3000` and the API on `http://localhost:5000` (unless you change `PORT` in the env file).

## Docker & Kubernetes notes

- Docker: place env values in a `.env` file referenced by `docker-compose.yml` or pass them in the compose `environment` block. Keep secrets out of source control.
- Kubernetes: create `Secret` resources for sensitive values (DATABASE_URL, JWT_SECRET, GOOGLE_CLIENT_SECRET) and reference them in your Pod/Deployment env entries.

## CI / Hosting

- In CI (GitHub Actions, GitLab CI, etc.) store secrets in the project settings and inject them into build / deploy steps.
- For Next.js hosting (Vercel, Netlify), set `NEXT_PUBLIC_*` and other build-time variables in the provider's dashboard so they are available at build-time.

## Troubleshooting

- Missing env at runtime: ensure `.env.local` exists and (for the API) that the server process was restarted after edits. The API now uses `dotenv` to load local env values on startup.
- Google OAuth errors: confirm `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET` and that redirect URIs configured in Google Cloud Console match `NEXT_PUBLIC_GOOGLE_LOGIN_REDIRECT`.

## Contributing

Please open issues or PRs for improvements. Keep secrets out of commits.

## License

MIT