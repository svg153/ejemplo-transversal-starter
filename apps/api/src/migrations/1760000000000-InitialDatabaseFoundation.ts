import { MigrationInterface, QueryRunner } from 'typeorm'; // Reuse the TypeORM migration contracts.

export class InitialDatabaseFoundation1760000000000 implements MigrationInterface { // Create the baseline schema migration.
  public readonly name = 'InitialDatabaseFoundation1760000000000'; // Expose the stable migration name.

  public async up(queryRunner: QueryRunner): Promise<void> { // Create the baseline starter schema.
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto"'); // Enable UUID helpers for generated keys.
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "users" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "email" character varying(255) NOT NULL, "name" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_users_email" UNIQUE ("email"), CONSTRAINT "PK_users_id" PRIMARY KEY ("id"))`); // Create the baseline users table.
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "tasks" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "title" character varying(255) NOT NULL, "description" text, "status" character varying(32) NOT NULL DEFAULT 'pending', "user_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_tasks_id" PRIMARY KEY ("id"))`); // Create the baseline tasks table.
    await queryRunner.query('CREATE INDEX IF NOT EXISTS "idx_tasks_user_id" ON "tasks" ("user_id")'); // Create the baseline task-user index.
    await queryRunner.query('ALTER TABLE "tasks" ADD CONSTRAINT "FK_tasks_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION'); // Link tasks to users.
  } // Finish the schema creation migration.

  public async down(queryRunner: QueryRunner): Promise<void> { // Roll back the baseline starter schema.
    await queryRunner.query('ALTER TABLE "tasks" DROP CONSTRAINT IF EXISTS "FK_tasks_user_id"'); // Remove the task-user foreign key first.
    await queryRunner.query('DROP INDEX IF EXISTS "idx_tasks_user_id"'); // Remove the baseline task-user index.
    await queryRunner.query('DROP TABLE IF EXISTS "tasks"'); // Remove the tasks table.
    await queryRunner.query('DROP TABLE IF EXISTS "users"'); // Remove the users table.
  } // Finish the schema rollback migration.
} // Export the baseline migration class.
