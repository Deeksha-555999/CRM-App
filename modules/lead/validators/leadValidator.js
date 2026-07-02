const Joi = require("joi");
const {
  nameSchema,
  emailSchema,
} = require("../../../validators/joiValidators");

const createLeadValidation = Joi.object({
  name: nameSchema,
  email: emailSchema,
  phone: Joi.string().trim().max(50).optional().allow("").messages({
    "string.max": "Phone number must not exceed 50 characters",
  }),
  company: Joi.string().trim().max(255).optional().allow("").messages({
    "string.max": "Company name must not exceed 255 characters",
  }),
  source: Joi.string().trim().max(100).optional().allow("").messages({
    "string.max": "Source must not exceed 100 characters",
  }),
  status: Joi.string()
    .valid("new", "contacted", "qualified", "converted", "lost")
    .optional()
    .default("new")
    .messages({
      "any.only": "Invalid status",
    }),
  notes: Joi.string().trim().optional().allow(""),
  assigned_to: Joi.number().integer().min(1).optional().allow(null).messages({
    "number.base": "Assigned to must be a valid user ID",
    "number.min": "Assigned to must be a valid user ID",
  }),
});

const updateLeadValidation = Joi.object({
  name: Joi.string().trim().min(2).max(255).optional().messages({
    "string.min": "Name must be at least 2 characters",
    "string.max": "Name must not exceed 255 characters",
  }),
  email: Joi.string().email().optional().messages({
    "string.email": "Please provide a valid email",
  }),
  phone: Joi.string().trim().max(50).optional().allow("").messages({
    "string.max": "Phone number must not exceed 50 characters",
  }),
  company: Joi.string().trim().max(255).optional().allow("").messages({
    "string.max": "Company name must not exceed 255 characters",
  }),
  source: Joi.string().trim().max(100).optional().allow("").messages({
    "string.max": "Source must not exceed 100 characters",
  }),
  status: Joi.string()
    .valid("new", "contacted", "qualified", "converted", "lost")
    .optional()
    .messages({
      "any.only": "Invalid status",
    }),
  notes: Joi.string().trim().optional().allow(""),
  assigned_to: Joi.number().integer().min(1).optional().allow(null).messages({
    "number.base": "Assigned to must be a valid user ID",
    "number.min": "Assigned to must be a valid user ID",
  }),
});

module.exports = {
  createLeadValidation,
  updateLeadValidation,
};
