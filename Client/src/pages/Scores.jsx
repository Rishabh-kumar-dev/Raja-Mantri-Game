import React from 'react'
import useAPI from '../../hooks/useAPI'
import axios from 'axios';
import apiRoutes from '../apiroutes';
import { useNavigate } from 'react-router-dom';

const Scores = () => {
  const {loading,callAPI} = useAPI();
  const navigate = useNavigate();
  const handleNextRoundClicked = async()=>{
    try {
      const response = await callAPI(apiRoutes.playAgainClicked,"POST",{id:localStorage.getItem("playerId")})
      console.log(response)
      navigate("/lobby")
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div>
      <button onClick={handleNextRoundClicked}>Play Again</button>
    </div>
  )
}

export default Scores
