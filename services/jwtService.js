const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const envProperties = require('../properties/envProperties');

class JWTService {
  static generateAccessToken(payload) {
    return jwt.sign(
      payload,
      envProperties.jwtSecret,
      { expiresIn: envProperties.jwtExpiresIn }
    );
  }

  static generateRefreshToken() {
    return crypto.randomBytes(64).toString('hex');
  }

  static verifyAccessToken(token) {
    try {
      return jwt.verify(token, envProperties.jwtSecret);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new Error('Token expired');
      }
      if (error.name === 'JsonWebTokenError') {
        throw new Error('Invalid token');
      }
      throw error;
    }
  }

  static decodeToken(token) {
    return jwt.decode(token);
  }

  static generateTokens(user) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      is_verified: user.is_verified || false
    };

    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken();

    return { accessToken, refreshToken };
  }
}

module.exports = JWTService;
