const API_BASE_URL = "http://34.14.152.168:8001/";

const apiRoutes = {
  enterPlayer: `${API_BASE_URL}players/add_player`,
  getPlayers: `${API_BASE_URL}players/all_players`,
  startGame: `${API_BASE_URL}game/start`,
  getRole: `${API_BASE_URL}game/getYourRole`,
  mantriAnswered: `${API_BASE_URL}game/mantriAnswered`,
  didMantriAnswered: `${API_BASE_URL}game/didMantriAnswered`,
  playAgainClicked: `${API_BASE_URL}game/nextRoundClicked`,
  getRoundsData: `${API_BASE_URL}game/rounds`,
};

export default apiRoutes;
