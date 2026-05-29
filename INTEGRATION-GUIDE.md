# Guía de integración del proyecto transversal en cada sesión

Este documento conecta cada sesión del curso con ejercicios prácticos en el proyecto "Task Tracker Pro".

## Sesión 01-02: Prompting avanzado + Copilot code review

### Objetivo

Generar boilerplate API con Copilot (prompting avanzado) y evaluar código críticamente.

### Ejercicio 01.1: Generar primeras rutas con Copilot

**Hito**: Tener endpoints `/auth/login`, `/auth/refresh`, `GET /api/tasks` básicos

**Prompt sugerido para Copilot**:

```
Genera una ruta Express en TypeScript para autenticación con JWT.
- Endpoint: POST /auth/login
- Input: { email: string, password: string }
- Output: { accessToken: string, refreshToken: string, user: { id, email, name } }
- Usar bcrypt para comparar passwords
- Generar JWT con algoritmo HS256
- Incluir error handling: usuario no encontrado, contraseña incorrecta
- Incluir test básico con Jest
- Convención: seguir patrón service/controller
```

**Criterios de aceptación**:

- [ ] Endpoint responde en <http://localhost:3000/auth/login>
- [ ] JWT válido generado y retornado
- [ ] Test de "usuario no encontrado" pasa
- [ ] Código es type-safe (sin `any`)

### Ejercicio 01.2: Evaluación crítica del código generado

**Prompt para Code Review (sesión 02)**:

```
Revisa este código de autenticación:
[pegar código]

Evalúa:
1. ¿Es seguro? (timing attacks, validación, etc.)
2. ¿Es escalable? (si tenemos 1M usuarios, ¿qué falla?)
3. ¿Falta algo? (rate limiting, audit logging)
4. ¿Qué mejorarías?

Usa Copilot CLI para comparar con best practices.
```

**Criterios de aceptación**:

- [ ] Evaluación escrita en una PR (mínimo 3 puntos)
- [ ] Sugerencias de mejora incluyen tests
- [ ] Código no cambió (solo review)

---

## Sesión 03: Automatización GitHub Actions

### Objetivo

Configurar CI/CD para que cada PR ejecute lint, test, build automáticamente.

### Ejercicio 03.1: Activar workflows de GitHub Actions

**Hito**: Los workflows de lint, test, build corren en cada PR

**Tareas**:

1. Copia los workflows desde `.github/workflows/` a tu fork
2. Asegúrate que GitHub Actions esté habilitado
3. Crea una PR dummy (ej: agregar comentario en README)
4. Verifica que lint, test, build corren automáticamente

**Criterios de aceptación**:

- [ ] Workflow "Lint" ejecuta y pasa en verde
- [ ] Workflow "Test" ejecuta y pasa con coverage >70%
- [ ] Workflow "Build" genera artefactos
- [ ] Status checks son obligatorios para merge (en GitHub Settings)

### Ejercicio 03.2: Agregar tu primer test

**Hito**: Test de integración para `/auth/login` básico

**Guía**:

```bash
cd apps/api
npm test -- --watch
# Escribe test en tests/auth.test.ts
```

**Ejemplo mínimo**:

```typescript
describe('POST /auth/login', () => {
  it('should return tokens for valid credentials', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'password' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('accessToken');
  });

  it('should return 401 for invalid email', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'wrong@example.com', password: 'password' });

    expect(response.status).toBe(401);
  });
});
```

**Criterios de aceptación**:

- [ ] Test es reproducible (pasa local y en CI)
- [ ] Cubre casos: success, error, edge case
- [ ] Coverage de auth sube de 0% a >80%

---

## Sesión 04: Arquitectura y documentación

### Objetivo

Documentar decisiones arquitectónicas (ADRs) y diagramas C4.

### Ejercicio 04.1: Escribir tu primer ADR

**Hito**: ADR completo sobre una decisión técnica del proyecto

**Opciones**:

1. "Usar PostgreSQL en lugar de MongoDB" (es dato estructurado, relaciones claras)
2. "Middleware de autenticación centralizado" (vs. decorator en rutas)
3. "TypeORM con repositories" (vs. raw SQL o Prisma)

**Estructura (basada en docs/adr/0001-jwt-authentication.md)**:

```
# ADR NNNN: [Título de la decisión]

**Estado**: Aceptado  
**Fecha**: YYYY-MM-DD  
**Decisor**: [Tu nombre]

## Contexto
[Problema que necesita decisión]

## Decisión
[Qué elegiste y por qué]

## Justificación
[Pros y contras]

## Consecuencias
[Qué cambia si implementas esto]

## Alternativas descartadas
[Opciones que consideraste]
```

**Criterios de aceptación**:

- [ ] ADR está en `docs/adr/`
- [ ] Tiene mínimo 3 secciones completas
- [ ] Es falsable: alguien puede estar en desacuerdo

### Ejercicio 04.2: Revisar y comentar el C4 diagram

**Hito**: C4 diagram actualizado con feedback

**Tareas**:

1. Lee `docs/C4-DIAGRAM.md`
2. Dibuja el diagrama en papel o Mermaid/PlantUML
3. Compara con el código real
4. Agrega al diagrama:
   - Sistemas externos (si los hay)
   - Caminos de error (ej: JWT expirado)
   - Posibles mejoras (WebSocket, cache, etc.)

**Criterios de aceptación**:

- [ ] Diagrama está actualizado con cambios de código
- [ ] Incluye mínimo 2 niveles (Context + Container, o Container + Component)
- [ ] Puedes explicarlo a alguien en 5 minutos

---

## Sesión 05: MCP — Model Context Protocol

### Objetivo

Crear un servidor MCP que expone endpoints y models del proyecto.

### Ejercicio 05.1: Servidor MCP básico

**Hito**: Servidor MCP que lista endpoints y models de la API

**Estructura**:

```python
# mcp-server/server.py
from mcp.server import Server

server = Server()

@server.list_resources()
def list_resources():
    return [
        {
            "uri": "api://endpoints",
            "name": "API Endpoints",
            "description": "Lista de endpoints con métodos y autenticación"
        },
        {
            "uri": "api://models",
            "name": "Data Models",
            "description": "TypeORM entities y tipos TypeScript"
        }
    ]

@server.read_resource()
def read_resource(uri: str):
    if uri == "api://endpoints":
        # Parsea Express routes y devuelve JSON
        return fetch_endpoints_from_api()
    elif uri == "api://models":
        # Lee archivos .ts de models/
        return fetch_models_from_codebase()
```

**Criterios de aceptación**:

- [ ] Servidor corre en stdio: `python mcp-server/server.py`
- [ ] Copilot puede conectarse vía MCP
- [ ] Al usar Copilot, tiene acceso a endpoints y modelos del proyecto

### Ejercicio 05.2: Usar MCP para generar código

**Hito**: Generar un endpoint nuevo usando contexto del MCP

**Flujo**:

1. Conecta el MCP server a Copilot
2. Prompt: "Genera un endpoint `GET /api/tasks/:id` que devuelva una tarea por ID, con autenticación JWT y manejo de errores."
3. Copilot accede al MCP para ver:
   - Estructura de la ruta `/api/tasks`
   - Modelo `Task` (campos, tipos)
   - Patrón de autenticación existente
4. Genera código coherente

**Criterios de aceptación**:

- [ ] MCP está conectado a Copilot (ves `[MCP]` en respuestas)
- [ ] Código generado es consistente con el existente
- [ ] Endpoint funciona (manual test o test automatizado)

---

## Sesión 06: IA & Office 365

### Objetivo

Exportar datos del proyecto a Excel, generar reportes.

### Ejercicio 06.1: Generar reporte de tareas en Excel

**Hito**: Endpoint que devuelve un archivo Excel con tareas, timestamps, asignatarios

**Opciones**:

1. **Backend-heavy**: Endpoint `GET /api/tasks/export/excel` que genera el archivo
2. **Frontend-heavy**: JavaScript que genera Excel desde datos en el dashboard

**Sugerencia**: Usa librería como `exceljs` o `xlsx`

**Criterios de aceptación**:

- [ ] Archivo Excel generado tiene columnas: ID, Título, Estado, Prioridad, Asignatario, Fecha
- [ ] Endpoint está protegido con JWT
- [ ] Archivo se descarga automáticamente

### Ejercicio 06.2: Sincronización Outlook → Tareas (opcional)

Si tienes Microsoft 365:

- Crea un Power Automate que capture emails de un remitente específico
- Envía a tu API `/api/tasks` para crear tareas automáticamente

---

## Sesión 07: Proyecto final y adopción en equipo

### Objetivo

Deploy + retrospectiva + checklist de adopción.

### Ejercicio 07.1: Deploy a staging (opcional, local demo)

**Hito**: Proyecto corre en "producción" (local o en servidor)

**Pasos mínimos**:

```bash
# 1. Build Docker images
docker build -t task-tracker-api apps/api
docker build -t task-tracker-web apps/web

# 2. Docker Compose full (sin hot-reload)
# Edita docker-compose.yml: command: npm start

# 3. Accede a http://localhost:5173
```

**Criterios de aceptación**:

- [ ] Setup sin `npm run dev` (production-like)
- [ ] API responde
- [ ] Frontend carga (aunque sea vacío)
- [ ] BD está poblada

### Ejercicio 07.2: Retrospectiva y checklist de adopción

**Hito**: Documento de lecciones aprendidas + plan de adopción en equipo

**Estructura**:

```markdown
# Retrospectiva: Task Tracker Pro

## ¿Qué salió bien?
- Copilot aceleró generación de boilerplate en 40%
- MCP permitió generar código consistente
- Tests automáticos atraparon 3 bugs antes de merge

## ¿Qué salió mal?
- JWT sin rotación es riesgo (sólo mitigado por expiración corta)
- Falta WebSocket para colaboración real-time
- UI es minimalista (no production-ready)

## Próximas iteraciones
- [ ] Rate limiting en login (brute force)
- [ ] Logging estructurado y observabilidad
- [ ] WebSocket para actualizaciones en tiempo real
- [ ] Integración con Slack/Teams

## Recomendaciones para el equipo
1. **Usar Copilot CLI en PRs**: Evalúa cambios antes de leerlos
2. **MCP centralizado**: Expone contexto compartido (APIs, esquema DB, convencionescommonwealth)
3. **CI/CD obligatorio**: Blocks en PRs hasta que pasen checks
4. **ADRs para decisiones**: Documenta por qué, no solo qué

## Adopción en N equipos
- Semana 1: Setup + training en convenciones
- Semana 2: Primer endpoint con code review asistido
- Semana 3: Integración de tests + MCP
- Semana 4: Plan de observabilidad + deploy
```

**Criterios de aceptación**:

- [ ] Documento escrito (mínimo 500 palabras)
- [ ] Incluye métricas (velocidad, bugs atrapados, adopción)
- [ ] Actionable: alguien puede llevar recomendaciones a su equipo

---

## Resumen de hitos por sesión

| Sesión | Hito | Artefacto |
|--------|------|----------|
| 01-02  | Endpoints `/auth/login`, `/auth/refresh`, `GET /api/tasks` | PR con código + tests |
| 03     | CI/CD workflows activos (lint, test, build) | PR con test nuevo (coverage >70%) |
| 04     | 1 ADR + C4 diagram actualizado | Documentación en `docs/` |
| 05     | MCP server conectado a Copilot | Servidor en `mcp-server/` |
| 06     | (Opcional) Exportación Excel o Outlook sync | Endpoint `/api/tasks/export` |
| 07     | Deploy + retrospectiva + plan de adopción | Documento de aprendizajes |

---

## Cómo usar esta guía

1. **Facilitador**: Abre esta guía en cada sesión, presenta el hito y los ejercicios
2. **Alumnos**: Hacen ejercicios en sus propios forks
3. **Todos**: Comparten PRs, hacen reviews con Copilot CLI, aprenden del código ajeno

¡Al final, cada uno tiene un proyecto transversal funcional que puede mostrar a su equipo!
