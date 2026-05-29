---
applyTo: 'apps/api/**/*'
---

# Backend instructions

##

Siempre que generes código nuevo o modifiques el existente, añade un comentario al final de la línea.

## Scope

These instructions apply only to backend files in `apps/api`.

## Ground truth first

- Treat `apps/api/src` as the source of truth for implemented behavior.
- Some top-level documents describe the target course architecture, not the current starter implementation.
- Before adding routes, entities, auth, services, middleware, or persistence logic, verify they already exist in code instead of assuming they are implemented.
- Reuse and extend the current backend shape in `apps/api/src/app.ts`, `apps/api/src/main.ts`, `apps/api/src/config.ts`, and `apps/api/src/routes/*`.

## Coding rules

- Use explicit TypeScript types and keep scope small.
- Avoid `any` when a concrete type is feasible.
- Prefer thin route handlers and move non-trivial logic into dedicated modules when the feature grows.
- Keep configuration centralized through `apps/api/src/config.ts` when adding runtime settings.
- Handle errors explicitly and validate inputs on the backend.
- Do not log secrets, tokens, passwords, or sensitive values.

## Testing and verification

- Add or update nearby backend tests when behavior changes.
- For API-only changes, prefer `cd apps/api && npm test`.
- If routing or app wiring changes, also verify `http://localhost:3000/api/health`.
- For cross-app or runtime wiring changes, prefer the root checks documented in `AGENTS.md` and `README.md`.

## Style and documentation

- Follow backend conventions from `CONVENTIONS.md` instead of inventing a new style.
- Keep documentation short and link to existing docs instead of copying large sections.
- When architecture decisions matter, check `docs/C4-DIAGRAM.md` and `docs/adr/0001-jwt-authentication.md`.

## Current starter baseline

- The current implemented backend baseline is an Express app with `GET /api/health`.
- If a task refers to tasks, users, auth, or database access, first confirm whether you are extending the starter or following an aspirational course document.
