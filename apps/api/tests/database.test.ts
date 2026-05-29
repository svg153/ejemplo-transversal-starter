describe("initializeDatabase", () => {
  // Verify database bootstrap retry behavior.
  afterEach(() => {
    // Reset the module registry and mocks between test cases.
    jest.restoreAllMocks(); // Restore all spies so later tests start clean.
    jest.resetModules(); // Reset module-scoped initialization state between tests.
  }); // Finish shared cleanup.

  it("destroys a partially initialized data source so retries rerun migrations", async () => {
    // Reproduce the review scenario where migrations fail after initialization succeeds.
    const databaseModule = require("../src/database") as {
      // Load a fresh CommonJS copy of the database module for this test.
      appDataSource: {
        // Describe only the shared members used by this regression test.
        isInitialized: boolean; // Mirror the TypeORM initialization flag used by the production guard.
        initialize: () => Promise<unknown>; // Mirror the TypeORM initializer signature used by the test.
        runMigrations: () => Promise<unknown>; // Mirror the migration runner used by the test.
        destroy: () => Promise<unknown>; // Mirror the teardown method used by the retry cleanup.
      }; // Finish the minimal data source contract.
      initializeDatabase: () => Promise<unknown>; // Mirror the initializer exported by the module under test.
    }; // Finish the database module test contract.
    const { appDataSource, initializeDatabase } = databaseModule; // Grab the shared data source and initializer under test.

    let initialized = false; // Track the simulated TypeORM initialization state.
    let migrationAttempts = 0; // Count how many times migrations are attempted across retries.

    Object.defineProperty(appDataSource, "isInitialized", {
      // Override the readonly TypeORM flag with a controllable test double.
      configurable: true, // Allow Jest to redefine the property during cleanup.
      get: () => initialized, // Reflect the simulated initialization state.
    }); // Finish the mocked initialization flag.

    jest.spyOn(appDataSource, "initialize").mockImplementation(async () => {
      // Simulate a successful low-level connection bootstrap.
      initialized = true; // Mark the shared data source as initialized after connect.
      return appDataSource; // Return the shared data source like TypeORM does.
    }); // Finish the initialize mock.

    jest.spyOn(appDataSource, "runMigrations").mockImplementation(async () => {
      // Fail the first migration run and succeed on the retry.
      migrationAttempts += 1; // Count each migration execution attempt.

      if (migrationAttempts === 1) {
        // Reproduce the first-run migration failure from the review comment.
        throw new Error("migration failed"); // Reject the first migration attempt.
      } // Finish the failure branch.
    }); // Finish the runMigrations mock.

    const destroySpy = jest
      .spyOn(appDataSource, "destroy")
      .mockImplementation(async () => {
        // Simulate TypeORM tearing the connection back down.
        initialized = false; // Reset the initialization flag so retries start fresh.
      }); // Finish the destroy mock.

    await expect(initializeDatabase()).rejects.toThrow("migration failed"); // Ensure the first startup attempt still surfaces the migration error.
    await expect(initializeDatabase()).resolves.toBe(appDataSource); // Ensure the retry fully reinitializes and succeeds.

    expect(destroySpy).toHaveBeenCalledTimes(1); // Verify partial initialization is cleaned up exactly once.
    expect(appDataSource.initialize).toHaveBeenCalledTimes(2); // Verify the retry reconnects instead of reusing stale state.
    expect(appDataSource.runMigrations).toHaveBeenCalledTimes(2); // Verify migrations rerun on the second attempt.
  }); // Finish the retry regression test.
}); // Finish the database bootstrap suite.
