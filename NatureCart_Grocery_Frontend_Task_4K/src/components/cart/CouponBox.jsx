import React, { useState } from 'react';
import { Tag, CheckCircle2, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';
import './CouponBox.css';

export function CouponBox() {
  const [inputCode, setInputCode] = useState('');
  const { appliedCoupon, applyCoupon, removeCoupon, couponDiscount } = useCart();
  const { showToast } = useNotification();

  const handleApply = (e) => {
    e.preventDefault();
    if (!inputCode.trim()) {
      showToast('Please enter a coupon code.', 'warning');
      return;
    }

    const result = applyCoupon(inputCode);
    showToast(result.message, result.success ? 'success' : 'warning');
    if (result.success) {
      setInputCode('');
    }
  };

  const handleRemove = () => {
    const result = removeCoupon();
    showToast(result.message, 'success');
  };

  return (
    <div className="coupon-box-card bg-surface p-md rounded-xl border mb-lg">
      <div className="flex items-center gap-xs font-bold text-xs text-text-primary mb-sm">
        <Tag size={16} className="text-primary" />
        <span>Apply Promo Code</span>
      </div>

      {!appliedCoupon ? (
        <form onSubmit={handleApply} className="flex gap-xs">
          <input
            type="text"
            placeholder="Try 'NATURE10' or 'FRESH50'..."
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            className="input-field coupon-input text-xs uppercase"
          />
          <button type="submit" className="btn btn-primary btn-sm px-md">
            Apply
          </button>
        </form>
      ) : (
        <div className="applied-coupon-row flex items-center justify-between p-sm rounded-lg bg-primary-soft border border-primary">
          <div className="flex items-center gap-xs">
            <CheckCircle2 size={16} className="text-primary" />
            <div>
              <div className="font-bold text-xs text-primary-dark">{appliedCoupon.code}</div>
              <div className="text-xs text-muted">{appliedCoupon.description} (-₹{couponDiscount})</div>
            </div>
          </div>
          <button
            onClick={handleRemove}
            className="p-xs text-muted hover:text-danger"
            title="Remove Coupon"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

export default CouponBox;
