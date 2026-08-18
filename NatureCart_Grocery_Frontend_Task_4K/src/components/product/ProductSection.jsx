import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import ProductGrid from './ProductGrid';
import './ProductSection.css';

export function ProductSection({ title = "Best Selling Products", products = [], viewAllLink = "/shop" }) {
  return (
    <section className="product-section py-lg">
      <div className="container">
        {/* Section Header */}
        <div className="section-header flex items-center justify-between mb-md">
          <div className="flex items-center gap-xs">
            <ShoppingBag size={22} className="text-primary" />
            <h2 className="text-2xl font-bold">{title}</h2>
          </div>
          {viewAllLink && (
            <Link to={viewAllLink} className="view-all-link flex items-center gap-xs font-semibold text-sm">
              <span>View All Products</span>
              <ChevronRight size={16} />
            </Link>
          )}
        </div>

        {/* Product Grid */}
        <ProductGrid products={products} />
      </div>
    </section>
  );
}

export default ProductSection;
