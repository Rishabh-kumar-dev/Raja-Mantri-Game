import React, { useEffect, useState } from 'react';
import useAPI from '../../hooks/useAPI';
import apiRoutes from '../apiroutes';
import { useNavigate } from 'react-router-dom';

const Scores = () => {
  const { loading, callAPI } = useAPI();
  const navigate = useNavigate();

  const [rounds, setRounds] = useState([]);
  const [totals, setTotals] = useState({});

  useEffect(() => {
    const fetchRounds = async () => {
      try {
        const response = await callAPI(apiRoutes.getRoundsData, 'GET');
        console.log(response)
        setRounds(response.data);
        calculateTotals(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRounds();
  }, []);

  // 🔥 TOTAL SCORE LOGIC
  const calculateTotals = (roundsData) => {
    const totalScores = {};

    roundsData.forEach(round => {
      round.players.forEach(player => {
        if (!totalScores[player.name]) {
          totalScores[player.name] = 0;
        }
        totalScores[player.name] += player.score;
      });
    });

    setTotals(totalScores);
  };

  const handleNextRoundClicked = async () => {
    try {
      await callAPI(
        apiRoutes.playAgainClicked,
        "POST",
        { id: localStorage.getItem("playerId") }
      );
      navigate("/lobby");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Round Scores</h2>

      {loading && <p>Loading...</p>}

      {!loading && (
        <>
          {/* ROUND TABLE */}
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>Round</th>
                <th>Player</th>
                <th>Role</th>
                <th>Score</th>
              </tr>
            </thead>

            <tbody>
              {rounds.map(round =>
                round.players.map((player, index) => (
                  <tr key={`${round.roundNumber}-${index}`}>
                    <td>{round.roundNumber}</td>
                    <td>{player.name}</td>
                    <td>{player.role}</td>
                    <td>{player.score}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* TOTAL SCORES */}
          <h3>Total Scores</h3>
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>Player</th>
                <th>Total Score</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(totals).map(([name, score]) => (
                <tr key={name}>
                  <td>{name}</td>
                  <td>{score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      <button onClick={handleNextRoundClicked}>Play Again</button>
    </div>
  );
};

export default Scores;
