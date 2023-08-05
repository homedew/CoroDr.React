import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBTable, MDBTableBody, MDBTableHead, MDBBtn } from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useCartContext } from '../NavBar/CartContext';

const CheckoutPage = () => {
  const [products, setProducts] = useState([]);
  const { updateCartCount } = useCartContext();

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, []);

  const saveProductsToLocalStorage = (products) => {
    updateCartCount(products.length);
    localStorage.setItem('products', JSON.stringify(products));
  };

  const getTotal = () => {
    var total=  products.reduce((total, product) => total + product.price, 0);
    return total.toFixed(2);
  };

  const handleDelete = (productId) => {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
    saveProductsToLocalStorage(updatedProducts);
  };

  return (
    <MDBContainer className="mt-5">
      <h2>Checkout Page</h2>
      <MDBTable>
        <MDBTableHead>
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Total</th>
            <th></th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {products.map(product => (
            <tr key={product.id}>
              <td>
                <img
                  src={
                    product.id % 2 === 0
                      ? "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/new/img(4).webp"
                      : product.id % 3 === 0
                        ? "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/img%20(4).webp"
                        : product.id % 5 === 0 ? "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/img%20(4).webp"
                          : "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/img%20(4).webp"}
                  alt={product.name}
                  width="50"
                />
              </td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <td>${product.price}</td>
              <td><MDBBtn color="danger" onClick={() => handleDelete(product.id)}>Delete</MDBBtn></td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
      <h4>Total: ${getTotal()}</h4>
      <MDBBtn href='/payment' color="primary">
        Continue Payment <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
      </MDBBtn>
    </MDBContainer>
  );
};

export default CheckoutPage;
