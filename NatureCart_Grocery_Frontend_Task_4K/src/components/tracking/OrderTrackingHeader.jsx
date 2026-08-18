import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { getStatusConfig } from '../../data/orderStatuses';
import './OrderTrackingHeader.css';

export function OrderTrackingHeader({ orderId, orderDate, status, deliveryOption }) {
  const statusConfig = getStatusConfig(status);
  const formattedDate = orderDate
    ? new Date(orderDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    : new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="order-tracking-header bg-surface p-lg rounded-xl border mb-lg flex items-center justify-between flex-wrap gap-md shadow-sm">
      <div>
        <div className="flex items-center gap-xs mb-xs">
          <span className="badge badge-primary font-bold text-xs">Track Your Order</span>
          <span className={`stock-status-pill ${statusConfig.id === 'CANCELLED' ? 'out-of-stock' : 'in-stock'}`}>
            {statusConfig.label}
          </span>
        </div>

        <h1 className="text-2xl font-bold text-text-primary">Order #{orderId}</h1>

        <div className="flex items-center gap-md text-xs text-muted mt-xs flex-wrap">
          <span className="flex items-center gap-xs">
            <Calendar size={14} className="text-primary" />
            <span>Placed On: <strong>{formattedDate}</strong></span>
          </span>
          <span className="flex items-center gap-xs">
            <Clock size={14} className="text-primary" />
            <span>Delivery: <strong>{deliveryOption === 'express' ? '60 Min Express' : 'Standard 2–3 Days'}</strong></span>
          </span>
        </div>
      </div>

      <div className="text-right">
        <div className="text-xs text-muted">Tracking Reference</div>
        <div className="font-bold text-sm text-primary">TRK-{orderId}</div>
      </div>
    </div>
  );
}

export default OrderTrackingHeader;
