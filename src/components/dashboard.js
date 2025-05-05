import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Logout from './logout';


function Dashboard({ setToken }) {

  const [employers, setEmployers] = useState([]);
  

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


  const handleEdit = (id)=>{
    navigate(`/updateEmployer/${id}`);
  }
  const addEmployee=()=>{
    navigate('/addEmployer');
  }
  return (
    <div className="container mt-5">
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h2>Your Employers</h2>
      <div>
        <Logout setToken={setToken}/>
        <button className="btn btn-primary" onClick={addEmployee}>Add New Employer</button>
      </div>
    </div>

    <div className="row">
      {employers.map((emp) => (
        <div className="col-md-6 col-lg-4 mb-4" key={emp.id}>
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">{emp.company_name}</h5>
              <p className="card-text"><strong>Contact_person_name:</strong> {emp.contact_person_name}</p>
              <p className="card-text"><strong>Email:</strong> {emp.email}</p>
              <p className="card-text"><strong>Phone:</strong> {emp.phone_number}</p>
              <p className="card-text"><strong>Address:</strong> {emp.address}</p>
              <p className="card-text"><small className="text-muted">Created at: {emp.created_at}</small></p>
            </div>
            <div className="card-footer d-flex justify-content-between">
              <button className="btn btn-outline-secondary btn-sm" onClick={() => handleEdit(emp.id)}>Edit</button>
              <button className="btn btn-outline-danger btn-sm" onClick={() => deleteEmployee(emp.id)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
}

export default Dashboard;
