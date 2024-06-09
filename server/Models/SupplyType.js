const mongoose = require("mongoose");

const supplyTypeSchema = new mongoose.Schema({
  typeID: {
    type: String,
    default: function () {
      return new mongoose.Types.ObjectId().toString();
    },
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
});

module.exports = mongoose.model("SupplyType", supplyTypeSchema);
