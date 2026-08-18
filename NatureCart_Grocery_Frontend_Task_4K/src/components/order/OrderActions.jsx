import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, ShoppingBag, Printer } from 'lucide-react';
import './OrderActions.css';

export function OrderActions({ orderId }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="order-actions-card">
      <Link to={`/orders/${orderId || 'NC-2026-82311'}`} className="btn-action-primary">
        <Truck size={18} />
        <span>Track Order Live</span>
      </Link>

      <div className="secondary-actions-row">
        <Link to="/categories" className="btn-action-secondary">
          <ShoppingBag size={16} />
          <span>Continue Shopping</span>
        </Link>

        <button
          type="button"
          onClick={handlePrint}
          className="btn-action-outline print-hide-btn"
        >
          <Printer size={16} />
          <span>Print Invoice</span>
        </button>
      </div>
    </div>
  );
}

export default OrderActions;

