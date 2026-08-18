import React from 'react';
import { Truck, Zap, Clock, ShieldCheck } from 'lucide-react';
import './OrderDeliveryEstimate.css';

export function OrderDeliveryEstimate({ deliveryOption = 'standard', createdAt }) {
  const isExpress = deliveryOption === 'express';

  const calculateEstimate = () => {
    if (isExpress) {
      return 'Today within 60 Minutes';
    }

    const baseDate = createdAt ? new Date(createdAt) : new Date();
    const minDate = new Date(baseDate);
    minDate.setDate(baseDate.getDate() + 2);
    const maxDate = new Date(baseDate);
    maxDate.setDate(baseDate.getDate() + 3);

    const minStr = minDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    const maxStr = maxDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

    return `${minStr} – ${maxStr}`;
  };

  return (
    <div className="order-delivery-card">
      <div className="delivery-card-content">
        <div className="delivery-icon-box">
          {isExpress ? <Zap size={24} /> : <Truck size={24} />}
        </div>
        <div className="delivery-text-info">
          <span className="delivery-meta-label">
            <ShieldCheck size={13} className="inline-icon" /> Estimated Doorstep Arrival
          </span>
          <h4 className="delivery-date-title">{calculateEstimate()}</h4>
          <span className="delivery-method-subtitle">
            {isExpress ? 'Express Doorstep Shipping' : 'Standard Grocery Delivery'}
          </span>
        </div>
      </div>

      <div className="delivery-badge-pill">
        <Clock size={14} />
        <span>{isExpress ? '60 Min Express' : 'On-Time Guaranteed'}</span>
      </div>
    </div>
  );
}

export default OrderDeliveryEstimate;

