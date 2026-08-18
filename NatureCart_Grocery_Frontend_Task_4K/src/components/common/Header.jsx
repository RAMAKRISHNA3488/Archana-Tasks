import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, User, Heart, ShoppingCart, MapPin, X, Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { PRODUCTS } from '../../data/products';
import './Header.css';

export function Header() {
  const { totalItemsCount, openCart, subtotal, addToCart } = useCart();
  const { wishlistCount } = useWishlist();
  const { isLoggedIn, user } = useAuth();
  const { showToast } = useNotification();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);

  // Filter products for live search dropdown preview
  const liveSearchResults = searchQuery.trim()
    ? PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleSelectProduct = (productId) => {
    setIsSearchFocused(false);
    setSearchQuery('');
    navigate(`/product/${productId}`);
  };

  const handleQuickAdd = (e, product) => {
    e.stopPropagation();
    addToCart(product, 1);
    showToast(`Added ${product.name} to your cart!`, 'success');
  };

  const firstName = user?.name ? user.name.split(' ')[0] : 'User';

  return (
    <header className="nc-header">
      <div className="container flex items-center justify-between header-inner">
        {/* Brand Logo */}
        <Link to="/" className="nc-logo flex items-center gap-sm">
          <div className="logo-icon-bg">
            <ShoppingBag size={24} className="logo-icon" />
          </div>
          <div className="logo-text-wrapper">
            <span className="logo-brand">NatureCart</span>
            <span className="logo-tagline">Fresh. Natural. Delivered.</span>
          </div>
        </Link>

        {/* Delivery Location Indicator */}
        <div className="header-location flex items-center gap-xs">
          <MapPin size={16} className="location-pin" />
          <div className="location-text">
            <span className="location-label">Deliver to</span>
            <span className="location-value">India (400001)</span>
          </div>
        </div>

        {/* Search Bar with Live Results Dropdown */}
        <div className="header-search-container" ref={searchRef}>
          <form onSubmit={handleSearchSubmit} className="header-search-bar flex items-center">
            <input
              type="text"
              placeholder="Search for products (e.g. Atta, Milk, Apples)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              className="search-input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="search-clear-btn"
                aria-label="Clear Search"
              >
                <X size={14} />
              </button>
            )}
            <button type="submit" className="search-btn flex items-center justify-center" aria-label="Search">
              <Search size={18} />
            </button>
          </form>

          {/* Live Search Popup Overlay */}
          {isSearchFocused && searchQuery.trim().length > 0 && (
            <div className="live-search-dropdown shadow-lg rounded-lg">
              {liveSearchResults.length > 0 ? (
                <div className="search-results-list">
                  <div className="search-results-header font-bold text-xs text-muted px-md py-xs border-b">
                    Matching Products ({liveSearchResults.length})
                  </div>
                  {liveSearchResults.slice(0, 5).map(product => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product.id)}
                      className="search-result-item flex items-center justify-between p-sm border-b hover:bg-primary-soft cursor-pointer"
                    >
                      <div className="flex items-center gap-sm">
                        <img src={product.image} alt={product.name} className="search-thumb" />
                        <div>
                          <div className="search-item-title font-semibold text-sm">{product.name}</div>
                          <div className="text-xs text-muted">{product.weight || product.unit}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-md">
                        <div className="text-right">
                          <div className="font-bold text-sm">₹{product.price}</div>
                          {product.originalPrice && (
                            <div className="text-xs text-muted line-through">₹{product.originalPrice}</div>
                          )}
                        </div>
                        <button
                          onClick={(e) => handleQuickAdd(e, product)}
                          className="btn btn-primary btn-sm p-xs"
                          title="Quick Add to Cart"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {liveSearchResults.length > 5 && (
                    <button
                      onClick={handleSearchSubmit}
                      className="w-full text-center text-xs text-primary font-bold py-xs bg-bg-cream hover:underline"
                    >
                      View all {liveSearchResults.length} search results
                    </button>
                  )}
                </div>
              ) : (
                <div className="no-search-results text-center py-md px-sm">
                  <p className="text-sm font-semibold">No products found for "{searchQuery}"</p>
                  <p className="text-xs text-muted mt-xs">Try searching for apples, atta, milk, or oil.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="header-actions flex items-center gap-md">
          {/* User Account Navigation */}
          <Link
            to={isLoggedIn ? "/account" : "/login"}
            className="header-action-item flex items-center gap-xs"
          >
            <User size={20} />
            <div className="action-text-box">
              <span className="action-sub">{isLoggedIn ? `Hello, ${firstName}` : 'Welcome'}</span>
              <span className="action-main">{isLoggedIn ? 'My Account' : 'Login / Sign Up'}</span>
            </div>
          </Link>

          {/* Wishlist Navigation */}
          <Link to="/wishlist" className="header-action-item flex items-center gap-xs relative">
            <Heart size={20} />
            <span className="action-label">Wishlist</span>
            {wishlistCount > 0 && (
              <span className="badge-counter">{wishlistCount}</span>
            )}
          </Link>

          {/* Cart Drawer Trigger */}
          <button onClick={openCart} className="header-cart-btn flex items-center gap-xs relative" aria-label="Shopping Cart">
            <div className="cart-icon-wrapper">
              <ShoppingCart size={20} />
              {totalItemsCount > 0 && (
                <span className="badge-counter cart-badge">{totalItemsCount}</span>
              )}
            </div>
            <div className="cart-price-box">
              <span className="action-sub">My Cart</span>
              <span className="cart-amount">₹{subtotal.toFixed(0)}</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
