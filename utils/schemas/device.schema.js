const joi = require("@hapi/joi");
const { DeviceModel, deviceStatus } = require("../../models/device.model");

const idSchema = joi
  .string()
  .regex(/^[0-9a-fA-F]{24}$/)
  .message("Device ID is not valid!");

const vendorSchema = joi.string();
const createdDateSchema = joi
  .string()
  .regex(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)
  .message("Date must be yyyy-mm-dd format");
const statusSchema = joi
  .string()
  .valid(deviceStatus.online, deviceStatus.offline);

const createDeviceValidationSchema = joi.object({
  vendor: vendorSchema,
  createdDate: createdDateSchema,
  status: statusSchema,
});

module.exports = {
  idSchema,
  createDeviceValidationSchema,
};
