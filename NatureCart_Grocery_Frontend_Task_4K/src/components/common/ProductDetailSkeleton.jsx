import React from 'react';
import './ProductDetailSkeleton.css';

export function ProductDetailSkeleton() {
  return (
    <div className="product-detail-skeleton-wrapper grid grid-cols-2 gap-xl bg-surface p-xl rounded-xl border animate-pulse">
      {/* Gallery Skeleton */}
      <div className="flex flex-col gap-md">
        <div className="skeleton-main-img-box" />
        <div className="flex gap-sm justify-center">
          <div className="skeleton-thumb-box" />
          <div className="skeleton-thumb-box" />
          <div className="skeleton-thumb-box" />
        </div>
      </div>

      {/* Info Skeleton */}
      <div className="flex flex-col gap-sm">
        <div className="skeleton-badge-pill" />
        <div className="skeleton-title-line" />
        <div className="skeleton-sub-line" />
        <div className="skeleton-price-line mt-md" />
        <div className="skeleton-desc-line mt-md" />
        <div className="skeleton-desc-line" />
        <div className="flex gap-md mt-xl">
          <div className="skeleton-action-btn flex-1" />
          <div className="skeleton-action-btn flex-1" />
        </div>
      </div>
    </div>
  );
}

export default ProductDetailSkeleton;
