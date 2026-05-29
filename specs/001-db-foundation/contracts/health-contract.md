# Contract: API Health with Database Readiness

## Endpoint

- **Path**: `/api/health`
- **Method**: `GET`

## Purpose

Expose whether the backend starter is operational and whether the configured database connection is currently available.

## Response Contract

### Healthy database

- **Status code**: `200`
- **Body**:

```json
{
  "status": "ok",
  "database": "connected"
}
```

### Unavailable database

- **Status code**: `503`
- **Body**:

```json
{
  "status": "error",
  "database": "disconnected"
}
```

## Notes

- This contract reflects the current implemented health semantics in the starter.
- The route should remain thin and delegate the actual database probe to a service-layer helper.
- Changes to this contract require updates to API tests and smoke expectations where applicable.
