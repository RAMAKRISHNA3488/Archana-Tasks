import React from 'react';
import './ProductSkeleton.css';

export function ProductSkeleton({ count = 4 }) {
  return (
    <div className="product-skeleton-grid grid grid-cols-4 gap-md">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="product-skeleton-card animate-pulse">
          <div className="skeleton-image-box" />
          <div className="skeleton-line skeleton-title mb-xs" />
          <div className="skeleton-line skeleton-sub mb-sm" />
          <div className="flex items-center justify-between mt-md">
            <div className="skeleton-line skeleton-price" />
            <div className="skeleton-line skeleton-btn" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductSkeleton;
