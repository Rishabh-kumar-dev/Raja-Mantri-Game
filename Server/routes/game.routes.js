const router = require("express").Router();
const gameController = require("../controllers/game.controller");

router.get("/start", gameController.startGame);
router.post("/mantriAnswered", gameController.mantriAnswered);

module.exports = router