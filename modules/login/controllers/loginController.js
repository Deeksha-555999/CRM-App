const LoginService = require("../services/loginService");
const LoginTokenService = require("../services/loginTokenService");
const Response = require("../../../responses/responses");
const { asyncHandler } = require("../../../middlewares/errorHandler");
const logger = require("../../../logging/logging");
//const asyncHandler = require("express-async-handler");

class LoginController {
  static login = asyncHandler(async (req, res) => {
    const apiReference = { module: "login", api: "login", apiId: req.apiId };
    logger.log(apiReference, "Login request received", {
      email: req.body.email,
    });

    const { email, password } = req.body;

    // Authenticate user
    const user = await LoginService.authenticateUser(email, password);
    logger.log(apiReference, "User authenticated successfully", {
      userId: user.id,
    });

    // Generate tokens
    const { accessToken, refreshToken } =
      LoginTokenService.generateTokens(user);

    // Save refresh token
    await LoginTokenService.saveRefreshToken(user.id, refreshToken);

    // Set cookies
    LoginTokenService.setTokenCookies(res, accessToken, refreshToken);

    logger.log(apiReference, "Login completed successfully", {
      userId: user.id,
    });
    Response.success(
      res,
      {
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          is_verified: user.is_verified,
        },
      },
      "Login successful",
    );
  });

  static getProfile = asyncHandler(async (req, res) => {
    const apiReference = { module: "login", api: "getProfile" };
    logger.log(apiReference, "Get profile request", { userId: req.user.id });

    const user = await LoginService.getUserProfile(req.user.id);
    logger.log(apiReference, "Profile retrieved successfully", {
      userId: req.user.id,
    });

    Response.success(res, user, "Profile retrieved successfully");
  });

  static refreshToken = asyncHandler(async (req, res) => {
    const apiReference = { module: "login", api: "refreshToken" };
    logger.log(apiReference, "Refresh token request received");

    const { refreshToken } = req.cookies;

    // Validate refresh token
    const user = await LoginService.refreshUserToken(refreshToken);

    // Generate new tokens
    const { accessToken, refreshToken: newRefreshToken } =
      LoginTokenService.generateTokens(user);

    // Save new refresh token
    await LoginTokenService.saveRefreshToken(user.id, newRefreshToken);

    // Set new cookies
    LoginTokenService.setTokenCookies(res, accessToken, newRefreshToken);

    logger.log(apiReference, "Token refreshed successfully", {
      userId: user.id,
    });
    Response.success(
      res,
      {
        accessToken,
        refreshToken: newRefreshToken,
      },
      "Token refreshed successfully",
    );
  });

  static logout = asyncHandler(async (req, res) => {
    const apiReference = { module: "login", api: "logout" };
    logger.log(apiReference, "Logout request", { userId: req.user.id });

    await LoginService.logoutUser(req.user.id);
    LoginTokenService.clearTokenCookies(res);

    logger.log(apiReference, "User logged out successfully", {
      userId: req.user.id,
    });
    Response.success(res, null, "Logged out successfully");
  });

  // Admin endpoints
  static getAllUsers = asyncHandler(async (req, res) => {
    const apiReference = { module: "login", api: "getAllUsers" };
    logger.log(apiReference, "Get all users request", { adminId: req.user.id });

    const users = await LoginService.getAllUsers();

    logger.log(apiReference, "Users retrieved successfully", {
      count: users.length,
    });
    Response.success(res, users, "Users retrieved successfully");
  });

  static verifyUser = asyncHandler(async (req, res) => {
    const apiReference = { module: "login", api: "verifyUser" };
    logger.log(apiReference, "Verify user request", { userId: req.params.id });
    const { id } = req.params;
    await LoginService.verifyUser(id);
    Response.success(res, null, "User verified successfully");
  });

  static deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await LoginService.deleteUser(id, req.user.id);
    Response.success(res, null, "User deleted successfully");
  });
}

module.exports = LoginController;
