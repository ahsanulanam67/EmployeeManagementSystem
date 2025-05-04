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
    <div>
      <h2>Add Employer</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="company_name" placeholder="Company Name" value={formData.company_name} onChange={handleChange} required />
        <input type="text" name="contact_person_name" placeholder="Contact Person Name" value={formData.contact_person_name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="phone_number" placeholder="Phone Number" value={formData.phone_number} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <button type="submit">Create Employer</button>
      </form>
    </div>
  );
}

export default AddEmployer;
