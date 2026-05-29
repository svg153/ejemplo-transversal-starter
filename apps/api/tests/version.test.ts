import { createServer, Server } from 'node:http'; // Use a real HTTP server like the existing backend tests.
import { AddressInfo } from 'node:net'; // Read the ephemeral port chosen by the OS.

import packageJson from '../package.json'; // Reuse the API package metadata as the expected value.
import app from '../src/app'; // Exercise the real Express app wiring.
import { config } from '../src/config'; // Reuse the configured API base path in assertions.

describe(`GET ${config.apiBasePath}/version`, () => { // Keep the test name aligned with the runtime route.
  let server: Server; // Hold the per-test HTTP server instance.

  afterEach(async () => { // Close the server after each test to avoid port leaks.
    if (!server) { // Skip shutdown when the test never started the server.
      return; // Nothing to close in this case.
    } // Finish the guard clause.

    await new Promise<void>((resolve, reject) => { // Wrap the callback API for async cleanup.
      server.close((error) => { // Stop the temporary HTTP server.
        if (error) { // Bubble up shutdown failures explicitly.
          reject(error); // Fail the test when cleanup breaks.
          return; // Prevent resolve from running after reject.
        } // Finish the error branch.

        resolve(); // Signal that cleanup completed successfully.
      }); // Finish the server shutdown callback.
    }); // Finish the cleanup promise.
  }); // Finish per-test cleanup.

  it('returns the backend package metadata and api base path', async () => { // Verify the full stable payload.
    server = createServer(app); // Start the app through a real HTTP server.

    await new Promise<void>((resolve) => { // Wait for the server to bind an ephemeral port.
      server.listen(0, '127.0.0.1', () => resolve()); // Bind to localhost on a random free port.
    }); // Finish the listen promise.

    const address = server.address(); // Read the bound address information.

    if (!address || typeof address === 'string') { // Guard against unexpected server address shapes.
      throw new Error('Expected the server to expose a numeric port'); // Fail fast with a clear error.
    } // Finish the address guard.

    const response = await fetch( // Call the version endpoint through HTTP.
      `http://127.0.0.1:${(address as AddressInfo).port}${config.apiBasePath}/version` // Build the runtime URL from the bound port and config.
    ); // Finish the fetch call.

    expect(response.status).toBe(200); // Ensure the route responds successfully.
    await expect(response.json()).resolves.toEqual({ // Validate the complete response payload.
      name: packageJson.name, // Expect the real backend package name.
      version: packageJson.version, // Expect the real backend package version.
      apiBasePath: config.apiBasePath, // Expect the configured API base path.
    }); // Finish the payload assertion.
  }); // Finish the endpoint test.
}); // Finish the suite.