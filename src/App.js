
import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/dashboard';
import Registration from './components/registration';
import UpdateEmployer from './components/updateEmployer';
import AddEmployer from './components/addEmployer';
import Logout from './components/logout';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('jwtToken'));

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login setToken={setToken} />,
    },
    {
      path: "/login",
      element: <Login setToken={setToken} />,  
    },
    {
      path: "/dashboard",
      element: token ? <Dashboard setToken={setToken} /> : <Login setToken={setToken} /> ,
    },
    {
      path: "/register",
      element: <Registration />,
    },
    {
      path: "/updateEmployer/:id",
      element: <UpdateEmployer />
    },
    {
      path: "/addEmployer",
      element: <AddEmployer />
    }
  ]);

  return <RouterProvider router={router} />;
};

export default App;
