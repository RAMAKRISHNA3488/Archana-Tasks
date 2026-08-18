import React from 'react';
import HeroBanner from '../components/home/HeroBanner';
import CategorySection from '../components/category/CategorySection';
import OfferSection from '../components/offer/OfferSection';
import ProductSection from '../components/product/ProductSection';
import { PRODUCTS } from '../data/products';

export function HomePage() {
  const bestSellers = PRODUCTS.filter(p => p.isBestseller).slice(0, 8);

  return (
    <div className="home-page">
      {/* 1. Hero Banner */}
      <HeroBanner />

      {/* 2. Category Section */}
      <CategorySection />

      {/* 3. Top Offers Section */}
      <OfferSection />

      {/* 4. Best Selling Products Section */}
      <ProductSection
        title="Best Selling Products"
        products={bestSellers}
        viewAllLink="/shop"
      />
    </div>
  );
}

export default HomePage;
