import React, { useState } from 'react';
import { SlidersHorizontal, Star, X, Check } from 'lucide-react';
import { BRANDS } from '../../data/brands';
import './CategoryFilter.css';

export function CategoryFilter({
  filters,
  onFilterChange,
  onResetFilters
}) {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const handlePriceChange = (e) => {
    onFilterChange('maxPrice', Number(e.target.value));
  };

  const handleRatingSelect = (rating) => {
    onFilterChange('minRating', filters.minRating === rating ? 0 : rating);
  };

  const handleDiscountSelect = (discount) => {
    onFilterChange('minDiscount', filters.minDiscount === discount ? 0 : discount);
  };

  const handleBrandSelect = (brandName) => {
    onFilterChange('brand', filters.brand === brandName ? 'all' : brandName);
  };

  const handleInStockToggle = (e) => {
    onFilterChange('inStockOnly', e.target.checked);
  };

  const filterContent = (
    <div className="filter-inner-content">
      {/* Header */}
      <div className="filter-header flex items-center justify-between pb-sm border-b mb-md">
        <div className="flex items-center gap-xs">
          <SlidersHorizontal size={18} className="text-primary" />
          <h3 className="font-bold text-base">Filter Products</h3>
        </div>
        <button onClick={onResetFilters} className="text-xs font-semibold text-primary hover:underline">
          Reset All
        </button>
      </div>

      {/* 1. Price Range Filter */}
      <div className="filter-section-group mb-md">
        <div className="flex justify-between items-center mb-xs">
          <h4 className="filter-title">Price Range</h4>
          <span className="text-xs font-bold text-primary">₹0 — ₹{filters.maxPrice}</span>
        </div>
        <input
          type="range"
          min="20"
          max="500"
          step="10"
          value={filters.maxPrice}
          onChange={handlePriceChange}
          className="price-slider"
        />
        <div className="flex justify-between text-xs text-muted mt-xs">
          <span>₹20</span>
          <span>₹500</span>
        </div>
      </div>

      {/* 2. Rating Filter */}
      <div className="filter-section-group mb-md">
        <h4 className="filter-title mb-xs">Customer Rating</h4>
        <div className="filter-options-list flex flex-col gap-xs">
          {[4, 3, 2].map(star => (
            <button
              key={star}
              type="button"
              onClick={() => handleRatingSelect(star)}
              className={`rating-filter-btn flex items-center justify-between p-xs rounded-md text-xs ${
                filters.minRating === star ? 'selected' : ''
              }`}
            >
              <div className="flex items-center gap-xs">
                <div className="flex text-amber-500">
                  {[...Array(star)].map((_, i) => (
                    <Star key={i} size={12} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <span>{star}★ & above</span>
              </div>
              {filters.minRating === star && <Check size={14} className="text-primary" />}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Discount Filter */}
      <div className="filter-section-group mb-md">
        <h4 className="filter-title mb-xs">Discount Percentage</h4>
        <div className="filter-chip-options flex flex-wrap gap-xs">
          {[10, 20, 30, 50].map(disc => (
            <button
              key={disc}
              type="button"
              onClick={() => handleDiscountSelect(disc)}
              className={`disc-filter-chip text-xs ${
                filters.minDiscount === disc ? 'active' : ''
              }`}
            >
              {disc}% & above
            </button>
          ))}
        </div>
      </div>

      {/* 4. Availability Filter */}
      <div className="filter-section-group">
        <label className="flex items-center gap-xs text-xs font-semibold cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={handleInStockToggle}
            className="accent-primary"
          />
          <span>In Stock Only</span>
        </label>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Filter Sidebar */}
      <aside className="category-filter-sidebar">
        {filterContent}
      </aside>

      {/* Mobile Filter Toggle Button */}
      <div className="mobile-filter-bar">
        <button
          onClick={() => setIsMobileDrawerOpen(true)}
          className="btn btn-outline btn-sm w-full flex items-center justify-center gap-xs"
        >
          <SlidersHorizontal size={16} />
          <span>Filters & Refinements</span>
        </button>
      </div>

      {/* Mobile Filter Drawer Overlay */}
      {isMobileDrawerOpen && (
        <div className="mobile-filter-overlay" onClick={() => setIsMobileDrawerOpen(false)}>
          <div className="mobile-filter-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center pb-xs border-b mb-md">
              <h3 className="font-bold text-base">Filters</h3>
              <button onClick={() => setIsMobileDrawerOpen(false)} className="p-xs text-muted">
                <X size={20} />
              </button>
            </div>
            {filterContent}
            <button
              onClick={() => setIsMobileDrawerOpen(false)}
              className="btn btn-primary btn-block mt-md"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default CategoryFilter;
