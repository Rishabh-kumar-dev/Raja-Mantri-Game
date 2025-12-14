const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    mantriAnswered: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);


module.exports = mongoose.model("Game", gameSchema);