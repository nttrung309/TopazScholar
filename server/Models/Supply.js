const mongoose = require("mongoose");

const supplySchema = new mongoose.Schema({
  supplyID: {
    type: String,
    default: function () {
      return new mongoose.Types.ObjectId().toString();
    },
    required: true,
    unique: true,
  },
  typeID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  status: {
    type: String,
    default: "Available",
  },
  lastUpdateDate: {
    type: Date,
    default: new Date(),
  },
  lastUser: {
    type: String,
  },
  lastAdmin: {
    type: String,
  },
});

module.exports = mongoose.model("Supply", supplySchema);
