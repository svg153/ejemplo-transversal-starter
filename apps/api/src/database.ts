import path from 'node:path'; // Resolve migration paths from the current module directory.

import { DataSource } from 'typeorm'; // Reuse the TypeORM data source entry point.

import { config } from './config'; // Reuse the centralized backend configuration.
import { TaskEntity } from './entities/Task'; // Register the task entity schema.
import { UserEntity } from './entities/User'; // Register the user entity schema.

const migrationsPath = path.join(__dirname, 'migrations', '*.{ts,js}'); // Load migrations in both ts-node and compiled runtime modes.

export const appDataSource = new DataSource({ // Build the shared application data source.
  type: 'postgres', // Use PostgreSQL for the starter persistence layer.
  url: config.database.url, // Reuse the configured database connection string.
  logging: config.database.logging, // Keep SQL logging aligned with the environment.
  synchronize: false, // Prefer explicit migrations over schema auto-sync.
  entities: [UserEntity, TaskEntity], // Register the baseline entity schemas.
  migrations: [migrationsPath], // Register the migration files for CLI and runtime use.
}); // Export the configured application data source.

export async function initializeDatabase(): Promise<DataSource> { // Initialize the shared data source once.
  if (appDataSource.isInitialized) { // Reuse the existing initialized connection.
    return appDataSource; // Avoid opening duplicate database connections.
  } // Finish the initialized guard.

  return appDataSource.initialize(); // Open the database connection when needed.
} // Finish the database initializer.

export async function destroyDatabase(): Promise<void> { // Close the shared data source when tests need cleanup.
  if (!appDataSource.isInitialized) { // Skip shutdown if no connection is active.
    return; // Nothing to close in this case.
  } // Finish the shutdown guard.

  await appDataSource.destroy(); // Close the active database connection gracefully.
} // Finish the database destroy helper.

export default appDataSource; // Expose the data source as the CLI default export.
