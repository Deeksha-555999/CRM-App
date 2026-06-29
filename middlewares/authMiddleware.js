const jwtService = require('../services/jwtService');
const { AppError } = require('./errorHandler');

const authMiddleware = async (req, res, next) => {
  try {
    let token;

    // Check for token in cookies
    if (req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    } 
    // Check for token in Authorization header
    else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.substring(7);
    }
    
    if (!token) {
      throw new AppError('No token provided. Authorization denied.', 401, 'AUTHENTICATION_ERROR');
    }

    // Verify token
    const decoded = jwtService.verifyAccessToken(token);
    
    // Attach user to request
    req.user = decoded;
    
    next();
  } catch (error) {
    if (error.message === 'Token expired') {
      return new AppError('Token expired', 401, 'TOKEN_EXPIRED');
    }
    if (error.message === 'Invalid token') {
      return new AppError('Invalid token', 401, 'INVALID_TOKEN');
    }
    next();
  }
};

module.exports = authMiddleware;
