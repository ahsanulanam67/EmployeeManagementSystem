import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function AddEmployer() {
  const navigate = useNavigate();
  const token = localStorage.getItem('jwtToken');

  const [formData, setFormData] = useState({
    company_name: '',
    contact_person_name: '',
    email: '',
    phone_number: '',
    address: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
        console.log(formData);
      await axios.post('http://127.0.0.1:8000/api/employers/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFormData({
        company_name: '',
        contact_person_name: '',
        email: '',
        phone_number: '',
        address: '',
      });
      navigate('/dashboard');
      
    } catch (err) {
    //   console.error(err);
    //   setError('Failed to create employer');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Add Employer</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Company Name</label>
                  <input
                    type="text"
                    name="company_name"
                    className="form-control"
                    value={formData.company_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Contact Person Name</label>
                  <input
                    type="text"
                    name="contact_person_name"
                    className="form-control"
                    value={formData.contact_person_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    name="phone_number"
                    className="form-control"
                    value={formData.phone_number}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    name="address"
                    className="form-control"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Create Employer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEmployer;
