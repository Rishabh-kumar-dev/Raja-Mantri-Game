import React, { useEffect, useState } from 'react'
import useAPI from '../../hooks/useAPI';
import apiRoutes from '../apiroutes';

export const GameScreen = () => {
    const { callAPI, loading, error } = useAPI();
    const [role, setRole] = useState('');
    const startGame = async () => {
        try {
            const response = await callAPI(apiRoutes.startGame, 'POST',{id:localStorage.getItem('playerId')});
            console.log(response);
            getRole();
        } catch (error) {
            getRole()
            console.log(error);
        }
    }
    const getRole = async () => {
        try {
            const response = await callAPI(apiRoutes.getRole, 'POST',{id:localStorage.getItem('playerId')});
            console.log(response);
            setRole(response.data.role);
        } catch (error) {
            console.log(error);
        }
    }
    const handleButtonClicked = async () => {
        try {
            const response = await callAPI(apiRoutes.mantriAnswered, 'POST',{"setBoolean": true});
            console.log(response);
        } catch (error) {
            console.log(error); 
        }
    }
    useEffect(()=>{
        startGame();
    },[])
    return (
        <>
            <div>GameScreen</div>
            <h2>{role}</h2>
            {role === "Raja" && 
                <div>
                    <p>Did Mantri answered correctly?</p>
                    <div>
                        <button >Yes</button>
                        <button>No</button>
                    </div>
                </div>
            }
        </>
    )
}
