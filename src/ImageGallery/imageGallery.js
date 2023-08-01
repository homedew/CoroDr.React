import React, { useState } from 'react';

const ProductImageGallery = ({ images }) => {
  const dummyImageUrls = [
    'https://dummyimage.com/200x200/000000/ffffff', // Black image with white background
    'https://dummyimage.com/200x200/ff0000/ffffff', // Red image with white background
    'https://dummyimage.com/200x200/00ff00/ffffff', // Green image with white background
    'https://dummyimage.com/200x200/0000ff/ffffff', // Blue image with white background
    // Add more dummy image URLs here...
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
