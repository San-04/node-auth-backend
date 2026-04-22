import { mysql_execute_read } from "../config/db.js";

class LoginModel {
  async findByEmail(email) {
    const query = "SELECT id, email, password FROM usuarios WHERE email = ?";
    const users = await mysql_execute_read(query, [email]);
    return users[0];
  }
}

export default new LoginModel();
