const GatewayModel = require("../models/gateway.model");

class GatewayService {
  async getGateways() {
    return await GatewayModel.find();
  }

  async getGatewayByID(id) {
    return await GatewayModel.findById(id);
  }

  async createGateway(name, address) {
    const gateway = new GatewayModel({
      name,
      address,
      devices: [],
    });

    return await gateway.save({ returnDocument: "after" });
  }

  async addDevice(gatewayId, deviceId) {
    const gateway = await GatewayModel.findById(gatewayId);
    gateway.devices.push(deviceId);
    const savedGateway = await gateway.save({ returnDocument: "after" });

    return savedGateway;
  }

  async removeDevice(gatewayId, deviceId) {
    const gateway = await GatewayModel.findById(gatewayId);
    const devices = gateway.devices.filter((item) => item !== deviceId);
    gateway.devices = devices;
    const savedGateway = await gateway.save({ returnDocument: "after" });

    return savedGateway;
  }
}

module.exports = GatewayService;
