# Guía del Facilitador: Proyecto Transversal

Este documento está diseñado para facilitadores que enseñan el curso *"IA Aplicada para Developers Senior"*.

## Propósito

El proyecto "Task Tracker Pro" es el **hilo conductor** que conecta las 7 sesiones. Cada sesión enseña una técnica **y** la aplica a este proyecto.

## Cómo funciona

### Antes del curso

1. **Clona o crea un repo**:

   ```bash
   # Opción A: Crea un repo organizacional
   gh repo create mi-org/task-tracker-pro --public

   # Opción B: Usa un GitHub Classroom assignment
   # para que cada alumno tenga su propio fork
   ```

2. **Sube la plantilla**:

   ```bash
   cp -r recursos/ejemplo-transversal-starter/* task-tracker-pro/
   cd task-tracker-pro
   git add . && git commit -m "Initial commit: plantilla Task Tracker Pro"
   git push
   ```

3. **Configura protecciones**:
   - Settings → Branches → "main"
   - Requiere PR reviews antes de merge
   - Requiere status checks (CI/CD)

### Durante cada sesión

#### Sesión 01-02: Prompting + Code review

**Objetivo**: Generar boilerplate con Copilot, evaluarlo críticamente.

**Actividad de clase** (2.5 horas):

1. Introduce JWT + Express (15 min)
2. Demo: "Cómo generar código con Copilot" (10 min)
   - Prompt: "Genera endpoint POST /auth/login con JWT"
   - Muestra cómo iterarpara mejorar
3. Alumnos generan endpoints (1 hora):
   - `/auth/login` (POST)
   - `/auth/refresh` (POST)
   - `GET /api/tasks` (básico, todos)
4. Presentaciones (30 min): 2-3 alumnos muestran su código

**Ejercicio a casa**:

- PR con endpoints + tests básicos
- **Criterios de aceptación**:
  - [ ] Endpoint responde
  - [ ] JWT firmado correctamente
  - [ ] Test de "usuario no encontrado" pasa

**Artefactos**:

- PR en GitHub
- Código en `apps/api/src/routes/`
- Tests en `apps/api/tests/`

---

#### Sesión 02: Code review avanzado + Copilot CLI

**Objetivo**: Revisar críticamente el código de otros (o el suyo propio).

**Actividad de clase** (2.5 horas):

1. Introduce Copilot CLI + GitHub PR API (15 min)
2. Demo: "Cómo revisar un PR con Copilot" (10 min)

   ```bash
   gh pr view <PR_NUMBER> --web
   copilot pr review --web  # (si disponible)
   ```

3. Alumnos hacen peer review (1 hora):
   - Cada uno revisa una PR ajena (Copilot + criterio propio)
   - Sugieren mejoras específicas
4. Preguntas: "¿Qué hizo Copilot bien? ¿Qué no?"

**Ejercicio a casa**:

- Escribir evaluación de una PR (5-10 comentarios)
- **Criterios**:
  - [ ] Identifica al menos 1 problema de seguridad
  - [ ] Sugiere 1 mejora de scalabilidad
  - [ ] Reconoce 1 cosa bien hecha
  - [ ] Usa Copilot CLI como herramienta, no como verdad absoluta

**Artefactos**:

- Comentarios de review en GitHub

---

#### Sesión 03: Automatización CI/CD

**Objetivo**: Configurar GitHub Actions para lint, test, build automáticos.

**Actividad de clase** (2.5 horas):

1. Introduce GitHub Actions (15 min)
2. Demo: "Workflows en la plantilla" (10 min)
   - Muestra `.github/workflows/lint.yml`, `test.yml`, `build.yml`
3. Alumnos activan workflows + escriben test nuevo (1.5 horas):

   ```bash
   cd apps/api
   npm test -- --watch
   # Escribe test para POST /api/tasks
   ```

4. Presentaciones: "Mi PR pasó los checks" (20 min)

**Ejercicio a casa**:

- PR con test nuevo (coverage >70% en el archivo)
- **Criterios**:
  - [ ] Test pasa local: `npm test`
  - [ ] Test pasa en CI (ves checkmark verde en PR)
  - [ ] Linting pasa
  - [ ] Build sucede

**Artefactos**:

- Tests en `apps/api/tests/`
- Passing checks en GitHub

---

#### Sesión 04: Arquitectura + documentación

**Objetivo**: Documentar decisiones (ADRs) y arquitectura (C4).

**Actividad de clase** (2.5 horas):

1. Introduce ADRs + C4 Model (15 min)
2. Demo: "Cómo escribir un ADR" (10 min)
   - Lee `docs/adr/0001-jwt-authentication.md`
   - Muestra patrón de decisión
3. Alumnos escriben 1 ADR nuevo (1.5 horas):
   - Opciones: "PostgreSQL vs MongoDB", "Middleware centralizado", etc.
   - Estructura: Contexto, Decisión, Justificación, Consecuencias
4. Revisión comunitaria: "¿Estás en desacuerdo?" (20 min)

**Ejercicio a casa**:

- ADR completado en `docs/adr/`
- Opcionalmente: dibuja C4 diagram en Mermaid/PlantUML
- **Criterios**:
  - [ ] ADR tiene todas las secciones
  - [ ] Es falsable (alguien podría no estar de acuerdo)
  - [ ] Incluye trade-offs

**Artefactos**:

- `docs/adr/000N-*.md`
- Opcionalmente: diagrama en `docs/C4-DIAGRAM.md` actualizado

---

#### Sesión 05: MCP — Model Context Protocol

**Objetivo**: Crear servidor MCP que expone contexto del proyecto a Copilot.

**Actividad de clase** (2.5 horas):

1. Introduce MCP (15 min)
2. Demo: "MCP server que lista endpoints" (10 min)
   - Muestra `mcp-server/server.py`
   - Copilot accede al contexto
3. Alumnos completan/extienden MCP server (1.5 horas):
   - `list_resources()`: endpoints, models
   - `read_resource()`: devuelve documentación formateada
4. Validación: Todos usan Copilot con MCP activo (20 min)

**Ejercicio a casa**:

- MCP server funcional
- Copilot lo usa para generar endpoint nuevo
- **Criterios**:
  - [ ] `python mcp-server/server.py` no da errores
  - [ ] Copilot accede a endpoints del proyecto
  - [ ] Endpoint generado es consistente (sigue patrones existentes)

**Artefactos**:

- `mcp-server/` completo
- Endpoint nuevo que usó MCP para generar

---

#### Sesión 06: IA & Office 365

**Objetivo**: Integración Office 365 (opcional, basado en interés del equipo).

**Actividad de clase** (2 horas — sesión más corta):

1. Demo: "Exportar tareas a Excel" (15 min)
2. Demo: "Outlook → tareas automáticas" (15 min, si tenéis M365)
3. Alumnos:
   - Generan endpoint `GET /api/tasks/export/excel` con Copilot (1 hora)
   - O implementan Power Automate si es posible

**Ejercicio a casa** (opcional):

- Endpoint funciona y descarga archivo Excel
- **Criterios**:
  - [ ] Archivo Excel se puede descargar
  - [ ] Contiene columnas correctas
  - [ ] Endpoint está autenticado

**Artefactos**:

- Endpoint en `apps/api/src/routes/export.ts`

---

#### Sesión 07: Proyecto final + adopción

**Objetivo**: Deploy + retrospectiva + plan de adopción.

**Actividad de clase** (4.5 horas):

1. **Fase 1: Deploy local** (1.5 horas)
   - Todos hacen un final push de sus cambios
   - Deploy: `docker compose up -d` sin modo dev
   - Validan que funciona

2. **Fase 2: Presentaciones** (2 horas)
   - 5 min por persona (si hay 12+ alumnos, grupos de 2)
   - Estructura:
     - 1 min: ¿Qué construiste? (demo en vivo)
     - 1 min: ¿Qué problema resuelve?
     - 1.5 min: ¿Qué aprendiste?
     - 1.5 min: ¿Qué harías diferente?

3. **Fase 3: Retrospectiva grupal** (1 hora)
   - Retroespe: "¿Qué funcionó? ¿Qué no?"
   - Votación: mejor código, mejor documentación, mejor cambio cultural

**Ejercicio a casa**:

- Documento de adopción para tu equipo
- Incluye:
  - [ ] 3 lecciones clave
  - [ ] Plan de 4 semanas (fases de adopción)
  - [ ] Checklist de governance
  - [ ] Presentación para tu equipo (10 min)

**Artefactos**:

- Deploy funcional (mínimo local, idealmente en servidor)
- Documento de adopción
- Presentación (slides, video o demo)

---

## Variaciones según contexto

### Para un equipo (no curso masivo)

Si estás enseñando a tu propio equipo (5-15 personas):

1. **Repo compartido** (no GitHub Classroom)
2. **Trabajo colaborativo**: Todos contribuyen al mismo repo
3. **Pair programming** en las sesiones
4. **Deploy real** a un servidor compartido (AWS, Azure, etc.)

**Ventajas**:

- Flujo real de desarrollo
- Experiencia con conflictos de merge, revisiones reales
- Proyecto vivo después del curso

### Para aula grande (30+ alumnos)

1. **GitHub Classroom**: cada alumno obtiene su fork
2. **Repos separados** por alumno (enfoque individual)
3. **Show and tell**: cada uno muestra su versión
4. **Cross-pollination**: alumnos leen código de otros, sugerencias

**Ventajas**:

- Cada uno termina con un proyecto completo
- Menos conflictos de merge
- Evaluación individual clara

### Para asincrónico (no presencial)

1. **Videos de teoría** (sesiones 1-5 sin sincronía)
2. **Ejercicios self-paced** (sigen guía en `INTEGRATION-GUIDE.md`)
3. **PRs como "entregas"** (revisión asincrónica con Copilot)
4. **Meetup final** (Sesión 07 sincrónica, presentaciones)

**Ventajas**:

- Flexible con timezones
- Alumnos avanzan a su ritmo
- Evaluación por PR

---

## Rúbrica de evaluación (sesión 07)

Cada alumno/equipo se evalúa en:

| Criterio | Peso | Rúbrica |
|----------|------|---------|
| **Utilidad real** | 30% | ¿El proyecto es útil para el equipo? ¿Se seguirá usando? |
| **Criterio técnico** | 30% | ¿Las decisiones están justificadas? ¿El código es sólido? |
| **Validación IA** | 20% | ¿Evaluó críticamente el output de Copilot? ¿Mejoró el código? |
| **Documentación** | 20% | ¿Está documentado para que otros lo usen? ¿ADRs, C4, README? |

**Escala**:

- 5: Excepcional (producto listo para llevar al equipo)
- 4: Bueno (funciona, bien documentado)
- 3: Satisfactorio (funciona, documentación básica)
- 2: En desarrollo (falta funcionalidad o documentación)
- 1: Incompleto

---

## Problemas comunes y soluciones

### "Los alumnos generan código sin tests"

**Solución**:

- Haz tests obligatorios en la rúbrica (10% mínimo)
- En cada sesión, fuerza: "Si no hay test, no se mergeacept"
- Demo repetida: "Aquí está el test ANTES de generar código"

### "El código generado no es consistente"

**Solución**:

- `.copilot-instructions.md` claro y con ejemplos
- Code review "taller" (30 min en sesión 02):
  - Cada alumno aprende a revisar críticamente
  - Refactoriza el código de otro
- Enforcement: ESLint + Prettier checks en CI

### "MCP server no funciona"

**Solución**:

- Sesión 05: dedica 30 min a debugging en vivo
- Alternativa: si MCP es muy complejo, simplifica a un archivo `context.json` que Copilot lee
- Contingencia: usa un repo en GitHub para que Copilot lo lea (menos elegante pero funciona)

### "Alumnos no terminan a tiempo"

**Solución**:

- Sesión 07 es larga (4.5 h) pero con buffer
- Hito mínimo: "Deploy local funciona", no necesita estar 100% pulido
- Presentación es el punto: qué aprendiste, no lo perfecto que es

### "Equipo no usa el proyecto después"

**Solución**:

- Sesión 07: crea checklist realista ("¿Qué harías primero en el equipo?")
- Facilita una sesión de onboarding en su equipo (30-45 min)
- Ofrece soporte inicial (2-3 semanas de "pre-sales")

---

## Plantillas para compartir

Guarda estos en un Google Drive o GitHub Wiki:

### Plantilla de ADR vacía

```markdown
# ADR NNNN: [Título]

**Estado**: Propuesto  
**Fecha**: YYYY-MM-DD  
**Decisor**: [Nombre]

## Contexto
...

## Decisión
...

## Justificación
...

## Consecuencias
...

## Alternativas descartadas
...
```

### Plantilla de retrospectiva

```markdown
# Retrospectiva [Nombre]

## ¿Qué salió bien?
-

## ¿Qué salió mal?
-

## ¿Qué aprendí?
-

## Plan para el equipo
-
```

---

## Recursos para facilitadores

- **Documentación oficial**:
  - [GitHub Copilot Docs](https://docs.github.com/en/copilot)
  - [GitHub Actions Docs](https://docs.github.com/en/actions)
  - [MCP Specification](https://modelcontextprotocol.io/)

- **Diapositivas/videos** (crea los tuyos o referencia):
  - Sesión 01: "Prompting 101"
  - Sesión 05: "MCP deep dive"

- **Casos de uso de equipos reales** (recolecta durante el curso):
  - Qué equipo usó para qué
  - Cómo lo adaptaron
  - Resultados cuantitativos (velocidad, bugs, satisfacción)

---

## Feedback + iteración

Después de cada cohorte:

1. **Encuesta a alumnos** (5 min):
   - ¿Qué ejercicio fue más útil?
   - ¿Dónde tuviste dificultades?
   - ¿Lo llevarás a tu equipo?

2. **Mejora la guía**:
   - Ejercicios menos claros → reescribe prompts
   - Hitos muy largos → divide en partes
   - MCP no funcionó → crea fallback

3. **Publica learnings**:
   - "Cómo enseñar MCP en 1 sesión"
   - "Antipatrones en code review con Copilot"

---

¡Buena suerte facilitando! Si tienes preguntas, abre una issue o une PR. 🚀
