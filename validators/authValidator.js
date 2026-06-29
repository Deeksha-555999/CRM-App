const Joi = require('joi');
const { emailValidator, passwordValidator, nameValidator } = require('./joiValidators');

const registerValidation = [
  nameValidator('name'),
  emailValidator(),
  passwordValidator(),
  body('role')
    .optional()
    .isIn(['admin', 'user'])
    .withMessage('Role must be either admin or user')
];

const loginValidation = [
  emailValidator(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

module.exports = {
  registerValidation,
  loginValidation
};
