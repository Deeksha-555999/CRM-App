const pool = require("../../../database/mysqllib").getPool();

class RegisterDao {
  static async createUser(userData) {
    try {
      const { name, email, password, role = "user" } = userData;
      const [result] = await pool.execute(
        "INSERT INTO users (name, email, password, role, is_verified) VALUES (?, ?, ?, ?, FALSE)",
        [name, email, password, role],
      );
      return result.insertId;
    } catch (error) {
      console.error("RegisterDao.createUser error:", error);
      throw error;
    }
  }

  static async findUserByEmail(email) {
    try {
      const [rows] = await pool.execute(
        "SELECT id, email FROM users WHERE email = ?",
        [email],
      );
      return rows[0];
    } catch (error) {
      console.error("RegisterDao.findUserByEmail error:", error);
      throw error;
    }
  }

  static async saveRefreshToken(userId, refreshToken) {
    try {
      const [result] = await pool.execute(
        "UPDATE users SET refresh_token = ? WHERE id = ?",
        [refreshToken, userId],
      );
      return result.affectedRows;
    } catch (error) {
      console.error("RegisterDao.saveRefreshToken error:", error);
      throw error;
    }
  }
}

module.exports = RegisterDao;
