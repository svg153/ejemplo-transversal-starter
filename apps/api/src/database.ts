import { DataSource } from "typeorm"; // Create a single shared TypeORM data source for the API.

import { config } from "./config"; // Reuse the centralized runtime configuration.
import { TaskEntitySchema } from "./entities/task"; // Register the task entity schema with the data source.
import { UserEntitySchema } from "./entities/user"; // Register the user entity schema with the data source.
import { InitialDatabaseFoundation20260529000000 } from "./migrations/20260529000000-initial-database-foundation"; // Register the initial migration class for runtime execution.

export const appDataSource = new DataSource({
  // Build the shared PostgreSQL data source instance.
  type: "postgres", // Use PostgreSQL as the backing database engine.
  url: config.database.url, // Reuse the configured connection string.
  synchronize: false, // Keep schema changes inside explicit migrations.
  logging: config.database.logging, // Enable SQL logging only in local development.
  entities: [UserEntitySchema, TaskEntitySchema], // Register the base entities required for issue #1.
  migrations: [InitialDatabaseFoundation20260529000000], // Register the initial migration for startup execution.
}); // Finish the shared data source configuration.

let initializationPromise: Promise<DataSource> | null = null; // Cache in-flight initialization to avoid duplicate startup work.

export function initializeDatabase(): Promise<DataSource> {
  // Initialize the data source and run pending migrations once.
  if (appDataSource.isInitialized) {
    // Reuse the initialized data source when it is already ready.
    return Promise.resolve(appDataSource); // Resolve immediately with the shared data source.
  } // Finish the initialized guard.

  if (!initializationPromise) {
    // Start initialization only on the first caller.
    initializationPromise = appDataSource
      .initialize()
      .then(async (dataSource) => {
        // Open the PostgreSQL connection lazily.
        await dataSource.runMigrations(); // Apply the initial migration during API bootstrap.

        return dataSource; // Return the initialized and migrated data source.
      })
      .catch((error: unknown) => {
        // Reset the cached promise when startup fails.
        initializationPromise = null; // Allow a later retry after a failed initialization attempt.

        throw error; // Re-throw the original startup failure.
      }); // Finish the cached initialization promise.
  } // Finish the first-call guard.

  return initializationPromise; // Reuse the shared initialization promise for concurrent callers.
} // Export the initialization helper.

export async function closeDatabase(): Promise<void> {
  // Close the shared data source when tests or shutdown need it.
  initializationPromise = null; // Clear the cached initialization state before closing.

  if (!appDataSource.isInitialized) {
    // Skip teardown when the data source never initialized.
    return; // Nothing to close in this case.
  } // Finish the teardown guard.

  await appDataSource.destroy(); // Close the PostgreSQL connection pool cleanly.
} // Export the teardown helper.

export default appDataSource; // Expose the data source as the CLI entrypoint.
