const router = require("express").Router();
const playerController = require("../controllers/player.controller");

router.get("/all_players", playerController.getPlayers);
router.post("/add_player", playerController.createPlayer);

module.exports = router;
