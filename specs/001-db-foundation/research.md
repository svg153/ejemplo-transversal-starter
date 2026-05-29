# Research: Database Foundation for Starter

## Decision 1: Use TypeORM as the first persistence integration layer

**Decision**: Use the TypeORM package already declared in `apps/api/package.json` as the backend persistence layer.

**Rationale**: The repository documentation and issue scope already point to TypeORM, and using the existing dependency avoids introducing a second data access pattern. It also matches the educational goal of giving later exercises a recognizable ORM baseline.

**Alternatives considered**:

- Use raw `pg` queries only — rejected because it would create a lower-level persistence style than the course materials expect.
- Replace TypeORM with a different ORM — rejected because it would diverge from the issue scope and existing package declarations.

## Decision 2: Model the first baseline entities as `User` and `Task`

**Decision**: Create baseline persistence entities for `User` and `Task`.

**Rationale**: Issue #1 explicitly names those entities, and they form the minimum course-domain foundation for later auth and task-management work.

**Alternatives considered**:

- Introduce only one entity — rejected because the issue scope requires both people and work-item foundations.
- Add more entities now — rejected because that would exceed the smallest viable increment for the starter.

## Decision 3: Add an initial migration for local setup parity

**Decision**: Create and run an initial database migration as part of local Compose-backed setup.

**Rationale**: The issue calls for migration initialization, and a migration makes the starter's baseline schema explicit, reviewable, and repeatable.

**Alternatives considered**:

- Rely only on SQL bootstrap scripts — rejected because the issue explicitly asks for TypeORM-based database foundation work.
- Auto-sync schema without migrations — rejected because it hides schema evolution and weakens future teaching examples.

## Decision 4: Keep health checks tied to real database readiness

**Decision**: Treat the existing `/api/health` endpoint as a readiness-aware health signal that reports database connectivity and can fail when the database is unavailable.

**Rationale**: The current code and tests already implement this semantics, and issue #1 explicitly asks to validate database connection through the health check.

**Alternatives considered**:

- Keep health liveness-only and return 200 even if the database is down — rejected because it would conflict with the current implemented route behavior.
- Add a separate readiness endpoint immediately — rejected because it is a larger API surface change than this foundation task requires.

## Decision 5: Preserve central configuration and local defaults

**Decision**: Keep database settings centralized in `apps/api/src/config.ts` and continue using `.env.example` plus Compose environment values as the source of local configuration.

**Rationale**: This matches the repository constitution and keeps the starter's runtime story simple for learners.

**Alternatives considered**:

- Scatter config across modules — rejected because it breaks the repo's explicit config convention.
- Require secrets or environment variables not documented in `.env.example` — rejected because it violates the constitution's configuration rules.
