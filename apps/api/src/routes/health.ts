import { Router } from "express"; // Build a tiny router for the API health endpoint.

import { config } from "../config"; // Reuse the shared runtime configuration.
import { getDatabaseHealthStatus } from "../services/database-health"; // Keep the route thin by delegating the DB probe.

type HealthResponse = {
  // Define the stable health-check payload explicitly.
  status: "ok" | "error"; // Surface whether the API is fully healthy.
  database: "connected" | "disconnected"; // Surface the live database connection status.
}; // Finish the health response contract.

const healthRouter = Router(); // Create the router instance.

healthRouter.get(`${config.apiBasePath}/health`, async (_request, response) => {
  // Expose the health endpoint under the API base path.
  const database = await getDatabaseHealthStatus(); // Probe the database connection when the route is called.
  const payload: HealthResponse = {
    // Build the stable response payload from the probe result.
    status: database === "connected" ? "ok" : "error", // Mark the API unhealthy when the database is unavailable.
    database, // Return the database status explicitly for diagnostics.
  }; // Finish the health response payload.

  response.status(payload.status === "ok" ? 200 : 503).json(payload); // Return an HTTP status that matches the runtime health state.
}); // Finish the health route handler.

export default healthRouter; // Export the router for app wiring.
