const joi = require("@hapi/joi");
const GatewayModel = require("../../models/gateway.model");

const idSchema = joi
  .string()
  .regex(/^[0-9a-fA-F]{24}$/)
  .message("Gateway ID is not valid!");
const nameSchema = joi.string();
const addressSchema = joi
  .string()
  .regex(
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  );

const createGatewayValidationSchema = joi.object({
  name: nameSchema.required(),
  address: addressSchema.message("Invalid IP address!").required(),
});

const addDeviceValidationSchema = joi.object({
  action: joi.string().valid("add", "remove").required(),
  deviceID: joi
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .message("Device ID is not valid!")
    .required(),
});

module.exports = {
  createGatewayValidationSchema,
  addDeviceValidationSchema,
  idSchema,
};
