const Joi = require("joi");
const {
  nameSchema,
  emailSchema,
  phoneSchema,
} = require("../../../validators/joiValidators");

const createCustomerValidation = Joi.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  company: Joi.string().trim().max(255).optional().allow("").messages({
    "string.max": "Company name must not exceed 255 characters",
  }),
  address: Joi.string().trim().optional().allow(""),
  status: Joi.string()
    .valid("active", "inactive", "prospect")
    .optional()
    .default("active")
    .messages({
      "any.only": "Status must be active, inactive, or prospect",
    }),
});

const updateCustomerValidation = Joi.object({
  name: Joi.string().trim().min(2).max(255).optional().messages({
    "string.min": "Name must be at least 2 characters",
    "string.max": "Name must not exceed 255 characters",
  }),
  email: Joi.string().email().optional().messages({
    "string.email": "Please provide a valid email",
  }),
  phone: phoneSchema,
  company: Joi.string().trim().max(255).optional().allow("").messages({
    "string.max": "Company name must not exceed 255 characters",
  }),
  address: Joi.string().trim().optional().allow(""),
  status: Joi.string()
    .valid("active", "inactive", "prospect")
    .optional()
    .messages({
      "any.only": "Status must be active, inactive, or prospect",
    }),
});

module.exports = {
  createCustomerValidation,
  updateCustomerValidation,
};
