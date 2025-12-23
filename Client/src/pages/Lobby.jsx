import React, { useEffect, useState } from 'react';
import useAPI from '../../hooks/useAPI';
import apiRoutes from '../apiroutes';
import { useNavigate } from 'react-router-dom';
import styles from './Lobby.module.css'; // ✅ correct module import

export const Lobby = () => {
  const navigate = useNavigate();
  const { callAPI } = useAPI();
  const [players, setPlayers] = useState([]);

  const handleGetPlayers = async () => {
    try {
      const response = await callAPI(apiRoutes.getPlayers, 'GET');
      setPlayers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Initial fetch
  useEffect(() => {
    handleGetPlayers();
  }, []);

  // Polling every 2 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      handleGetPlayers();
    }, 2000);

    return () => {
      clearInterval(intervalId);
      console.log('Lobby interval cleared');
    };
  }, []);

  // Navigate when game starts
  useEffect(() => {
    if (
      players.length === 4 &&
      players.filter(player => player.roundStatus === true).length === 4
    ) {
      navigate('/game-screen');
    }
  }, [players, navigate]);

  const activePlayers = players.filter(
    player => player.roundStatus === true
  );

  return (
    <div className={styles.lobbyContainer}>
      <h1 className={styles.lobbyTitle}>Lobby</h1>

      <ul className={styles.playerList}>
        {activePlayers.map(player => (
          <li key={player.id} className={styles.playerItem}>
            {player.name}
          </li>
        ))}
      </ul>

      <div className={styles.statusMessage}>
        {players.length !== 4
          ? 'Waiting for players...'
          : 'Game Starting'}
      </div>
    </div>
  );
};
