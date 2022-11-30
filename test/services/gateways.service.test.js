const assert = require("assert");
const proxyquire = require("proxyquire");

const {
  GatewayModelMock,
  findByIdStub,
  findStub,
} = require("../../utils/mocks/gateways.model.mock");

const { gatewaysMocks } = require("../../utils/mocks/gateways.mock");

describe("services - gateways", () => {
  const GatewayService = proxyquire("../../services/gateway.service", {
    "../models/gateway.model": GatewayModelMock,
  });

  const gatewaysService = new GatewayService();

  describe("When getGateways method is called", async () => {
    it("should call the find GatewayModel method", async () => {
      await gatewaysService.getGateways();
      assert.strictEqual(findStub.called, true);
    });

    it("should return an array of gateways", async () => {
      const result = await gatewaysService.getGateways();
      const expected = gatewaysMocks;
      assert.deepEqual(result, expected);
    });
  });

  describe("When getGatewaysById is called", async () => {
    it("should call the findById GatewayModel method", async () => {
      await gatewaysService.getGatewayByID();
      assert.strictEqual(findByIdStub.called, true);
    });

    it("should return a single gateway", async () => {
      const result = await gatewaysService.getGatewayByID(
        "63877a26e3ed08ef300d50c1"
      );
      console.log("GATEWAY ", result);

      const expected = gatewaysMocks[gatewaysMocks.length - 1];
      assert.deepEqual(result, expected);
    });
  });
});
