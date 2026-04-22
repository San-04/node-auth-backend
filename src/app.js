const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
require("dotenv").config();

const app = express();
app.use(express.json());

// CONFIGURACIÓN SWAGGER
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Mi API Multi-Router", version: "1.0.0" },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// --- REGISTRO DE RUTAS ---
const loginRoutes = require("./routes/login.routes");
const userRoutes = require("./routes/user.routes");

app.use("/api/login", loginRoutes);
app.use("/api/users", userRoutes);

app.listen(process.env.PORT || 3000, () => console.log("Servidor listo"));
