const mongoose = require("../lib/db");

const Schema = mongoose.Schema;

const gatewaySchema = new Schema({
  serialNumber: Schema.Types.String,
  name: Schema.Types.String,
  address: Schema.Types.String,
  devices: [
    {
      type: Schema.Types.ObjectId,
      ref: "Device",
    },
  ],
});

module.exports = mongoose.model("Gateway", gatewaySchema);
