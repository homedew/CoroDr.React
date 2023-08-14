import React, { useState } from 'react';


import Catalog from './Catalog/Catalog';
import Footer from './Footer/Footer';
import NavBar from './NavBar/NavBar';
import './App.css';
import { Route, Routes, HashRouter } from "react-router-dom";
import CatalogDetail from './CatalogDetail/CatalogDetail';
import Login from './Login/Login';
import Checkout from './Checkout/Checkout';
import Payment from './Payment/Payment';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Register from './Registration/Registration';
import OrderSuccess from './OrderSuccess/OrderSuccess';
export default function App() {
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = (results) => {
    setSearchResults();
  };
  return (
    <div>
      <GoogleOAuthProvider clientId="893672817687-m5660ivrk22q2250m9lo6g8ftfde1irf.apps.googleusercontent.com"></GoogleOAuthProvider>
      <NavBar onSearch={handleSearch}></NavBar>
      <Routes >
        <Route path="/" element={<Catalog searchResults={searchResults} />} />
        <Route path="/details/:id" element={<CatalogDetail></CatalogDetail>} />
        <Route path="/signin" element={<Login></Login>} />
        <Route path="/checkout" element={<Checkout></Checkout>} />
        <Route path='/payment' element={<Payment></Payment>} />
        <Route path='/login' element={<Login></Login>} />
        <Route path='/register' element={<Register></Register>} />
        <Route path="/success" element={<OrderSuccess />} />
      </Routes>
      <Footer></Footer>
    </div>
  );
}
