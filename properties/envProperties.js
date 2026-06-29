require('dotenv').config();

module.exports = {
  // Server configuration
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // CORS configuration
  corsOrigin: process.env.CORS_ORIGIN || '*',
  
  // JWT configuration
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '15m',
  refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY || '7d',
  
  // Email configuration
  emailService: process.env.EMAIL_SERVICE || 'gmail',
  emailUser: process.env.EMAIL_USER || '',
  emailPassword: process.env.EMAIL_PASSWORD || '',
  emailFrom: process.env.EMAIL_FROM || 'noreply@crm.com',
  
  // Application URLs
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  backendUrl: process.env.BACKEND_URL || 'http://localhost:3000',
  
  // Pagination defaults
  defaultPageSize: parseInt(process.env.DEFAULT_PAGE_SIZE) || 10,
  maxPageSize: parseInt(process.env.MAX_PAGE_SIZE) || 100,
  
  // Security
  bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10,
  
  // Logging
  logLevel: process.env.LOG_LEVEL || 'info'
};
