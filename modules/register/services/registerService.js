const RegisterDao = require('../dao/registerDao');
const PasswordService = require('../../../services/pwdServices');
const { AppError } = require('../../../middlewares/errorHandler');

class RegisterService {
  static async registerUser(userData) {
    try {
      const { name, email, password, role } = userData;

      // Check if user already exists
      const existingUser = await RegisterDao.findUserByEmail(email);
      
      if (existingUser) {
        throw new AppError('User with this email already exists', 400, 'USER_EXISTS');
      }

      // Validate password strength
      const passwordValidation = PasswordService.validatePasswordStrength(password);
      if (!passwordValidation.isValid) {
        throw new AppError(passwordValidation.errors.join(', '), 400, 'WEAK_PASSWORD');
      }

      // Hash password
      const hashedPassword = await PasswordService.hashPassword(password);

      // Create user
      const userId = await RegisterDao.createUser({
        name,
        email,
        password: hashedPassword,
        role: role || 'user'
      });

      return {
        id: userId,
        name,
        email,
        role: role || 'user',
        is_verified: false
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = RegisterService;