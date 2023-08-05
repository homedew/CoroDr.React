import React, { useState } from 'react';

const ProductImageGallery = ({ images }) => {
  const dummyImageUrls = [
    'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/new/img(4).webp',
    'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/img%20(4).webp',
    'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/new/img(2).webp',
    'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/new/img(5).webp'
  ];
  const [selectedImage, setSelectedImage] = useState(dummyImageUrls[0]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div>
      <img
        src={selectedImage}
        alt="Product"
        style={{ width: '100%', height: 'auto' }}
      />
      <div className="d-flex justify-content-center mt-3">
        {dummyImageUrls.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="Product Thumbnail"
            style={{ width: '80px', height: 'auto', cursor: 'pointer', margin: '0 5px' }}
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
