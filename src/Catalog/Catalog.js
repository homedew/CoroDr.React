import React, { useState, useEffect, useRef } from 'react';
import { get } from './apiHelpers';
import CatalogItem from './CatalogItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBRipple,
  MDBCardImage,
  MDBCardBody,
  MDBCard,
} from 'mdb-react-ui-kit';

function Catalog({ searchResults }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 6; // Number of items to fetch per page
  const catalogRef = useRef();

  const navigate = useNavigate();

  const handleDetailsClick = (id) => {
    navigate(`/details/${id}`);
  };

  useEffect(() => {
    const catalogHeight = catalogRef.current?.clientHeight;
    if (catalogHeight) {
      catalogRef.current.style.minHeight = `calc(100vh - ${catalogHeight}px)`;
    }
  }, []);

  const fetchData = async () => {
    try {
      const apiUrl = 'https://catalog-api.azurewebsites.net/';
      const endPoint = `api/v1/Catalog/items?pageSize=${pageSize}&pageIndex=${page}`;

      const response = await get(apiUrl, endPoint);
      setData((prevData) => [...prevData, ...response.data]);
      if (response.data.length === 0) {
        setPage(0);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const renderItem = (items) => {
    return (
      <div ref={catalogRef} className="Catalog">
        <InfiniteScroll
          dataLength={items.length}
          next={() => setPage((prevPage) => prevPage + 1)}
          hasMore={page !== 0}
          loader={<div></div>}
        >
          <section style={{ backgroundColor: '#eee' }}>
            <div className="row justify-content-center mb-3">
              <MDBRow>
                {items.map((product) => (
                  <MDBCol
                    onClick={() => handleDetailsClick(product.id)}
                    key={product.id}
                    md="4"
                    className="mb-4"
                  >
                    <MDBCard>
                      <MDBRipple
                        rippleColor="light"
                        rippleTag="div"
                        className="bg-image rounded hover-zoom"
                      >
                        <MDBCardImage
                          src={
                            product.id % 2 === 0
                              ? 'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/new/img(4).webp'
                              : product.id % 3 === 0
                              ? 'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/img%20(4).webp'
                              : product.id % 5 === 0
                              ? 'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/img%20(4).webp'
                              : 'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/img%20(4).webp'
                          }
                          fluid
                          className="w-100"
                        />
                        <a>
                          <div className="mask">
                            <div className="d-flex justify-content-start align-items-end h-100">
                              <h5>
                                {product.id / 2 === 0 && (
                                  <span className="badge bg-primary ms-2">New</span>
                                )}
                                {product.id / 3 === 0 && (
                                  <span className="badge bg-success ms-2">Eco</span>
                                )}
                                {product.id / 5 === 0 && (
                                  <span className="badge bg-danger ms-2">-10%</span>
                                )}
                              </h5>
                            </div>
                          </div>
                          <div className="hover-overlay">
                            <div
                              className="mask"
                              style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}
                            ></div>
                          </div>
                        </a>
                      </MDBRipple>
                      <MDBCardBody>
                        <a href="" className="text-reset">
                          <h5 className="card-title mb-3">{product.name}</h5>
                        </a>
                        <a href="" className="text-reset">
                          <p>Shoes</p>
                        </a>
                        <h6 className="mb-3">${product.price}</h6>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                ))}
              </MDBRow>
            </div>
          </section>
        </InfiniteScroll>
      </div>
    );
  };

  return (
    <MDBContainer>
      <MDBRow>{searchResults.length > 0 ? renderItem(searchResults) : renderItem(data)}</MDBRow>
    </MDBContainer>
  );
}

export default Catalog;
