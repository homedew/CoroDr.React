import React, { useState, useEffect } from 'react';
import { get } from '../../Catalog/apiHelpers';

const CatalogApiComponent = () => {
  const [data, setData] = useState([]);
  const pageSize = 10; // Replace with the desired page size
  const pageIndex = 1; // Replace with the desired page index


  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = 'http://localhost:7137/';
        const endPoint = `api/v1/Catalog/items?pageSize=${pageSize}&pageIndex=${pageIndex}`;

        // First API call
        const response = await get(apiUrl,endPoint); // Replace '/endpoint1' with your first API endpoint
        setData(response);
      } catch (error) {
        // Handle error if needed
        console.error(error);
      }
    };

    fetchData();
  }, []);



  return (
    <div>
      <h2>Data from API:</h2>
      <ul>
      {data.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong> - {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CatalogApiComponent;
