#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cleanup() {
  cd "$ROOT_DIR"
  docker compose down --volumes >/dev/null 2>&1 || true
}

dump_diagnostics() {
  cd "$ROOT_DIR"
  echo "Smoke diagnostics:" >&2
  docker compose ps >&2 || true
  echo "--- db logs ---" >&2
  docker compose logs --no-color --tail=100 db >&2 || true
  echo "--- api logs ---" >&2
  docker compose logs --no-color --tail=100 api >&2 || true
  echo "--- web logs ---" >&2
  docker compose logs --no-color --tail=100 web >&2 || true
}

wait_for_url() {
  local url="$1"
  local attempts=30

  while (( attempts > 0 )); do
    if curl --fail --show-error --silent "$url" >/dev/null; then
      return 0
    fi

    attempts=$((attempts - 1))
    sleep 2
  done

  echo "No response from $url after waiting" >&2
  dump_diagnostics
  return 1
}

trap cleanup EXIT

cd "$ROOT_DIR"
docker compose up -d --build

wait_for_url "http://localhost:3000/api/health"
wait_for_url "http://localhost:5173"

curl --fail --show-error --silent "http://localhost:3000/api/health"
curl --fail --show-error --silent --head "http://localhost:5173" | head -n 1
