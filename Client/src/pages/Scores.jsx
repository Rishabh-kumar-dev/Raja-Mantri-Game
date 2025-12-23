import React, { useEffect, useState } from 'react';
import useAPI from '../../hooks/useAPI';
import apiRoutes from '../apiroutes';
import { useNavigate } from 'react-router-dom';
import styles from './Scores.module.css';

const Scores = () => {
  const { loading, callAPI } = useAPI();
  const navigate = useNavigate();

  const [rounds, setRounds] = useState([]);
  const [players, setPlayers] = useState([]);
  const [totals, setTotals] = useState({});

  useEffect(() => {
    const fetchRounds = async () => {
      try {
        const response = await callAPI(apiRoutes.getRoundsData, 'GET');
        const roundsData = response.data;

        setRounds(roundsData);

        // ✅ Extract player names from first round
        const playerNames = roundsData[0]?.players.map(p => p.name) || [];
        setPlayers(playerNames);

        calculateTotals(roundsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRounds();
  }, []);

  // ✅ Calculate totals per player
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
        'POST',
        { id: localStorage.getItem('playerId') }
      );
      navigate('/lobby');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Scores</h1>

      {loading && <p className={styles.loading}>Loading...</p>}

      {!loading && rounds.length > 0 && (
        <>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Round</th>
                {players.map(player => (
                  <th key={player}>{player}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {/* ✅ ROUND ROWS */}
              {rounds.map(round => (
                <tr key={round.roundNumber}>
                  <td className={styles.roundCell}>
                    {round.roundNumber}
                  </td>

                  {players.map(playerName => {
                    const playerData = round.players.find(
                      p => p.name === playerName
                    );
                    return (
                      <td key={playerName}>
                        {playerData ? playerData.score : 0}
                      </td>
                    );
                  })}
                </tr>
              ))}

              {/* ✅ TOTAL ROW */}
              <tr className={styles.totalRow}>
                <td>Total</td>
                {players.map(player => (
                  <td key={player}>{totals[player] || 0}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        </>
      )}

      <button className={styles.button} onClick={handleNextRoundClicked}>
        Play Again
      </button>
    </div>
  );
};

export default Scores;
