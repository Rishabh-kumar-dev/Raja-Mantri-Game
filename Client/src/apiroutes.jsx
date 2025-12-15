const API_BASE_URL = "http://localhost:3000/";

const apiRoutes = {
  enterPlayer: `${API_BASE_URL}players/add_player`,
  getPlayers: `${API_BASE_URL}players/all_players`,
  startGame: `${API_BASE_URL}game/start`,
  getRole: `${API_BASE_URL}game/getYourRole`,
  mantriAnswered: `${API_BASE_URL}game/mantriAnswered`,
};

export default apiRoutes;
