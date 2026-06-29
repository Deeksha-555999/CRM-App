const pool = require('../../../database/mysqllib').getPool();

class LoginDao {
  static async findUserByEmail(email) {
    try {
      const [rows] = await pool.execute(
        'SELECT id, name, email, password, role, is_verified, created_at, updated_at FROM users WHERE email = ?',
        [email]
      );
      return rows[0];
    } catch (error) {
      console.error('LoginDao.findUserByEmail error:', error);
      throw error;
    }
  }

  static async findUserById(id) {
    try {
      const [rows] = await pool.execute(
        'SELECT id, name, email, role, is_verified, created_at, updated_at FROM users WHERE id = ?',
        [id]
      );
      return rows[0];
    } catch (error) {
      console.error('LoginDao.findUserById error:', error);
      throw error;
    }
  }

  static async findByRefreshToken(refreshToken) {
    try {
      const [rows] = await pool.execute(
        'SELECT id, name, email, role, is_verified FROM users WHERE refresh_token = ?',
        [refreshToken]
      );
      return rows[0];
    } catch (error) {
      console.error('LoginDao.findByRefreshToken error:', error);
      throw error;
    }
  }

  static async saveRefreshToken(userId, refreshToken) {
    try {
      const [result] = await pool.execute(
        'UPDATE users SET refresh_token = ? WHERE id = ?',
        [refreshToken, userId]
      );
      return result.affectedRows;
    } catch (error) {
      console.error('LoginDao.saveRefreshToken error:', error);
      throw error;
    }
  }

  static async clearRefreshToken(userId) {
    try {
      const [result] = await pool.execute(
        'UPDATE users SET refresh_token = NULL WHERE id = ?',
        [userId]
      );
      return result.affectedRows;
    } catch (error) {
      console.error('LoginDao.clearRefreshToken error:', error);
      throw error;
    }
  }

  static async getAllUsers() {
    try {
      const [rows] = await pool.execute(
        'SELECT id, name, email, role, is_verified, created_at FROM users ORDER BY created_at DESC'
      );
      return rows;
    } catch (error) {
      console.error('LoginDao.getAllUsers error:', error);
      throw error;
    }
  }

  static async verifyUser(id) {
    try {
      const [result] = await pool.execute(
        'UPDATE users SET is_verified = TRUE WHERE id = ?',
        [id]
      );
      return result.affectedRows;
    } catch (error) {
      console.error('LoginDao.verifyUser error:', error);
      throw error;
    }
  }

  static async deleteUser(id) {
    try {
      const [result] = await pool.execute('DELETE FROM users WHERE id = ?', [id]);
      return result.affectedRows;
    } catch (error) {
      console.error('LoginDao.deleteUser error:', error);
      throw error;
    }
  }
}

module.exports = LoginDao;
