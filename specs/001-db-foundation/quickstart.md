# Quickstart: Database Foundation for Starter

## Goal

Validate that the backend starter can boot with PostgreSQL, initialize the first persistence foundation, and expose health that reflects database readiness.

## Prerequisites

- Node 22-compatible environment
- npm dependencies installed at the repository root
- Docker and Docker Compose available locally
- Local `.env` created from `.env.example` when running outside Compose

## Fast validation path

1. Start the local stack with Docker Compose from the repository root.
2. Wait for the database and API containers to become healthy.
3. Call `http://localhost:3000/api/health`.
4. Confirm the response shows database connectivity and a healthy status.

## Backend-only validation path

1. Ensure PostgreSQL is reachable using the connection string in `.env`.
2. Start the API from `apps/api`.
3. Run the API test suite.
4. Confirm the health endpoint remains available and reflects the database state correctly.

## Recommended verification commands

- `cd apps/api && npm test`
- `cd apps/api && npm run build`
- `npm run lint`
- `npm run smoke`

## Expected outcome

- Backend starts without persistence configuration errors
- Baseline schema is initialized for `User` and `Task`
- `/api/health` returns `200` with database `connected` when the database is ready
- `/api/health` returns `503` with database `disconnected` when the database is unavailable
