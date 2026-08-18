import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';
import ProductGrid from '../product/ProductGrid';
import './AccountWishlist.css';

export function AccountWishlist() {
  const { wishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useNotification();

  const handleAddAllToCart = () => {
    if (wishlist.length === 0) return;
    wishlist.forEach(product => {
      addToCart(product, 1);
    });
    showToast(`Added ${wishlist.length} item(s) from wishlist to your cart!`, 'success');
  };

  const handleClearWishlist = () => {
    clearWishlist();
    showToast('Wishlist has been cleared.', 'info');
  };

  return (
    <div className="account-wishlist-container">
      <div className="flex items-center justify-between pb-sm border-b mb-md flex-wrap gap-sm">
        <div>
          <h2 className="text-xl font-bold text-text-primary flex items-center gap-xs">
            <span>My Saved Wishlist</span>
            {wishlist.length > 0 && (
              <span className="badge badge-primary text-xs">{wishlist.length}</span>
            )}
          </h2>
          <p className="text-xs text-muted">Your saved organic products and favorite daily essentials.</p>
        </div>

        {wishlist.length > 0 && (
          <div className="flex items-center gap-xs">
            <button
              onClick={handleAddAllToCart}
              className="btn btn-primary btn-sm flex items-center gap-xs"
            >
              <ShoppingBag size={14} />
              <span>Add All to Cart</span>
            </button>
            <button
              onClick={handleClearWishlist}
              className="btn btn-outline btn-sm flex items-center gap-xs text-danger border-danger hover:bg-discount-bg"
            >
              <Trash2 size={14} />
              <span>Clear</span>
            </button>
          </div>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-xl bg-bg-cream rounded-lg border">
          <Heart size={40} className="mx-auto text-muted mb-xs" />
          <h3 className="font-bold text-base text-text-primary mb-xs">Your Wishlist is Empty</h3>
          <p className="text-xs text-muted mb-md">Save products you love while shopping to view them here later.</p>
          <Link to="/categories" className="btn btn-primary btn-sm">
            Explore Products
          </Link>
        </div>
      ) : (
        <ProductGrid products={wishlist} />
      )}
    </div>
  );
}

export default AccountWishlist;
