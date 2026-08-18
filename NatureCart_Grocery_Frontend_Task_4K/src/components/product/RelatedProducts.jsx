import React from 'react';
import { PRODUCTS } from '../../data/products';
import ProductGrid from './ProductGrid';
import './RelatedProducts.css';

export function RelatedProducts({ currentProductId, category }) {
  const relatedList = PRODUCTS.filter(
    p => p.id !== currentProductId && p.category === category
  ).slice(0, 4);

  if (relatedList.length === 0) return null;

  return (
    <div className="related-products-section mt-xl pt-lg border-t">
      <h2 className="text-2xl font-bold mb-md">Related Products</h2>
      <ProductGrid products={relatedList} />
    </div>
  );
}

export default RelatedProducts;
