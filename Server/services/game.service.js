const Game = require("../models/game.model");
const Player = require("../models/player.model");

exports.startGame = async () => {
  const players = await Player.find();

  const roles = ["Raja", "Mantri", "Chor", "Sipahi"];

  if (players.length !== roles.length) {
    throw new Error("Exactly 4 players required");
  }

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
