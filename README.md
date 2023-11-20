# Proyecto Awesome

Este proyecto, denominado **Ink Addict Studio**, es una aplicación increíble que gestiona sesiones y usuarios. A continuación, encontrarás información sobre los endpoints disponibles, los verbos HTTP asociados y las acciones correspondientes.

## Información del Proyecto

- **Nombre del Backend**: Ink Addict Studio Backend
- **Versión**: 1.0.0
- **Autor**: Sandra Suazo
- **Licencia**: ISC

## Endpoints y Acciones

### Sesiones

| Endpoint                              | Verbo HTTP | Acción                                      | Autenticación | Autorización           |
| ------------------------------------- | ---------- | ------------------------------------------- | ------------- | ---------------------- |
| `/sessions`                           | POST       | Crear nueva sesión                          | Sí            | Sí (isActive)          |
| `/sessions/:sessionId`                | GET        | Obtener información de una sesión por ID    | Sí            | Sí (isActive, isAdmin) |
| `/sessions/update-session/:sessionId` | PATCH      | Actualizar información de una sesión por ID | Sí            | Sí (isActive)          |
| `/sessions/deactivate/:sessionId`     | PATCH      | Desactivar una sesión por ID                | Sí            | Sí (isActive)          |
| `/sessions/list`                      | GET        | Listar sesiones de un usuario               | Sí            | Sí (isActive)          |

### Usuarios

| Endpoint                     | Verbo HTTP | Acción                       | Autenticación | Autorización           |
| ---------------------------- | ---------- | ---------------------------- | ------------- | ---------------------- |
| `/users`                     | POST       | Crear nuevo usuario          | No            | No                     |
| `/users/login`               | POST       | Iniciar sesión               | No            | No                     |
| `/users/profile`             | GET        | Obtener perfil de usuario    | Sí            | Sí (isActive)          |
| `/users/update-profile`      | PATCH      | Actualizar perfil de usuario | Sí            | Sí (isActive)          |
| `/users/change-role/:userId` | PATCH      | Cambiar rol de usuario       | Sí            | Sí (isActive, isAdmin) |
| `/users/deactivate/:userId`  | PATCH      | Desactivar usuario           | Sí            | Sí (isActive)          |
| `/users/list/:role`          | GET        | Listar usuarios por rol      | Sí            | Sí (isActive, isAdmin) |

## Librerías y Dependencias

El backend de Ink Addict Studio utiliza las siguientes librerías y dependencias:

- **bcrypt** (^5.1.1): Librería para el hash y comparación de contraseñas.
- **cors** (^2.8.5): Middleware para gestionar la política de mismo origen (CORS).
- **dotenv** (^16.3.1): Carga variables de entorno desde un archivo `.env`.
- **dotenv-safe** (^8.2.0): Carga segura de variables de entorno.
- **express** (^4.18.2): Marco de aplicación web para Node.js.
- **jsonwebtoken** (^9.0.2): Implementación de JSON Web Tokens (JWT) para autenticación.
- **mongoose** (^8.0.0): ODM (Object Data Modeling) para MongoDB y Node.js.
- **node** (^21.1.0): Entorno de ejecución de JavaScript en el lado del servidor.

### Dependencias de Desarrollo

- **@types/bcrypt** (^5.0.2): Tipos de TypeScript para bcrypt.
- **@types/cors** (^2.8.16): Tipos de TypeScript para cors.
- **@types/dotenv-safe** (^8.1.5): Tipos de TypeScript para dotenv-safe.
- **@types/express** (^4.17.20): Tipos de TypeScript para express.
- **@types/jsonwebtoken** (^9.0.5): Tipos de TypeScript para jsonwebtoken.
- **@types/node** (^16.18.60): Tipos de TypeScript para Node.js.

¡Disfruta utilizando nuestra increíble aplicación!
