import React from 'react';
import { MapPin, CreditCard, ShieldCheck, CheckCircle2, User, Phone, Navigation } from 'lucide-react';
import './OrderInfoCards.css';

export function OrderInfoCards({ address, paymentMethod }) {
  const isCod = String(paymentMethod || '').toUpperCase() === 'COD';

  return (
    <div className="order-info-cards-grid">
      {/* Delivery Address Card */}
      <div className="order-info-card">
        <div className="info-card-header">
          <div className="info-header-icon">
            <MapPin size={18} />
          </div>
          <h3 className="info-header-title">Delivering To</h3>
        </div>

        {address ? (
          <div className="info-card-body">
            <div className="recipient-row">
              <span className="recipient-name">{address.fullName || address.name}</span>
              <span className="address-type-tag">{address.type || 'Home'}</span>
            </div>
            <p className="address-line">
              {address.house}, {address.street || address.area}
            </p>
            <p className="address-line">
              {address.city}, {address.state} — <strong>{address.pincode}</strong>
            </p>
            {address.landmark && (
              <p className="landmark-text">
                <Navigation size={12} className="inline-icon" /> Landmark: {address.landmark}
              </p>
            )}
            <div className="phone-row">
              <Phone size={13} />
              <span>Mobile: <strong>{address.phone}</strong></span>
            </div>
          </div>
        ) : (
          <div className="info-card-body">
            <p className="address-line">Delivery address confirmed.</p>
          </div>
        )}
      </div>

      {/* Payment Information Card */}
      <div className="order-info-card">
        <div className="info-card-header">
          <div className="info-header-icon">
            <CreditCard size={18} />
          </div>
          <h3 className="info-header-title">Payment Details</h3>
        </div>

        <div className="info-card-body">
          <div className="payment-method-row">
            <span className="payment-label">Payment Method:</span>
            <span className="payment-chip">{paymentMethod || 'COD'}</span>
          </div>

          <div className={`payment-status-box ${isCod ? 'is-cod' : 'is-paid'}`}>
            <CheckCircle2 size={16} />
            <span>
              {isCod
                ? 'Payment Mode: Cash on Delivery (Pay at Doorstep)'
                : 'Payment Status: Payment Successful'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderInfoCards;

