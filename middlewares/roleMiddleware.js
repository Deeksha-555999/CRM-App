const { AppError } = require('./errorHandler');

const checkRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new AppError('User not authenticated', 401, 'AUTHENTICATION_ERROR');
    }

    if (!roles.includes(req.user.role)) {
      throw new AppError('Access forbidden. Insufficient permissions.', 403, 'AUTHORIZATION_ERROR');
    }

    next();
  };
};

const isAdmin = (req, res, next) => {
  if (!req.user) {
    throw new AppError('User not authenticated', 401, 'AUTHENTICATION_ERROR');
  }

  if (req.user.role !== 'admin') {
    throw new AppError('Access forbidden. Admin only.', 403, 'AUTHORIZATION_ERROR');
  }

  next();
};

const checkVerified = (req, res, next) => {
  if (!req.user) {
    throw new AppError('User not authenticated', 401, 'AUTHENTICATION_ERROR');
  }

  if (!req.user.is_verified) {
    throw new AppError('Email not verified. Please verify your email.', 403, 'EMAIL_NOT_VERIFIED');
  }

  next();
};

module.exports = {
  checkRole,
  isAdmin,
  checkVerified
};
