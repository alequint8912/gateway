const { DeviceModel, deviceStatus } = require("../models/device.model");

class DeviceService {
  async getDevices() {
    return await DeviceModel.find();
  }

  async getDeviceById(id) {
    return await DeviceModel.findById(id);
  }

  async createDevice(vendor, createdDate, status) {
    const device = new DeviceModel({
      vendor,
      createdDate,
      status,
    });

    return await device.save({ returnDocument: "after" });
  }
}

module.exports = DeviceService;
