const RegisterService = require('../services/registerService');
const JWTService = require('../../../services/jwtService');
const RegisterDao = require('../dao/registerDao');
const Response = require('../../../responses/responses');
const { asyncHandler } = require('../../../middlewares/errorHandler');
const logger = require('../../../logging/logging');

class RegisterController {
  static register = asyncHandler(async (req, res) => {
    const apiReference = { module: 'register', api: 'register',apiId: req.apiId };
    logger.log(apiReference, 'Register request received', { email: req.body.email });
    
    const { name, email, password, role } = req.body;

    // Register user
    const user = await RegisterService.registerUser({ name, email, password, role });

    // Generate tokens
    const { accessToken, refreshToken } = JWTService.generateTokens(user);

    // Save refresh token
    await RegisterDao.saveRefreshToken(user.id, refreshToken);

    // Set cookies
    res.cookie('accessToken', accessToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000 // 15 minutes
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    logger.log(apiReference, 'User registered successfully', { userId: user.id, email: user.email });
    Response.created(res, {
      userId: user.id,
      email: user.email,
      accessToken,
      refreshToken
    }, 'User registered successfully');
  });
}

module.exports = RegisterController;