import React, { useState } from 'react';
import useAPI from '../../hooks/useAPI';
import apiRoutes from '../apiroutes';
import { useNavigate } from 'react-router-dom';
import styles from './EnterPlayer.module.css';

export const EnterPlayer = () => {
  const { callAPI, loading, error } = useAPI();
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!playerName.trim()) return;

    try {
      const response = await callAPI(
        apiRoutes.enterPlayer,
        'POST',
        { name: playerName, roundStatus: true }
      );

      localStorage.setItem('playerId', response.data._id);
      navigate('/lobby');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <h2 className={styles.title}>Enter Game</h2>

        <input
          type="text"
          placeholder="Enter Player Name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className={styles.input}
        />

        <button
          type="submit"
          className={styles.button}
          disabled={loading}
        >
          {loading ? 'Joining...' : 'Enter'}
        </button>

        {error && (
          <div className={styles.error}>
            Something went wrong. Try again.
          </div>
        )}
      </form>
    </div>
  );
};
