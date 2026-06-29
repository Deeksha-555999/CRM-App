const responseConstants = require('./responseConstants');

class Response {
  static success(res, data = null, message = responseConstants.MESSAGES.SUCCESS, statusCode = responseConstants.STATUS.OK) {
    return res.status(statusCode).json({
      success: true,
      message,
      data
    });
  }

  static created(res, data = null, message = responseConstants.MESSAGES.CREATED) {
    return res.status(responseConstants.STATUS.CREATED).json({
      success: true,
      message,
      data
    });
  }

  static error(res, message = responseConstants.MESSAGES.INTERNAL_ERROR, statusCode = responseConstants.STATUS.INTERNAL_SERVER_ERROR, errorCode = null) {
    const response = {
      success: false,
      message
    };

    if (errorCode) {
      response.errorCode = errorCode;
    }

    return res.status(statusCode).json(response);
  }

  static validationError(res, errors) {
    return res.status(responseConstants.STATUS.BAD_REQUEST).json({
      success: false,
      message: responseConstants.MESSAGES.VALIDATION_ERROR,
      errorCode: responseConstants.ERROR_CODES.VALIDATION_ERROR,
      errors
    });
  }

  static unauthorized(res, message = responseConstants.MESSAGES.UNAUTHORIZED) {
    return res.status(responseConstants.STATUS.UNAUTHORIZED).json({
      success: false,
      message,
      errorCode: responseConstants.ERROR_CODES.AUTHENTICATION_ERROR
    });
  }

  static forbidden(res, message = responseConstants.MESSAGES.FORBIDDEN) {
    return res.status(responseConstants.STATUS.FORBIDDEN).json({
      success: false,
      message,
      errorCode: responseConstants.ERROR_CODES.AUTHORIZATION_ERROR
    });
  }

  static notFound(res, message = responseConstants.MESSAGES.NOT_FOUND) {
    return res.status(responseConstants.STATUS.NOT_FOUND).json({
      success: false,
      message,
      errorCode: responseConstants.ERROR_CODES.NOT_FOUND_ERROR
    });
  }

  static paginated(res, data, pagination, message = responseConstants.MESSAGES.SUCCESS) {
    return res.status(responseConstants.STATUS.OK).json({
      success: true,
      message,
      data,
      pagination
    });
  }
}

module.exports = Response;
