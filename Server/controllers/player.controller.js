const playerService = require("../services/player.service");

exports.getPlayers = async (req, res) => {
  try {
    const players = await playerService.getPlayers();
    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createPlayer = async (req, res) => {
  try {
    const player = await playerService.createPlayer(req.body);
    res.status(201).json(player);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.assignRandomRole = async (req, res) => {
  try {
    const player = await playerService.assignRole(req.body);
    res.status(201).json(player);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};