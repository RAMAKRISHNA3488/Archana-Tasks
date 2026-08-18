import React from 'react';
import { CATEGORIES } from '../../data/categories';
import { BRANDS } from '../../data/brands';
import { useFilter } from '../../context/FilterContext';
import './ProductFilter.css';

export function ProductFilter() {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedBrand,
    setSelectedBrand,
    sortBy,
    setSortBy,
    resetFilters
  } = useFilter();

  return (
    <aside className="product-filter-sidebar">
      <div className="flex items-center justify-between sidebar-header pb-sm border-b">
        <h3 className="font-bold text-lg">Filters</h3>
        <button onClick={resetFilters} className="reset-btn text-xs text-primary font-semibold">
          Reset All
        </button>
      </div>

      {/* Sort By Dropdown */}
      <div className="filter-group mt-md">
        <h4>Sort By</h4>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="filter-select"
        >
          <option value="relevance">Featured & Popular</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="rating">Customer Rating</option>
          <option value="discount">Biggest Discount</option>
        </select>
      </div>

      {/* Category List Filter */}
      <div className="filter-group mt-md">
        <h4>Categories</h4>
        <div className="filter-radio-list">
          <label className="filter-radio-item">
            <input
              type="radio"
              name="category"
              value="all"
              checked={selectedCategory === 'all'}
              onChange={() => setSelectedCategory('all')}
            />
            <span>All Categories</span>
          </label>
          {CATEGORIES.map(cat => (
            <label key={cat.id} className="filter-radio-item">
              <input
                type="radio"
                name="category"
                value={cat.slug}
                checked={selectedCategory === cat.slug}
                onChange={() => setSelectedCategory(cat.slug)}
              />
              <span>{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brand Filter */}
      <div className="filter-group mt-md">
        <h4>Brands</h4>
        <div className="filter-radio-list">
          <label className="filter-radio-item">
            <input
              type="radio"
              name="brand"
              value="all"
              checked={selectedBrand === 'all'}
              onChange={() => setSelectedBrand('all')}
            />
            <span>All Brands</span>
          </label>
          {BRANDS.map(brand => (
            <label key={brand.id} className="filter-radio-item">
              <input
                type="radio"
                name="brand"
                value={brand.name}
                checked={selectedBrand === brand.name}
                onChange={() => setSelectedBrand(brand.name)}
              />
              <span>{brand.name}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default ProductFilter;
