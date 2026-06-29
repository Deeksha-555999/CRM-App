const Joi = require('joi');

const verifyUserValidation = Joi.object({
    action: Joi.string().valid('approve', 'reject').required().messages({
        'any.only': 'Action must be either approve or reject',
        'any.required': 'Action is required'
    })
});

const updateRoleValidation = Joi.object({
    role: Joi.string().valid('admin', 'user').required().messages({
        'any.only': 'Role must be either admin or user',
        'any.required': 'Role is required'
    })
});

const userIdValidation = Joi.object({
    id: Joi.string().pattern(/^\d+$/).required().messages({
        'string.pattern.base': 'User ID must be a valid number',
        'any.required': 'User ID is required'
    })
});

module.exports = {
    verifyUserValidation,
    updateRoleValidation,
    userIdValidation
};