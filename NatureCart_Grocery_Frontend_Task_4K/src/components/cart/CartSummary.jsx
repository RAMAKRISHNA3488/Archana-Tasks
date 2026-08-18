import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';
import CouponBox from './CouponBox';
import './CartSummary.css';

export function CartSummary() {
  const {
    cartItems,
    subtotal,
    totalSavings,
    deliveryFee,
    appliedCoupon,
    couponDiscount,
    finalTotal
  } = useCart();
  const { showToast } = useNotification();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      showToast('Your cart is empty. Add products before proceeding to checkout.', 'warning');
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="cart-summary-sticky-card bg-surface p-lg rounded-xl border">
      <h3 className="text-lg font-bold mb-md pb-xs border-b">Order Summary</h3>

      {/* Coupon Box Component */}
      <CouponBox />

      {/* Financial Rows */}
      <div className="summary-rows flex flex-col gap-xs text-xs mb-md pb-sm border-b">
        <div className="flex justify-between">
          <span className="text-muted">Items Subtotal ({cartItems.length} items)</span>
          <span className="font-semibold">₹{subtotal.toFixed(0)}</span>
        </div>

        {totalSavings > 0 && (
          <div className="flex justify-between text-primary font-semibold">
            <span>Item Discount Savings</span>
            <span>-₹{totalSavings.toFixed(0)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-muted">Delivery Charges</span>
          <span>
            {deliveryFee === 0 ? (
              <strong className="text-primary">FREE</strong>
            ) : (
              `₹${deliveryFee}`
            )}
          </span>
        </div>

        {appliedCoupon && couponDiscount > 0 && (
          <div className="flex justify-between text-primary font-bold">
            <span>Promo Coupon ({appliedCoupon.code})</span>
            <span>-₹{couponDiscount}</span>
          </div>
        )}

        <div className="flex justify-between font-bold text-base text-text-primary border-t pt-sm mt-xs">
          <span>Total Amount Payable</span>
          <span className="text-primary text-xl">₹{finalTotal.toFixed(0)}</span>
        </div>
      </div>

      {/* Security Badge */}
      <div className="flex items-center gap-xs text-xs text-muted mb-lg">
        <ShieldCheck size={16} className="text-primary" />
        <span>Safe & Secure 256-Bit Encrypted Checkout</span>
      </div>

      {/* Checkout CTA */}
      <button
        onClick={handleCheckout}
        disabled={cartItems.length === 0}
        className="btn btn-primary btn-lg btn-block checkout-cta-btn flex items-center justify-center gap-xs mb-sm"
      >
        <span>Proceed to Checkout</span>
        <ArrowRight size={18} />
      </button>

      {/* Continue Shopping Link */}
      <Link
        to="/categories"
        className="btn btn-outline btn-sm btn-block text-center flex items-center justify-center gap-xs"
      >
        <ArrowLeft size={14} />
        <span>Continue Shopping</span>
      </Link>
    </div>
  );
}

export default CartSummary;
