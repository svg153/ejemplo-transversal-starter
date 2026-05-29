import { createServer, Server } from 'node:http'; // Use a real HTTP server to exercise the Express app.
import { AddressInfo } from 'node:net'; // Read the ephemeral port assigned by the OS.

import jwt from 'jsonwebtoken'; // Generate real JWTs for the middleware tests.

import app from '../src/app'; // Reuse the production Express app wiring in tests.
import { config } from '../src/config'; // Reuse shared runtime settings and JWT secret.

describe(`JWT middleware on ${config.apiBasePath}/health/protected`, () => { // Keep the suite name aligned with the protected route under test.
  let server: Server; // Hold the per-test HTTP server instance.

  afterEach(async () => { // Close the server after each test to avoid leaking handles.
    if (!server) { // Skip cleanup when a test never started the server.
      return; // Nothing needs to be closed in this case.
    } // Finish the cleanup guard.

    await new Promise<void>((resolve, reject) => { // Wrap the callback-based close API for async tests.
      server.close((error) => { // Stop the temporary HTTP server.
        if (error) { // Fail cleanup explicitly when the server cannot close.
          reject(error); // Surface the cleanup error to Jest.
          return; // Prevent the promise from resolving after rejection.
        } // Finish the cleanup error branch.

        resolve(); // Confirm that cleanup completed successfully.
      }); // Finish the server close callback.
    }); // Finish the cleanup promise.
  }); // Finish per-test cleanup.

  async function startServer(): Promise<number> { // Start the real app on an ephemeral port and return that port.
    server = createServer(app); // Mount the production app in a disposable HTTP server.

    await new Promise<void>((resolve) => { // Wait until the server begins listening.
      server.listen(0, '127.0.0.1', () => resolve()); // Bind to localhost using a random free port.
    }); // Finish the listen promise.

    const address = server.address(); // Read the bound server address information.

    if (!address || typeof address === 'string') { // Guard against an unexpected server address shape.
      throw new Error('Expected the server to expose a numeric port'); // Fail fast with a clear message.
    } // Finish the address guard.

    return (address as AddressInfo).port; // Return the ephemeral port used by this test server.
  } // Finish the test server helper.

  it('returns 401 when the request does not include a bearer token', async () => { // Verify the middleware rejects anonymous requests.
    const port = await startServer(); // Start the test server and capture its port.
    const response = await fetch(`http://127.0.0.1:${port}${config.apiBasePath}/health/protected`); // Call the protected route without an authorization header.

    expect(response.status).toBe(401); // Ensure the middleware rejects the request.
    await expect(response.json()).resolves.toEqual({ error: 'Unauthorized' }); // Validate the unauthorized payload.
  }); // Finish the missing-token test.

  it('returns 401 when the bearer token is expired', async () => { // Verify the middleware rejects expired JWTs.
    const port = await startServer(); // Start the test server and capture its port.
    const expiredToken = jwt.sign( // Create a real JWT that is already expired.
      { userId: 'user-123', email: 'sergio@example.com', role: 'admin' }, // Provide the claims expected by the middleware.
      config.jwtSecret, // Sign the token with the same secret used by verification.
      { expiresIn: '-1s' } // Force the token to be expired at verification time.
    ); // Finish expired token creation.
    const response = await fetch(`http://127.0.0.1:${port}${config.apiBasePath}/health/protected`, { // Call the protected route with the expired bearer token.
      headers: { authorization: `Bearer ${expiredToken}` }, // Send the expired JWT in the authorization header.
    }); // Finish the fetch call.

    expect(response.status).toBe(401); // Ensure expired tokens are rejected.
    await expect(response.json()).resolves.toEqual({ error: 'Unauthorized' }); // Validate the unauthorized payload.
  }); // Finish the expired-token test.

  it('returns 200 and exposes req.user when the bearer token is valid', async () => { // Verify the middleware accepts valid JWTs and injects the user payload.
    const port = await startServer(); // Start the test server and capture its port.
    const validUser = { userId: 'user-123', email: 'sergio@example.com', role: 'admin' }; // Build the expected user payload.
    const validToken = jwt.sign(validUser, config.jwtSecret, { expiresIn: '15m' }); // Create a valid JWT matching the ADR expectations.
    const response = await fetch(`http://127.0.0.1:${port}${config.apiBasePath}/health/protected`, { // Call the protected route with a valid bearer token.
      headers: { authorization: `Bearer ${validToken}` }, // Send the valid JWT in the authorization header.
    }); // Finish the fetch call.

    expect(response.status).toBe(200); // Ensure valid tokens are accepted.
    await expect(response.json()).resolves.toMatchObject({ // Validate the stable parts of the protected route response.
      status: 'ok', // Expect the protected route success marker.
      user: validUser, // Expect the route to receive the injected authenticated user.
    }); // Finish the protected payload assertion.
  }); // Finish the valid-token test.
}); // Finish the auth middleware suite.