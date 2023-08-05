import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBIcon, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import './Login.css';
import SocialLogin from 'react-social-login';

const Login = () => {
  const responseMessage = (response) => {
    console.log(response);
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
    e.preventDefault();
    // Implement email sign-in logic here
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Implement email registration logic here
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
              <form onSubmit={handleSignInEmail}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <MDBInput type="email" id="email" name="email" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <MDBInput type="password" id="password" name="password" required />
                </div>
                <MDBBtn color="primary" type="submit">
                  Sign In
                </MDBBtn>
              </form>
              <div className="mt-3">
                <p className="text-center">Or</p>
                <div className="social-buttons-container">
                  {/* Use SocialButton for Google sign-in */}
                  <SocialLogin
                    provider="google"
                    appId="YOUR_GOOGLE_CLIENT_ID"
                    onLoginSuccess={handleSignInGoogle}
                    onLoginFailure={errorMessage}
                    style={{ width: '100%' }}
                  >
                    <span><MDBIcon fab icon="google" /> Sign in with Google</span>
                  </SocialLogin>
                  {/* Use SocialButton for Facebook sign-in */}
                  <SocialLogin
                    provider="facebook"
                    appId="YOUR_FACEBOOK_APP_ID"
                    onLoginSuccess={handleSignInFacebook}
                    onLoginFailure={errorMessage}
                    style={{ width: '100%' }}
                  >
                    <span><MDBIcon fab icon="facebook" /> Sign in with Facebook</span>
                  </SocialLogin>
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
