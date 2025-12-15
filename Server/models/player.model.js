const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Raja", "Mantri", "Chor", "Sipahi",""],
      default:"",
    },
    score: {
      type: Number,
      default: 0,
    },
    roundStatus: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Player", playerSchema);
