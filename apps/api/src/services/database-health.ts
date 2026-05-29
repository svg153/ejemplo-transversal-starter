import { appDataSource } from '../database'; // Reuse the shared database connection state.

export type DatabaseHealthStatus = 'connected' | 'disconnected'; // Define the stable database health states.

export async function getDatabaseHealthStatus(): Promise<DatabaseHealthStatus> { // Probe the current database connection state for the health route.
  if (!appDataSource.isInitialized) { // Treat an uninitialized data source as unavailable.
    return 'disconnected'; // Report the disconnected state explicitly.
  } // Finish the initialization guard.

  try { // Probe the current connection with a lightweight query.
    await appDataSource.query('SELECT 1'); // Verify the database accepts a trivial round-trip query.

    return 'connected'; // Report a healthy database connection.
  } catch { // Fall back to a disconnected state when the probe fails.
    return 'disconnected'; // Report the degraded database connection.
  } // Finish the database probe.
} // Export the health helper.