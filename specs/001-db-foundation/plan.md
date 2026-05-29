# Implementation Plan: Database Foundation for Starter

**Branch**: `[feat/1-typeorm-db-foundation]` | **Date**: 2026-05-29 | **Spec**: [`specs/001-db-foundation/spec.md`](./spec.md)

**Input**: Feature specification from `/specs/001-db-foundation/spec.md`

**Note**: This plan was generated directly from the active spec and the current repository state.

## Summary

Add the first real persistence foundation to the backend starter by wiring the
API to PostgreSQL through TypeORM, introducing baseline `User` and `Task`
entities plus an initial migration, and making service health reflect database
readiness. The work extends the current starter rather than assuming the full
course architecture already exists.

## Technical Context

**Language/Version**: TypeScript on Node 22-compatible tooling

**Primary Dependencies**: Express 5, TypeORM, pg, dotenv, Jest, Docker Compose

**Storage**: PostgreSQL 16 in local Docker Compose and local direct execution via `DATABASE_URL`

**Testing**: Jest for API tests, root workspace test/lint/build scripts, Docker Compose smoke validation

**Target Platform**: Linux/macOS/WSL local developer environment running Node and Docker

**Project Type**: Web application monorepo with Express backend and React frontend

**Performance Goals**: Backend startup should complete with persistence ready in normal local development flows; health checks should return quickly enough for smoke automation and manual setup verification

**Constraints**: Preserve the monorepo structure; keep route handlers thin; centralize backend config in `apps/api/src/config.ts`; avoid undocumented secrets; keep docs aligned with current starter behavior

**Scale/Scope**: Foundational backend persistence only; no end-user task CRUD or auth flows beyond the baseline entities needed for future work

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Confirms the work extends the implemented starter in `apps/api/src` and does not assume the roadmap is already built
- [x] Uses the real monorepo structure and names the concrete backend, infra, and docs paths expected to change
- [x] Defines relevant validation commands: `cd apps/api && npm test`, `cd apps/api && npm run build`, `npm run lint`, and `npm run smoke`
- [x] Identifies documentation updates needed in `.env.example`, `README.md`, and `docs/C4-DIAGRAM.md` if runtime behavior changes materially
- [x] Lists configuration/security implications for `DATABASE_URL` and any new TypeORM wiring

## Project Structure

### Documentation (this feature)

```text
specs/001-db-foundation/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── health-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
apps/
├── api/
│   ├── src/
│   │   ├── app.ts
│   │   ├── config.ts
│   │   ├── main.ts
│   │   ├── routes/
│   │   │   └── health.ts
│   │   ├── database.ts
│   │   ├── entities/
│   │   ├── migrations/
│   │   └── services/
│   │       └── database-health.ts
│   └── tests/
│       └── health.test.ts
└── web/
    └── src/

infra/
└── postgres/
    └── init.sql

docs/
└── C4-DIAGRAM.md

.env.example
docker-compose.yml
```

**Structure Decision**: Keep all implementation inside the existing monorepo and add persistence-specific backend modules under `apps/api/src`. No new package or service is needed because this feature only establishes backend persistence and local infrastructure.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
| --------- | ---------- | ------------------------------------ |
| None | N/A | N/A |
