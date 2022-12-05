const assert = require("assert");
const proxyquire = require("proxyquire");

const { deviceMocks } = require("../../utils/mocks/devices.mock");

const DeviceServiceMock = require("../../utils/mocks/devices.service.mock");
const testServer = require("../../utils/testServer");

describe("routes - devices", () => {
  const route = proxyquire("../../routes/device.router", {
    "../services/device.service": DeviceServiceMock,
  });

  const request = testServer(route);
  describe("GET /devices", () => {
    it("should respond with 200", (done) => {
      request.get("/devices").expect(200, done);
    });

    it("should respond with the list of gateways", (done) => {
      request.get("/devices").end((err, res) => {
        assert.deepEqual(res.body, {
          data: deviceMocks,
          message: "devices listed!",
        });

        done();
      });
    });
  });

  describe("GET /devices/validId", () => {
    it("should respond with status code 200 when valid id is provided", (done) => {
      request.get("/devices/638dfa5f511caf26079c3e0d").expect(200, done);
    });
  });
});
