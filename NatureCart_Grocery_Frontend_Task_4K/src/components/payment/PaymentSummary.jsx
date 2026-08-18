import React from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import PaymentSecurity from './PaymentSecurity';
import './PaymentSummary.css';

export function PaymentSummary({
  deliveryOption = 'standard',
  selectedMethod = 'upi',
  isProcessing = false,
  onPay
}) {
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

  const getCtaLabel = () => {
    if (isProcessing) return 'Processing Payment...';
    if (selectedMethod === 'cod') return `Place COD Order (₹${grandTotal.toFixed(0)})`;
    return `Pay ₹${grandTotal.toFixed(0)}`;
  };

  return (
    <div className="payment-summary-card bg-surface p-lg rounded-xl border sticky top-24">
      <h3 className="text-lg font-bold mb-md pb-xs border-b">
        Payment Summary
      </h3>

      {/* Financial Breakdown */}
      <div className="summary-breakdown-rows flex flex-col gap-xs text-xs mb-md pb-sm border-b">
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

        {expressFee > 0 && (
          <div className="flex justify-between text-text-primary">
            <span>Express Delivery Fee</span>
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
          <span>Total Amount Payable</span>
          <span className="text-primary text-xl">₹{grandTotal.toFixed(0)}</span>
        </div>
      </div>

      {/* Reassurance Banner */}
      <PaymentSecurity />

      {/* Payment Action CTA */}
      <button
        type="button"
        onClick={onPay}
        disabled={isProcessing || cartItems.length === 0}
        className="btn btn-primary btn-lg btn-block pay-cta-btn flex items-center justify-center gap-xs"
      >
        {isProcessing ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            <span>Processing Order...</span>
          </>
        ) : (
          <>
            <span>{getCtaLabel()}</span>
            <ArrowRight size={18} />
          </>
        )}
      </button>
    </div>
  );
}

export default PaymentSummary;
