import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { PRODUCTS } from '../../data/products';
import ProductGrid from './ProductGrid';
import './RecentlyViewed.css';

export function RecentlyViewed({ currentProductId }) {
  const [recentIds, setRecentIds] = useLocalStorage('naturecart_recently_viewed', []);
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    if (currentProductId) {
      setRecentIds(prev => {
        const filtered = prev.filter(id => id !== currentProductId);
        return [currentProductId, ...filtered].slice(0, 6);
      });
    }
  }, [currentProductId]);

  useEffect(() => {
    const matched = recentIds
      .filter(id => id !== currentProductId)
      .map(id => PRODUCTS.find(p => p.id === id))
      .filter(Boolean)
      .slice(0, 4);

    setRecentProducts(matched);
  }, [recentIds, currentProductId]);

  if (recentProducts.length === 0) return null;

  return (
    <div className="recently-viewed-section mt-xl pt-lg border-t">
      <h2 className="text-xl font-bold mb-md">Recently Viewed</h2>
      <ProductGrid products={recentProducts} />
    </div>
  );
}

export default RecentlyViewed;
