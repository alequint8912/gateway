const joi = require("@hapi/joi");
const GatewayModel = require("../../models/gateway.model");

const idSchema = joi
  .string()
  .regex(/^[0-9a-fA-F]{24}$/)
  .message("Gateway ID is not valid!");
//const serialNumberSchema = joi.string()
const nameSchema = joi.string();
const addressSchema = joi
  .string()
  .regex(
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  );
//const gatewayDevicesSchema = joi.array().items(gatewayIdSchema)

const createGatewayValidationSchema = joi.object({
  name: nameSchema.required(),
  address: addressSchema.required(),
});

const deleteGatewayValidation = () => async (req, res, next) => {
  const { gatewayID } = req.params;
  const gateway = await GatewayModel.findById(gatewayID);

  if (!gateway) next(boom.badRequest(`Gateway does not exist!`));
  else next();
};

module.exports = {
  createGatewayValidationSchema,
  deleteGatewayValidation,
  idSchema,
};
