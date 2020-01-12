const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema({
  auctioned: {
    type: "Boolean",
    required: true
  },
  endTime: {
    type: "Number",
    required: true
  },
  itemDesc: {
    type: "String",
    required: true
  },
  itemName: {
    type: "String",
    required: true
  },
  startAmount: {
    type: "String",
    required: true
  },
  startTime: {
    type: "Number",
    required: true
  },
  itemId: {
    type: "String",
    required: true
  },
  _id: {
    type: "String",
    required: true
  }
});

module.exports = mongoose.model("auction", auctionSchema);
