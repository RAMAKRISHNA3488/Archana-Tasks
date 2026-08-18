import React from 'react';
import { Plus, Minus } from 'lucide-react';
import './QuantitySelector.css';

export function QuantitySelector({ quantity, onIncrease, onDecrease, min = 1, disabled = false }) {
  return (
    <div className="quantity-selector-box flex items-center">
      <button
        type="button"
        onClick={onDecrease}
        disabled={disabled || quantity <= min}
        className="qty-change-btn qty-minus"
        aria-label="Decrease quantity"
      >
        <Minus size={16} />
      </button>

      <span className="qty-value-display font-bold text-sm">{quantity}</span>

      <button
        type="button"
        onClick={onIncrease}
        disabled={disabled}
        className="qty-change-btn qty-plus"
        aria-label="Increase quantity"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}

export default QuantitySelector;
