import React, { useEffect, useState } from 'react'
import useAPI from '../../hooks/useAPI';
import apiRoutes from '../apiroutes';
import { useNavigate } from 'react-router-dom';

export const GameScreen = () => {
    const { callAPI, loading, error } = useAPI();
    const navigate = useNavigate();
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
        const timeoutID = setTimeout(() => {
            startGame()
        }, 3000);
        const intervalID = setInterval(() => {
        didMantriAnswered();
        }, 2000);
        return () => {
        clearTimeout(timeoutID);
        clearInterval(intervalID)
        console.log('All intervals cleared');
        };
    },[])
    const didMantriAnswered = async()=>{
        try {
            const response = await callAPI(apiRoutes.didMantriAnswered,'GET')
            console.log(response)
            if(response.data.mantriAnswered)
            {
                navigate("/scores")
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            <div>GameScreen</div>
            <h2>{role}</h2>
            {role === "Raja" && 
                <div>
                    <p>Did Mantri answered correctly?</p>
                    <div>
                        <button onClick={handleButtonClicked}>Yes</button>
                        <button onClick={handleButtonClicked }>No</button>
                    </div>
                </div>
            }
        </>
    )
}
