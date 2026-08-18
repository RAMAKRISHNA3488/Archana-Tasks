import React from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css';

export function ProductGrid({ products = [] }) {
  if (products.length === 0) {
    return (
      <div className="product-grid-empty text-center py-xl">
        <h3>No Products Found</h3>
        <p className="text-muted">Try adjusting your search query or filters.</p>
      </div>
    );
  }

  return (
    <div className="product-grid grid grid-cols-4 gap-md">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
