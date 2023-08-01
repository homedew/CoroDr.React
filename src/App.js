import React, { useState } from 'react';


import Catalog from './Catalog/Catalog';
import Footer from './Footer/Footer';
import NavBar from './NavBar/NavBar';
import './App.css';
import {  Route, Routes } from "react-router-dom";
import CatalogDetail from './CatalogDetail/CatalogDetail';
export default function App() {
  return (
    <div>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/details/:id" element={<CatalogDetail></CatalogDetail>} />
      </Routes>
      <Footer></Footer>
    </div>
  );
}
