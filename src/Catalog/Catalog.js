import { MDBContainer, MDBRow, MDBCol, MDBRipple, MDBIcon } from "mdb-react-ui-kit";
import React, { useState, useEffect, useRef } from 'react';
import { get } from './apiHelpers';
import CatalogItem from './CatalogItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import {useNavigate} from 'react-router-dom';
function Catalog() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 5; // Number of items to fetch per page
  const catalogRef = useRef();
 
  const navigate = useNavigate();

  const handleDetailsClick = (id) => {
    // 👇️ navigate programmatically
    navigate(`/details/${id}`);
  };

  useEffect(() => {
    // Access the height of the Catalog component using the ref
    const catalogHeight = catalogRef.current?.clientHeight;
    // Set the min-height of the Catalog component to ensure it takes up the available space
    if (catalogHeight) {
      catalogRef.current.style.minHeight = `calc(100vh - ${catalogHeight}px)`;
    }
  }, []);

  const fetchData = async () => {
    try {
      const apiUrl = 'https://catalog-api.azurewebsites.net/';
      const endPoint = `api/v1/Catalog/items?pageSize=${pageSize}&pageIndex=${page}`;

      // First API call
      const response = await get(apiUrl, endPoint); // Replace '/endpoint1' with your first API endpoint
      setData((prevData) => [...prevData, ...response.data]);
      debugger;
      if (response.data.length === 0) {
        setPage(0); // Set the page to 0 to disable further loading
      }
      // this.setState({
      //   items: this.state.items.concat(response.data)
      // });
      // debugger;
      // setData(response.data);
    } catch (error) {
      // Handle error if needed
      console.error(error);
    }
  };


  useEffect(() => {
    fetchData();
  }, [page]);
  const renderItem = (response) => {
    // Your logic to render each item goes here
    return (
      <div ref={catalogRef} className="Catalog">
        <InfiniteScroll
          dataLength={data.length}
          next={() => setPage((prevPage) => prevPage + 1)}
          hasMore={page !== 0} // Set hasMore to false when there's no more data to load
          loader={<div></div>}
        >

          <section style={{ backgroundColor: '#eee' }}>
            <div className="container py-5">
              {data.map((product) => (
                <div className="row justify-content-center mb-3" key={product.id}>
                  <div className="col-md-12 col-xl-10">
                    <div className="card shadow-0 border rounded-3">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                            <div className="bg-image hover-zoom ripple rounded ripple-surface">
                              <img src={`https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/img%20(${product.id}).webp`}
                                className="w-100" alt={`Product ${product.id}`} />
                              <a href="#!">
                                <div className="hover-overlay">
                                  <div className="mask" style={{ backgroundColor: 'rgba(253, 253, 253, 0.15)' }}></div>
                                </div>
                              </a>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-6 col-xl-6">
                            <h5>{product.name}</h5>
                            <div className="d-flex flex-row">
                              <div className="text-danger mb-1 me-2">
                                {Array.from({ length: product.rating }).map((_, index) => (
                                  <i className="fa fa-star" key={index}></i>
                                ))}
                              </div>
                              <span>{product.rating}</span>
                            </div>
                            <div className="mt-1 mb-0 text-muted small">
                              <span>100% cotton</span>
                              <span className="text-primary"> • </span>
                              <span>Light weight</span>
                              <span className="text-primary"> • </span>
                              <span>Best finish<br /></span>
                            </div>
                            <div className="mb-2 text-muted small">
                              <span>Unique design</span>
                              <span className="text-primary"> • </span>
                              <span>For men</span>
                              <span className="text-primary"> • </span>
                              <span>Casual<br /></span>
                            </div>
                            <p className="text-truncate mb-4 mb-md-0">
                              {product.description}
                            </p>
                          </div>
                          <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                            <div className="d-flex flex-row align-items-center mb-1">
                              <h4 className="mb-1 me-1">${product.price}</h4>
                              <span className="text-danger"><s>${product.oldPrice}</s></span>
                            </div>
                            {product.freeShipping && <h6 className="text-success">Free shipping</h6>}
                            <div className="d-flex flex-column mt-4">
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={() => handleDetailsClick(product.id)}>
                                Details
                              </button>
                              <button className="btn btn-outline-primary btn-sm mt-2" type="button">
                                Add to wishlist
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </InfiniteScroll>
      </div>

    );
  };

  return (
    <MDBContainer>
      <MDBRow>
        {renderItem()}
      </MDBRow>
    </MDBContainer>
  );
}

export default Catalog;