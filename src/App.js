import React, { useState } from 'react';


import Catalog from './Catalog/Catalog';
import Footer from './Footer/Footer';
import NavBar from './NavBar/NavBar';
import './App.css';
import { Route, Routes } from "react-router-dom";
import CatalogDetail from './CatalogDetail/CatalogDetail';
import Login from './Login/Login';
import Checkout from './Checkout/Checkout';
import Payment from './Payment/Payment';
export default function App() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (results) => {
    setSearchResults(results);
  };
  return (
    <div>
      
      <NavBar onSearch={handleSearch}></NavBar>
      <Routes>
        <Route path="/" element={<Catalog searchResults={searchResults} />} />
        <Route path="/details/:id" element={<CatalogDetail></CatalogDetail>} />
        <Route path="/signin" element={<Login></Login>} />
        <Route path="/checkout" element={<Checkout></Checkout>} />
        <Route path='/payment' element={<Payment></Payment>} />
      </Routes>
      <Footer></Footer>
    </div>
  );
}
