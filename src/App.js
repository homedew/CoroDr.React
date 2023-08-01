import React, { useState } from 'react';


import Catalog from './Catalog/Catalog';
import Footer from './Footer/Footer';
import NavBar from './NavBar/NavBar';
import './App.css';

export default function App() {
  return (
    <div>
      <NavBar></NavBar>
      <Catalog></Catalog>
      <Footer></Footer>
    </div>
  );
}
