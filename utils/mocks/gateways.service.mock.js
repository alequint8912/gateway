const { gatewaysMocks } = require("./gateways.mock");
const { v4 } = require("uuid");

class GatewayServiceMock {
  async getGateways() {
    return Promise.resolve(gatewaysMocks);
  }

  async getGatewayByID(id) {
    const gateway = gatewaysMocks.find((elem) => elem._id === id);
    return Promise.resolve(gateway);
  }

  async createGateway(name, address) {
    const gateway = {
      _id: v4(),
      name,
      address,
      devices: [],
    };

    return Promise.resolve(gateway);
  }

  async addDevice(gatewayId, deviceId) {
    const gateway = gatewaysMocks.find((elem) => elem._id === gatewayId);
    gateway.devices.push(deviceId);

    return Promise.resolve(gateway);
  }

  async removeDevice(gatewayId, deviceId) {
    const gateway = gatewaysMocks.find((elem) => elem._id === gatewayId);

    const devices = gateway.devices.filter((item) => item !== deviceId);
    gateway.devices = [...devices];

    return Promise.resolve(gateway);
  }
}

module.exports = GatewayServiceMock;
