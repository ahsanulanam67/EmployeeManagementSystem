
import './App.css';
import Login from './components/Login';
import Registration from './components/registration'
import Dashboard from './components/dashboard'

import {useState,useEffect} from 'react';
function App() {

  const [token,setToken] = useState(localStorage.getItem('jwtToken'));

  useEffect(()=>{
    if(token){

      localStorage.setItem('jwtToken',token);

    }
    else{
      localStorage.removeItem('jwtToken');
    }

  },[token]);
  return (
    <>
    <Registration/>
    <Login setToken={setToken} />
    <Dashboard/>
    </>

  );
}

export default App;
