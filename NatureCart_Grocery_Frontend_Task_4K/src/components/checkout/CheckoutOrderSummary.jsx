import React from 'react';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import CheckoutProductItem from './CheckoutProductItem';
import CheckoutSecurityInfo from './CheckoutSecurityInfo';
import { useCart } from '../../context/CartContext';
import './CheckoutOrderSummary.css';

export function CheckoutOrderSummary({ deliveryOption, onContinueToPayment }) {
  const {
    cartItems,
    subtotal,
    totalSavings,
    deliveryFee,
    appliedCoupon,
    couponDiscount
  } = useCart();

  const expressFee = deliveryOption === 'express' ? 29 : 0;
  const finalFee = deliveryFee + expressFee;
  const grandTotal = Math.max(0, subtotal + finalFee - couponDiscount);

  return (
    <div className="checkout-summary-card bg-surface p-lg rounded-xl border sticky top-24">
      <h3 className="text-lg font-bold mb-md pb-xs border-b flex items-center justify-between">
        <span>Order Summary</span>
        <span className="text-xs text-muted font-normal">{cartItems.length} items</span>
      </h3>

      {/* Compact Products List */}
      <div className="checkout-items-list mb-md max-h-60 overflow-y-auto">
        {cartItems.map(item => (
          <CheckoutProductItem key={item.product.id} item={item} />
        ))}
      </div>

      {/* Financial Breakdown */}
      <div className="summary-breakdown-rows flex flex-col gap-xs text-xs mb-md pb-sm border-b">
        <div className="flex justify-between">
          <span className="text-muted">Subtotal</span>
          <span className="font-semibold">₹{subtotal.toFixed(0)}</span>
        </div>

        {totalSavings > 0 && (
          <div className="flex justify-between text-primary font-semibold">
            <span>Item Savings</span>
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

        {expressFee > 0 && (
          <div className="flex justify-between text-text-primary">
            <span>Express Delivery Option</span>
            <span>+₹{expressFee}</span>
          </div>
        )}

        {appliedCoupon && couponDiscount > 0 && (
          <div className="flex justify-between text-primary font-bold">
            <span>Coupon ({appliedCoupon.code})</span>
            <span>-₹{couponDiscount}</span>
          </div>
        )}

        <div className="flex justify-between font-bold text-base text-text-primary border-t pt-sm mt-xs">
          <span>Total Payable</span>
          <span className="text-primary text-xl">₹{grandTotal.toFixed(0)}</span>
        </div>
      </div>

      {/* Security reassurance icons */}
      <CheckoutSecurityInfo />

      {/* Primary CTA */}
      <button
        onClick={onContinueToPayment}
        className="btn btn-primary btn-lg btn-block flex items-center justify-center gap-xs continue-payment-btn"
      >
        <span>Continue to Payment</span>
        <ArrowRight size={18} />
      </button>
    </div>
  );
}

export default CheckoutOrderSummary;
