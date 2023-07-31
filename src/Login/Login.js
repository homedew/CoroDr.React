import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn } from 'mdb-react-ui-kit';

const Login = () => {
  return (
      <MDBRow className="justify-content-center">
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody>
              <form>
                <p className="h4 text-center mb-4">Login</p>
                <div className="grey-text">
                  <MDBInput type="email" label="Your email" icon="envelope" />
                  <MDBInput type="password" label="Your password" icon="lock" />
                </div>
                <div className="text-center">
                  <MDBBtn color="primary">Login</MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
  );
};

export default Login;
