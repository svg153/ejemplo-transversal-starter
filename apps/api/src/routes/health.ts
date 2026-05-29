import { Router } from 'express'; // Build the small health router used by the starter API.

import { config } from '../config'; // Reuse the shared API base path configuration.
import { requireAuth } from '../middleware/auth.middleware'; // Reuse the JWT middleware for protected health checks.
import { getDatabaseHealthStatus } from '../services/database-health'; // Probe the configured database through a dedicated service.

type HealthResponse = { // Describe the public health payload explicitly.
  status: 'ok' | 'error'; // Surface whether the API is fully healthy.
  database: 'connected' | 'disconnected'; // Surface the live database connection status.
}; // Finish the health response contract.

const healthRouter = Router(); // Create the router instance once for app wiring.

healthRouter.get(`${config.apiBasePath}/health`, async (_request, response) => { // Surface health based on database readiness.
  const database = await getDatabaseHealthStatus(); // Probe the database connection when the route is called.
  const payload: HealthResponse = { // Build the response payload from the probe result.
    status: database === 'connected' ? 'ok' : 'error', // Mark the API unhealthy when the database is unavailable.
    database, // Return the database status explicitly for diagnostics.
  }; // Finish the health response payload.

  response.status(payload.status === 'ok' ? 200 : 503).json(payload); // Return an HTTP status that matches the runtime health state.
}); // Finish the public health route.

healthRouter.get(`${config.apiBasePath}/health/protected`, requireAuth, (request, response) => { // Add a minimal protected route to validate auth wiring incrementally.
  response.status(200).json({ status: 'ok', user: request.user }); // Return the authenticated user so tests can prove request injection.
}); // Finish the protected health route.

export default healthRouter; // Export the router for the main app.
