import app from './app'; // Reuse the configured Express application.
import { config } from './config'; // Reuse the centralized runtime configuration.
import { initializeDatabase } from './database'; // Initialize PostgreSQL before serving HTTP traffic.

async function bootstrap(): Promise<void> { // Start the database and HTTP server in a controlled order.
  await initializeDatabase(); // Connect to PostgreSQL and apply pending migrations first.

  app.listen(config.port, config.host, () => { // Start listening only after the database is ready.
    console.log(`API listening on http://${config.host}:${config.port}${config.apiBasePath}`); // Print the resolved local API URL.
  }); // Finish the HTTP server bootstrap.
} // Finish the bootstrap helper.

bootstrap().catch((error: unknown) => { // Fail fast when the backend cannot reach PostgreSQL.
  console.error('API failed to start', error); // Print the startup failure without exposing secrets.
  process.exit(1); // Exit with a non-zero code so Docker and scripts detect the failure.
}); // Finish the startup failure handler.
