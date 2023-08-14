import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes, HashRouter } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Catalog from "./Catalog/Catalog";
import Login from "./Login/Login";
import CatalogDetail from "./CatalogDetail/CatalogDetail";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CartProvider } from "./NavBar/CartContext";
import { ToastContainer } from 'react-toastify';
import { SearchProvider } from './Searching/SearchContext'; 
import 'react-toastify/dist/ReactToastify.css';
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <GoogleOAuthProvider clientId="893672817687-m5660ivrk22q2250m9lo6g8ftfde1irf.apps.googleusercontent.com">
    <React.StrictMode>
      <BrowserRouter basename="">
        <SearchProvider>
          <CartProvider>
            <App />
          </CartProvider>
          <ToastContainer />
        </SearchProvider>
      </BrowserRouter>
    </React.StrictMode>
  </GoogleOAuthProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
