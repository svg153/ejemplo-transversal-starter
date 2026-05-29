import app from './app'; // Reuse the shared Express application instance.
import { config } from './config'; // Reuse the centralized backend configuration.
import { initializeDatabase } from './database'; // Initialize the shared database connection during startup.

async function startServer(): Promise<void> { // Wrap startup in an async function so database initialization can run first.
  try { // Attempt to connect to PostgreSQL before opening the HTTP listener.
    await initializeDatabase(); // Initialize the shared TypeORM data source.
  } catch (error) { // Surface a non-secret startup warning when the database is unavailable.
    console.error('Database initialization failed; health checks will report the service as degraded.', error); // Explain the degraded startup path clearly.
  } // Finish the database startup branch.

  app.listen(config.port, config.host, () => { // Start the HTTP server after the database attempt completes.
    console.log(`API listening on http://${config.host}:${config.port}${config.apiBasePath}`); // Surface the bound API URL for local development.
  }); // Finish the HTTP server startup callback.
} // Finish the startup helper.

void startServer(); // Start the API without leaving an unhandled promise.
