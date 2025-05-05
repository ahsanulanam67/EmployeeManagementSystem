import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Logout({ setToken }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const token = localStorage.getItem('jwtToken');
        const url = 'http://127.0.0.1:8000/api/auth/logout/';

        try {
           
            await axios.post(
                'http://127.0.0.1:8000/api/auth/logout/',
                {},
                {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                }
              );
            localStorage.removeItem('jwtToken');
            setToken(null);

            navigate('/login'); 
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <button className="btn btn-danger me-2" onClick={handleLogout}>Logout</button>
    );
}

export default Logout;
