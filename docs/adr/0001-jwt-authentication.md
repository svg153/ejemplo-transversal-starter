# ADR 0001: Estrategia de autenticación con JWT

**Estado**: Aceptado  
**Fecha**: 2026-02-23  
**Decisor**: Curso IA Senior

## Contexto

Necesitamos autenticar usuarios en una API REST. Las opciones son:

1. **JWT (JSON Web Tokens)**: Stateless, escalable, sin sesiones en servidor
2. **Session + Cookies**: Stateful, más seguro por defecto, requiere almacenamiento
3. **OAuth/SSO**: Delegado a terceros, más overhead inicial

## Decisión

**Usaremos JWT** con los siguientes criterios:

- **Access Token**: 15 minutos de expiración
- **Refresh Token**: 7 días, rotado en cada refresh
- **Almacenamiento**: Access en memoria (solo frontend), Refresh en localStorage con flag `httpOnly` si es posible
- **Payload**: `{ userId, email, role, exp, iat }`
- **Algoritmo**: HS256 (HMAC-SHA256) con secret fuerte en variables de entorno

## Justificación

### Pros JWT

- ✅ Stateless: no necesita BD de sesiones
- ✅ Escalable: no hay estado en servidor, sirve para microservicios
- ✅ Seguro: token firmado, no puede ser falsificado
- ✅ Estándar: todos los idiomas lo soportan

### Contras JWT

- ❌ No puede "revocar" al instante (mitiga con expiraciones cortas)
- ❌ Payload es visible (no guardar datos sensibles)
- ❌ Más complejo que session cookies

## Consecuencias

- [ ] Backend genera tokens en `/auth/login` y `/auth/refresh`
- [ ] Frontend guarda access token en variable local (no localStorage)
- [ ] Frontend envía en header: `Authorization: Bearer <token>`
- [ ] Backend valida en middleware: extrae y verifica firma
- [ ] Logout: simplemente frontend borra token (sin revocar en servidor)
- [ ] Si necesitas revocación inmediata: implementar lista negra en Redis

## Alternativas descartadas

1. **Session + Cookies**: Requerida BD de sesiones, menos escalable para APIs distribuidas
2. **OAuth**: Overhead para MVPs, mejor más adelante si integras Google/GitHub login

## Próximos pasos

- Implementar refresh token rotation en `/auth/refresh`
- Documentar en API (endpoints, formatos, errores)
- Agregar rate limiting a `/auth/login` (previene brute force)
