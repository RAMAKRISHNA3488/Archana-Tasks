import React from 'react';
import { HOUSEHOLD_CATEGORIES } from '../../data/householdCategories';
import './HouseholdSubcategories.css';

const DEFAULT_HOUSEHOLD_IMAGE = 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=400&q=80';

export function HouseholdSubcategories({ onSelectSubcategory, activeSubcategory }) {
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = DEFAULT_HOUSEHOLD_IMAGE;
  };

  return (
    <div className="household-subcategories-wrapper mb-xl">
      <div className="household-sub-header flex items-center justify-between mb-md">
        <div>
          <h2 className="text-xl font-bold text-text-primary">Household Subcategories</h2>
          <p className="text-xs text-muted">Explore cleaning, laundry, paper, and home maintenance essentials.</p>
        </div>
      </div>

      <div className="household-subcategories-grid">
        {HOUSEHOLD_CATEGORIES.map(sub => {
          const isActive = activeSubcategory === sub.slug;
          return (
            <div
              key={sub.id}
              onClick={() => onSelectSubcategory && onSelectSubcategory(sub.slug)}
              className={`household-sub-card p-sm bg-surface rounded-xl border cursor-pointer transition-all ${
                isActive ? 'border-primary shadow-md bg-primary-soft' : 'hover:shadow-sm'
              }`}
            >
              <div className="household-sub-img-box mb-xs rounded-lg overflow-hidden relative">
                <img
                  src={sub.image || DEFAULT_HOUSEHOLD_IMAGE}
                  alt={sub.name}
                  loading="lazy"
                  onError={handleImageError}
                  className="household-sub-img"
                />
                <span className="badge badge-primary text-[10px] absolute top-2 right-2 shadow-xs">
                  {sub.itemCount} Items
                </span>
              </div>

              <div className="household-sub-content text-left px-xs">
                <h3 className="household-sub-title font-bold text-sm text-text-primary mb-[2px]">{sub.name}</h3>
                <p className="household-sub-desc text-[11px] text-muted leading-tight">{sub.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HouseholdSubcategories;
