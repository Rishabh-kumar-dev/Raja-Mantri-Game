const Game = require("../models/game.model");
const Player = require("../models/player.model");

exports.startGame = async (data) => {
  const players = await Player.find();

  const roles = ["Raja", "Mantri", "Chor", "Sipahi"];

  if (players.length !== roles.length) {
    throw new Error("Exactly 4 players required");
  }
   await Player.findByIdAndUpdate(
  data.id,                         // player _id
  { $set: { roundStatus: false } }, 
  { new: true }
);
  // prevent re-assigning roles
  const alreadyAssigned = players.some(p => p.role);
  if (alreadyAssigned) {
    throw new Error("Game already started");
  }

  // 🔥 ENSURE GAME STATE EXISTS
  await Game.findOneAndUpdate(
    {},
    {},                // no update, just ensure doc exists
    { upsert: true }
  );
  // shuffle roles
  for (let i = roles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [roles[i], roles[j]] = [roles[j], roles[i]];
  }

  // assign roles
  for (let i = 0; i < players.length; i++) {
    players[i].role = roles[i];
    await players[i].save();
  }

  return { message: "Game started" };
};
exports.mantriAnswered = async (data) => {
  return await Game.updateOne(
  {},                         // match the first document
  { $set: { mantriAnswered: data.setBoolean } }
);
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