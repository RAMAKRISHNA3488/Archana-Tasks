import React from 'react';
import './CheckoutProductItem.css';

export function CheckoutProductItem({ item }) {
  const { product, quantity } = item;
  const itemTotal = product.price * quantity;

  return (
    <div className="checkout-product-item flex items-center justify-between gap-sm py-xs border-b">
      <div className="flex items-center gap-sm">
        <div className="checkout-thumb-box">
          <img src={product.image} alt={product.name} className="checkout-thumb-img" />
          <span className="checkout-qty-badge">{quantity}</span>
        </div>

        <div>
          <h5 className="font-bold text-xs text-text-primary line-clamp-1">{product.name}</h5>
          <span className="text-xs text-muted">{product.weight || product.unit}</span>
        </div>
      </div>

      <span className="font-bold text-xs text-text-primary">₹{itemTotal}</span>
    </div>
  );
}

export default CheckoutProductItem;
