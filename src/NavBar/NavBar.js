import React, { useState, useEffect } from 'react';
import './NavBar.css';
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBBtn,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBContainer,
  MDBIcon,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdown,
  MDBInputGroup,
  MDBBadge,
  MDBCollapse
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { useCartContext } from "./CartContext";
import axios from 'axios'; // Import Axios library
import { useNavigate } from 'react-router-dom';
import { useSearchContext } from '../Searching/SearchContext';
const CoroDrNavbar = ({ onSearch }) => {
  const [showNav, setShowNav] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount } = useCartContext();
  const userLoggedIn = localStorage.getItem('user') !== null; // Check if user is logged in
  const userName = userLoggedIn ? JSON.parse(localStorage.getItem('user')).name : ''; // Get username from localStorage
  const navigate = useNavigate();
  const { searchResults, setSearchResults } = useSearchContext();
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    // setCartCount(storedProducts.length);
  }, []);

  const toggleNavbar = () => {
    setShowNav(!showNav);
  };

  const handleInputChange = (e) => {
    const newSearchQuery = e.target.value;
    setSearchQuery(newSearchQuery); // Update the search query
    if (newSearchQuery === '') {
      setSearchResults([]); // Clear search results if input is empty
    } else {
      handleSearch(newSearchQuery); // Call API for non-empty input
    }
  };

  const handleSignOut = () => {
    // Clear user info from localStorage and navigate to the sign-in page
    localStorage.removeItem('user');
    navigate('/login');
  };


  const handleSearch = async () => {
    try {
      const apiUrl = 'https://catalog-api.azurewebsites.net/';
      const pageIndex = 1; // You can set pageIndex as needed
      const pageSize = 10; // You can set pageSize as needed
      const endPoint = `api/v1/catalog/items/withname/${searchQuery}?pageIndex=${pageIndex}&pageSize=${pageSize}`;
      const response = await axios.get(apiUrl + endPoint);
      debugger;
      setSearchResults(response.data.data);
      onSearch(response.data.data);
      // Process the response as needed
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <div className="container py-5">
        <MDBNavbar expand='lg' light bgColor='white' className='navbar navbar-centered'>
          <MDBContainer fluid>
            <MDBNavbarBrand href='/'>CoroDR</MDBNavbarBrand>
            <MDBNavbarToggler onClick={toggleNavbar} />
            <MDBCollapse navbar show={showNav}>
              <MDBNavbarBrand> </MDBNavbarBrand>
              <MDBNavbarNav right className='mb-2 mb-lg-0'>
                <MDBNavbarItem>
                  <MDBNavbarLink href='/'>
                    <MDBIcon icon='home' className='me-1' />
                    Home
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href='/'>
                    <i className="fas fa-map-marker-alt"></i>
                    Deliver to Vietnam
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBInputGroup className='md-form mr-auto m-0'>
                    <input
                      className='form-control'
                      type='text'
                      placeholder='Search'
                      value={searchQuery}
                      style={{ width: '600px' }}
                      onChange={handleInputChange}
                    />
                    <MDBBtn onClick={handleSearch}>Search</MDBBtn>
                  </MDBInputGroup>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  {userLoggedIn ? (
                    <MDBDropdown>
                      <MDBDropdownToggle tag='a' className='nav-link'>
                        <MDBIcon icon='user' className='me-1' />
                        {userName}
                      </MDBDropdownToggle>
                      <MDBDropdownMenu className='dropdown-menu'>
                        <MDBDropdownItem href='/profile' className='dropdown-item'>
                          Profile
                        </MDBDropdownItem>
                        <div className='dropdown-divider'></div>
                        <MDBDropdownItem onClick={() => navigate('/checkout')} className='dropdown-item'>
                          Orders
                        </MDBDropdownItem>
                        <div className='dropdown-divider'></div>
                        <MDBDropdownItem onClick={handleSignOut} className='dropdown-item'>
                          Sign Out
                        </MDBDropdownItem>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  ) : (
                    <MDBNavbarLink tag={Link} to='/signin'>
                      <MDBIcon icon='user' className='me-1' />
                      Sign In
                    </MDBNavbarLink>
                  )}
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href='/checkout'>
                    <MDBIcon
                      fas icon='shopping-cart' className='me-1' />
                    Cart
                    <span>
                      <MDBBadge pill color='danger'>{cartCount}</MDBBadge>
                    </span>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
      </div>
    </section>

  );
};

export default CoroDrNavbar;
