const boom = require("@hapi/boom");
const joi = require("@hapi/joi");
const GatewayModel = require("../../models/gateway.model");
const { DeviceModel } = require("../../models/device.model");

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

function existId(idParam, model, origin) {
  return async function (req, res, next) {
    const id = req[origin][idParam];
    let count = 0;
    switch (model) {
      case "gateway":
        count = await GatewayModel.countDocuments({ _id: id });
        break;

      case "device":
        count = await DeviceModel.countDocuments({ _id: id });
        break;

      default:
        break;
    }

    count > 0
      ? next()
      : next(boom.badRequest(`${model} instance does no exist!`));
  };
}

module.exports = { validationHandler, createSchema, existId };
