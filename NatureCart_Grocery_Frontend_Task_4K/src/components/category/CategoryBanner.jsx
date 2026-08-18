import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './CategoryBanner.css';

export function CategoryBanner({ category }) {
  const isAllCategories = !category || category.id === 'all';

  const title = isAllCategories ? 'All Grocery Categories' : category.name;
  const description = isAllCategories
    ? 'Browse our complete range of farm-fresh fruits, vegetables, dairy, staples, snacks, beverages, personal care, and household essentials.'
    : category.description || `Explore top quality ${category.name.toLowerCase()} items at unbeatable prices.`;
  const image = isAllCategories
    ? 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=500&q=80'
    : category.image;

  return (
    <div className="category-banner-card mb-lg">
      <div className="category-banner-inner flex items-center justify-between gap-lg">
        {/* Banner Content & Breadcrumbs */}
        <div className="category-banner-content flex-1">
          {/* Breadcrumbs */}
          <nav className="category-breadcrumbs flex items-center gap-xs text-xs mb-sm">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <ChevronRight size={12} className="breadcrumb-separator" />
            <Link to="/categories" className="breadcrumb-link">Categories</Link>
            {!isAllCategories && (
              <>
                <ChevronRight size={12} className="breadcrumb-separator" />
                <span className="breadcrumb-active">{category.name}</span>
              </>
            )}
          </nav>

          <h1 className="category-banner-title">{title}</h1>
          <p className="category-banner-desc">{description}</p>
        </div>

        {/* Banner Graphic Image */}
        <div className="category-banner-graphic">
          <img src={image} alt={title} className="category-banner-img" />
        </div>
      </div>
    </div>
  );
}

export default CategoryBanner;
