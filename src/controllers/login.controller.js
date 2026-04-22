import LoginModel from "../models/login.model.js";
import { generateToken } from "../utils/jwt.handle.js";

class LoginController {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await LoginModel.findByEmail(email);

      if (!user) {
        return res.status(401).json({
          status: "warning",
          message: "El correo electrónico no está registrado",
        });
      }

      if (user.password !== password) {
        return res.status(401).json({
          status: "warning",
          message: "La contraseña es incorrecta",
        });
      }

      const token = generateToken(user);

      delete user.password;

      res.json({
        status: "success",
        data: { user, token },
      });
    } catch (error) {
      console.error(`LoginController Error: ${error.message}`);
      res
        .status(500)
        .json({ status: "error", message: "Error en el controlador" });
    }
  }
}

export default new LoginController();
