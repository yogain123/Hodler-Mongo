const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
  _id: {
    type: "String",
    required: true
  },
  bidId: {
    type: "String",
    required: true
  },
  epoch: {
    type: "Number",
    required: true
  },
  user: {
    type: "String",
    required: true
  },
  amount: {
    type: "String",
    required: true
  },
  itemId: {
    type: "String",
    required: true
  }
});

module.exports = mongoose.model("bid", bidSchema);
