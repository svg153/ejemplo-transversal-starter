# Convenciones de código y flujo de trabajo

## Estructura de commits

Seguir **Conventional Commits**:

```
feat(api/auth): agregar JWT refresh token
fix(web): corregir validación de formulario
docs(README): actualizar instrucciones de setup
test(api): agregar tests para POST /tasks
refactor(api): simplificar middleware de autenticación
ci(actions): agregar workflow de deploy
```

**Formato**:

```
<tipo>(<scope>): <descripción>

<cuerpo (opcional)>

Closes #123
```

**Tipos**:

- `feat` — Nueva funcionalidad
- `fix` — Corrección de bug
- `docs` — Cambios en documentación
- `test` — Tests o coverage
- `refactor` — Cambios sin nueva funcionalidad
- `ci` — Cambios en CI/CD
- `chore` — Actualizaciones de dependencias, etc.

## Branching strategy

```
main
 └─ feat/new-feature (feature branch)
     └─ Merge con PR después de review
```

- **main**: Siempre deployable, tests verdes
- **feature branches**: `feat/`, `fix/`, `docs/` + descripción

## Code style

- **Lenguaje**: TypeScript (strict mode)
- **Linter**: ESLint
- **Formatter**: Prettier (80 chars)
- **Test framework**: Jest

### Backend (`apps/api`)

```typescript
// ✅ BUENO
export async function getTaskById(id: string): Promise<Task> {
  if (!id || id.length === 0) {
    throw new BadRequestError('ID is required');
  }
  const task = await db.task.findById(id);
  if (!task) {
    throw new NotFoundError(`Task ${id} not found`);
  }
  return task;
}

// ❌ MALO
async function getTaskById(id) {
  return db.task.findById(id);
}
```

Principios:

- Tipado estricto
- Manejo explícito de errores
- Logging en operaciones críticas
- Tests para lógica de negocio

### Frontend (`apps/web`)

```typescript
// ✅ BUENO
interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onDelete }: TaskCardProps) {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <button onClick={() => onDelete(task.id)}>Eliminar</button>
    </div>
  );
}

// ❌ MALO
export function TaskCard(props) {
  return <div>{props.task.title}</div>;
}
```

Principios:

- Props tipadas
- Componentes pequeños y reutilizables
- Separar estado (Context/Zustand) de presentación

## Pull Request workflow

1. **Crea rama**:

   ```bash
   git checkout -b feat/mi-feature
   ```

2. **Develop localmente**:

   ```bash
   npm run dev
   npm test
   npm run lint
   ```

3. **Commit frecuentes** (Conventional Commits):

   ```bash
   git commit -m "feat(api): agregar endpoint GET /tasks"
   ```

4. **Push**:

   ```bash
   git push origin feat/mi-feature
   ```

5. **Abre PR en GitHub**:
   - Título: descripción clara (ej: "Agregar filtrado de tareas por estado")
   - Descripción: qué cambia, por qué, cómo probar
   - Checklist (copia esto):

     ```
     - [ ] Tests nuevos y existentes pasan
     - [ ] Linting pasa
     - [ ] Cambios documentados (README, ADRs si aplica)
     - [ ] Sin secrets o datos sensibles
     ```

6. **Espera review** (Copilot CLI puede ayudar):

   ```bash
   # Ver cambios
   gh pr view <PR_NUMBER> --web

   # Pedir review automático
   copilot pr review --web
   ```

7. **Merge** después de approvals

## Testing

**Cobertura mínima**: 70%

### Backend

```bash
cd apps/api
npm test
npm run test:coverage
```

Escribir tests para:

- Validaciones
- Errores y edge cases
- Llamadas a BD
- Autorización

### Frontend

```bash
cd apps/web
npm test
```

Escribir tests para:

- Rendering de componentes
- Interacciones (clicks, inputs)
- Efectos (mocks de API)

## Logging

**Backend** (Winston o Pino):

```typescript
logger.info('Task created', { taskId, userId });
logger.error('DB connection failed', { error: err });
```

**Frontend** (console con prefijo o Sentry):

```typescript
console.log('[TaskService] Fetching tasks');
```

## Seguridad

- ✅ No commites `.env` (usa `.env.example`)
- ✅ No logs de passwords, tokens, etc.
- ✅ Valida inputs en backend (no confíes en frontend)
- ✅ SQL injection: usa ORM (TypeORM)
- ✅ CORS configurado (solo orígenes permitidos)

## Documentación

- **README.md**: Cómo hacer setup y correr
- **C4-DIAGRAM.md**: Diagrama de arquitectura
- **adr/**: Decisiones arquitectónicas importantes
- **Inline comments**: Solo lo no obvio

---

Dudas? Pregunta en el curso o abre una issue.
