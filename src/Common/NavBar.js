// Navbar.js
import React from 'react';
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
const CoroDrNavbar = () => {

  return (
    <MDBNavbar expand='lg' light bgColor='light'>

      <MDBCollapse navbar id='navbarExample01'>
        <MDBNavbarNav right className='mb-2 mb-lg-0'>
          <MDBNavbarItem>
            <MDBNavbarLink href='#'>Products</MDBNavbarLink>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <MDBNavbarLink href='#'>Services</MDBNavbarLink>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <MDBNavbarLink href='#'>Support</MDBNavbarLink>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <MDBNavbarLink href='#'>Order</MDBNavbarLink>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <Link to='/Login'>
              <MDBNavbarLink>Account</MDBNavbarLink>
            </Link>
          </MDBNavbarItem>
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
  );
};

export default CoroDrNavbar;
