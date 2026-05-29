import { EntitySchema } from "typeorm"; // Reuse TypeORM entity schemas without decorator metadata.

export interface UserEntity {
  // Define the persisted shape for backend users.
  id: string; // Store the generated UUID primary key.
  email: string; // Persist the unique user email address.
  name: string; // Persist the display name used across the app.
  passwordHash: string; // Persist the hashed password column expected by future auth work.
  createdAt: Date; // Track when the row was created.
  updatedAt: Date; // Track when the row was last updated.
} // Finish the user entity contract.

export const UserEntitySchema = new EntitySchema<UserEntity>({
  // Register the user table schema for TypeORM.
  name: "User", // Expose a stable entity name inside the ORM.
  tableName: "users", // Map the entity to the `users` table.
  columns: {
    // Describe each persisted column explicitly.
    id: {
      // Configure the UUID primary key.
      type: "uuid", // Store the identifier as PostgreSQL UUID data.
      primary: true, // Mark the column as the table primary key.
      generated: "uuid", // Let PostgreSQL generate the UUID values.
    }, // Finish the primary key column.
    email: {
      // Configure the unique email column.
      type: "varchar", // Store emails as variable-length strings.
      length: 255, // Match the starter schema width.
      unique: true, // Enforce email uniqueness at the database layer.
    }, // Finish the email column.
    name: {
      // Configure the display name column.
      type: "varchar", // Store names as variable-length strings.
      length: 255, // Match the starter schema width.
    }, // Finish the name column.
    passwordHash: {
      // Configure the password hash column.
      name: "password_hash", // Map the property to the existing snake_case column.
      type: "varchar", // Store password hashes as strings.
      length: 255, // Match the starter schema width.
    }, // Finish the password hash column.
    createdAt: {
      // Configure the creation timestamp column.
      name: "created_at", // Map the property to the existing snake_case column.
      type: "timestamp", // Store the timestamp without timezone for starter parity.
      createDate: true, // Let TypeORM treat the column as the creation timestamp.
      default: () => "CURRENT_TIMESTAMP", // Use the database clock by default.
    }, // Finish the created-at column.
    updatedAt: {
      // Configure the update timestamp column.
      name: "updated_at", // Map the property to the existing snake_case column.
      type: "timestamp", // Store the timestamp without timezone for starter parity.
      updateDate: true, // Let TypeORM refresh the column on updates.
      default: () => "CURRENT_TIMESTAMP", // Use the database clock by default.
    }, // Finish the updated-at column.
  }, // Finish the user column map.
}); // Export the user entity schema.
