module.exports = {
  // HTTP Status codes
  STATUS: {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500
  },

  // Response messages
  MESSAGES: {
    // Success messages
    SUCCESS: 'Operation completed successfully',
    CREATED: 'Resource created successfully',
    UPDATED: 'Resource updated successfully',
    DELETED: 'Resource deleted successfully',
    
    // Auth messages
    LOGIN_SUCCESS: 'Login successful',
    LOGOUT_SUCCESS: 'Logout successful',
    REGISTER_SUCCESS: 'Registration successful',
    TOKEN_REFRESHED: 'Token refreshed successfully',
    
    // Error messages
    INTERNAL_ERROR: 'Internal server error',
    INVALID_CREDENTIALS: 'Invalid credentials',
    UNAUTHORIZED: 'Unauthorized access',
    FORBIDDEN: 'Access forbidden',
    NOT_FOUND: 'Resource not found',
    ALREADY_EXISTS: 'Resource already exists',
    VALIDATION_ERROR: 'Validation error',
    INVALID_TOKEN: 'Invalid or expired token',
    
    // Customer messages
    CUSTOMER_CREATED: 'Customer created successfully',
    CUSTOMER_UPDATED: 'Customer updated successfully',
    CUSTOMER_DELETED: 'Customer deleted successfully',
    CUSTOMER_NOT_FOUND: 'Customer not found',
    
    // Lead messages
    LEAD_CREATED: 'Lead created successfully',
    LEAD_UPDATED: 'Lead updated successfully',
    LEAD_DELETED: 'Lead deleted successfully',
    LEAD_NOT_FOUND: 'Lead not found'
  },

  // Error codes
  ERROR_CODES: {
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
    AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
    NOT_FOUND_ERROR: 'NOT_FOUND_ERROR',
    DUPLICATE_ERROR: 'DUPLICATE_ERROR',
    DATABASE_ERROR: 'DATABASE_ERROR',
    INTERNAL_ERROR: 'INTERNAL_ERROR'
  }
};
