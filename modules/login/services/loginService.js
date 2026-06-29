const LoginDao = require('../dao/loginDao');
const PasswordService = require('../../../services/pwdServices');
const { AppError } = require('../../../middlewares/errorHandler');

class LoginService {
  static async authenticateUser(email, password) {
    try {
      // Find user by email
      const user = await LoginDao.findUserByEmail(email);
      
      if (!user) {
        throw new AppError('Invalid credentials', 401, 'INVALID_CREDENTIALS');
      }

      // Verify password
      const isPasswordValid = await PasswordService.comparePassword(password, user.password);
      
      if (!isPasswordValid) {
        throw new AppError('Invalid credentials', 401, 'INVALID_CREDENTIALS');
      }

      // Remove password from user object
      delete user.password;

      return user;
    } catch (error) {
      throw error;
    }
  }

  static async getUserProfile(userId) {
    try {
      const user = await LoginDao.findUserById(userId);
      
      if (!user) {
        throw new AppError('User not found', 404, 'USER_NOT_FOUND');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  static async refreshUserToken(refreshToken) {
    try {
      if (!refreshToken) {
        throw new AppError('Refresh token not provided', 401, 'TOKEN_MISSING');
      }

      const user = await LoginDao.findByRefreshToken(refreshToken);
      
      if (!user) {
        throw new AppError('Invalid refresh token', 401, 'INVALID_TOKEN');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  static async logoutUser(userId) {
    try {
      await LoginDao.clearRefreshToken(userId);
      return true;
    } catch (error) {
      throw error;
    }
  }

  static async getAllUsers() {
    try {
      return await LoginDao.getAllUsers();
    } catch (error) {
      throw error;
    }
  }

  static async verifyUser(userId) {
    try {
      const affectedRows = await LoginDao.verifyUser(userId);
      
      if (affectedRows === 0) {
        throw new AppError('User not found', 404, 'USER_NOT_FOUND');
      }

      return true;
    } catch (error) {
      throw error;
    }
  }

  static async deleteUser(userId, requestingUserId) {
    try {
      // Prevent self-deletion
      if (parseInt(userId) === parseInt(requestingUserId)) {
        throw new AppError('You cannot delete your own account', 400, 'SELF_DELETE_ERROR');
      }

      const affectedRows = await LoginDao.deleteUser(userId);
      
      if (affectedRows === 0) {
        throw new AppError('User not found', 404, 'USER_NOT_FOUND');
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = LoginService;
