import { createServer, Server } from "node:http"; // Use a real HTTP server like the existing backend tests.
import { AddressInfo } from "node:net"; // Read the ephemeral port chosen by the OS.

import app from "../src/app"; // Exercise the real Express app wiring.
import { getDatabaseHealthStatus } from "../src/services/database-health"; // Control the health dependency explicitly in tests.

jest.mock("../src/services/database-health", () => ({
  // Mock the database probe so tests stay isolated from PostgreSQL.
  getDatabaseHealthStatus: jest.fn(), // Expose a controllable Jest mock for the route dependency.
})); // Finish the health service mock.

const mockedGetDatabaseHealthStatus =
  getDatabaseHealthStatus as jest.MockedFunction<
    typeof getDatabaseHealthStatus
  >; // Create a typed handle for the mocked health helper.

describe("GET /api/health", () => {
  // Cover the DB-aware health endpoint behavior.
  let server: Server; // Hold the per-test HTTP server instance.

  afterEach(async () => {
    // Close the server and reset mocks after each test.
    mockedGetDatabaseHealthStatus.mockReset(); // Clear the mocked database probe state.

    if (!server) {
      // Skip shutdown when the test never started the server.
      return; // Nothing to close in this case.
    } // Finish the guard clause.

    await new Promise<void>((resolve, reject) => {
      // Wrap the callback API for async cleanup.
      server.close((error) => {
        // Stop the temporary HTTP server.
        if (error) {
          // Bubble up shutdown failures explicitly.
          reject(error); // Fail the test when cleanup breaks.
          return; // Prevent resolve from running after reject.
        } // Finish the error branch.

        resolve(); // Signal that cleanup completed successfully.
      }); // Finish the server shutdown callback.
    }); // Finish the cleanup promise.
  }); // Finish per-test cleanup.

  async function startServer(): Promise<number> {
    // Start the app and return the ephemeral port.
    server = createServer(app); // Boot the real Express app in-process.

    await new Promise<void>((resolve) => {
      // Wait for the server to bind a random free port.
      server.listen(0, "127.0.0.1", () => resolve()); // Bind the server to localhost.
    }); // Finish the listen promise.

    const address = server.address(); // Read the bound address information.

    if (!address || typeof address === "string") {
      // Guard against unexpected server address shapes.
      throw new Error("Expected the server to expose a numeric port"); // Fail fast with a clear error.
    } // Finish the address guard.

    return (address as AddressInfo).port; // Return the ephemeral port for the HTTP request.
  } // Finish the server helper.

  it("returns an ok payload when the database is connected", async () => {
    // Verify the healthy runtime case.
    mockedGetDatabaseHealthStatus.mockResolvedValue("connected"); // Simulate a healthy database connection.

    const port = await startServer(); // Start the real app and capture its port.
    const response = await fetch(`http://127.0.0.1:${port}/api/health`); // Call the health endpoint through HTTP.

    expect(response.status).toBe(200); // Ensure the route responds successfully when the DB is healthy.
    await expect(response.json()).resolves.toEqual({
      // Validate the full response payload.
      status: "ok", // Expect an overall healthy API status.
      database: "connected", // Expect the database status to be surfaced.
    }); // Finish the payload assertion.
  }); // Finish the healthy endpoint test.

  it("returns a degraded payload when the database is disconnected", async () => {
    // Verify the degraded runtime case.
    mockedGetDatabaseHealthStatus.mockResolvedValue("disconnected"); // Simulate an unavailable database connection.

    const port = await startServer(); // Start the real app and capture its port.
    const response = await fetch(`http://127.0.0.1:${port}/api/health`); // Call the health endpoint through HTTP.

    expect(response.status).toBe(503); // Ensure the route reports backend degradation explicitly.
    await expect(response.json()).resolves.toEqual({
      // Validate the full response payload.
      status: "error", // Expect an unhealthy API status.
      database: "disconnected", // Expect the database status to be surfaced.
    }); // Finish the payload assertion.
  }); // Finish the degraded endpoint test.
}); // Finish the suite.
