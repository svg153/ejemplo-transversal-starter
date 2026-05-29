# Tasks: Database Foundation for Starter

**Input**: Design documents from `/specs/001-db-foundation/`

**Prerequisites**: `plan.md` (required), `spec.md` (required for user stories), `research.md`, `data-model.md`, `contracts/`

**Tests**: Include test tasks whenever behavior changes. Omit them only for documentation-only changes or when the specification explicitly justifies why no automated test is appropriate.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **This repository**: `apps/api/src`, `apps/api/tests`, `apps/web/src`
- **Docs**: `README.md`, `00-START-HERE.md`, `CONVENTIONS.md`, `docs/`
- **Automation**: `scripts/`, root `package.json`, `docker-compose.yml`
- Always prefer the concrete monorepo paths from `plan.md` over generic samples

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare backend persistence scaffolding and local configuration surfaces shared by all stories.

- [ ] T001 Create TypeORM data-source bootstrap in `apps/api/src/database.ts`
- [ ] T002 [P] Add database service directory scaffolding in `apps/api/src/services/database-health.ts`
- [ ] T003 [P] Document required local environment values in `.env.example`
- [ ] T004 [P] Align API package scripts for migration execution in `apps/api/package.json`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the persistence core that all user stories depend on.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [ ] T005 Create `User` entity in `apps/api/src/entities/User.ts`
- [ ] T006 [P] Create `Task` entity in `apps/api/src/entities/Task.ts`
- [ ] T007 Register entities and database options in `apps/api/src/database.ts`
- [ ] T008 Create initial TypeORM migration for baseline schema in `apps/api/src/migrations/*InitialDatabaseFoundation*.ts`
- [ ] T009 Update local Compose/bootstrap schema expectations in `infra/postgres/init.sql`

**Checkpoint**: Foundation ready — user story implementation can now begin in parallel.

---

## Phase 3: User Story 1 - Start the API with persistent storage ready (Priority: P1) 🎯 MVP

**Goal**: Boot the backend starter with PostgreSQL connectivity and preserve healthy startup behavior when persistence is available.

**Independent Test**: Start the backend with valid database configuration, run API tests, and confirm the service starts without persistence errors while `/api/health` remains available.

### Tests for User Story 1 ⚠️

> **NOTE: Define or update verification before implementation and ensure the new or changed behavior is actually exercised.**

- [ ] T010 [P] [US1] Add startup/configuration coverage for database initialization in `apps/api/tests/health.test.ts`
- [ ] T011 [P] [US1] Add database service unit coverage for connection success/failure in `apps/api/tests/database-health.test.ts`

### Implementation for User Story 1

- [ ] T012 [US1] Implement database readiness probe in `apps/api/src/services/database-health.ts`
- [ ] T013 [US1] Wire backend startup database initialization in `apps/api/src/main.ts`
- [ ] T014 [US1] Extend backend configuration for TypeORM runtime usage in `apps/api/src/config.ts`
- [ ] T015 [US1] Update backend app wiring if needed for persistence-aware startup in `apps/api/src/app.ts`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently.

**Required Validation**:

- [ ] Run `cd apps/api && npm test`
- [ ] Run `cd apps/api && npm run build`
- [ ] Run `npm run lint`

---

## Phase 4: User Story 2 - Prepare the starter for the first core records (Priority: P2)

**Goal**: Establish the baseline `User` and `Task` records plus migration-backed local schema initialization.

**Independent Test**: Run the migration-backed setup and verify the baseline schema for `User` and `Task` is available for later features.

### Tests for User Story 2 ⚠️

- [ ] T016 [P] [US2] Add migration/entity integration coverage in `apps/api/tests/database-foundation.test.ts`
- [ ] T017 [P] [US2] Add entity metadata coverage for `User` and `Task` in `apps/api/tests/entities.test.ts`

### Implementation for User Story 2

- [ ] T018 [US2] Refine `User` entity fields and relationships in `apps/api/src/entities/User.ts`
- [ ] T019 [US2] Refine `Task` entity fields and relationships in `apps/api/src/entities/Task.ts`
- [ ] T020 [US2] Finalize baseline migration contents in `apps/api/src/migrations/*InitialDatabaseFoundation*.ts`
- [ ] T021 [US2] Ensure local database initialization path works in `docker-compose.yml`

**Checkpoint**: At this point, User Stories 1 and 2 should both work independently.

**Required Validation**:

- [ ] Run `cd apps/api && npm test`
- [ ] Run `cd apps/api && npm run build`
- [ ] Run `npm run lint`

---

## Phase 5: User Story 3 - Detect persistence readiness through normal health checks (Priority: P3)

**Goal**: Make `/api/health` communicate database readiness clearly for successful and degraded local setups.

**Independent Test**: Call `/api/health` with connected and disconnected database states and confirm the contract returns the expected status code and payload.

### Tests for User Story 3 ⚠️

- [ ] T022 [P] [US3] Add contract assertions for database-aware health responses in `apps/api/tests/health.test.ts`
- [ ] T023 [P] [US3] Add smoke coverage expectations for readiness-aware health in `scripts/smoke-compose.sh`

### Implementation for User Story 3

- [ ] T024 [US3] Implement the health response contract in `apps/api/src/routes/health.ts`
- [ ] T025 [US3] Align health contract documentation in `specs/001-db-foundation/contracts/health-contract.md`
- [ ] T026 [US3] Update runtime documentation for readiness-aware health in `docs/C4-DIAGRAM.md`

**Checkpoint**: All user stories should now be independently functional.

**Required Validation**:

- [ ] Run `cd apps/api && npm test`
- [ ] Run `npm run smoke`
- [ ] Run `npm run lint`

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Finish documentation and cross-cutting validation for the full feature.

- [ ] T027 [P] Update setup guidance for DB foundation in `README.md`
- [ ] T028 Reconcile quickstart verification steps in `specs/001-db-foundation/quickstart.md`
- [ ] T029 [P] Verify local environment placeholders remain accurate in `.env.example`
- [ ] T030 Run full cross-workspace verification using root commands from `package.json`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — blocks all user stories
- **User Stories (Phase 3+)**: Depend on Foundational completion
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Foundational and delivers the MVP backend startup path
- **User Story 2 (P2)**: Starts after Foundational and builds on the shared entity/migration base
- **User Story 3 (P3)**: Starts after Foundational and depends on health/database service behavior from US1

### Within Each User Story

- Verification tasks MUST be present before implementation is considered done
- Entity/model work before migration finalization
- Service/database bootstrapping before route integration
- Route/contract changes before smoke/doc reconciliation

### Parallel Opportunities

- `T002`, `T003`, and `T004` can run in parallel after `T001`
- `T005` and `T006` can run in parallel during Foundational work
- `T010` and `T011` can run in parallel inside US1
- `T016` and `T017` can run in parallel inside US2
- `T022` and `T023` can run in parallel inside US3
- `T027` and `T029` can run in parallel during Polish

---

## Parallel Example: User Story 1

```text
Task: "T010 [P] [US1] Add startup/configuration coverage for database initialization in apps/api/tests/health.test.ts"
Task: "T011 [P] [US1] Add database service unit coverage for connection success/failure in apps/api/tests/database-health.test.ts"
```

## Parallel Example: User Story 2

```text
Task: "T016 [P] [US2] Add migration/entity integration coverage in apps/api/tests/database-foundation.test.ts"
Task: "T017 [P] [US2] Add entity metadata coverage for User and Task in apps/api/tests/entities.test.ts"
```

## Parallel Example: User Story 3

```text
Task: "T022 [P] [US3] Add contract assertions for database-aware health responses in apps/api/tests/health.test.ts"
Task: "T023 [P] [US3] Add smoke coverage expectations for readiness-aware health in scripts/smoke-compose.sh"
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Validate backend startup + health behavior before expanding scope

### Incremental Delivery

1. Establish persistence scaffolding and entities
2. Deliver backend startup with database readiness (US1)
3. Deliver baseline schema and migration support (US2)
4. Deliver readiness-aware health contract and smoke verification (US3)
5. Finish documentation and full verification (Phase 6)

### Parallel Team Strategy

With multiple contributors:

1. One contributor finishes Setup/Foundational work
2. After the foundation is stable:
   - Contributor A handles US1 runtime bootstrapping
   - Contributor B handles US2 entity/migration refinement
   - Contributor C handles US3 health contract + smoke validation

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] labels map tasks to specific user stories for traceability
- Each user story is independently testable from the spec's acceptance criteria
- Verify the selected automated checks exercise the changed behavior
- Commit after each task or logical group
- Avoid vague tasks, same-file conflicts, and hidden cross-story dependencies
