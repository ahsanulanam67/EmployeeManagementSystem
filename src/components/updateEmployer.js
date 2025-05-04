import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function UpdateEmployer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('jwtToken');

  const [formData, setFormData] = useState({
    company_name: '',
    contact_person_name: '',
    email: '',
    phone_number: '',
    address: '',
  });

  useEffect(() => {
    fetchEmployer();
  }, []);

  const fetchEmployer = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/employers/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/employers/${id}/`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Update Employer</h2>
      <form onSubmit={handleUpdate}>
        <input type="text" name="company_name" value={formData.company_name} onChange={handleChange} required />
        <input type="text" name="contact_person_name" value={formData.contact_person_name} onChange={handleChange} required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} required />
        <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        <button type="submit">Update Employer</button>
      </form>
    </div>
  );
}

export default UpdateEmployer;
