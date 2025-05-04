import React from 'react'
import { useState, useEffect} from 'react';
import axios from   'axios';
import {useNavigate} from 'react-router-dom';
function Login({setToken}){


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        
        e.preventDefault();
        const url = 'http://127.0.0.1:8000/api/auth/login/';
        try{
            console.log("Sending email:", email, "password:", password);
            const response = await axios.post(url, {
                email,
                password
              });

            const token = response.data.access;
            localStorage.setItem('jwtToken', token);
            setToken(token);
            navigate('/dashboard'); 
            

        }catch(error){
                console.error("login error",error);
        }


    }
    return (
        <>
        <h1> LogIn</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <br />
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <br />
            <button type="submit">Login</button>
        </form>
        
        <button onClick={() => navigate('/register')}>If you don't have an account</button>

        
        </>

    );
}

export default Login;
