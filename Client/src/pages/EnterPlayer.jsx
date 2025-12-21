import React from 'react'
import useAPI from '../../hooks/useAPI';
import { useState } from 'react';
import apiRoutes from '../apiroutes';
import { useNavigate } from 'react-router-dom';

export const EnterPlayer = () => {
    const { callAPI, loading, error } = useAPI();
    const [playerName, setPlayerName] = useState('');
    const navigate = useNavigate();
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await callAPI(apiRoutes.enterPlayer, 'POST', {name:playerName,"roundStatus":true});
            console.log(response);
            localStorage.setItem('playerId', response.data._id);
            navigate('/lobby');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <form onSubmit={handleFormSubmit} style={{display:"flex",flexDirection:"column",gap:"10px"}}>
                <input type="text" placeholder="Enter Player Name" value={playerName} onChange={(e)=>{setPlayerName(e.target.value)}}></input>
                <button type='submit'>Enter</button>
            </form>
        </div>
    )
    }
