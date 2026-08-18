import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Truck, Edit2, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import './OrderReview.css';

export function OrderReview({ deliveryOption = 'standard' }) {
  const { cartItems } = useCart();
  const { selectedAddress } = useAuth();

  return (
    <div className="order-review-card bg-surface p-lg rounded-xl border mb-lg">
      <h3 className="text-base font-bold text-text-primary mb-md pb-xs border-b">
        Delivery & Order Details
      </h3>

      <div className="grid grid-cols-2 gap-md mb-md">
        {/* Selected Address Summary */}
        <div className="review-box p-sm rounded-lg bg-bg-cream border">
          <div className="flex items-center justify-between mb-xs">
            <div className="flex items-center gap-xs font-bold text-xs text-text-primary">
              <MapPin size={14} className="text-primary" />
              <span>Delivering To</span>
            </div>
            <Link to="/checkout" className="text-xs font-semibold text-primary hover:underline flex items-center gap-xs">
              <Edit2 size={12} />
              <span>Change</span>
            </Link>
          </div>

          {selectedAddress ? (
            <div className="text-xs text-secondary leading-relaxed">
              <p className="font-bold text-text-primary">{selectedAddress.fullName || selectedAddress.name}</p>
              <p>{selectedAddress.house}, {selectedAddress.street || selectedAddress.area}</p>
              <p>{selectedAddress.city}, {selectedAddress.state} - <strong>{selectedAddress.pincode}</strong></p>
              <p className="font-semibold mt-xs">Mobile: {selectedAddress.phone}</p>
            </div>
          ) : (
            <p className="text-xs text-danger">No address selected.</p>
          )}
        </div>

        {/* Selected Delivery Option Summary */}
        <div className="review-box p-sm rounded-lg bg-bg-cream border">
          <div className="flex items-center justify-between mb-xs">
            <div className="flex items-center gap-xs font-bold text-xs text-text-primary">
              <Truck size={14} className="text-primary" />
              <span>Delivery Option</span>
            </div>
            <Link to="/checkout" className="text-xs font-semibold text-primary hover:underline flex items-center gap-xs">
              <Edit2 size={12} />
              <span>Change</span>
            </Link>
          </div>

          <div className="text-xs text-secondary leading-relaxed">
            <p className="font-bold text-text-primary">
              {deliveryOption === 'express' ? 'Express 60-Minute Delivery' : 'Standard Doorstep Delivery'}
            </p>
            <p className="text-muted">
              {deliveryOption === 'express' ? 'Delivered within 60 Minutes (+₹29)' : 'Delivered in 2–3 Days'}
            </p>
          </div>
        </div>
      </div>

      {/* Compact Ordered Products List */}
      <div>
        <div className="flex items-center gap-xs text-xs font-bold text-text-primary mb-xs">
          <ShoppingBag size={14} className="text-primary" />
          <span>Items in Order ({cartItems.length})</span>
        </div>

        <div className="flex gap-sm overflow-x-auto py-xs">
          {cartItems.map(item => (
            <div key={item.product.id} className="compact-item-pill flex items-center gap-xs p-xs rounded-lg bg-bg-cream border flex-shrink-0">
              <img src={item.product.image} alt={item.product.name} className="compact-item-img" />
              <div className="text-[11px]">
                <div className="font-bold line-clamp-1 max-w-[100px]">{item.product.name}</div>
                <div className="text-muted">Qty: {item.quantity} × ₹{item.product.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderReview;
