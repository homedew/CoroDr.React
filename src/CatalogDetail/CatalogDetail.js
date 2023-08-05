import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn, MDBAlert } from 'mdb-react-ui-kit';
import { get } from '../Catalog/apiHelpers';
import { useParams } from 'react-router-dom';
import ProductImageGallery from '../ImageGallery/imageGallery';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../NavBar/CartContext';

function CatalogDetail() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateCartCount } = useCartContext();
  const imageUrls = [
    'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/new/img(4).webp',
    'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/img%20(4).webp'
  ];
  const fetchData = async () => {
    try {
      const apiUrl = 'https://catalog-api.azurewebsites.net/';
      const endPoint = `api/v1/Catalog/items/${id}`;
      const response = await get(apiUrl, endPoint);
      setData(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddToBasket = () => {
    const existingProducts = JSON.parse(localStorage.getItem('products')) || [];
    existingProducts.push(data);
    updateCartCount(existingProducts.length);
    localStorage.setItem('products', JSON.stringify(existingProducts));
    navigate('/');
  };

  const handleCheckout = () => {
    const existingProducts = JSON.parse(localStorage.getItem('products')) || [];
    existingProducts.push(data);
    updateCartCount(existingProducts.length);
    localStorage.setItem('products', JSON.stringify(existingProducts));
    navigate('/checkout');
  };

  const renderItem = (product) => {
    return (
      <MDBContainer className="my-5">
        <MDBRow>
          <MDBCol md="6">
            <ProductImageGallery images={imageUrls} />
          </MDBCol>
          <MDBCol md="6" className="d-flex flex-column">
            <h2 className="mb-3">{product.name}</h2>
            <p>Category: {product.category}</p>
            <p>Price: {product.price}</p>
            <p>Rating: {product.rating}</p>
            <p>Shipping from: {product.shippingFrom}</p>
            <p className="mb-4">{product.description}</p>
            <div className="d-grid gap-2">
              <MDBBtn color="primary" onClick={handleAddToBasket}>Add to Basket</MDBBtn>
              <MDBBtn color="success" onClick={handleCheckout}>Checkout</MDBBtn>
            </div>
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
