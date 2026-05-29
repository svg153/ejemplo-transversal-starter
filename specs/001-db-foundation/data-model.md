# Data Model: Database Foundation for Starter

## Entity: User

**Purpose**: Represents a person using the starter domain and serves as the owner or actor for future task-based workflows.

### User Fields

- `id`: Unique identifier for the user
- `email`: Unique contact and login identifier
- `name`: Human-readable display name
- `createdAt`: Timestamp for record creation
- `updatedAt`: Timestamp for latest record change

### User Validation Rules

- `email` must be present and unique
- `name` must be present
- timestamps are system-managed

### User Relationships

- One `User` can be associated with many `Task` records

## Entity: Task

**Purpose**: Represents a trackable unit of work in the starter domain.

### Task Fields

- `id`: Unique identifier for the task
- `title`: Short task summary
- `description`: Optional longer task detail
- `status`: Lifecycle state for the task
- `assigneeId`: Reference to the owning or assigned user
- `createdAt`: Timestamp for record creation
- `updatedAt`: Timestamp for latest record change

### Task Validation Rules

- `title` must be present
- `status` must be present and constrained to the starter's initial allowed states
- `assigneeId` may be nullable initially unless the implementation decides assignment is mandatory at creation time
- timestamps are system-managed

### Task Relationships

- Many `Task` records can belong to one `User`

### State Transitions

- Initial state should support a newly created task
- Future states can expand later, but this feature only needs the minimum stable baseline required for persistence setup

## Entity: Persistence Readiness State

**Purpose**: Represents whether the API can currently use the configured database connection.

### Persistence Readiness Fields

- `status`: Overall health outcome for the API
- `database`: Current database connectivity state
- `checkedAt` (optional internal concern): Time of the latest readiness probe if surfaced internally

### Persistence Readiness Validation Rules

- `status` must map consistently to database readiness for the current implementation
- `database` must distinguish connected vs disconnected states clearly

### Persistence Readiness Relationships

- Derived from backend runtime state rather than stored as a persisted table
