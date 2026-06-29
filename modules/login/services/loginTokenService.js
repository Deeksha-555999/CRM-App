const JWTService = require('../../../services/jwtService');
const LoginDao = require('../dao/loginDao');

class LoginTokenService {
  static generateTokens(user) {
    return JWTService.generateTokens(user);
  }

  static async saveRefreshToken(userId, refreshToken) {
    try {
      await LoginDao.saveRefreshToken(userId, refreshToken);
    } catch (error) {
      throw error;
    }
  }

  static setTokenCookies(res, accessToken, refreshToken) {
    // Access token cookie
    res.cookie('accessToken', accessToken, {
      httpOnly: false, // Allow JavaScript access for Authorization header
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000 // 15 minutes
    });

    // Refresh token cookie (more secure)
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true, // Prevent JavaScript access
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
  }

  static clearTokenCookies(res) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
  }
}

module.exports = LoginTokenService;