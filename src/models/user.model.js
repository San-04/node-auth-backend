const {
  mysql_execute_read,
  mysql_execute_insert,
  mysql_execute_update,
  mysql_execute_delete,
} = require("../config/db");

class UserModel {
  async findAll() {
    const sql = "SELECT id, nombres, apellido, telefono, email FROM usuarios";
    return await mysql_execute_read(sql);
  }

  async create(data) {
    const { nombre, apellido, telefono, email, password } = data;
    const sql =
      "INSERT INTO usuarios (nombres, apellido, telefono, email, password) VALUES (?, ?, ?, ?, ?)";
    return await mysql_execute_insert(sql, [
      nombre,
      apellido,
      telefono,
      email,
      password,
    ]);
  }

  async update(id, data) {
    const { nombre, apellido, telefono, password } = data;
    const sql =
      "UPDATE usuarios SET nombres = ?, apellido = ?, telefono = ?, password = ? WHERE id = ?";
    return await mysql_execute_update(sql, [
      nombre,
      apellido,
      telefono,
      password,
      id,
    ]);
  }

  async delete(id) {
    const sql = "DELETE FROM usuarios WHERE id = ?";
    return await mysql_execute_delete(sql, [id]);
  }
}

module.exports = new UserModel();
