const joi = require("@hapi/joi");
const boom = require("@hapi/boom");
const DeviceModel = require("../../models/device.model");

const idSchema = joi
  .string()
  .regex(/^[0-9a-fA-F]{24}$/)
  .message("Device ID is not valid!");

const vendorSchema = joi.string();
const createdDateSchema = joi
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .message("Date must be yyyy-mm-dd format");
const statusSchema = joi
  .string()
  .valid('online', 'offline');

const createDeviceValidationSchema = joi.object({
  vendor: vendorSchema.required(),
  createdDate: createdDateSchema.required(),
  status: statusSchema.required(),
});

const createDeviceValidation = () => {
  return (req, res, next) => {
    const { vendor, createdDate, status } = req.body;
    const { error } = createDeviceValidationSchema.validate({
      vendor,
      createdDate,
      status,
    });

    if (error) {
      next(boom.badRequest(error.details[0].message));
    } else {
      const timestamp = new Date(createdDate).getTime();
      if (typeof timestamp !== "number" || Number.isNaN(timestamp)) {
        next(boom.badRequest("Invalid date!"));
      } else next();
    }
  };
};

module.exports = {
  idSchema,
  createDeviceValidation,
};
