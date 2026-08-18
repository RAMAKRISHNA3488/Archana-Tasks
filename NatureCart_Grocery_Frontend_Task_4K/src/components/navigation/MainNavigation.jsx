import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, ChevronDown, Tag } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import './MainNavigation.css';

export function MainNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isCategoriesActive =
    location.pathname.startsWith('/categories') ||
    location.pathname.startsWith('/category') ||
    location.pathname === '/shop';

  return (
    <nav className="main-navigation">
      <div className="container flex items-center justify-between">
        {/* Shop by Category Dropdown Button */}
        <div className="nav-category-dropdown" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="nav-category-btn flex items-center gap-sm"
            aria-expanded={isOpen}
          >
            <Menu size={18} />
            <span>Shop by Category</span>
            <ChevronDown size={16} className={`chevron-icon ${isOpen ? 'open' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="nav-dropdown-menu">
              {CATEGORIES.map(cat => (
                <NavLink
                  key={cat.id}
                  to={`/categories/${cat.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="nav-dropdown-item flex items-center justify-between"
                >
                  <span className="dropdown-name">{cat.name}</span>
                  <span className="dropdown-count">{cat.itemCount} items</span>
                </NavLink>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Navigation Links */}
        <div className="nav-menu-links flex items-center gap-md">
          <NavLink to="/" className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/categories" className={`nav-item-link ${isCategoriesActive ? 'active' : ''}`}>
            Categories
          </NavLink>
          <NavLink to="/offers" className={({ isActive }) => `nav-item-link offer-link ${isActive ? 'active' : ''}`}>
            <Tag size={14} className="offer-tag-icon" />
            <span>Offers</span>
            <span className="badge-mini-hot">Hot</span>
          </NavLink>
          <NavLink to="/categories/staples-pulses" className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}>
            Combo Store
          </NavLink>
          <NavLink to="/categories?brand=all" className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}>
            Brands
          </NavLink>
          <NavLink to="/categories/household-needs" className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}>
            Household
          </NavLink>
          <NavLink to="/categories/personal-care" className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}>
            Personal Care
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}>
            Contact Us
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default MainNavigation;
