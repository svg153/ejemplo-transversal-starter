# 🚀 Task Tracker Pro — START HERE

> Tu proyecto transversal del curso *"IA Aplicada para Developers Senior"*

## En 60 segundos

```bash
# 1. Clona
git clone <tu-repo> task-tracker-pro
cd task-tracker-pro

# 2. Levanta
docker compose up -d

# 3. Abre navegador
# API: http://localhost:3000/api/health ✅
# Web: http://localhost:5173 (placeholder inicial, listo para ampliarlo)
```

## ¿Qué hay aquí?

**Un proyecto real que usarás en cada sesión del curso**:

- ✅ Backend: Express + TypeORM + JWT
- ✅ Frontend: React + Vite (base)
- ✅ BD: PostgreSQL
- ✅ CI/CD: GitHub Actions
- ✅ Documentación: C4, ADRs

**No está 100% implementado. Tú lo completarás con Copilot.**

---

## Documentación por rol

### 👨‍💻 Soy alumno / developer

**Lectura rápida (25 min total)**:

1. Este archivo (5 min)
2. [README.md](README.md) — Quick start detallado (5 min)
3. [ROADMAP.md](ROADMAP.md) — Mapa general (10 min)
4. [INTEGRATION-GUIDE.md](INTEGRATION-GUIDE.md) — Tu primer ejercicio (5 min)

**Después**: Empieza con el primer ejercicio (sesión que estés cursando).

### 🎓 Soy facilitador / profesor

**Lectura en orden**:

1. [FACILITATOR-GUIDE.md](FACILITATOR-GUIDE.md) — Cómo enseñar (30 min)
2. [INTEGRATION-GUIDE.md](INTEGRATION-GUIDE.md) — Qué ejercicios asignar (20 min)

### 🏗️ Soy tech lead / arquitecto

**Enfoque arquitectónico**:

1. [docs/C4-DIAGRAM.md](docs/C4-DIAGRAM.md) — Estructura (15 min)
2. [docs/adr/0001-jwt-authentication.md](docs/adr/0001-jwt-authentication.md) — Ejemplo ADR (10 min)
3. [ROADMAP.md](ROADMAP.md) → sección "Backend" y "Frontend" (15 min)

---

## Mis próximos 3 pasos

### ✅ Paso 1: Verificar que funciona (5 min)

```bash
# Desde la carpeta raíz
docker compose up -d

# Espera 10 segundos, luego:
curl http://localhost:3000/api/health

# Deberías ver: {"status":"ok"}

# Web:
open http://localhost:5173

# Deberías ver: Una pantalla placeholder con el nombre del proyecto y la URL del healthcheck
```

Si algo falla → Lee [ROADMAP.md](ROADMAP.md) sección "Troubleshooting".

### ✅ Paso 2: Leer tu documentación (10 min)

Según tu rol:

- **Alumno**: Lee [README.md](README.md) + [ROADMAP.md](ROADMAP.md)
- **Facilitador**: Lee [FACILITATOR-GUIDE.md](FACILITATOR-GUIDE.md)
- **Arquitecto**: Lee [docs/C4-DIAGRAM.md](docs/C4-DIAGRAM.md)

### ✅ Paso 3: Identifica tu primer ejercicio (5 min)

- **Sesión 01-02**: [INTEGRATION-GUIDE.md](INTEGRATION-GUIDE.md) → "Sesión 01-02"
- **Sesión 03**: [INTEGRATION-GUIDE.md](INTEGRATION-GUIDE.md) → "Sesión 03"
- **etc.**

Luego haz el ejercicio y abre una PR.

---

## ¿Dónde está todo?

```
📁 Código que vas a escribir
├── apps/api/src/routes/      (endpoints)
├── apps/api/src/services/     (lógica de negocio)
├── apps/api/tests/            (tests)
└── apps/web/src/              (React components)

📁 Documentación (lee esto primero)
├── INDEX.md                    (índice completo)
├── README.md                   (quick start)
├── ROADMAP.md                  (mapa general)
├── CONVENTIONS.md              (cómo escribir código)
├── INTEGRATION-GUIDE.md        (ejercicios por sesión)
├── FACILITATOR-GUIDE.md        (para docentes)
└── docs/
    ├── C4-DIAGRAM.md           (arquitectura)
    └── adr/                    (decisiones)

⚙️ Configuración
├── docker-compose.yml          (orquestación)
├── .github/workflows/          (CI/CD)
├── .copilot-instructions.md    (contexto para Copilot)
└── .env.example                (variables)
```

---

## ⚡ Comandos útiles

```bash
# Setup
docker compose up -d            # Levanta todo
docker compose down             # Apaga todo
docker compose logs -f api      # Ve logs del API

# Desarrollo (desde apps/api o apps/web)
npm run dev                      # Levanta en modo desarrollo
npm test                         # Corre tests
npm run lint                     # ESLint
npm run format                   # Prettier

# Git
git checkout -b feat/mi-feature  # Crea rama
git commit -m "feat(api): descripción"  # Commit (Conventional)
git push origin feat/mi-feature  # Push
# Luego abre PR en GitHub
```

---

## 🎯 Objetivo final

Después de 7 sesiones, tendrás:

✅ Proyecto funcional (backend + frontend + BD + CI/CD)  
✅ Documentación clara (C4, ADRs)  
✅ Experiencia con Copilot en proyecto real  
✅ Listo para llevar a tu equipo  

---

## ❓ Dudas frecuentes

**P: ¿Necesito clonar este repo o crear el mío?**

R: Ambos funcionan:

- **Opción A** (recomendada): Fork este repo. Así linkeas con el curso.
- **Opción B**: Copia la carpeta a tu propio repo. Más libertad.

**P: ¿Docker es obligatorio?**

R: No. Necesitas:

- Node.js 22+
- PostgreSQL corriendo localmente (credenciales en `.env.example`)
- npm install en `apps/api` y `apps/web`

Pero Docker hace todo automático.

**P: ¿Cuánto tiempo toma hacer todos los ejercicios?**

R: 35 horas de curso + 5-10 horas adaptando a tu contexto.

**P: ¿Puedo cambiar tech stack?**

R: Sí. La estructura (folders, workflows, conceptos) sirve para cualquier stack.

---

## 📚 Documentación completa

Todos los documentos en orden de lectura:

1. **00-START-HERE.md** ← Estás aquí
2. **README.md** — Quick start
3. **ROADMAP.md** — Mapa general
4. **CONVENTIONS.md** — Estándares
5. **INTEGRATION-GUIDE.md** — Ejercicios
6. **FACILITATOR-GUIDE.md** — Enseñanza
7. **docs/C4-DIAGRAM.md** — Arquitectura
8. **docs/adr/0001-jwt-authentication.md** — Ejemplo ADR
9. **INDEX.md** — Índice completo

---

## 🚀 Próximo paso

Depende de tu rol:

- **👨‍💻 Alumno**: Abre [README.md](README.md)
- **🎓 Facilitador**: Abre [FACILITATOR-GUIDE.md](FACILITATOR-GUIDE.md)
- **🏗️ Arquitecto**: Abre [docs/C4-DIAGRAM.md](docs/C4-DIAGRAM.md)

¡Adelante! 🎯
