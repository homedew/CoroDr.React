import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBIcon, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import './Login.css';
import SocialLogin from 'react-social-login';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { googleLogout, useGoogleLogin, hasGrantedAnyScopeGoogle } from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { post, get } from '../Catalog/apiHelpers';
import { FacebookLoginClient } from '@greatsumini/react-facebook-login';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
  const appId = '646705274073815';
  useEffect(() => {
    debugger;
    FacebookLoginClient.init({ appId });
  }, []);

  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginByFacebook = (response) => {
    debugger;
    FacebookLoginClient.login(console.log, {
      scope: 'public_profile, email',
    });

  };

  // const [user, setUser] = useState([]);
  // const [profile, setProfile] = useState([]);


  const handleSocialSignIn = async (userInfo, providerId) => {
    try {
      debugger;
      const apiUrl = 'https://identity-coro-api.azurewebsites.net/';
      const endPoint = `api/Identity/loginbyprovider`;

      const request = {
        username: userInfo.email,
        email: userInfo.email,
        password: '',
        name: userInfo.name,
        providerId: providerId,
      };

      const response = await post(apiUrl, endPoint, request);

      if (response.token != null) {
        // Store user information in local storage
        request.token = response.token;
        localStorage.setItem('user', JSON.stringify(request));

        // Navigate back to home page or wherever you want
        navigate('/');
      } else {
        // Handle login failure
        toast.error('Cant login', {
          position: 'top-right',
          autoClose: 5000, // Adjust as needed
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      toast.error('Time out', {
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

  const getUserInformationByGoogle = (user) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
      headers: {
        Authorization: `Bearer ${user.access_token}`,
        Accept: 'application/json'
      }
    })
      .then((res) => {
        debugger;
        handleSocialSignIn(res.data, "1")
      })
      .catch((err) => console.log(err));

  }

  const loginByGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => getUserInformationByGoogle(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  const login = async () => {
    try {
      debugger;
      const apiUrl = 'https://identity-coro-api.azurewebsites.net/';
      const endPoint = `api/Identity/login`;
      var request =
      {
        username: username,
        password: password,
        providerId: "",
        name: username
      }
      const response = await post(apiUrl, endPoint, request);
      request.token = response;
      localStorage.setItem('user', JSON.stringify(request));
      toast.success('Login successfully', {
        position: 'top-right',
        autoClose: 5000, // Adjust as needed
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      navigate('/');
      debugger;
    } catch (error) {
      toast.error('Not Found', {
        position: 'top-right',
        autoClose: 5000, // Adjust as needed
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };


  const errorMessage = (error) => {
    console.log(error);
  };

  const handleSignInGoogle = (response) => {
    console.log(response);
    // Handle Google sign-in response here
  };

  const handleSignInFacebook = (response) => {
    console.log(response);
    // Handle Facebook sign-in response here
  };

  const handleSignInEmail = (e) => {
    login();
  };

  const handleRegister = (e) => {

    navigate('/register');
  };

  const loadGoogleAPI = () => {
    // ... Load Google API logic ...
  };

  return (
    <MDBContainer className="login-container">
      <MDBRow className="justify-content-center">
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <MDBInput
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <MDBInput
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <MDBBtn color="primary" onClick={handleSignInEmail}>
                Sign In
              </MDBBtn>
              <div className="mt-3">
                <p className="text-center">Or</p>
                <div className="social-buttons-container">
                  <button onClick={() => loginByGoogle()}>Login with Google</button>
                  <FacebookLogin
                    appId="1088597931155576"
                    onSuccess={(response) => {
                      debugger;
                      handleSocialSignIn(response, "2");
                    }}
                    onFail={(error) => {
                      console.log('Login Failed!', error);
                    }}
                    onProfileSuccess={(response) => {
                      console.log('Get Profile Success!', response);
                    }}
                  />
                </div>
              </div>
              <p className="mt-3">
                Don't have an account?{' '}
                <a href="#" onClick={handleRegister}>
                  Register here
                </a>
              </p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
