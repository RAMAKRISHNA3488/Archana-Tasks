import React, { useState } from 'react';
import ProductCard from '../product/ProductCard';
import './CategoryProductGrid.css';

export function CategoryProductGrid({ products = [] }) {
  const [visibleCount, setVisibleCount] = useState(16);

  const visibleProducts = products.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 8);
  };

  return (
    <div className="category-product-grid-wrapper">
      {/* 4-Column Grid for Desktop */}
      <div className="category-products-grid mb-lg">
        {visibleProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination / Load More Bar */}
      {products.length > 16 && (
        <div className="load-more-bar text-center py-md border-t">
          <p className="text-xs text-muted mb-xs">
            Showing {visibleProducts.length} of {products.length} Products
          </p>

          {visibleCount < products.length ? (
            <button onClick={handleLoadMore} className="btn btn-outline btn-md">
              Load More Products
            </button>
          ) : (
            <span className="text-xs font-semibold text-muted">✓ All products loaded</span>
          )}
        </div>
      )}
    </div>
  );
}

export default CategoryProductGrid;
