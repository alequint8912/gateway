const { deviceMocks, findById } = require("./devices.mock");

const { v4 } = require("uuid");

class DeviceServiceMock {
  async getDevices() {
    return Promise.resolve(deviceMocks);
  }

  async getDeviceById(id) {
    const device = findById(id);
    return Promise.resolve(device);
  }

  async createDevice(vendor, createdDate, status) {
    const device = {
      _id: v4(),
      vendor,
      createdDate,
      status,
    };

    return Promise.resolve(device);
  }
}

module.exports = DeviceServiceMock;
