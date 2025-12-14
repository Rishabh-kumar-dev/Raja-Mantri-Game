const Player = require("../models/player.model");

exports.getPlayers = async () => {
  return await Player.find();
};

exports.createPlayer = async (data) => {
  return await Player.create(data);
};
