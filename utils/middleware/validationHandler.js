const boom = require("@hapi/boom");
const joi = require("@hapi/joi");
const { customizeJoiError } = require("./errorHandler");

function validate(data, schema) {
  const { error } = schema.validate(data, { abortEarly: false });
  return error;
}

function createSchema(field, fieldValidation) {
  return joi.object({
    [field]: fieldValidation,
  });
}

function validationHandler(schema, check = "body") {
  return function (req, res, next) {
    const error = validate(req[check], schema);
    error ? next(boom.badRequest(error.message, error)) : next();
  };
}

module.exports = { validationHandler, createSchema };
