const authMiddleware = require('./authMiddleware');
const { checkRole, isAdmin, checkVerified } = require('./roleMiddleware');
const { errorHandler, asyncHandler, AppError } = require('./errorHandler');
const validate = require('./validateMiddleware');

module.exports = {
  authMiddleware,
  checkRole,
  isAdmin,
  checkVerified,
  errorHandler,
  asyncHandler,
  AppError,
  validate
};
