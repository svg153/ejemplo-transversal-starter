import { EntitySchema } from 'typeorm'; // Use an EntitySchema to avoid decorator compiler requirements.

import type { Task } from './Task'; // Reuse the task type for relation typing.

export type User = { // Describe the persisted user shape explicitly for backend code.
  id: string; // Store the generated user identifier.
  email: string; // Store the unique user email.
  name: string; // Store the human-readable user name.
  tasks?: Task[]; // Store the optional in-memory relation to the user's tasks.
  createdAt: Date; // Track when the user record was created.
  updatedAt: Date; // Track when the user record was last updated.
}; // Finish the User type.

export const UserEntity = new EntitySchema<User>({ // Define the baseline user entity metadata.
  name: 'User', // Expose the entity name expected by TypeORM.
  tableName: 'users', // Persist users in the shared users table.
  columns: { // Describe the user table columns explicitly.
    id: { // Configure the primary key column.
      type: 'uuid', // Use UUID identifiers for stable cross-system references.
      primary: true, // Mark the column as the primary key.
      generated: 'uuid', // Let PostgreSQL generate the UUID value.
    }, // Finish the id column.
    email: { // Configure the unique email column.
      type: 'varchar', // Persist the email as text.
      length: 255, // Keep the email column bounded.
      unique: true, // Enforce unique user emails.
    }, // Finish the email column.
    name: { // Configure the display name column.
      type: 'varchar', // Persist the name as text.
      length: 255, // Keep the name column bounded.
    }, // Finish the name column.
    createdAt: { // Configure the creation timestamp column.
      type: 'timestamp', // Persist timestamps in PostgreSQL.
      createDate: true, // Let TypeORM manage creation timestamps.
      name: 'created_at', // Match the database naming convention.
    }, // Finish the createdAt column.
    updatedAt: { // Configure the update timestamp column.
      type: 'timestamp', // Persist timestamps in PostgreSQL.
      updateDate: true, // Let TypeORM manage update timestamps.
      name: 'updated_at', // Match the database naming convention.
    }, // Finish the updatedAt column.
  }, // Finish the user column definitions.
  relations: { // Define the user relationships explicitly.
    tasks: { // Register the one-to-many task relationship.
      type: 'one-to-many', // Allow one user to own many tasks.
      target: 'Task', // Point the relation at the task entity.
      inverseSide: 'user', // Reuse the task-side relation name.
    }, // Finish the tasks relation.
  }, // Finish the user relation definitions.
}); // Export the user entity schema.
