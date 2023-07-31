import React, { useState, useEffect } from 'react';
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBContainer,
  MDBCollapse,
} from 'mdb-react-ui-kit';

function NavBar() {
  return (
    <MDBNavbar expand='lg' light bgColor='white'>
    <MDBContainer fluid>
      <MDBCollapse >
        <MDBNavbarNav right className='mb-2 mb-lg-0'>
          <MDBNavbarItem active>
            <MDBNavbarLink aria-current='page' href='#'>
              Home
            </MDBNavbarLink>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <MDBNavbarLink href='#'>Features</MDBNavbarLink>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <MDBNavbarLink href='#'>Pricing</MDBNavbarLink>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <MDBNavbarLink href='#'>About</MDBNavbarLink>
          </MDBNavbarItem>
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBContainer>
  </MDBNavbar>
  )
}

export default NavBar;