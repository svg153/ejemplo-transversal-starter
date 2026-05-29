# Task Tracker Pro — Índice completo

Bienvenido. Este es tu **punto de entrada** al proyecto transversal del curso.

## 🚀 Empieza aquí

1. **Si recién llegas**: Lee [README.md](README.md) (5 min)
2. **Si vas a hacer los ejercicios**: Lee [ROADMAP.md](ROADMAP.md) (10 min)
3. **Si eres facilitador**: Lee [FACILITATOR-GUIDE.md](FACILITATOR-GUIDE.md) (15 min)

---

## 📋 Documentación por rol

### 👨‍💻 Alumno / Developer

| Documento | Propósito | Tiempo |
|-----------|-----------|--------|
| [README.md](README.md) | Quick start: clonar, levantar, entender | 5 min |
| [ROADMAP.md](ROADMAP.md) | Mapa completo: qué está dónde, flujo por sesión | 15 min |
| [CONVENTIONS.md](CONVENTIONS.md) | Cómo escribir código, commits, PRs | 10 min |
| [INTEGRATION-GUIDE.md](INTEGRATION-GUIDE.md) | Ejercicios específicos por sesión | 30 min |
| [.copilot-instructions.md](.copilot-instructions.md) | Contexto para Copilot (se lee automáticamente) | - |
| [docs/C4-DIAGRAM.md](docs/C4-DIAGRAM.md) | Arquitectura del sistema | 15 min |
| [docs/adr/](docs/adr/) | Decisiones arquitectónicas (empezar con 0001) | 10 min |

**Checklist de inicio**:

- [ ] Leí README.md
- [ ] Corrí `docker compose up -d` sin errores
- [ ] Accedí a <http://localhost:3000/api/health>
- [ ] Accedí a <http://localhost:5173>
- [ ] Leí ROADMAP.md
- [ ] Identifiqué mi primer ejercicio (sesión actual)

### 🎓 Facilitador / Profesor

| Documento | Propósito | Tiempo |
|-----------|-----------|--------|
| [FACILITATOR-GUIDE.md](FACILITATOR-GUIDE.md) | Cómo enseñar el curso, actividades por sesión | 30 min |
| [INTEGRATION-GUIDE.md](INTEGRATION-GUIDE.md) | Qué ejercicios asignar cada sesión | 20 min |
| [CONVENTIONS.md](CONVENTIONS.md) | Para reforzar con alumnos | 10 min |

**Checklist de preparación**:

- [ ] Leí FACILITATOR-GUIDE.md
- [ ] Preparé variación para mi contexto (aula, equipo, asincrónico)
- [ ] Configuré protecciones en GitHub (main branch)
- [ ] Creé plantilla de ADR para alumnos
- [ ] Preparé demostración en vivo para sesión 01

### 🏗️ Arquitecto / Tech Lead

| Documento | Propósito | Tiempo |
|-----------|-----------|--------|
| [docs/C4-DIAGRAM.md](docs/C4-DIAGRAM.md) | Entender estructura del sistema | 15 min |
| [docs/adr/0001-jwt-authentication.md](docs/adr/0001-jwt-authentication.md) | Entender patrón de decisiones | 10 min |
| [ROADMAP.md](ROADMAP.md) → sección "Estructura" | Navegar el código | 10 min |

**Para adaptar a tu contexto**:

- Duplica la plantilla en tu repo
- Reemplaza modelos (User/Task/Comment) con tus entities
- Reemplaza endpoints con los tuyos
- Mantén la estructura (services/routes/models, CI/CD, docs)

---

## 📁 Estructura visual

```
task-tracker-pro/
│
├── 📖 Documentación principal
│   ├── README.md                    ← Empieza aquí
│   ├── INDEX.md                     ← (estás aquí)
│   ├── ROADMAP.md                   ← Mapa general
│   ├── CONVENTIONS.md               ← Estándar de código
│   ├── INTEGRATION-GUIDE.md         ← Ejercicios por sesión
│   ├── FACILITATOR-GUIDE.md         ← Para docentes
│   └── .copilot-instructions.md     ← Contexto para Copilot
│
├── 📐 Arquitectura y decisiones
│   └── docs/
│       ├── C4-DIAGRAM.md            ← Diagramas (Context, Container, Component)
│       └── adr/
│           ├── README.md            ← Índice de ADRs
│           └── 0001-jwt-authentication.md  ← Primer ADR (ejemplo)
│
├── 🛠️ Código
│   └── apps/
│       ├── api/                     ← Backend (Express + TypeORM)
│       │   ├── src/
│       │   │   ├── routes/          (endpoints)
│       │   │   ├── models/          (entities)
│       │   │   ├── services/        (lógica)
│       │   │   ├── middleware/      (autenticación, errores)
│       │   │   └── main.ts          (punto de entrada)
│       │   ├── tests/               (jest)
│       │   ├── Dockerfile
│       │   └── package.json
│       │
│       └── web/                     ← Frontend (React + Vite)
│           ├── src/
│           │   ├── pages/           (rutas)
│           │   ├── components/      (reutilizables)
│           │   ├── services/        (cliente API)
│           │   ├── stores/          (opcional: Zustand state)
│           │   └── App.tsx
│           ├── Dockerfile
│           └── package.json
│
├── 🐘 Base de datos
│   └── infra/postgres/
│       └── init.sql                 ← Schema + seed
│
├── ⚙️ Automatización
│   └── .github/workflows/
│       ├── lint.yml                 (ESLint + Prettier)
│       ├── test.yml                 (Jest)
│       └── build.yml                (TypeScript + React)
│
├── 🤖 MCP (Contexto para Copilot)
│   └── mcp-server/
│       ├── server.py
│       └── requirements.txt
│
├── ⚡ Configuración
│   ├── docker-compose.yml           ← Orquestación local
│   ├── package.json                 ← Monorepo root
│   ├── .gitignore
│   └── .env.example
```

---

## ⚡ Quick reference

### Comandos esenciales

```bash
# Setup
docker compose up -d

# Desarrollo
npm run dev              # (en root o por app)
npm test
npm run lint
npm run format

# Acceso
API:  http://localhost:3000/api/health
Web:  http://localhost:5173
DB:   localhost:5432

# Parar
docker compose down
```

### Flujo típico

```
1. Abre rama (git checkout -b feat/...)
2. Haz cambios, tests, commits
3. Push (git push origin feat/...)
4. Abre PR en GitHub
5. Tests corren automáticamente
6. Code review (manual + Copilot CLI)
7. Merge a main
```

### Rutas de aprendizaje recomendadas

#### Ruta A: Copilot + Testing

1. [INTEGRATION-GUIDE.md](INTEGRATION-GUIDE.md) → Ejercicios 01-02 (prompting)
2. Escribe test del endpoint que generaste
3. PR con cambios

#### Ruta B: Arquitectura

1. Lee [docs/C4-DIAGRAM.md](docs/C4-DIAGRAM.md)
2. Dibuja tu propia versión
3. Escribe 1 ADR en [docs/adr/](docs/adr/)

#### Ruta C: MCP + Automatización

1. Revisa [INTEGRATION-GUIDE.md](INTEGRATION-GUIDE.md) → Sesión 05
2. Activa MCP server, conecta a Copilot
3. Genera un endpoint con asistencia de contexto

---

## ❓ Preguntas frecuentes

**P: ¿Por dónde empiezo?**  
R: Clona el repo, haz `docker compose up -d`, lee README.md.

**P: ¿Qué si cambio de tech stack?**  
R: Está bien. La estructura (folders, workflows, conceptos) es agnóstica. Adapta `package.json` y `Dockerfile`.

**P: ¿Puedo hacer esto solo o en equipo?**  
R: Ambos. Solo: tu propio fork. Equipo: repo compartido con PRs.

**P: ¿Cuánto tarda completar todo?**  
R: 35 horas de curso. Luego, 5-10 horas para adaptar a tu contexto.

**P: ¿Voy a entender el código?**  
R: Sí. Empieza por [ROADMAP.md](ROADMAP.md) → busca la sección "Backend (Express + TypeORM)".

---

## 🎯 Objetivos por rol

### Alumno

- [ ] Entender cómo Copilot acelera boilerplate (sin sustituir tu criterio)
- [ ] Escribir tests + documentación con IA
- [ ] Llevar este proyecto a tu equipo real
- [ ] Criterio: saber cuándo confiar en IA y cuándo revisar manualmente

### Facilitador

- [ ] Enseñar técnicas de IA en contexto práctico
- [ ] Crear cultura de code review asistido
- [ ] Entregar a cada alumno un proyecto "reutilizable"
- [ ] Adopción medible en equipos de alumnos

### Tech Lead

- [ ] Integrar IA en flujo real del equipo
- [ ] Mantener calidad = criterio + herramientas
- [ ] Documentar decisiones
- [ ] Observabilidad: qué funciona, qué no, ROI

---

## 📚 Recursos externos

- [GitHub Copilot Docs](https://docs.github.com/en/copilot)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [MCP Specification](https://modelcontextprotocol.io/)
- [C4 Model](https://c4model.com/)
- [Architectural Decision Records](https://adr.github.io/)

---

## 🚀 Próximos pasos

**Mañana**:

1. Clona o crea el repo
2. Corre `docker compose up -d`
3. Lee ROADMAP.md
4. Identifica tu primer ejercicio

**Esta semana**:

1. Completa ejercicios de sesión 01-02
2. Abre una PR
3. Pide review (humana + Copilot)

**Este mes**:

1. Todas las sesiones completadas
2. MCP funcionando
3. Deploy local
4. Plan de adopción escrito

**Después del curso**:

1. Lleva el proyecto a tu equipo
2. Adapta modelos/endpoints a tu contexto
3. Mide: velocidad, bugs, adopción de IA
4. Itera

---

## 💬 Soporte

- **Dudas sobre ejercicios**: Lee [INTEGRATION-GUIDE.md](INTEGRATION-GUIDE.md)
- **Dudas de código**: Explora `apps/api/src/` y `apps/web/src/`
- **Dudas arquitectónicas**: Lee [docs/C4-DIAGRAM.md](docs/C4-DIAGRAM.md) y ADRs
- **Dudas de MCP**: Sesión 05 en [INTEGRATION-GUIDE.md](INTEGRATION-GUIDE.md)
- **Dudas pedagógicas** (facilitadores): [FACILITATOR-GUIDE.md](FACILITATOR-GUIDE.md)

---

**Versión**: 1.0  
**Licencia**: MIT  
**Última actualización**: Feb 2026

¡Bienvenido al proyecto! Adelante. 🚀
