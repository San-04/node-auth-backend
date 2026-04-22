# Node Express MySQL MVC - API de Usuarios

Esta es una API REST profesional construida con **Node.js** y **Express**, utilizando una arquitectura **MVC (Modelo-Vista-Controlador)** con inyección de dependencias y contenedores **Docker**.

## 🚀 Tecnologías utilizadas

- **Runtime:** Node.js (v24+)
- **Framework:** Express.js
- **Base de Datos:** MySQL 8.0.46
- **Gestor de Paquetes:** pnpm
- **Seguridad:** JSON Web Tokens (JWT)
- **Documentación:** Swagger UI (OpenAPI 3.0)
- **Infraestructura:** Docker & Docker Compose

## 🏗️ Arquitectura del Proyecto

El proyecto sigue un patrón modular basado en clases:

- **Modelos:** Encapsulan la lógica de acceso a datos (MySQL).
- **Controladores:** Manejan la lógica de negocio y las respuestas HTTP.
- **Rutas:** Definen los endpoints y aplican middlewares.
- **Middlewares:** Seguridad y validación de tokens.
