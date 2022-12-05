const assert = require("assert");
const proxyquire = require("proxyquire");

const { gatewaysMocks } = require("../../utils/mocks/gateways.mock");
const GatewayServiceMock = require("../../utils/mocks/gateways.service.mock");
const testServer = require("../../utils/testServer");

describe("routes - gateways", () => {
  const route = proxyquire("../../routes/gateway.router", {
    "../services/gateway.service": GatewayServiceMock,
  });

  const request = testServer(route);
  describe("GET /gateways", () => {
    it("should respond with 200", (done) => {
      request.get("/gateways").expect(200, done);
    });

    it("should respond with the list of gateways", (done) => {
      request.get("/gateways").end((err, res) => {
        assert.deepEqual(res.body, {
          data: gatewaysMocks,
          message: "gateways listed!",
        });

        done();
      });
    });
  });

  describe("GET /gateways/validId", () => {
    it("should respond with status code 200 when valid id is provided", (done) => {
      request.get("/gateways/63877a1ee3ed08ef300d50bf").expect(200);

      done();
    });
  });
});
