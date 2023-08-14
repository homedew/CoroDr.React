import React from 'react';
import { Link } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

const OrderSuccess = () => {
  return (
    <MDBContainer className="py-5 text-center">
      <MDBRow>
        <MDBCol>
          <MDBIcon icon="check-circle" size="4x" className="text-success mb-3" />
          <h2>Congratulations! Your order is successful.</h2>
          <p>Thank you for your purchase. Let's go back to the home page to buy more.</p>
          <Link to="/" className="btn btn-primary">
            Go Back to Home
          </Link>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default OrderSuccess;
