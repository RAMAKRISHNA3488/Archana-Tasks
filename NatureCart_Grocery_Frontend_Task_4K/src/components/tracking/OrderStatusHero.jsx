import React from 'react';
import { getStatusConfig } from '../../data/orderStatuses';
import './OrderStatusHero.css';

export function OrderStatusHero({ status = 'Order Confirmed', deliveryOption = 'standard' }) {
  const statusConfig = getStatusConfig(status);
  const Icon = statusConfig.icon;
  const isCancelled = statusConfig.id === 'CANCELLED';

  const getArrivalEstimate = () => {
    if (isCancelled) return 'Order Cancelled';
    if (deliveryOption === 'express') return 'Today within 60 Minutes';
    return 'Expected in 2–3 Days';
  };

  return (
    <div className={`order-status-hero-card p-lg rounded-xl border mb-lg flex items-center justify-between ${
      isCancelled ? 'bg-discount-bg border-danger' : 'bg-primary-soft border-primary'
    }`}>
      <div className="flex items-center gap-md">
        <div className={`hero-status-circle p-md rounded-full ${
          isCancelled ? 'bg-surface text-danger' : 'bg-surface text-primary-dark shadow-sm'
        }`}>
          <Icon size={36} />
        </div>

        <div>
          <span className="text-xs font-semibold text-muted uppercase tracking-wider block">Current Live Status</span>
          <h2 className={`text-2xl font-bold ${isCancelled ? 'text-danger' : 'text-primary-dark'}`}>
            {statusConfig.label}
          </h2>
          <p className="text-xs text-secondary mt-xs max-w-md">
            {statusConfig.description}
          </p>
        </div>
      </div>

      <div className="text-right">
        <span className="text-xs text-muted block">Estimated Arrival</span>
        <span className={`font-bold text-sm ${isCancelled ? 'text-danger' : 'text-primary-dark'}`}>
          {getArrivalEstimate()}
        </span>
      </div>
    </div>
  );
}

export default OrderStatusHero;
