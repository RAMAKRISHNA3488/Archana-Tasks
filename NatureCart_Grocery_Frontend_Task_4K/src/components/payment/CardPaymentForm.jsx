import React from 'react';
import { CreditCard, Lock } from 'lucide-react';
import './CardPaymentForm.css';

export function CardPaymentForm({ cardData, onChangeCardData, errors }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedVal = value;

    if (name === 'number') {
      formattedVal = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
    } else if (name === 'expiry') {
      formattedVal = value.replace(/\D/g, '').replace(/(.{2})/, '$1/').slice(0, 5);
    } else if (name === 'cvv') {
      formattedVal = value.replace(/\D/g, '').slice(0, 4);
    }

    onChangeCardData({ ...cardData, [name]: formattedVal });
  };

  return (
    <div className="card-payment-form p-md rounded-lg bg-bg-cream border mt-sm">
      <div className="grid grid-cols-2 gap-md mb-sm">
        {/* Card Number */}
        <div className="col-span-2">
          <label className="form-label text-xs font-semibold text-text-primary mb-xs block">
            Card Number *
          </label>
          <div className="relative">
            <input
              type="text"
              name="number"
              placeholder="4532 •••• •••• 8921"
              value={cardData.number || ''}
              onChange={handleChange}
              className={`input-field text-xs ${errors?.number ? 'error' : ''}`}
            />
            <CreditCard size={18} className="card-input-icon text-muted" />
          </div>
          {errors?.number && <span className="text-xs text-danger mt-xs block">{errors.number}</span>}
        </div>

        {/* Cardholder Name */}
        <div className="col-span-2">
          <label className="form-label text-xs font-semibold text-text-primary mb-xs block">
            Cardholder Name *
          </label>
          <input
            type="text"
            name="name"
            placeholder="e.g. Archana Sharma"
            value={cardData.name || ''}
            onChange={handleChange}
            className={`input-field text-xs ${errors?.name ? 'error' : ''}`}
          />
          {errors?.name && <span className="text-xs text-danger mt-xs block">{errors.name}</span>}
        </div>

        {/* Expiry Date */}
        <div>
          <label className="form-label text-xs font-semibold text-text-primary mb-xs block">
            Expiry (MM/YY) *
          </label>
          <input
            type="text"
            name="expiry"
            placeholder="MM/YY"
            value={cardData.expiry || ''}
            onChange={handleChange}
            className={`input-field text-xs ${errors?.expiry ? 'error' : ''}`}
          />
          {errors?.expiry && <span className="text-xs text-danger mt-xs block">{errors.expiry}</span>}
        </div>

        {/* CVV */}
        <div>
          <label className="form-label text-xs font-semibold text-text-primary mb-xs block flex items-center gap-xs">
            <span>CVV *</span>
            <Lock size={12} className="text-muted" />
          </label>
          <input
            type="password"
            name="cvv"
            maxLength={4}
            placeholder="•••"
            value={cardData.cvv || ''}
            onChange={handleChange}
            className={`input-field text-xs ${errors?.cvv ? 'error' : ''}`}
          />
          {errors?.cvv && <span className="text-xs text-danger mt-xs block">{errors.cvv}</span>}
        </div>
      </div>

      <p className="text-[11px] text-muted flex items-center gap-xs">
        <Lock size={12} />
        <span>Your card credentials are validated locally and never stored on servers.</span>
      </p>
    </div>
  );
}

export default CardPaymentForm;
