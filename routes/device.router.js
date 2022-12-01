const express = require("express");
const DeviceService = require("../services/device.service");
const {
  validationHandler,
  createSchema,
  existId,
} = require("../utils/middleware/validationHandler");

const {
  createDeviceValidationSchema,
  idSchema,
} = require("../utils/schemas/device.schema");

const deviceAPI = (app) => {
  const router = express.Router();
  const deviceService = new DeviceService();

  app.use("/devices", router);

  router.get("/", async (req, res, next) => {
    try {
      const devices = await deviceService.getDevices();

      res.status(200).json({
        data: devices,
      });
    } catch (error) {
      next(error);
    }
  });

  router.get(
    "/:deviceID",
    validationHandler(createSchema("deviceID", idSchema), "params"),
    existId("deviceID", "device", "params"),
    async (req, res, next) => {
      const { deviceID } = req.params;
      const device = await deviceService.getDeviceById(deviceID);

      res.status(200).json({
        data: device,
      });
    }
  );

  router.post(
    "/",
    validationHandler(createDeviceValidationSchema),
    async (req, res, next) => {
      const { vendor, createDate, status } = req.body;

      const device = await deviceService.createDevice(
        vendor,
        createDate,
        status
      );

      res.status(201).json({
        data: device,
      });
    }
  );
};

module.exports = deviceAPI;
