const { Joi } = require("express-validation");

const register = {
  body: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
  }),
};

const login = {
  body: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

module.exports = { register, login };
