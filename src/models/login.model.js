const { mysql_execute_read } = require("../config/db");

class LoginModel {
  async findByEmail(email) {
    const query = "SELECT id, email, password FROM usuarios WHERE email = ?";
    const users = await mysql_execute_read(query, [email]);
    return users[0];
  }
}

module.exports = new LoginModel();
