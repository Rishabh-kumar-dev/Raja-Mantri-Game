const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

app.use("/", require("./routes/index.routes.js"));
app.use("/players", require("./routes/player.routes"));
app.use("/game", require("./routes/game.routes.js"));

module.exports = app;
