const Joi = require('joi');
const { emailSchema, passwordSchema, nameSchema } = require('../../../validators/joiValidators');

const registerValidation = Joi.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  role: Joi.string().valid('admin', 'user').optional().default('user').messages({
    'any.only': 'Invalid role. Must be admin or user'
  })
});

module.exports = {
  registerValidation
};
