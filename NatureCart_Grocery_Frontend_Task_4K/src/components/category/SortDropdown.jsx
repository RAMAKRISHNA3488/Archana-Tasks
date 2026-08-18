import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import './SortDropdown.css';

export function SortDropdown({ sortBy, onSortChange }) {
  return (
    <div className="sort-dropdown-container flex items-center gap-xs text-xs">
      <ArrowUpDown size={14} className="text-muted" />
      <span className="font-semibold text-muted">Sort By:</span>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="sort-select-input font-medium"
      >
        <option value="relevance">Recommended & Featured</option>
        <option value="price-low-high">Price: Low to High</option>
        <option value="price-high-low">Price: High to Low</option>
        <option value="rating">Rating: High to Low</option>
        <option value="discount">Biggest Discount (% OFF)</option>
        <option value="newest">Newest Arrivals</option>
      </select>
    </div>
  );
}

export default SortDropdown;
