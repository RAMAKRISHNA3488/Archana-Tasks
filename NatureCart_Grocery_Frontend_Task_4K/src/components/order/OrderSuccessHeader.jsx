import React from 'react';
import { CheckCircle2, Calendar, Hash, Sparkles } from 'lucide-react';
import './OrderSuccessHeader.css';

export function OrderSuccessHeader({ orderId, orderDate }) {
  const formattedDate = orderDate
    ? new Date(orderDate).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    : new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="order-success-hero">
      <div className="hero-celebration-badge">
        <Sparkles size={14} />
        <span>Order Confirmed</span>
      </div>

      <div className="success-icon-wrapper">
        <div className="success-icon-pulse" />
        <div className="success-icon-circle">
          <CheckCircle2 size={44} className="success-check-animated" />
        </div>
      </div>

      <div className="order-id-badge-container">
        <span className="order-id-badge">
          <Hash size={14} />
          ORDER #{orderId || 'NC-2026-82311'}
        </span>
      </div>

      <h1 className="order-success-title">Order Placed Successfully!</h1>
      <p className="order-success-subtitle">
        Thank you for shopping with NatureCart. Your fresh grocery order has been confirmed and is currently being handpicked.
      </p>

      <div className="order-meta-info">
        <div className="meta-pill">
          <Calendar size={14} className="meta-icon" />
          <span>Order Placed On: <strong>{formattedDate}</strong></span>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccessHeader;

