
import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
function Registration() {


    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

  const emailChange = (e) => {
    setEmail(e.target.value);
  };
  const passChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(email);
    try {
      const url = 'http://127.0.0.1:8000/api/auth/register/';
      const response = await axios.post(url, {
        email,
        password
    });
      console.log(response.data);
      navigate('/login');
    } catch (error) {

      console.error(error.response?.data || error);
    }
  };

  return (
    <div>
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>

        

        <div>
          <label>Email:</label>
          <input
            name="email"
            type="email"
            value={email}
            onChange={emailChange}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={passChange}
            required
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Registration;
