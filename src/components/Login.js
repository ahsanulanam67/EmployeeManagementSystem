import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [refresh,setRefresh] = useState(null);

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const url = "http://127.0.0.1:8000/api/auth/login/";
    try {
      console.log("Sending email:", email, "password:", password);
      const response = await axios.post(url, {
        email,
        password,
      });

      const token = response.data.access;
      localStorage.setItem("jwtToken", token);
      setToken(token);
      setRefresh(token);
    
    } catch (error) {
      console.error("login error", error);
    }
};

useEffect(() => {
    if (refresh) {
      navigate("/dashboard");
    }
  }, [refresh, navigate]);
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Login</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Log In
                  </button>
                </div>
              </form>

              <div className="mt-3 text-center">
                <button
                  className="btn btn-link"
                  onClick={()=>navigate('/register')}
                >
                  Don't have an account? Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
