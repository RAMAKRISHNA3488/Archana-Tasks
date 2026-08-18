import React from 'react';
import { ShoppingBag, PackageCheck } from 'lucide-react';
import './OrderItemsList.css';

export function OrderItemsList({ items = [] }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="order-items-card">
      <div className="items-card-header">
        <div className="items-header-title-box">
          <div className="items-header-icon">
            <ShoppingBag size={18} />
          </div>
          <h3 className="items-header-title">Ordered Products</h3>
        </div>
        <span className="items-count-badge">{items.length} {items.length === 1 ? 'Item' : 'Items'}</span>
      </div>

      <div className="items-list-container">
        {items.map(item => {
          const { product, quantity } = item;
          const itemSubtotal = (product.price || 0) * quantity;

          return (
            <div key={product.id || product._id || product.name} className="order-product-item">
              <div className="product-item-main">
                <div className="product-thumb-box">
                  <img src={product.image} alt={product.name} className="product-thumb-img" />
                  <span className="qty-badge-over">x{quantity}</span>
                </div>

                <div className="product-details-info">
                  <h4 className="product-name">{product.name}</h4>
                  <div className="product-meta-row">
                    <span className="product-unit-tag">{product.weight || product.unit || 'Pack'}</span>
                    <span className="product-unit-price">
                      ₹{product.price} × {quantity}
                    </span>
                  </div>
                </div>
              </div>

              <div className="product-item-subtotal">
                <span className="subtotal-label">Subtotal</span>
                <span className="subtotal-amount">₹{itemSubtotal}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrderItemsList;

