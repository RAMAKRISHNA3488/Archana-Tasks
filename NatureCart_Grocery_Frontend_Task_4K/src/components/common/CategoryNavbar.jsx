import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, ChevronDown, Sparkles, Tag, ShoppingBag, Home, PhoneCall, ShieldAlert, Layers } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import './CategoryNavbar.css';

export function CategoryNavbar() {
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  return (
    <nav className="category-navbar">
      <div className="container flex items-center justify-between">
        {/* Shop by Category Dropdown Button */}
        <div className="category-dropdown-wrapper">
          <button
            onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
            className="category-dropdown-btn flex items-center gap-sm"
            aria-expanded={isCategoryDropdownOpen}
          >
            <Menu size={18} />
            <span>Shop by Category</span>
            <ChevronDown size={16} className={`chevron-icon ${isCategoryDropdownOpen ? 'open' : ''}`} />
          </button>

          {/* Dropdown Menu Overlay */}
          {isCategoryDropdownOpen && (
            <div className="category-dropdown-menu">
              {CATEGORIES.map(cat => (
                <NavLink
                  key={cat.id}
                  to={`/category/${cat.slug}`}
                  onClick={() => setIsCategoryDropdownOpen(false)}
                  className="dropdown-item flex items-center justify-between"
                >
                  <span className="dropdown-item-name">{cat.name}</span>
                  <span className="dropdown-item-count">{cat.itemCount} items</span>
                </NavLink>
              ))}
            </div>
          )}
        </div>

        {/* Main Desktop Navigation Items */}
        <div className="nav-desktop-menu flex items-center gap-md">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/categories" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Categories
          </NavLink>
          <NavLink to="/offers" className={({ isActive }) => `nav-link offer-link ${isActive ? 'active' : ''}`}>
            <Tag size={14} className="offer-tag-icon" />
            <span>Offers</span>
            <span className="badge-mini-hot">Hot</span>
          </NavLink>
          <NavLink to="/category/staples-pulses" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Combo Store
          </NavLink>
          <NavLink to="/brands" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Brands
          </NavLink>
          <NavLink to="/category/household-needs" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Household
          </NavLink>
          <NavLink to="/category/personal-care" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Personal Care
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Contact Us
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default CategoryNavbar;
