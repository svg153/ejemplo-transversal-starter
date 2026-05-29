import { Router } from 'express'; // Build the small health router used by the starter API.

import { config } from '../config'; // Reuse the shared API base path configuration.
import { requireAuth } from '../middleware/auth.middleware'; // Reuse the JWT middleware for protected health checks.

const healthRouter = Router(); // Create the router instance once for app wiring.

healthRouter.get(`${config.apiBasePath}/health`, (_request, response) => { // Keep the public health endpoint unchanged.
  response.status(200).json({ status: 'ok' }); // Return the minimal public health payload.
}); // Finish the public health route.

healthRouter.get(`${config.apiBasePath}/health/protected`, requireAuth, (request, response) => { // Add a minimal protected route to validate auth wiring incrementally.
  response.status(200).json({ status: 'ok', user: request.user }); // Return the authenticated user so tests can prove request injection.
}); // Finish the protected health route.

export default healthRouter; // Export the router for the main app.
