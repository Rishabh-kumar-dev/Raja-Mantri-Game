import React, { useEffect, useState } from 'react';
import useAPI from '../../hooks/useAPI';
import apiRoutes from '../apiroutes';
import { useNavigate } from 'react-router-dom';
import styles from './GameScreen.module.css';

export const GameScreen = () => {
  const { callAPI, loading } = useAPI();
  const navigate = useNavigate();
  const [role, setRole] = useState('');

  const startGame = async () => {
    try {
      await callAPI(apiRoutes.startGame, 'POST', {
        id: localStorage.getItem('playerId'),
      });
      getRole();
    } catch (error) {
      getRole();
      console.log(error);
    }
  };

  const getRole = async () => {
    try {
      const response = await callAPI(apiRoutes.getRole, 'POST', {
        id: localStorage.getItem('playerId'),
      });
      setRole(response.data.role);
    } catch (error) {
      console.log(error);
    }
  };

  const handleButtonClicked = async (bool) => {
    try {
      await callAPI(apiRoutes.mantriAnswered, 'POST', {
        answeredCorrectly: bool,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const didMantriAnswered = async () => {
    try {
      const response = await callAPI(apiRoutes.didMantriAnswered, 'GET');
      if (response.data.mantriAnswered) {
        navigate('/scores');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const timeoutID = setTimeout(startGame, 3000);
    const intervalID = setInterval(didMantriAnswered, 2000);

    return () => {
      clearTimeout(timeoutID);
      clearInterval(intervalID);
      console.log('All intervals cleared');
    };
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Game Started</h1>

      <div className={styles.roleCard}>
        {loading && role === '' ? (
          <div className={styles.loading}>Assigning role...</div>
        ) : (
          <div className={styles.roleText}>{role}</div>
        )}
      </div>

      {role === 'Raja' && (
        <div className={styles.questionBox}>
          <p className={styles.questionText}>
            Did Mantri answer correctly?
          </p>

          <div className={styles.buttonGroup}>
            <button
              className={`${styles.button} ${styles.yesButton}`}
              onClick={() => handleButtonClicked(true)}
            >
              Yes
            </button>

            <button
              className={`${styles.button} ${styles.noButton}`}
              onClick={() => handleButtonClicked(false)}
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
