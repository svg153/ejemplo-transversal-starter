# Task Tracker Pro — Plantilla Transversal para Desarrollo con IA

> Proyecto de referencia para aprender a usar Copilot, MCP y automatización en un flujo de desarrollo real.
> Stack: **Node.js/TypeScript · React · PostgreSQL · Docker · GitHub Actions · Observabilidad**

## ¿Por qué este proyecto?

Es la base del curso *"IA Aplicada para Developers Senior"*. Cada técnica que aprendes en las sesiones se aplica aquí:

| Sesión | Técnica | Qué haces en el proyecto |
| ------- | -------- | ------------------------- |
| 01-02 | Prompting avanzado | Generas boilerplate de API REST con Copilot |
| 02 | Code review asistido | Evalúas PRs con Copilot CLI |
| 03 | Automatización CI/CD | GitHub Actions con tests + deploy |
| 04 | Arquitectura & docs | C4 diagrams + ADRs |
| 05 | MCP | Servidor MCP que expone tu contexto de proyecto |
| 07 | Adopción en equipo | Flujo completo + checklist |

## Estructura del proyecto

```text
task-tracker-pro/
├── apps/
│   ├── api/              # Backend Express + TypeScript
│   │   ├── src/
│   │   │   ├── routes/   # Endpoints: /tasks, /users, /auth
│   │   │   ├── models/   # TypeORM entities
│   │   │   ├── services/ # Business logic
│   │   │   ├── middleware/
│   │   │   └── main.ts
│   │   ├── tests/
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── web/              # Frontend React + TypeScript
│       ├── src/
│       │   ├── components/
│       │   ├── pages/
│       │   ├── services/ # API client
│       │   ├── hooks/
│       │   └── App.tsx
│       ├── public/
│       ├── Dockerfile
│       ├── package.json
│       └── vite.config.ts
│
├── infra/
│   ├── docker-compose.yml  # Local dev env (API + React + PostgreSQL)
│   └── postgres/
│       └── init.sql        # DB schema + seed data
│
├── .github/
│   └── workflows/
│       ├── lint.yml        # ESLint + Prettier
│       ├── test.yml        # Jest
│       ├── build.yml       # Build images
│       └── deploy.yml      # To staging (opcional)
│
├── docs/
│   ├── C4-DIAGRAM.md       # Architecture overview
│   ├── CONVENTIONS.md      # Código, commits, PRs
│   └── adr/
│       └── 0001-api-auth-strategy.md
│
├── .copilot-instructions.md # Contexto para Copilot
├── mcp-server/              # MCP server para exponer proyecto
│   ├── server.py
│   └── requirements.txt
│
├── docker-compose.yml       # Orquestación local
├── package.json             # Workspace raíz (monorepo)
├── .eslintrc.json
├── .prettierrc
└── .env.example
```

## Quick Start (15 min)

### 1. Clonar y configurar

```bash
git clone <repo>
cd task-tracker-pro
cp .env.example .env

# Requisito local si no usas Docker: Node.js 22+
# Instalar dependencias globales (opcional, Docker maneja todo)
npm install
```

### 2. Levantar con Docker Compose

```bash
docker compose up -d
```

Accede a:

- **API**: <http://localhost:3000/api/health> (devuelve el estado del API y de la conexión a PostgreSQL)
- **Web**: <http://localhost:5173> (pantalla placeholder lista para ampliar)
- **PostgreSQL**: localhost:5432 (credenciales en `.env`)

### 3. Ver logs

```bash
docker compose logs -f api
docker compose logs -f web
```

### 4. Parar

```bash
docker compose down
```

## Flujo de desarrollo

### Crear una feature

```bash
# 1. Crea rama desde main
git checkout -b feat/new-feature

# 2. Haz cambios, tests, commits
# (Copilot puede ayudarte aquí)

# 3. Push a GitHub
git push origin feat/new-feature

# 4. Abre PR
# (Los workflows corren automáticamente: lint, test, build)

# 5. Pide review
# (Usa Copilot CLI para evaluar cambios)

# 6. Merge a main
# (Workflow final deploya a staging si existe)
```

### Correr tests localmente

```bash
# Backend
cd apps/api
npm test

# Frontend
cd apps/web
npm test
```

### Linting y formato

```bash
npm run lint   # ESLint
npm run format # Prettier
npm run smoke  # Smoke real con Docker Compose
```

## Conceptos clave

Lo que ya viene operativo en el starter es el healthcheck del API, una base TypeORM mínima conectada a PostgreSQL y una pantalla placeholder en React. El resto de este apartado describe la arquitectura objetivo que irás completando durante el curso.

### 1. **JWT para autenticación**

- Las rutas `/api/tasks`, `/api/users` requieren token
- Generar: `POST /auth/login` con `{ email, password }`
- Enviar en header: `Authorization: Bearer <token>`

### 2. **TypeORM + PostgreSQL**

- Fundación inicial ya cableada en el backend
- Entidades base: `User` y `Task`
- Health check con estado de base de datos: `connected` o `disconnected`
- La evolución a más entidades y relaciones sigue siendo parte del roadmap del curso

### 3. **React + Vite**

- Pantalla placeholder inicial y cableado Vite operativo
- Pages futuras: Dashboard, TaskDetail, Login
- Estado con React Context; añade Zustand cuando realmente lo necesites

### 4. **Observabilidad**

- Logs estructurados (Winston o Pino)
- Métricas básicas (contadores de requests)
- Error tracking (opcional: Sentry)

### 5. **CI/CD con GitHub Actions**

- Lint, test, build en cada PR
- Deploy a staging en main (opcional)
- Secrets en GitHub (DATABASE_URL, etc.)

## Criterios de aceptación

- [ ] Setup local con `docker compose up -d` funciona
- [ ] API responde en <http://localhost:3000/api/health>
- [ ] Frontend carga una pantalla placeholder en <http://localhost:5173>
- [ ] Build base pasa: `npm run build` ✅
- [ ] Tests corren: `npm test` ✅
- [ ] Linting pasa: `npm run lint` ✅
- [ ] Smoke de arranque pasa: `npm run smoke` ✅
- [ ] El starter incluye al menos un test mínimo en API y Web
- [ ] Commits siguen convención: `feat/fix/docs/refactor: descripción`
- [ ] PRs incluyen descripción, checks verdes, y request de review
- [ ] Documentación (README, ADRs, C4) está actualizada

## Próximos pasos

1. **Sesión 01-02**: Genera primeras rutas con Copilot
2. **Sesión 02**: Code review con Copilot CLI en una PR
3. **Sesión 03**: Configura CI/CD workflow
4. **Sesión 04**: Dibuja C4 diagram + escribe ADR
5. **Sesión 05**: Crea MCP server que expone endpoints/modelos
6. **Sesión 07**: Deploy + adopción en equipo

## Recursos

- [Código completo (proyecto-final)](../../sesiones/sesion-07/practica/proyecto-final/)
- [Guía de facilitador](../../sesiones/sesion-07/README.md)
- [MCP Server base](../mcp-base/)
- [GitHub Actions templates](../workflows/)
- [ADR templates](../adr-template/)

## FAQ

**P: ¿Qué si no tengo Docker?**
R: Necesitas Node.js 18+, npm, y PostgreSQL corriendo localmente. Ver `.env.example` para conexión.

**P: ¿Puedo usar otra tech stack?**
R: Sí, la estructura (folders, workflows, conceptos) es agnóstica. Adapta package.json y Dockerfile.

**P: ¿Puedo hacer esto en equipo?**
R: Totalmente. El flujo de PRs, reviews y CI/CD está diseñado para eso.

**P: ¿Cuánto tarda llevar esto a producción?**
R: La plantilla es educativa, no production-ready. Falta: autenticación OAuth, rate limiting avanzado, caching, CDN, etc. Pero la **estructura** es la misma.

---

**Licencia**: MIT · Úsalo, modifícalo, compártelo.
