const express = require("express");
const app = express();

app.use(express.json());

app.use("/", require("./routes/index.routes.js"));
app.use("/players", require("./routes/player.routes"));
app.use("/game", require("./routes/game.routes.js"));

module.exports = app;
