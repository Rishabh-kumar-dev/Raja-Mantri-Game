const mongoose = require("mongoose");

const roundPlayerSchema = new mongoose.Schema({
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player",
    required: true,
  },
  name: String,      // snapshot (optional but useful)
  role: String,      // role in that round
  score: Number,     // score earned in that round
});

const roundSchema = new mongoose.Schema(
  {
    roundNumber: {
      type: Number,
      required: true,
    },
    players: [roundPlayerSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rounds", roundSchema);
