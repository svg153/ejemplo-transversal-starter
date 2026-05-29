import { appDataSource, initializeDatabase } from '../database'; // Reuse the shared data-source lifecycle helpers.

export type DatabaseHealthStatus = 'connected' | 'disconnected'; // Constrain the database health states explicitly.

export async function getDatabaseHealthStatus(): Promise<DatabaseHealthStatus> { // Probe the live database connectivity state.
  try { // Attempt to initialize and query the configured database.
    await initializeDatabase(); // Ensure the data source is ready before probing it.
    await appDataSource.query('SELECT 1'); // Run a cheap liveness query against PostgreSQL.

    return 'connected'; // Report a healthy database connection.
  } catch { // Swallow connection details so secrets are never surfaced from health checks.
    return 'disconnected'; // Report a degraded database connection state.
  } // Finish the probe branches.
} // Finish the health probe helper.
