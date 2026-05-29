# AGENTS.md

This repository is a small npm-workspaces starter used in an AI-for-developers course. Keep agent guidance short, verify assumptions in code, and link to the existing docs instead of copying them.

## Start here

- Read [`00-START-HERE.md`](./00-START-HERE.md) for repo orientation.
- Read [`README.md`](./README.md) for setup and root commands.
- Read [`CONVENTIONS.md`](./CONVENTIONS.md) for code style, commit format, PR expectations, and testing norms.
- Read [`docs/C4-DIAGRAM.md`](./docs/C4-DIAGRAM.md) and [`docs/adr/0001-jwt-authentication.md`](./docs/adr/0001-jwt-authentication.md) when the task touches architecture or course decisions.

## Reality check before coding

- Several top-level docs describe the **target course architecture**, not the fully implemented starter.
- Verify behavior against `apps/api/src` and `apps/web/src` before assuming routes, entities, auth flows, or database layers already exist.
- The current implemented baseline is intentionally small:
  - API: Express app with `GET /api/health` in [`apps/api/src/routes/health.ts`](./apps/api/src/routes/health.ts)
  - Web: placeholder React screen in [`apps/web/src/App.tsx`](./apps/web/src/App.tsx)
- If a task needs `tasks`, `users`, `auth`, `services`, or `middleware`, check whether you are extending the starter or following an aspirational doc.

## Repo shape

- `apps/api`: Express 5 + TypeScript backend, Jest tests, ESLint, Prettier
- `apps/web`: React 19 + Vite frontend, Vitest tests, ESLint, Prettier
- `docker-compose.yml`: preferred local full-stack runtime
- `scripts/smoke-compose.sh`: end-to-end smoke check using Docker Compose
- `.github/workflows/`: CI for lint, test, build, and smoke

## Commands agents should prefer

### From the repo root

- `npm install`
- `npm run lint`
- `npm test`
- `npm run build`
- `npm run smoke`
- `docker compose up -d`
- `docker compose down`

### App-specific

- API (`apps/api`): `npm run dev`, `npm test`, `npm run build`, `npm run lint`
- Web (`apps/web`): `npm run dev`, `npm test`, `npm run build`, `npm run lint`

## Working conventions

- Keep TypeScript explicit and small-scope; avoid introducing `any` when a real type is feasible.
- Follow the backend and frontend examples in [`CONVENTIONS.md`](./CONVENTIONS.md) instead of inventing a new style.
- Prefer thin route handlers and typed frontend props.
- Add or update nearby tests when behavior changes.
- Follow Conventional Commits and the branch naming guidance in [`CONVENTIONS.md`](./CONVENTIONS.md).
- Do not commit secrets or log sensitive values.

## Environment and runtime notes

- `.env.example` is the source of local variables; create a local `.env` when needed.
- CI runs on Node 22, so keep tooling and syntax compatible with Node 22.
- API config is centralized in [`apps/api/src/config.ts`](./apps/api/src/config.ts).
- Frontend API base URL comes from [`apps/web/src/config.ts`](./apps/web/src/config.ts).

## Verification shortcuts

- API-only change: run `cd apps/api && npm test`
- Web-only change: run `cd apps/web && npm test`
- Cross-app, container, or integration change: run `npm run smoke`
- If you touch routing or app wiring, manually verify `http://localhost:3000/api/health`

## Important file map

- API entrypoint: [`apps/api/src/main.ts`](./apps/api/src/main.ts)
- API app wiring: [`apps/api/src/app.ts`](./apps/api/src/app.ts)
- Web entrypoint: [`apps/web/src/main.tsx`](./apps/web/src/main.tsx)
- Web root component: [`apps/web/src/App.tsx`](./apps/web/src/App.tsx)
- Root workspace scripts: [`package.json`](./package.json)

## Note on older documentation references

Some repository docs still mention a root `.copilot-instructions.md`. Treat this `AGENTS.md` as the current agent-facing instructions file unless the repo later adds or replaces it.
