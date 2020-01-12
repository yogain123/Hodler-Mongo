const mongoose = require("mongoose");

const bankSessionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  sessionId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("bankSession", bankSessionSchema);
