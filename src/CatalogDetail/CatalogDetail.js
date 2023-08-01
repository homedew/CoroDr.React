import { MDBContainer, MDBRow, MDBCol, MDBRipple, MDBIcon, MDBBtn } from "mdb-react-ui-kit";
import React, { useState, useEffect, useRef } from 'react';
import { get } from "../Catalog/apiHelpers";
import {useParams } from 'react-router-dom';
import ProductImageGallery from "../ImageGallery/imageGallery";
function CatalogDetail() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const fetchData = async () => {
    try {
      const apiUrl = 'https://catalog-api.azurewebsites.net/';
      const endPoint = `api/v1/Catalog/items/${id}`;
      debugger;
      // First API call
      const response = await get(apiUrl, endPoint); // Replace '/endpoint1' with your first API endpoint
      setData(response);
    } catch (error) {
      // Handle error if needed
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = (product) => {
    // Your logic to render each item goes here
    return (
      <MDBContainer className="mt-5">
      <MDBRow>
        <MDBCol md="6">
          <ProductImageGallery images={product.images} />
        </MDBCol>
        <MDBCol md="6">
          <h2 className="text-center mb-3">{product.name}</h2>
          <p className="text-center">Category: {product.category}</p>
          <p className="text-center">Price: {product.price}</p>
          <p className="text-center">Rating: {product.rating}</p>
          <p className="text-center">Shipping from: {product.shippingFrom}</p>
          <p>{product.description}</p>
          <MDBBtn color="primary">Add to Basket</MDBBtn>
          <MDBBtn color="success" className="ms-2">Checkout</MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>

    );
  };

  return (
    <MDBContainer>
      <MDBRow>
        {renderItem(data)}
      </MDBRow>
    </MDBContainer>
  );
}

export default CatalogDetail;