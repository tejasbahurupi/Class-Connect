const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
  },
  { collection: "Token" }
);

module.exports = mongoose.model("Token", TokenSchema);
