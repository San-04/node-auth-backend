import mysql from "mysql2/promise";

// Creamos el Pool una sola vez.
// El Pool maneja automáticamente abrir y cerrar conexiones por nosotros.
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

/**
 * SELECT: Para obtener múltiples registros o uno solo.
 */
const mysql_execute_read = async (sql, params = []) => {
  try {
    const [rows] = await pool.execute(sql, params);
    return rows;
  } catch (error) {
    console.error(`DB Error (Select): ${error.message}`);
    return [];
  }
};

/**
 * INSERT: Retorna el ID del nuevo registro.
 */
const mysql_execute_insert = async (sql, params = []) => {
  try {
    const [result] = await pool.execute(sql, params);
    return result.insertId;
  } catch (error) {
    console.error(`DB Error (Insert): ${error.message}`);
    return null;
  }
};

/**
 * UPDATE: Retorna cuántas filas fueron afectadas.
 */
const mysql_execute_update = async (sql, params = []) => {
  try {
    const [result] = await pool.execute(sql, params);
    return result.affectedRows;
  } catch (error) {
    console.error(`DB Error (Update): ${error.message}`);
    return 0;
  }
};

/**
 * DELETE: Retorna true si se eliminó algo.
 */
const mysql_execute_delete = async (sql, params = []) => {
  try {
    const [result] = await pool.execute(sql, params);
    return result.affectedRows > 0;
  } catch (error) {
    console.error(`DB Error (Delete): ${error.message}`);
    return false;
  }
};

// Exportamos las funciones individualmente
export {
  mysql_execute_read,
  mysql_execute_insert,
  mysql_execute_update,
  mysql_execute_delete,
};
