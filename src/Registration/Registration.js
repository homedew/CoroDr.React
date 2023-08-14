import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { post } from '../Catalog/apiHelpers';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [addressName, setAddressName] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = 'https://identity-coro-api.azurewebsites.net/';
      const endPoint = `api/Identity/register`;

      const requestData = {
        username: username,
        password: password,
        addressName: addressName
      };

      const response = await post(apiUrl, endPoint, requestData);
      if (response == "User registered successfully!") {
        // Registration successful, navigate to login page
        debugger;
        toast.success('User registered successfully', {
            position: 'top-right',
            autoClose: 5000, // Adjust as needed
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        navigate('/login');
      } else {
        
      }
    } catch (error) {
        debugger;
        toast.error('User already registered', {
            position: 'top-right',
            autoClose: 5000, // Adjust as needed
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
      // Handle network errors or other issues
    }
  };

  return (
    <MDBContainer className="register-container">
      <MDBRow className="justify-content-center">
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody>
              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <MDBInput type="text" id="username" name="username" required value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <MDBInput type="password" id="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="addressName" className="form-label">
                    Address Name
                  </label>
                  <MDBInput type="text" id="addressName" name="addressName" required value={addressName} onChange={(e) => setAddressName(e.target.value)} />
                </div>
                <MDBBtn color="primary" type="submit">
                  Register
                </MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Register;
