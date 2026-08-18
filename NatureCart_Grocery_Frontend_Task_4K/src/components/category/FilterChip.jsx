import React from 'react';
import { X, RotateCcw } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import './FilterChip.css';

export function FilterChip({
  filters,
  activeCategoryId,
  totalProductsCount,
  filteredProductsCount,
  onRemoveFilter,
  onClearAll
}) {
  const activeChips = [];

  // Category chip
  if (activeCategoryId && activeCategoryId !== 'all') {
    const catObj = CATEGORIES.find(c => c.slug === activeCategoryId || c.id === activeCategoryId);
    activeChips.push({
      id: 'category',
      label: catObj ? catObj.name : activeCategoryId,
      type: 'category'
    });
  }

  // Price chip
  if (filters.maxPrice < 500) {
    activeChips.push({
      id: 'price',
      label: `Max Price: ₹${filters.maxPrice}`,
      type: 'maxPrice'
    });
  }

  // Rating chip
  if (filters.minRating > 0) {
    activeChips.push({
      id: 'rating',
      label: `${filters.minRating}★ & Above`,
      type: 'minRating'
    });
  }

  // Discount chip
  if (filters.minDiscount > 0) {
    activeChips.push({
      id: 'discount',
      label: `${filters.minDiscount}% & Above OFF`,
      type: 'minDiscount'
    });
  }

  // Brand chip
  if (filters.brand && filters.brand !== 'all') {
    activeChips.push({
      id: 'brand',
      label: `Brand: ${filters.brand}`,
      type: 'brand'
    });
  }

  // Search query chip
  if (filters.searchQuery) {
    activeChips.push({
      id: 'search',
      label: `Search: "${filters.searchQuery}"`,
      type: 'searchQuery'
    });
  }

  // In stock chip
  if (filters.inStockOnly) {
    activeChips.push({
      id: 'inStock',
      label: 'In Stock Only',
      type: 'inStockOnly'
    });
  }

  return (
    <div className="filter-chips-wrapper flex flex-wrap items-center justify-between gap-sm mb-md pb-xs border-b">
      {/* Left: Product Count */}
      <div className="product-count-label text-sm font-bold text-text-primary">
        <span>{filteredProductsCount} Products found</span>
        {totalProductsCount !== filteredProductsCount && (
          <span className="text-xs text-muted font-normal ml-xs">(Filtered from {totalProductsCount})</span>
        )}
      </div>

      {/* Right: Active Chips List */}
      {activeChips.length > 0 && (
        <div className="chips-row flex items-center gap-xs flex-wrap">
          <span className="text-xs text-muted font-semibold">Active Filters:</span>
          {activeChips.map(chip => (
            <span key={chip.id} className="filter-chip-badge flex items-center gap-xs text-xs">
              <span>{chip.label}</span>
              <button
                onClick={() => onRemoveFilter(chip.type)}
                className="chip-remove-btn"
                aria-label={`Remove filter ${chip.label}`}
              >
                <X size={12} />
              </button>
            </span>
          ))}
          <button
            onClick={onClearAll}
            className="clear-all-btn text-xs text-danger font-bold flex items-center gap-xs ml-xs hover:underline"
          >
            <RotateCcw size={12} /> Clear All
          </button>
        </div>
      )}
    </div>
  );
}

export default FilterChip;
