const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { checkJwt } = require("../middlewares/auth.middleware");

/**
 * @swagger
 * /api/users/get_list:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     summary: Listar todos los usuarios
 *     description: Obtiene la lista de todos los usuarios (requiere token JWT)
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *       401:
 *         description: No autorizado - token inválido o no proporcionado
 */
// GET - Listar usuarios (Protegido)
router.get("/get_list", checkJwt, (req, res) =>
  userController.getAll(req, res),
);

/**
 * @swagger
 * /api/users/create_user:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     summary: Crear un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               -nombre
 *               -apellido
 *               -telefono
 *               - email
 *               - password
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Juan
 *               apellido:
 *                 type: string
 *                 example: Pérez
 *               telefono:
 *                 type: string
 *                 example: "987654321"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: nuevo@correo.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Error en los datos enviados
 */
// POST - Crear usuario
router.post("/create_user", checkJwt, (req, res) =>
  userController.create(req, res),
);

/**
 * @swagger
 * /api/users/update_user/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     summary: Actualizar usuario
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Juan
 *               apellido:
 *                 type: string
 *                 example: Pérez
 *               telefono:
 *                 type: string
 *                 example: "987654321"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Usuario no encontrado
 */
// PUT - Editar usuario (Protegido)
router.put("/update_user/:id", checkJwt, (req, res) =>
  userController.update(req, res),
);

/**
 * @swagger
 * /api/users/delete_user/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     summary: Eliminar usuario
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Usuario no encontrado
 */
// DELETE - Eliminar usuario (Protegido)
router.delete("/delete_user/:id", checkJwt, (req, res) =>
  userController.delete(req, res),
);

module.exports = router;
