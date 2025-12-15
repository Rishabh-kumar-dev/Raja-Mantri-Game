const gameService = require("../services/game.service")

exports.startGame = async (req, res) => {
  try {
    const gameStart = await gameService.startGame(req.body);
    res.status(200).json(gameStart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.mantriAnswered = async (req, res) => {
  try {
    const mantriAnswered = await gameService.mantriAnswered(req.body);
    res.status(200).json(mantriAnswered);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.nextRoundClicked = async (req, res) => {
  try {
    const mantriAnswered = await gameService.nextRoundClicked(req.body);
    res.status(200).json(mantriAnswered);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getYourRole = async (req, res) => {
  try {
    const mantriAnswered = await gameService.getYourRole(req.body);
    res.status(200).json(mantriAnswered);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};