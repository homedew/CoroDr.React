import { MDBContainer, MDBRow, MDBCol, MDBRipple, MDBIcon } from "mdb-react-ui-kit";
import CatalogApiComponent from "../Services/Catalog/catalog.api";
import React, { useState, useEffect } from 'react';
import { get } from './apiHelpers';
import CatalogItem from './CatalogItem';
function Catalog() {
  const [data, setData] = useState([]);
  const pageSize = 12; // Replace with the desired page size
  const pageIndex = 1; // Replace with the desired page index
  const handleScroll = () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (scrollHeight - scrollTop === clientHeight) {
      // Load more products here if needed
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = 'https://localhost:7073/';
        const endPoint = `api/v1/Catalog/items?pageSize=${pageSize}&pageIndex=${pageIndex}`;

        // First API call
        const response = await get(apiUrl,endPoint); // Replace '/endpoint1' with your first API endpoint
        debugger;
        setData(response.data);
      } catch (error) {
        // Handle error if needed
        console.error(error);
      }
    };

    fetchData();
  }, []);


  return (
    <MDBContainer>
      <MDBRow>
        {data.map((item) => (
          <MDBCol md="4" key={item.id}>
            <CatalogItem data = {item} />
          </MDBCol>
        ))}
      </MDBRow>
    </MDBContainer>
  );
}

export default Catalog;