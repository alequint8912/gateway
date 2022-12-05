const assert = require("assert");
const proxyquire = require("proxyquire");

const {
  DeviceModelMock,
  findByIdStub,
  findStub,
} = require("../../utils/mocks/devices.model.mock");

const { deviceMocks } = require("../../utils/mocks/devices.mock");

describe("services - devices", () => {
  const DeviceService = proxyquire("../../services/device.service", {
    "../models/device.model": DeviceModelMock,
  });

  const deviceService = new DeviceService();

  describe("When getDevices method is called", async () => {
    it("should call the find DeviceModel method", async () => {
      await deviceService.getDevices();
      assert.strictEqual(findStub.called, true);
    });

    it("should return an array of devices", async () => {
      const result = await deviceService.getDevices();
      const expected = deviceMocks;
      assert.deepEqual(result, expected);
    });
  });

  describe("When getDeviceById is called", async () => {
    it("should call the findById DeviceModel method", async () => {
      await deviceService.getDeviceById();
      assert.strictEqual(findByIdStub.called, true);
    });

    it("should return a single device", async () => {
      const result = await deviceService.getDeviceById(
        "63865bde2b35faa03231716b"
      );
      const expected = deviceMocks[0];
      assert.deepEqual(result, expected);
    });
  });
});
