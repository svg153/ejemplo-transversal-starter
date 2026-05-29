import { Router } from "express"; // Build a tiny router for the version endpoint.
import packageJson from "../../package.json"; // Reuse the API package metadata as the source of truth.

import { config } from "../config"; // Reuse shared runtime configuration.

type VersionResponse = {
  // Define the stable response contract explicitly.
  name: string; // Surface the backend package name.
  version: string; // Surface the backend package version.
  apiBasePath: string; // Surface the configured API base path.
}; // Close the response contract.

const versionRouter = Router(); // Create the router instance.

const versionResponse: Readonly<VersionResponse> = {
  // Build a stable response payload once.
  name: packageJson.name, // Reuse the real package name.
  version: packageJson.version, // Reuse the real package version.
  apiBasePath: config.apiBasePath, // Reuse the configured API base path.
}; // Finish the stable response payload.

versionRouter.get(`${config.apiBasePath}/version`, (_request, response) => {
  // Expose the version endpoint under the API base path.
  response.status(200).json(versionResponse); // Return the stable version payload.
}); // Finish the route handler.

export default versionRouter; // Export the router for app wiring.
