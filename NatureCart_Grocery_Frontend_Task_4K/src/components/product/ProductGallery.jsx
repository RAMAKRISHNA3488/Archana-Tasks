import React, { useState } from 'react';
import './ProductGallery.css';

export function ProductGallery({ mainImage, images = [], altTitle = "Product", discountPercentage, isBestseller }) {
  const allImages = images && images.length > 0 ? images : [mainImage];
  const [selectedImage, setSelectedImage] = useState(allImages[0] || mainImage);

  return (
    <div className="product-gallery-box flex flex-col gap-md">
      {/* Active Main Display Image */}
      <div className="main-image-display relative flex items-center justify-center p-md">
        {/* Badges overlay */}
        {(discountPercentage || isBestseller) && (
          <div className="gallery-badge-overlay flex flex-col gap-xs">
            {discountPercentage && (
              <span className="badge badge-discount">{discountPercentage}% OFF</span>
            )}
            {isBestseller && (
              <span className="badge badge-primary">BESTSELLER</span>
            )}
          </div>
        )}

        <img
          src={selectedImage}
          alt={altTitle}
          className="main-gallery-img object-contain"
        />
      </div>

      {/* Thumbnail Selector Bar */}
      {allImages.length > 1 && (
        <div className="thumbnails-bar flex items-center justify-center gap-sm">
          {allImages.map((imgUrl, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(imgUrl)}
              className={`thumb-btn ${selectedImage === imgUrl ? 'active' : ''}`}
              aria-label={`View thumbnail ${index + 1}`}
            >
              <img src={imgUrl} alt={`${altTitle} view ${index + 1}`} className="thumb-img" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductGallery;
