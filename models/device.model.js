const mongoose = require("../lib/db");

const Schema = mongoose.Schema;

const deviceStatus = {
  online: "online",
  offline: "offline",
};

const deviceSchema = new Schema({
  vendor: Schema.Types.String,
  createdDate: Schema.Types.Date,
  status: {
    type: String,
    enum: [deviceStatus.online, deviceStatus.offline],
  },
});

const DeviceModel = mongoose.model("Device", deviceSchema);

module.exports = DeviceModel;
