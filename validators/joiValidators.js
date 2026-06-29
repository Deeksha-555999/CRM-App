const Joi = require('joi');

// Common validators
const idSchema = Joi.number().integer().min(1).required().messages({
  'number.base': 'Invalid ID',
  'number.min': 'Invalid ID',
  'any.required': 'ID is required'
});

const emailSchema = Joi.string().email().required().messages({
  'string.email': 'Invalid email address',
  'any.required': 'Email is required'
});

const passwordSchema = Joi.string()
  .min(8)
  .pattern(/[A-Z]/)
  .pattern(/[a-z]/)
  .pattern(/\d/)
  .pattern(/[!@#$%^&*(),.?":{}|<>]/)
  .required()
  .messages({
    'string.min': 'Password must be at least 8 characters long',
    'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    'any.required': 'Password is required'
  });

const nameSchema = Joi.string().trim().min(2).max(255).required().messages({
  'string.empty': 'Name is required',
  'string.min': 'Name must be at least 2 characters',
  'string.max': 'Name must not exceed 255 characters',
  'any.required': 'Name is required'
});

const phoneSchema = Joi.string().pattern(/^[\d\s\-\+\(\)]+$/).optional().allow('').messages({
  'string.pattern.base': 'Invalid phone number format'
});

const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).optional().default(1).messages({
    'number.min': 'Page must be a positive integer'
  }),
  limit: Joi.number().integer().min(1).max(100).optional().default(10).messages({
    'number.min': 'Limit must be at least 1',
    'number.max': 'Limit must not exceed 100'
  }),
  search: Joi.string().trim().max(255).optional().allow('').messages({
    'string.max': 'Search query too long'
  })
});

module.exports = {
  idSchema,
  emailSchema,
  passwordSchema,
  nameSchema,
  phoneSchema,
  paginationSchema
};
