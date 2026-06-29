const Joi = require('joi');
const { nameSchema, emailSchema, phoneSchema } = require('../../../validators/joiValidators');

const createCustomerValidation = Joi.object({
  name: nameSchema,
  email: emailSchema,
  phone: Joi.string().trim().max(50).optional().allow('').messages({
    'string.max': 'Phone number must not exceed 50 characters'
  }),
  company: Joi.string().trim().max(255).optional().allow('').messages({
    'string.max': 'Company name must not exceed 255 characters'
  }),
  address: Joi.string().trim().optional().allow(''),
  status: Joi.string().valid('active', 'inactive').optional().default('active').messages({
    'any.only': 'Status must be either active or inactive'
  })
});

const updateCustomerValidation = Joi.object({
  name: Joi.string().trim().min(2).max(255).optional().messages({
    'string.min': 'Name must be at least 2 characters',
    'string.max': 'Name must not exceed 255 characters'
  }),
  email: Joi.string().email().optional().messages({
    'string.email': 'Please provide a valid email'
  }),
  phone: Joi.string().trim().max(50).optional().allow('').messages({
    'string.max': 'Phone number must not exceed 50 characters'
  }),
  company: Joi.string().trim().max(255).optional().allow('').messages({
    'string.max': 'Company name must not exceed 255 characters'
  }),
  address: Joi.string().trim().optional().allow(''),
  status: Joi.string().valid('active', 'inactive').optional().messages({
    'any.only': 'Status must be either active or inactive'
  })
});

module.exports = {
  createCustomerValidation,
  updateCustomerValidation
};