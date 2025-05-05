
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
      const url = 'http://127.0.0.1:8000/api/auth/signup/';
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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">User Registration</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    name="email"
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={emailChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    name="password"
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={passChange}
                    required
                  />
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                </div>
              </form>

              <div className="mt-3 text-center">
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="btn btn-link"
                >
                  Already have an account? Login here.
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
