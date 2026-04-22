import express from "express";
import LoginController from "../controllers/login.controller.js";

const router = express.Router();

/**
 * @swagger
 * /api/login/login:
 *   post:
 *     tags:
 *       - Login
 *     summary: Iniciar sesión de usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: usuario@correo.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login exitoso
 *       400:
 *         description: Error en los datos enviados
 */
router.post("/login", (req, res) => LoginController.login(req, res));

export default router;
