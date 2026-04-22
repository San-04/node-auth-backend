import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import dotenv from "dotenv";
dotenv.config();

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
import loginRoutes from "./routes/login.routes.js";
import userRoutes from "./routes/user.routes.js";

app.use("/api/login", loginRoutes);
app.use("/api/users", userRoutes);

app.listen(process.env.PORT || 3000, () => console.log("Servidor listo"));
