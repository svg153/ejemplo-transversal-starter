import { EntitySchema } from 'typeorm'; // Reuse TypeORM entity schemas without decorator metadata.

import { UserEntity } from './user'; // Reference the user entity type for the relation field.

export interface TaskEntity { // Define the persisted shape for backend tasks.
  id: string; // Store the generated UUID primary key.
  userId: string; // Store the owning user foreign key.
  title: string; // Persist the task title.
  description: string | null; // Persist an optional task description.
  status: string; // Persist the current task workflow status.
  priority: string; // Persist the current task priority.
  createdAt: Date; // Track when the row was created.
  updatedAt: Date; // Track when the row was last updated.
  user: UserEntity; // Expose the owning user relation for future backend work.
} // Finish the task entity contract.

export const TaskEntitySchema = new EntitySchema<TaskEntity>({ // Register the task table schema for TypeORM.
  name: 'Task', // Expose a stable entity name inside the ORM.
  tableName: 'tasks', // Map the entity to the `tasks` table.
  columns: { // Describe each persisted column explicitly.
    id: { // Configure the UUID primary key.
      type: 'uuid', // Store the identifier as PostgreSQL UUID data.
      primary: true, // Mark the column as the table primary key.
      generated: 'uuid', // Let PostgreSQL generate the UUID values.
    }, // Finish the primary key column.
    userId: { // Configure the owning user foreign key column.
      name: 'user_id', // Map the property to the existing snake_case column.
      type: 'uuid', // Store the foreign key as a PostgreSQL UUID.
    }, // Finish the user-id column.
    title: { // Configure the title column.
      type: 'varchar', // Store titles as variable-length strings.
      length: 255, // Match the starter schema width.
    }, // Finish the title column.
    description: { // Configure the optional description column.
      type: 'text', // Store descriptions as text.
      nullable: true, // Allow tasks without descriptions.
    }, // Finish the description column.
    status: { // Configure the status column.
      type: 'varchar', // Store statuses as variable-length strings.
      length: 50, // Match the starter schema width.
      default: 'pending', // Keep the starter default status.
    }, // Finish the status column.
    priority: { // Configure the priority column.
      type: 'varchar', // Store priorities as variable-length strings.
      length: 50, // Match the starter schema width.
      default: 'medium', // Keep the starter default priority.
    }, // Finish the priority column.
    createdAt: { // Configure the creation timestamp column.
      name: 'created_at', // Map the property to the existing snake_case column.
      type: 'timestamp', // Store the timestamp without timezone for starter parity.
      createDate: true, // Let TypeORM treat the column as the creation timestamp.
      default: () => 'CURRENT_TIMESTAMP', // Use the database clock by default.
    }, // Finish the created-at column.
    updatedAt: { // Configure the update timestamp column.
      name: 'updated_at', // Map the property to the existing snake_case column.
      type: 'timestamp', // Store the timestamp without timezone for starter parity.
      updateDate: true, // Let TypeORM refresh the column on updates.
      default: () => 'CURRENT_TIMESTAMP', // Use the database clock by default.
    }, // Finish the updated-at column.
  }, // Finish the task column map.
  relations: { // Describe the explicit relation to users.
    user: { // Configure the owning user relation.
      type: 'many-to-one', // Each task belongs to one user.
      target: 'User', // Point the relation at the registered user entity.
      joinColumn: { name: 'user_id' }, // Reuse the existing foreign-key column.
      nullable: false, // Require every task to belong to a user.
      onDelete: 'CASCADE', // Delete tasks automatically when the user is removed.
    }, // Finish the user relation.
  }, // Finish the task relation map.
}); // Export the task entity schema.