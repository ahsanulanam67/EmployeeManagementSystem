import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function Dashboard({ setAuth }) {

  const [employers, setEmployers] = useState([]);
  
  const [formData, setFormData] = useState({
    company_name: '',
    contact_person_name: '',
    email: '',
    phone_number: '',
    address: '',
  });

  const token = localStorage.getItem('jwtToken');
  const navigate = useNavigate();
  useEffect(() => {

      fetchEmployers();
    }, []);

    const fetchEmployers = async () => {
    //   console.log({token} + "saboj")
      try {
        // console.log("dashboard token:")
        console.log(token);
        const res = await axios.get('http://127.0.0.1:8000/api/employers/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmployers(res.data); // assuming res.data is an array
        console.log(res.data);
      } catch (err) {
        // setError('Could not fetch employer data');
        console.error(err);
      }
    };

    

    
      const deleteEmployee = async (id) => {
        try {
          await axios.delete(`http://127.0.0.1:8000/api/employers/${id}/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          fetchEmployers(); // Refresh list
        } catch (err) {
          console.error(err);
        }
      }; 


  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    setAuth(false);
  };

  const handleEdit = (id)=>{
    navigate(`/updateEmployer/${id}`);
  }
  const addEmployee=()=>{
    navigate('/addEmployer');
  }
  return (
    <div>
      <h2>Your Employers</h2>
      {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}

      <button onClick={()=>addEmployee()} > Add New Employer</button>

      <ul>
        {employers.map(emp => (
          <div className="employer-card" key={emp.id}>
          <h3>{emp.company_name}</h3>
          <p><strong>Contact_Person_name:</strong> {emp.contact_person_name}</p>
          <p><strong>Email:</strong> {emp.email}</p>
          <p><strong>Phone:</strong> {emp.phone_number}</p>
          <p><strong>Address:</strong> {emp.address}</p>
          <p><small>Created at: {emp.created_at}</small></p>
          <button className="edit-btn" onClick={() => handleEdit(emp.id)}>Edit</button>
          <button className="delete-btn" onClick={() => deleteEmployee(emp.id)}>Delete</button>
        </div>
        ))}
      </ul>
      {/* <button onClick={handleLogout}>Logout</button> */}
    </div>
  );
}

export default Dashboard;
