const { Joi } = require("express-validation");

exports.getById = {
  query: Joi.object({
    id: Joi.string().required(),
  }),
};

exports.label = {
  body: Joi.object({
    id: Joi.string().required(),
    labelId: Joi.string().required(),
  }),
};

exports.register = {
  body: Joi.object({
    description: Joi.string().required(),
  }),
};
