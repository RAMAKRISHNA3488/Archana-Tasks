import React from 'react';
import { Receipt, Tag, CheckCircle2 } from 'lucide-react';
import './OrderFinancialSummary.css';

export function OrderFinancialSummary({ subtotal = 0, deliveryFee = 0, appliedCoupon, couponDiscount = 0, totalAmount = 0, isCod = false }) {
  return (
    <div className="financial-summary-card">
      <div className="summary-card-header">
        <div className="summary-header-icon">
          <Receipt size={18} />
        </div>
        <h3 className="summary-header-title">Payment & Price Breakdown</h3>
      </div>

      <div className="summary-rows-container">
        <div className="summary-row">
          <span className="row-label">Items Subtotal</span>
          <span className="row-value">₹{subtotal.toFixed(0)}</span>
        </div>

        <div className="summary-row">
          <span className="row-label">Delivery Charges</span>
          <span className="row-value">
            {deliveryFee === 0 ? (
              <span className="free-delivery-badge">FREE</span>
            ) : (
              `₹${deliveryFee}`
            )}
          </span>
        </div>

        {appliedCoupon && couponDiscount > 0 && (
          <div className="summary-row coupon-discount-row">
            <span className="row-label">
              <Tag size={13} className="inline-icon" /> Coupon Discount ({appliedCoupon.code})
            </span>
            <span className="row-value discount-amount">-₹{couponDiscount}</span>
          </div>
        )}

        <div className="summary-divider" />

        <div className="summary-total-row">
          <div className="total-label-box">
            <span className="total-label">{isCod ? 'Total Payable on Delivery' : 'Total Amount Paid'}</span>
            <span className="tax-inclusive-tag">Taxes Included</span>
          </div>
          <span className="total-amount-display">₹{totalAmount.toFixed(0)}</span>
        </div>

        {isCod && (
          <div className="cod-notice-bar">
            <CheckCircle2 size={14} />
            <span>Please keep exact cash ready at time of delivery</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderFinancialSummary;

