import React from 'react';
import { NavLink } from 'react-router-dom';
import { CATEGORIES } from '../../data/categories';
import { Layers } from 'lucide-react';
import './CategoryNavigation.css';

export function CategoryNavigation({ activeCategoryId }) {
  return (
    <div className="category-nav-sidebar">
      <div className="category-nav-header flex items-center gap-xs pb-sm border-b mb-sm">
        <Layers size={18} className="text-primary" />
        <h3 className="font-bold text-base">Categories</h3>
      </div>

      <div className="category-nav-list flex flex-col gap-xs">
        <NavLink
          to="/categories"
          end
          className={({ isActive }) =>
            `category-nav-link flex items-center justify-between p-xs rounded-md ${
              isActive || activeCategoryId === 'all' ? 'active' : ''
            }`
          }
        >
          <div className="flex items-center gap-xs">
            <div className="all-cat-icon-thumb flex items-center justify-center">
              <Layers size={14} className="text-primary" />
            </div>
            <span className="cat-nav-name text-xs font-semibold">All Categories</span>
          </div>
        </NavLink>

        {CATEGORIES.map(cat => (
          <NavLink
            key={cat.id}
            to={`/categories/${cat.slug}`}
            className={({ isActive }) =>
              `category-nav-link flex items-center justify-between p-xs rounded-md ${
                isActive || activeCategoryId === cat.slug ? 'active' : ''
              }`
            }
          >
            <div className="flex items-center gap-xs">
              <img
                src={cat.image}
                alt={cat.name}
                className="cat-nav-thumb"
                loading="lazy"
              />
              <span className="cat-nav-name text-xs font-medium">{cat.name}</span>
            </div>
            {cat.itemCount && (
              <span className="cat-nav-count text-xs text-muted">({cat.itemCount})</span>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default CategoryNavigation;
