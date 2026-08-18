import React from 'react';
import TopOffers from '../components/home/TopOffers';
import { PRODUCTS } from '../data/products';
import ProductGrid from '../components/product/ProductGrid';

export function OffersPage() {
  const offerProducts = PRODUCTS.filter(p => p.isTopOffer || p.discountPercentage > 15);

  return (
    <div className="offers-page container py-lg">
      <div className="mb-lg">
        <h1 className="text-3xl font-bold">Hot Grocery Deals & Offers</h1>
        <p className="text-sm text-muted mt-xs">Save big on daily essentials, fruits, beverages and household needs.</p>
      </div>

      <TopOffers />

      <div className="mt-xl">
        <h2 className="text-2xl font-bold mb-md">Top Discounted Products</h2>
        <ProductGrid products={offerProducts} />
      </div>
    </div>
  );
}

export default OffersPage;
