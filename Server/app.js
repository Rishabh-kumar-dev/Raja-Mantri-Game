const express = require("express");
const cors = require("cors");
const app = express();


const corsOptions = {
  origin: "http://34.14.152.168:3001",   // Allow requests from this frontend origin
  methods: "GET,POST,PUT,DELETE",        // Allow these HTTP methods
  allowedHeaders: "Content-Type,Authorization",  // Allow specific headers like Content-Type, Authorization
  credentials: true,                     // Allow cookies/authentication tokens to be sent with requests
  preflightContinue: false,              // Handle OPTIONS requests automatically
  optionsSuccessStatus: 204             // Some older browsers may require this
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/", require("./routes/index.routes.js"));
app.use("/players", require("./routes/player.routes"));
app.use("/game", require("./routes/game.routes.js"));

module.exports = app;
