import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import ProductGrid from '../product/ProductGrid';
import './BestSellers.css';

export function BestSellers() {
  const bestSellerProducts = PRODUCTS.filter(p => p.isBestseller).slice(0, 8);

  return (
    <section className="bestsellers-section py-lg">
      <div className="container">
        {/* Section Header */}
        <div className="section-header flex items-center justify-between mb-md">
          <div className="flex items-center gap-xs">
            <ShoppingBag size={22} className="text-primary" />
            <h2 className="text-2xl font-bold">Best Selling Products</h2>
          </div>
          <Link to="/shop" className="view-all-link flex items-center gap-xs font-semibold text-sm">
            <span>View All Products</span>
            <ChevronRight size={16} />
          </Link>
        </div>

        {/* Product Grid */}
        <ProductGrid products={bestSellerProducts} />
      </div>
    </section>
  );
}

export default BestSellers;
