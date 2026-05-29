<!--
Sync Impact Report
Version change: 0.0.0 → 1.0.0
Modified principles:
- Template Principle 1 → I. Reality-Checked Development
- Template Principle 2 → II. Monorepo Consistency
- Template Principle 3 → III. Verification First
- Template Principle 4 → IV. Documentation Without Drift
- Template Principle 5 → V. Secure and Explicit Configuration
Added sections:
- Repository Constraints
- Delivery Workflow
Removed sections:
- None
Templates requiring updates:
- ✅ updated /home/svg153/REPOSITORIOS/0_PERSONAL/ejemplo-transversal-starter/.specify/templates/plan-template.md
- ✅ updated /home/svg153/REPOSITORIOS/0_PERSONAL/ejemplo-transversal-starter/.specify/templates/spec-template.md
- ✅ updated /home/svg153/REPOSITORIOS/0_PERSONAL/ejemplo-transversal-starter/.specify/templates/tasks-template.md
- ✅ no command templates present at /home/svg153/REPOSITORIOS/0_PERSONAL/ejemplo-transversal-starter/.specify/templates/commands
Follow-up TODOs:
- None
-->

# Task Tracker Pro Starter Constitution

## Core Principles

### I. Reality-Checked Development

Plans, specs, tasks, and implementation decisions MUST describe the starter that
exists in `apps/api/src` and `apps/web/src`, not the aspirational architecture
described elsewhere in course materials. When roadmap or course documents differ
from the implemented baseline, work MUST explicitly label the gap and state
whether it is extending the starter or documenting a future target. Rationale:
this repository is intentionally minimal, and honest scope control prevents
specification drift.

### II. Monorepo Consistency

All work MUST preserve the npm workspaces structure rooted at `apps/api` and
`apps/web`, use TypeScript with explicit types, and respect shared root scripts
for `lint`, `test`, `build`, and `smoke`. New code MUST be placed in the
appropriate app and keep route handlers thin on the backend and props/components
typed on the frontend. Rationale: consistent structure keeps the starter easy to
teach, review, and automate.

### III. Verification First

Every behavior change MUST define how it will be verified before implementation
is considered complete. Changed behavior MUST add or update the nearest relevant
automated tests unless the change is documentation-only or the user explicitly
forbids it; in those cases, the omission MUST be justified in the plan or tasks.
Before merge, contributors MUST run the smallest relevant validation set at
minimum, and cross-app or runtime wiring changes MUST include smoke validation.
Rationale: the course starter succeeds only if each increment stays demonstrable
and green.

### IV. Documentation Without Drift

Documentation MUST point to the code as the source of truth and MUST avoid
repeating mutable details that already live in code. Architecture and guidance
documents MUST distinguish between current behavior and target-course direction,
and any change affecting setup, runtime flow, or architectural decisions MUST
update the nearest relevant doc, ADR, or diagram. Rationale: concise docs age
better than duplicated prose, and this repo teaches by showing both reality and
intended evolution.

### V. Secure and Explicit Configuration

Secrets MUST never be committed, sensitive values MUST never be logged, and all
runtime configuration MUST flow through explicit config files or environment
variables. Any new required environment variable MUST be added to `.env.example`
and mirrored in a local `.env` placeholder when needed for development. Inputs
to backend routes MUST be validated, and security-sensitive decisions MUST be
documented when introduced. Rationale: educational repositories still need good
habits, especially the ones students will copy into real systems.

## Repository Constraints

- The canonical local runtime is Docker Compose, while app-specific development
  remains available through each workspace package.
- Node 22 compatibility is mandatory for tooling and source changes.
- The default verification commands are `npm run lint`, `npm test`,
  `npm run build`, and `npm run smoke`, with app-scoped commands allowed when
  the change is isolated to `apps/api` or `apps/web`.
- Backend configuration is centralized in `apps/api/src/config.ts`; frontend API
  configuration is centralized in `apps/web/src/config.ts`.
- When a change introduces architectural breadth beyond the current starter,
  the plan MUST justify the added complexity and identify the smallest viable
  increment.

## Delivery Workflow

1. Specifications MUST describe independently testable user stories and state
  whether each story extends current behavior or introduces a new course target.
2. Implementation plans MUST record the concrete repository paths touched,
  applicable verification commands, constitution gates, and any justified
  exceptions.
3. Tasks MUST be grouped by user story, include exact file paths, and contain
  explicit validation work for each story and any required cross-cutting checks.
4. Pull requests and reviews MUST confirm constitution compliance, passing
  verification, updated docs where applicable, and the absence of secrets.
5. Commits and branches MUST follow the conventions in `CONVENTIONS.md`.

## Governance

This constitution supersedes conflicting local process notes for specification,
planning, and delivery within this repository. Amendments MUST update this file,
include a Sync Impact Report, and propagate any required changes to dependent
templates before the amendment is considered complete.

Versioning policy is semantic:

- MAJOR for removing or redefining a principle in a backward-incompatible way.
- MINOR for adding a principle, section, or materially stronger obligation.
- PATCH for clarifications, wording improvements, or non-semantic cleanup.

Compliance review is mandatory in every plan and review cycle. Any constitution
violation that is intentionally accepted MUST be documented with rationale and a
simpler rejected alternative. Runtime guidance remains in `AGENTS.md`,
`README.md`, `00-START-HERE.md`, `CONVENTIONS.md`, and the docs under `docs/`.

**Version**: 1.0.0 | **Ratified**: 2026-05-29 | **Last Amended**: 2026-05-29
