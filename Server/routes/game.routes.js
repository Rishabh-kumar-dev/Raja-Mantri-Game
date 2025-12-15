const router = require("express").Router();
const gameController = require("../controllers/game.controller");

router.post("/start", gameController.startGame);
router.post("/mantriAnswered", gameController.mantriAnswered);
router.post("/nextRoundClicked", gameController.nextRoundClicked);
router.post("/getYourRole", gameController.getYourRole);

module.exports = router