import path from 'node:path'; // Resolve the repository-root environment file explicitly.

import dotenv from 'dotenv'; // Load environment variables before resolving runtime config.

dotenv.config({ path: path.resolve(__dirname, '../../../.env'), quiet: true }); // Read the shared repository-root environment file for local runs and tests.

const DEFAULT_PORT = 3000; // Keep the starter default port explicit.
const DEFAULT_DATABASE_URL = 'postgresql://postgres:postgres@localhost:5432/task_tracker'; // Mirror the documented local PostgreSQL connection string.
const rawPort = process.env.PORT; // Read the raw port value from the environment.
const resolvedPort = rawPort ? Number(rawPort) : DEFAULT_PORT; // Normalize the port to a number with a safe default.
const rawDatabaseUrl = process.env.DATABASE_URL; // Read the database connection string from the environment.
const resolvedDatabaseUrl = rawDatabaseUrl?.trim() || DEFAULT_DATABASE_URL; // Normalize the database URL with a safe local default.
const rawJwtSecret = process.env.JWT_SECRET; // Read the JWT signing secret from the environment.
const resolvedJwtSecret = rawJwtSecret?.trim(); // Normalize the JWT secret to a trimmed string.

if (!Number.isInteger(resolvedPort) || resolvedPort <= 0) { // Reject invalid port values early during startup.
  throw new Error('PORT must be a positive integer'); // Fail fast when the configured port is invalid.
} // Finish the port validation guard.

if (!resolvedJwtSecret) { // Ensure JWT verification never runs without a configured secret.
  throw new Error('JWT_SECRET is required'); // Fail fast when the JWT secret is missing.
} // Finish the JWT secret validation guard.

export const config = { // Centralize runtime configuration in one exported object.
  host: '0.0.0.0', // Expose the server on all container-friendly interfaces.
  port: resolvedPort, // Reuse the validated numeric port.
  apiBasePath: '/api', // Keep the shared API base path explicit.
  database: { // Group database configuration under one explicit namespace.
    url: resolvedDatabaseUrl, // Expose the validated database connection string.
    logging: process.env.NODE_ENV === 'development', // Enable SQL logging only in local development.
  }, // Finish the database configuration block.
  jwtSecret: resolvedJwtSecret, // Expose the validated JWT secret for verification.
} as const; // Freeze the config shape for safer downstream usage.
