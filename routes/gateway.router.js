const express = require("express");
const GatewayService = require("../services/gateway.service");
const {
  validationHandler,
  createSchema,
} = require("../utils/middleware/validationHandler");

const {
  createGatewayValidationSchema,
  deleteGatewayValidation,
  idSchema,
} = require("../utils/schemas/gateway.schema");

const gatewayAPI = (app) => {
  const router = express.Router();
  const gatewayService = new GatewayService();

  app.use("/gateways", router);

  router.get("/", async (req, res, next) => {
    try {
      const gateways = await gatewayService.getGateways();

      res.status(200).json({
        data: gateways,
        message: "gateways listed!",
      });
    } catch (error) {
      next(error);
    }
  });

  router.get(
    "/:gatewayID",
    validationHandler(createSchema("gatewayID", idSchema), "params"),
    async (req, res, next) => {
      try {
        const { gatewayID } = req.params;
        const gateway = await gatewayService.getGatewayByID(gatewayID);

        res.status(200).json({
          data: gateway,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    "/",
    //validationHandler(createGatewayValidationSchema),
    async (req, res, next) => {
      try {
        const { name, address } = req.body;

        const gateway = await gatewayService.createGateway(name, address);

        res.status(201).json({
          data: gateway,
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.patch("/:gatewayID/addDevice/:deviceID", async (req, res, next) => {
    try {
      const { gatewayID, deviceID } = req.params;
      const gateway = await gatewayService.addDevice(gatewayID, deviceID);

      res.status(200).json({
        data: gateway,
      });
    } catch (error) {
      next(error);
    }
  });

  router.patch("/:gatewayID/removeDevice/:deviceID", async (req, res, next) => {
    try {
      const { gatewayID, deviceID } = req.params;
      const gateway = await gatewayService.removeDevice(gatewayID, deviceID);

      res.status(200).json({
        data: gateway,
      });
    } catch (error) {
      next(error);
    }
  });
};

module.exports = gatewayAPI;
