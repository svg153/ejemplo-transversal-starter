# Proyecto Transversal: Roadmap e Integración

## Visión general

El curso está estructurado alrededor de **"Task Tracker Pro"**, un proyecto que evoluciona en cada sesión. Este documento es tu **mapa de navegación**.

## Estructura

```
recursos/
└── ejemplo-transversal-starter/     ← Plantilla que clonas y usas
    ├── README.md                      (Quick start)
    ├── CONVENTIONS.md                 (Código + flujo de trabajo)
    ├── INTEGRATION-GUIDE.md            (Ejercicios por sesión)
    ├── .copilot-instructions.md       (Contexto para Copilot)
    ├── docker-compose.yml              (Setup local)
    ├── apps/api/                      (Backend Express + TypeORM)
    ├── apps/web/                      (Frontend React)
    ├── infra/postgres/                (Schema + seed)
    ├── docs/C4-DIAGRAM.md             (Arquitectura)
    ├── docs/adr/                      (Decisiones)
    ├── mcp-server/                    (MCP que expone contexto)
    └── .github/workflows/             (CI/CD: lint, test, build)

sesiones/sesion-07/practica/
└── proyecto-final/                  ← Referencia completada
    ├── README.md                      (Cómo usar este proyecto)
    ├── (Contiene todo arriba, pero con implementación completa)
    └── ADOPTION-CHECKLIST.md          (Plan de adopción en equipo)
```

## Tu flujo de trabajo

### Paso 1: Clonar la plantilla

```bash
git clone https://github.com/TU-REPO/copilot-course.git
cd copilot-course
cd recursos/ejemplo-transversal-starter/

# O si prefieres trabajar en tu propio repo:
git init task-tracker-tuyo
cd task-tracker-tuyo
cp -r /path/to/ejemplo-transversal-starter/* .
```

### Paso 2: Setup local

```bash
# Instala Node.js 22+, Docker
# Luego:
docker compose up -d

# Espera a que esté listo (5-10 segundos)
# API: http://localhost:3000/api/health
# Web: http://localhost:5173
```

### Paso 3: Sigue los ejercicios por sesión

Lee `INTEGRATION-GUIDE.md` y completa ejercicios:

| Sesión | Ejercicio | Artefacto |
|--------|-----------|----------|
| 01-02  | Generar rutas API con Copilot | PR con endpoints `/auth`, `GET /api/tasks` |
| 02     | Code review de tu código | PR con evaluación de seguridad/escalabilidad |
| 03     | Activar CI/CD + escribir test | PR con test de `/auth/login` |
| 04     | Escribir ADR + revisar C4 | `docs/adr/NNNN-*.md` actualizado |
| 05     | Crear MCP server | `mcp-server/` conectado a Copilot |
| 06     | (Opcional) Exportar Excel | Endpoint `GET /api/tasks/export` |
| 07     | Deploy + retrospectiva | Documento de lecciones + plan de adopción |

### Paso 4: Compare con la referencia

Si quieres ver cómo lucen tus ejercicios terminados:

```bash
# Tu versión
cat apps/api/tests/tasks.test.ts

# La referencia
cat ../../sesiones/sesion-07/practica/proyecto-final/apps/api/tests/tasks.test.ts

# Diff
diff -u apps/api/tests/tasks.test.ts \
          ../../sesiones/sesion-07/practica/proyecto-final/apps/api/tests/tasks.test.ts
```

### Paso 5: Adopción en tu equipo

Cuando termines el curso, lleva el proyecto a tu equipo:

1. Crea un repo compartido (copia la plantilla)
2. Abre la sesión 07 checklist de adopción
3. Adapta a tu contexto (cambiar modelos, endpoints, tech stack si es necesario)

---

## Mapa de archivos clave

### Backend (Express + TypeORM)

```
apps/api/src/
├── main.ts                  ← Punto de entrada, inicializa Express
├── routes/                  ← Routers por dominio
│   ├── health.ts           (GET /api/health, base operativa)
│   ├── auth.ts             (POST /auth/login, /auth/refresh)
│   ├── tasks.ts            (GET, POST, PUT, DELETE /api/tasks)
│   └── users.ts            (GET /api/users/:id, POST /api/users)
├── models/                  ← TypeORM entities
│   ├── user.entity.ts       (Campos: email, name, password_hash)
│   ├── task.entity.ts       (Campos: title, description, status, priority)
│   └── comment.entity.ts    (Campos: content, ref a task/user)
├── services/                ← Lógica de negocio
│   ├── auth.service.ts      (JWT, bcrypt, validación)
│   ├── task.service.ts      (CRUD, filtrado, autorización)
│   └── user.service.ts      (Perfiles, preferencias)
├── middleware/              ← Expressmiddlewares
│   ├── auth.middleware.ts   (JWT validation)
│   └── error.middleware.ts  (Manejo de errores)
└── database.ts              ← Configuración TypeORM
```

### Frontend (React + Vite)

```
apps/web/src/
├── App.tsx                  ← Router principal
├── pages/
│   ├── LoginPage.tsx        (Formulario de login)
│   ├── DashboardPage.tsx    (Lista de tareas)
│   ├── TaskDetailPage.tsx   (Detalle + edición)
│   └── SettingsPage.tsx     (Perfil del usuario)
├── components/              ← Componentes reutilizables
│   ├── TaskCard.tsx         (Presentación de tarea)
│   ├── Modal.tsx            (Dialogo genérico)
│   ├── Form.tsx             (Formulario con validación)
│   └── Header.tsx           (Navegación + logout)
├── services/                ← Clientes de API
│   ├── api.ts               (Configuración fetch + interceptores JWT)
│   ├── authService.ts       (Login, refresh, logout)
│   └── taskService.ts       (Fetch, create, update, delete tasks)
├── hooks/                   ← Hooks personalizados
│   ├── useAuth.ts           (Estado de autenticación)
│   └── useTasks.ts          (Estado de tareas)
├── stores/                  ← Opcional: Zustand si lo necesitas
│   ├── authStore.ts         (User, token, isLoading)
│   └── taskStore.ts         (Tasks, filters, sorting)
└── styles/                  (CSS/Tailwind)
```

### Documentación

```
docs/
├── C4-DIAGRAM.md            ← Niveles 1-3: Context, Container, Component
├── adr/
│   ├── 0001-jwt-authentication.md  (Por qué JWT, no Session)
│   ├── 0002-...
│   └── README.md            (Índice de ADRs)
└── DEPLOYMENT.md            (Cómo deployar a producción)
```

### Configuración

```
.github/workflows/
├── lint.yml                 ← ESLint + Prettier
├── test.yml                 ← Jest (Backend + Frontend)
├── build.yml                ← Compila TypeScript, React
└── deploy.yml               (Opcional: push a staging)
```

---

## Cómo usar `.copilot-instructions.md`

Este archivo es tu **brújula para Copilot**. Define:

- Convenciones (TypeScript strict, tests obligatorios)
- Qué ayuda Copilot debe dar (seguridad, escalabilidad, documentación)
- Qué no debe hacer (código con `any`, secrets en logs)

**Copilot lo lee automáticamente** si está en la raíz del repo.

---

## Flujo típico de una sesión

```
1. Abres VS Code en carpeta del proyecto
2. Copilot ve .copilot-instructions.md
3. Tú: "Genera endpoint GET /api/tasks/:id"
4. Copilot:
   - Ve la estructura (apps/api/src/routes/)
   - Accede a contexto vía MCP (si lo activaste)
   - Propone código consistente con convencionesexistentes
5. Tú: Revisas críticamente, haces tests, abres PR
6. GitHub Actions: lint, test, build automáticos
7. Code review (con Copilot CLI): `gh pr view --web`
8. Merge a main
```

---

## Troubleshooting

**P: Docker no levanta**  
R: Verifica puertos (5432, 3000, 5173) no estén ocupados. Intenta: `docker compose down && docker compose up -d`

**P: Módulo no encontrado (TypeORM, etc.)**  
R: `npm install` en raíz. Luego: `npm install` en `apps/api` y `apps/web` si es monorepo con workspaces.

**P: Base de datos vacía**  
R: Verifica `infra/postgres/init.sql`. Si cambias schema, reinicia: `docker compose down -v && docker compose up -d`

**P: Copilot no ve el contexto del MCP**  
R: Asegúrate que `mcp-server/` está corriendo. En VS Code: `Cmd+Shift+P` → "Copilot: Debug" → ves lista de MCPs.

---

## Checklist para terminar el curso

- [ ] Cloné `ejemplo-transversal-starter/`
- [ ] `docker compose up -d` funciona
- [ ] Completé mínimo 3 ejercicios de sesiones 1-6
- [ ] Hice una PR con tests
- [ ] Escribí un ADR
- [ ] MCP está conectado a Copilot (vi el contexto)
- [ ] Deploy local funciona
- [ ] Retrospectiva escrita (lecciones aprendidas)
- [ ] Listo para llevar a mi equipo ✅

---

## Después del curso

Tu proyecto **no termina aquí**. Opciones:

1. **Convertirlo en MVP real**: Agregar autenticación OAuth, rate limiting, observabilidad
2. **Usar como template en tu equipo**: Clona la plantilla para nuevos microservicios
3. **Enseñarle a otros**: Facilita una sesión en tu equipo, muestra el flujo
4. **Publicar como referencia**: Si es útil, comparte en GitHub, comunidad, blog

---

¡Adelante! 🚀
