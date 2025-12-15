import React, { useEffect, useState } from 'react';
import useAPI from '../../hooks/useAPI';
import apiRoutes from '../apiroutes';
import { useNavigate } from 'react-router-dom';

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

    // ✅ Cleanup when leaving page
    return () => {
      clearInterval(intervalId);
      console.log('Lobby interval cleared');
    };
  }, []);

  // Navigate when game starts
    if (
      players.length === 4 &&
      players.filter(player => player.roundStatus === true).length === 4
    ) {
      navigate('/game-screen');
    }

  return (
    <div>
      <h1>Lobby</h1>

      {players
        .filter(player => player.roundStatus === true)
        .map(player => (
          <div key={player.id}>{player.name}</div>
        ))}

      {players.length !== 4 ? 'Waiting for players...' : 'Game Starting'}
    </div>
  );
};
