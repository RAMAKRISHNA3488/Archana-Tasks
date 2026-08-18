import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import './EmptyCart.css';

export function EmptyCart() {
  return (
    <div className="empty-cart-card bg-surface p-2xl rounded-xl border text-center my-lg">
      <div className="empty-cart-icon-circle mx-auto mb-md flex items-center justify-center">
        <ShoppingBag size={54} className="text-muted" />
      </div>

      <h2 className="text-2xl font-bold text-text-primary mb-xs">Your Cart is Empty</h2>
      <p className="text-sm text-muted mb-lg max-w-md mx-auto">
        Looks like you haven't added anything to your cart yet. Explore our farm-fresh groceries and daily essentials!
      </p>

      <Link to="/categories" className="btn btn-primary btn-lg inline-flex items-center gap-xs">
        <span>Start Shopping</span>
        <ArrowRight size={18} />
      </Link>
    </div>
  );
}

export default EmptyCart;
