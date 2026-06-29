const Response = require('../responses/responses');

const validate = (schema, source = 'body') => {
  return async (req, res, next) => {
    try {
      let dataToValidate;
      
      // Determine which part of request to validate
      switch (source) {
        case 'body':
          dataToValidate = req.body;
          break;
        case 'params':
          dataToValidate = req.params;
          break;
        case 'query':
          dataToValidate = req.query;
          break;
        default:
          dataToValidate = req.body;
      }

      // Validate using Joi schema
      const { error, value } = schema.validate(dataToValidate, {
        abortEarly: false,
        stripUnknown: true,
        convert: true
      });

      if (error) {
        const formattedErrors = error.details.map(err => ({
          field: err.path.join('.'),
          message: err.message.replace(/['"]/g, '')
        }));

        return Response.validationError(res, formattedErrors);
      }

      // Replace request data with validated and sanitized data
      if (source === 'body') req.body = value;
      if (source === 'params') req.params = value;
      if (source === 'query') req.query = value;

      next();
    } catch (err) {
      return Response.error(res, 'Validation error', 400);
    }
  };
};

module.exports = validate;
