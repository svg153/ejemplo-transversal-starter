import { MigrationInterface, QueryRunner } from "typeorm"; // Use TypeORM migrations to own the database schema.

export class InitialDatabaseFoundation20260529000000 implements MigrationInterface {
  // Define the initial database foundation migration.
  public readonly name = "InitialDatabaseFoundation20260529000000"; // Expose a stable migration name for TypeORM.

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the initial tables and indexes.
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto"'); // Ensure PostgreSQL can generate UUID values.
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "users" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "email" character varying(255) NOT NULL, "name" character varying(255) NOT NULL, "password_hash" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "UQ_users_email" UNIQUE ("email"), CONSTRAINT "PK_users_id" PRIMARY KEY ("id"))`,
    ); // Create the base users table.
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "tasks" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "user_id" uuid NOT NULL, "title" character varying(255) NOT NULL, "description" text, "status" character varying(50) NOT NULL DEFAULT 'pending', "priority" character varying(50) NOT NULL DEFAULT 'medium', "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_tasks_id" PRIMARY KEY ("id"), CONSTRAINT "FK_tasks_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    ); // Create the base tasks table.
    await queryRunner.query(
      'CREATE INDEX IF NOT EXISTS "IDX_tasks_user_id" ON "tasks" ("user_id")',
    ); // Speed up lookups by owning user.
  } // Finish the up migration.

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove the tables and indexes created by this migration.
    await queryRunner.query('DROP INDEX IF EXISTS "IDX_tasks_user_id"'); // Remove the task user index first.
    await queryRunner.query('DROP TABLE IF EXISTS "tasks"'); // Drop the tasks table before the parent table.
    await queryRunner.query('DROP TABLE IF EXISTS "users"'); // Drop the users table last.
  } // Finish the down migration.
} // Export the initial migration.
