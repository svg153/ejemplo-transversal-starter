# C4 Diagram: Task Tracker Pro

## Context Diagram (Nivel 1)

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                       │
│  [User]                                                               │
│    │                                                                  │
│    ├─→ [Web Browser]  [Mobile App]  [API Client]                    │
│         │                    │              │                        │
│         └────────┬───────────┴──────────────┘                        │
│                  │                                                    │
│                  └──→ [Task Tracker Pro System]                      │
│                       • Gestiona tareas                              │
│                       • Colaboración entre usuarios                  │
│                       • Asignación y seguimiento                     │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

**Usuarios**: Desarrolladores, managers, equipos ágiles  
**Sistema externo**: (Ninguno por ahora)  
**Ventajas**: Escalable, open, fácil de extender

---

## Container Diagram (Nivel 2)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            Task Tracker Pro                                  │
│                                                                               │
│  ┌───────────────────────────────┐    ┌──────────────────────────────────┐  │
│  │  Web Application (React)      │    │  API Server (Express + TypeORM)  │  │
│  │  • Login                       │    │  • POST   /auth/login           │  │
│  │  • Dashboard (tareas)         │───→│  • POST   /auth/refresh         │  │
│  │  • Task detail                │    │  • GET    /api/tasks            │  │
│  │  • Colaboración real-time     │←───│  • POST   /api/tasks            │  │
│  │                               │    │  • PUT    /api/tasks/:id        │  │
│  │  Tech: React, Context/Zustand │    │  • DELETE /api/tasks/:id        │  │
│  │  Port: 5173                   │    │  • GET    /api/users/:id        │  │
│  │                               │    │  • POST   /api/comments         │  │
│  └───────────────────────────────┘    │                                 │  │
│                                        │  Tech: Express, TypeORM,        │  │
│                                        │         JWT, bcrypt             │  │
│                                        │  Port: 3000                     │  │
│  ┌───────────────────────────────┐    └──────────────────────────────────┘  │
│  │  PostgreSQL Database          │←───│ (Conexión internal)               │  │
│  │  • users table                │    │                                    │  │
│  │  • tasks table                │    │                                    │  │
│  │  • comments table             │    │                                    │  │
│  │  • Migrations auto            │    │                                    │  │
│  │                               │    │                                    │  │
│  │  Port: 5432                   │    │                                    │  │
│  └───────────────────────────────┘    │                                    │  │
│                                        │                                    │  │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Comunicación**:

- Frontend → Backend: HTTP/REST (JSON)
- Backend → DB: PostgreSQL protocol
- Frontend → Backend (real-time opcional): WebSocket

---

## Component Diagram (Nivel 3 — Backend)

```
┌─────────────────────────────────────────────────────────────┐
│              Express API Server                              │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ HTTP Middleware                                      │   │
│  │ • CORS, JSON parser, logging                         │   │
│  └──────────────────────────────────────────────────────┘   │
│           ↓                                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Auth Middleware                                      │   │
│  │ • JWT validation                                     │   │
│  │ • Role-based access                                 │   │
│  └──────────────────────────────────────────────────────┘   │
│           ↓                                                   │
│  ┌──────────────────┐  ┌──────────────────┐                 │
│  │ Auth Routes      │  │ Task Routes      │                 │
│  │ • POST /login    │  │ • GET    /tasks  │                 │
│  │ • POST /refresh  │  │ • POST   /tasks  │                 │
│  │ • POST /logout   │  │ • PUT    /tasks  │                 │
│  └────────┬─────────┘  │ • DELETE /tasks  │                 │
│           │            └────────┬─────────┘                 │
│           │                     │                           │
│  ┌────────┴─────────────────────┴─────┐                    │
│  │ Services Layer                      │                    │
│  │ • AuthService (JWT, bcrypt)        │                    │
│  │ • TaskService (CRUD logic)         │                    │
│  │ • UserService (perfiles)           │                    │
│  │ • CommentService                   │                    │
│  └────────┬───────────────────────────┘                    │
│           │                                                 │
│  ┌────────┴───────────────────────────┐                    │
│  │ Data Access Layer (TypeORM)         │                    │
│  │ • UserRepository                   │                    │
│  │ • TaskRepository                   │                    │
│  │ • CommentRepository                │                    │
│  └────────┬───────────────────────────┘                    │
│           │                                                 │
│           └──→ [PostgreSQL Database]                       │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## Component Diagram (Nivel 3 — Frontend)

```
┌──────────────────────────────────────────────────────────┐
│              React Application                            │
│                                                            │
│  ┌────────────────────────────────────────────────────┐  │
│  │ Pages (Router)                                     │  │
│  │ • LoginPage                                        │  │
│  │ • DashboardPage (lista de tareas)                  │  │
│  │ • TaskDetailPage                                  │  │
│  │ • SettingsPage                                    │  │
│  └────────────┬─────────────────────────────────────┘  │
│               │                                          │
│  ┌────────────┴──────────────────────────────────────┐  │
│  │ Components                                         │  │
│  │ • TaskCard (presentación)                         │  │
│  │ • Modal                                            │  │
│  │ • Form (con validación)                           │  │
│  │ • Header, Footer                                  │  │
│  │ • CommentList                                     │  │
│  └────────────┬──────────────────────────────────────┘  │
│               │                                          │
│  ┌────────────┴──────────────────────────────────────┐  │
│  │ State Management (Context o Zustand)             │  │
│  │ • authState (user, token)                        │  │
│  │ • taskState (tasks, filters)                     │  │
│  │ • uiState (modal open/close)                     │  │
│  └────────────┬──────────────────────────────────────┘  │
│               │                                          │
│  ┌────────────┴──────────────────────────────────────┐  │
│  │ Services Layer (API Client)                       │  │
│  │ • AuthService (login, refresh)                    │  │
│  │ • TaskService (fetch, create, update, delete)     │  │
│  │ • UserService (profile, settings)                 │  │
│  │ • CommentService                                  │  │
│  └────────────┬──────────────────────────────────────┘  │
│               │                                          │
│               └──→ [Express API Server]                 │
│                                                            │
└──────────────────────────────────────────────────────────┘
```

---

## Data Flow: Crear una tarea (ejemplo)

```
User clicks "New Task"
    ↓
[LoginPage] empty form
    ↓ (user fills: title, description, priority)
Form validation (frontend)
    ↓ (valid)
[TaskService] POST /api/tasks
    ↓ (HTTP request)
[Express API] Router → AuthMiddleware
    ↓ (JWT válido)
[TaskService backend] validate + create
    ↓
[TypeORM] INSERT INTO tasks
    ↓
[PostgreSQL] task created (UUID)
    ↓ (return with id, timestamps)
[Frontend] taskStore.addTask(response)
    ↓
[UI] Re-render dashboard (new task in list)
```

---

## Notas de escalabilidad

Si el proyecto crece:

- **WebSocket**: Para colaboración real-time (comentarios, actualizaciones de estado)
- **Message Queue**: Para procesos async (notificaciones, reportes)
- **Cache**: Redis para sesiones, tareas frecuentes
- **Logging centralizador**: ELK stack, Datadog, etc.
- **Múltiples instancias**: Load balancer (nginx, AWS ELB)

Por ahora, esto sería **YAGNI** (You Aren't Gonna Need It). Mantener simple.
