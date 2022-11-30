const sinon = require("sinon");
const { find, findById } = require("./gateways.mock");

const findStub = sinon.stub().resolves(find());

const findByIdStub = sinon
  .stub()
  .resolves(findById("63877a26e3ed08ef300d50c1"));

class GatewayModelMock {
  static find() {
    return findStub();
  }

  static findById(id) {
    return findByIdStub();
  }
}

module.exports = { findStub, findByIdStub, GatewayModelMock };
