const sinon = require("sinon");
const { find, findById } = require("./devices.mock");

const findStub = sinon.stub().resolves(find());

const findByIdStub = sinon
  .stub()
  .resolves(findById("63865bde2b35faa03231716b"));

class DeviceModelMock {
  static find() {
    return findStub();
  }

  static findById(id) {
    return findByIdStub();
  }
}

module.exports = { findStub, findByIdStub, DeviceModelMock };
