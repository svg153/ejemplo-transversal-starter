import dotenv from 'dotenv'; // Load runtime configuration from the local environment.

dotenv.config({ quiet: true }); // Read variables from `.env` without noisy startup logs.

const DEFAULT_PORT = 3000; // Keep the starter API port stable by default.
const DEFAULT_DATABASE_URL = 'postgresql://postgres:postgres@localhost:5432/task_tracker'; // Mirror the documented local PostgreSQL connection string.
const rawPort = process.env.PORT; // Read the optional port override from the environment.
const resolvedPort = rawPort ? Number(rawPort) : DEFAULT_PORT; // Normalize the port while preserving the starter default.
const databaseUrl = process.env.DATABASE_URL ?? DEFAULT_DATABASE_URL; // Provide a working default for local development and tests.

if (!Number.isInteger(resolvedPort) || resolvedPort <= 0) { // Reject invalid ports early during startup.
  throw new Error('PORT must be a positive integer'); // Fail fast with an explicit configuration error.
} // Finish the port validation.

export const config = { // Centralize the runtime configuration for the backend.
  host: '0.0.0.0', // Bind to all interfaces for local Docker and direct execution.
  port: resolvedPort, // Expose the validated HTTP port.
  apiBasePath: '/api', // Keep the API prefix consistent with the starter.
  database: { // Group database settings under one explicit namespace.
    url: databaseUrl, // Expose the PostgreSQL connection string to the data source.
    logging: process.env.NODE_ENV === 'development', // Keep SQL logging available only for local development.
  }, // Finish the database configuration block.
}; // Export the resolved backend configuration.
