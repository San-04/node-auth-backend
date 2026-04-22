class UserController {
  constructor(model) {
    this.usermodel = model;
  }

  async getAll(req, res) {
    try {
      const users = await this.usermodel.findAll();
      res.json({ status: "success", data: users });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  async create(req, res) {
    try {
      console.log("Creating user with data:", req.body);
      const userId = await this.usermodel.create(req.body);
      if (!userId) {
        return res
          .status(400)
          .json({ status: "error", message: "No se pudo crear el usuario" });
      }
      res.status(201).json({
        status: "success",
        message: "Usuario creado",
        data: { id: userId },
      });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const affectedRows = await this.usermodel.update(id, req.body);

      if (affectedRows === 0) {
        return res
          .status(404)
          .json({ status: "error", message: "Usuario no encontrado" });
      }

      res.json({ status: "success", message: "Usuario actualizado" });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const success = await this.usermodel.delete(id);

      if (!success) {
        return res
          .status(404)
          .json({ status: "error", message: "No se pudo eliminar" });
      }

      res.json({ status: "success", message: "Usuario eliminado" });
    } catch (error) {
      res.status(500).json({ status: "error", message: error.message });
    }
  }
}

import UserModel from "../models/user.model.js";
export default new UserController(UserModel);
