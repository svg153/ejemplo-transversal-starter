import { EntitySchema } from 'typeorm'; // Use an EntitySchema to avoid decorator compiler requirements.

import type { User } from './User'; // Reuse the user type for relation typing.

export type TaskStatus = 'pending' | 'in_progress' | 'done'; // Constrain the starter task states explicitly.

export type Task = { // Describe the persisted task shape explicitly for backend code.
  id: string; // Store the generated task identifier.
  title: string; // Store the task summary.
  description: string | null; // Store the optional task description.
  status: TaskStatus; // Store the starter task lifecycle state.
  user?: User | null; // Store the optional in-memory relation to the owning user.
  userId: string | null; // Store the optional assignee reference.
  createdAt: Date; // Track when the task was created.
  updatedAt: Date; // Track when the task was last updated.
}; // Finish the Task type.

export const TaskEntity = new EntitySchema<Task>({ // Define the baseline task entity metadata.
  name: 'Task', // Expose the entity name expected by TypeORM.
  tableName: 'tasks', // Persist tasks in the shared tasks table.
  columns: { // Describe the task table columns explicitly.
    id: { // Configure the primary key column.
      type: 'uuid', // Use UUID identifiers for stable cross-system references.
      primary: true, // Mark the column as the primary key.
      generated: 'uuid', // Let PostgreSQL generate the UUID value.
    }, // Finish the id column.
    title: { // Configure the title column.
      type: 'varchar', // Persist the title as text.
      length: 255, // Keep the title column bounded.
    }, // Finish the title column.
    description: { // Configure the optional description column.
      type: 'text', // Persist longer descriptions as text.
      nullable: true, // Allow tasks without descriptions.
    }, // Finish the description column.
    status: { // Configure the task status column.
      type: 'varchar', // Persist the task status as text.
      length: 32, // Keep the status column bounded.
      default: 'pending', // Default new tasks to the pending state.
    }, // Finish the status column.
    userId: { // Configure the foreign-key column.
      type: 'uuid', // Match the user identifier type.
      nullable: true, // Allow the starter to create unassigned tasks.
      name: 'user_id', // Match the database naming convention.
    }, // Finish the userId column.
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
  }, // Finish the task column definitions.
  relations: { // Define the task relationships explicitly.
    user: { // Register the many-to-one user relationship.
      type: 'many-to-one', // Allow many tasks to belong to one user.
      target: 'User', // Point the relation at the user entity.
      joinColumn: { // Configure the foreign key column mapping.
        name: 'user_id', // Persist the relation in the user_id column.
      }, // Finish the join column mapping.
      nullable: true, // Allow the starter to create unassigned tasks.
      onDelete: 'SET NULL', // Keep tasks if the related user is deleted.
      inverseSide: 'tasks', // Reuse the user-side relation name.
    }, // Finish the user relation.
  }, // Finish the task relation definitions.
  indices: [ // Define the baseline task indexes explicitly.
    { // Register the task-user index.
      name: 'idx_tasks_user_id', // Reuse the documented index name.
      columns: ['userId'], // Index the user_id column through the mapped property.
    }, // Finish the task-user index.
  ], // Finish the task indexes.
}); // Export the task entity schema.
