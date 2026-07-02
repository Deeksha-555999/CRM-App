const Joi = require("joi");
const { emailSchema } = require("../../../validators/joiValidators");

const loginValidation = Joi.object({
  email: emailSchema,
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
});

module.exports = {
  loginValidation,
};
