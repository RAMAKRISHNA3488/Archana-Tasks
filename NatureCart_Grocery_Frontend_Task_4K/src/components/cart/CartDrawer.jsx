import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, ShoppingBag, ArrowRight, ShieldCheck, Truck, Sparkles, Trash2, Tag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import CartItem from './CartItem';
import './CartDrawer.css';

export function CartDrawer() {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    subtotal,
    totalSavings,
    deliveryFee,
    finalTotal,
    clearCart
  } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const FREE_DELIVERY_THRESHOLD = 499;
  const amountNeededForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const deliveryProgressPercent = Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100);

  const handleProceedToCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <div className="cart-drawer-overlay" onClick={closeCart}>
      <div className="cart-drawer-content" onClick={(e) => e.stopPropagation()}>
        {/* 1. Drawer Header */}
        <div className="cart-drawer-header flex items-center justify-between p-lg border-b bg-surface">
          <div className="flex items-center gap-xs">
            <div className="cart-header-icon-wrap p-xs rounded-lg bg-primary-soft">
              <ShoppingBag size={22} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-text-primary leading-tight">My Shopping Cart</h3>
              <span className="text-xs text-muted font-medium">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} added</span>
            </div>
          </div>

          <div className="flex items-center gap-xs">
            {cartItems.length > 0 && (
              <button 
                onClick={clearCart} 
                className="btn-clear-cart text-xs font-semibold text-text-muted hover:text-danger flex items-center gap-xs px-xs py-xs rounded-md"
                title="Clear all items"
              >
                <Trash2 size={14} />
                <span>Clear</span>
              </button>
            )}
            <button onClick={closeCart} className="close-drawer-btn" aria-label="Close Cart">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* 2. Dynamic Free Delivery Progress Banner */}
        <div className="free-delivery-section px-lg py-md bg-bg-cream border-b">
          <div className="flex items-center justify-between text-xs font-bold mb-xs">
            <div className="flex items-center gap-xs">
              <Truck size={16} className={amountNeededForFreeDelivery === 0 ? "text-primary" : "text-amber-600"} />
              {amountNeededForFreeDelivery === 0 ? (
                <span className="text-primary-dark">🎉 FREE Delivery Unlocked!</span>
              ) : (
                <span className="text-text-primary">
                  Add <strong className="text-primary">₹{amountNeededForFreeDelivery.toFixed(0)}</strong> more for <strong>FREE Delivery</strong>
                </span>
              )}
            </div>
            <span className="text-xs text-muted font-semibold">{deliveryProgressPercent.toFixed(0)}%</span>
          </div>

          {/* Animated Progress Bar */}
          <div className="progress-bar-track w-full bg-border-light rounded-full h-2 overflow-hidden">
            <div 
              className="progress-bar-fill bg-primary h-full transition-all duration-300 rounded-full"
              style={{ width: `${deliveryProgressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* 3. Express Delivery Guarantee Pill */}
        <div className="express-banner flex items-center gap-xs px-lg py-xs bg-primary-soft text-primary-dark text-xs font-semibold border-b">
          <Sparkles size={14} className="text-primary flex-shrink-0" />
          <span>60-Minute Guaranteed Express Delivery Active</span>
        </div>

        {/* 4. Drawer Body - Cart Items List */}
        <div className="cart-drawer-body p-lg flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="cart-empty-state text-center py-2xl flex flex-col items-center justify-center">
              <div className="empty-cart-icon-bg p-lg rounded-full bg-bg-cream mb-md">
                <ShoppingBag size={56} className="text-muted" />
              </div>
              <h4 className="text-xl font-bold text-text-primary">Your Cart is Empty</h4>
              <p className="text-sm text-muted mt-xs max-w-xs">
                Looks like you haven't added any fresh groceries or daily essentials yet.
              </p>
              <button onClick={closeCart} className="btn btn-primary btn-md mt-lg shadow-sm">
                Start Shopping Now
              </button>
            </div>
          ) : (
            <div className="cart-items-list flex flex-col gap-sm">
              {cartItems.map(item => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* 5. Drawer Footer - Bill Breakdown & Checkout */}
        {cartItems.length > 0 && (
          <div className="cart-drawer-footer p-lg border-t bg-surface shadow-lg">
            {/* Savings Highlight Pill */}
            {totalSavings > 0 && (
              <div className="savings-badge-pill flex items-center justify-between p-sm mb-md rounded-xl bg-primary-soft border border-primary-light text-xs font-bold text-primary-dark">
                <div className="flex items-center gap-xs">
                  <Tag size={16} className="text-primary" />
                  <span>Total Discount Savings Unlocked</span>
                </div>
                <span className="text-sm font-extrabold text-primary">-₹{totalSavings.toFixed(0)}</span>
              </div>
            )}

            {/* Bill Summary Table */}
            <div className="bill-summary-box flex flex-col gap-xs mb-md p-md rounded-xl bg-bg-cream border">
              <div className="bill-row flex justify-between text-xs text-text-secondary">
                <span>Item Subtotal</span>
                <span className="font-semibold text-text-primary">₹{subtotal.toFixed(0)}</span>
              </div>
              {totalSavings > 0 && (
                <div className="bill-row flex justify-between text-xs text-primary font-semibold">
                  <span>Product Discount</span>
                  <span>-₹{totalSavings.toFixed(0)}</span>
                </div>
              )}
              <div className="bill-row flex justify-between text-xs text-text-secondary">
                <span>Delivery Charge</span>
                <span>{deliveryFee === 0 ? <strong className="text-primary font-bold">FREE</strong> : `₹${deliveryFee}`}</span>
              </div>
              <div className="bill-row flex justify-between text-base font-extrabold text-text-primary border-t pt-xs mt-xs">
                <span>To Pay</span>
                <span className="text-lg text-primary">₹{finalTotal.toFixed(0)}</span>
              </div>
            </div>

            {/* Checkout Call to Action */}
            <button 
              onClick={handleProceedToCheckout} 
              className="btn btn-primary btn-block checkout-btn flex items-center justify-center gap-xs py-md rounded-xl shadow-md text-base font-bold transition-transform active:scale-95"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartDrawer;
