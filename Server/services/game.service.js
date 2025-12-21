const Game = require("../models/game.model");
const Player = require("../models/player.model");
const Round = require("../models/rounds.model");
const ROLE_SCORES = {
  Raja: 100,
  Mantri: 80,
  Sipahi: 20,
  Chor: 0,
};

exports.startGame = async (data) => {
  const players = await Player.find();

  const roles = ["Raja", "Mantri", "Chor", "Sipahi"];

  if (players.length !== roles.length) {
    throw new Error("Exactly 4 players required");
  }

  // mark this player as ready / inactive for round start
  await Player.findByIdAndUpdate(
    data.id,
    { $set: { roundStatus: false } },
    { new: true }
  );

  // prevent re-assigning roles
  const alreadyAssigned = players.some(p => p.role);
  if (alreadyAssigned) {
    throw new Error("Game already started");
  }

  // ensure game state exists
  await Game.findOneAndUpdate({}, {}, { upsert: true });

  // 🎲 shuffle roles
  for (let i = roles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [roles[i], roles[j]] = [roles[j], roles[i]];
  }

  // 🔥 ASSIGN ROLES + SCORES
  for (let i = 0; i < players.length; i++) {
    const role = roles[i];
    players[i].role = role;
    players[i].score = ROLE_SCORES[role];
    await players[i].save();
  }

  // 🆕 CREATE ROUND ENTRY
  const roundNumber = await Round.countDocuments() + 1;

  await Round.create({
    roundNumber,
    players: players.map(p => ({
      player: p._id,
      name: p.name,
      role: p.role,
      score: p.score,
    })),
  });

  return { message: "Game started & round created" };
};

exports.mantriAnswered = async (data) => {
  const { answeredCorrectly } = data;

  // store answer state (optional but correct)
  await Game.updateOne(
    {},
    { $set: { mantriAnswered: true, answeredCorrectly } }
  );

  // ✅ If answered correctly → nothing to update
  if (answeredCorrectly) {
    return { message: "Correct answer — scores unchanged" };
  }
  // 🔥 Get latest round
  const latestRound = await Round.findOne().sort({ roundNumber: -1 });

  if (!latestRound) {
    throw new Error("No round found");
  }

  // find Mantri & Chor
  const mantri = latestRound.players.find(p => p.role === "Mantri");
  const chor = latestRound.players.find(p => p.role === "Chor");

  if (!mantri || !chor) {
    throw new Error("Mantri or Chor not found in round");
  }

  // 🔁 swap scores
  const tempScore = mantri.score;
  mantri.score = chor.score;
  chor.score = tempScore;

  await latestRound.save();

  return {
    message: "Wrong answer — Mantri & Chor scores swapped",
    roundNumber: latestRound.roundNumber,
  };
};
exports.didMantriAnswered = async (data) => {
  try {
    const game = await Game.findOne(); // or findById if you have ID
    return game;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.nextRoundClicked = async (data) => {
  await Game.updateOne(
    {},
    { $set: { mantriAnswered: false } }
  );
  return await Player.findByIdAndUpdate(
    data.id,
    { $set: { roundStatus: true , role: ""} },
    { new: true }
  );
};
exports.getYourRole = async (data) => {
  return await Player.findById(
    data.id,
    { role: 1 }   // projection → return only role
  );
};
exports.getAllRounds = async (req, res) => {
    return await Round.find()
      .sort({ roundNumber: 1 })
      .populate("players.player", "name");
};