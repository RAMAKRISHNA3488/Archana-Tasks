import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './CartItem.css';

export function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  return (
    <div className="cart-item-card flex items-center gap-md p-sm rounded-xl bg-surface border shadow-xs transition-shadow hover:shadow-sm">
      {/* Product Image Thumbnail */}
      <div className="cart-item-img-box flex-shrink-0">
        <img src={product.image} alt={product.name} className="cart-item-img" />
      </div>
      
      {/* Product Information */}
      <div className="cart-item-info flex-1 min-w-0">
        <h4 className="cart-item-title text-xs font-bold text-text-primary truncate">{product.name}</h4>
        <span className="cart-item-unit text-xs text-muted block mt-xs">{product.weight || product.unit}</span>
        
        <div className="cart-item-price-wrap flex items-center gap-xs mt-xs">
          <span className="price-bold text-sm font-bold text-primary">₹{product.price}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="price-old text-xs text-muted line-through">₹{product.originalPrice}</span>
          )}
        </div>
      </div>

      {/* Quantity & Delete Controls */}
      <div className="cart-item-actions flex flex-col items-end gap-xs flex-shrink-0">
        <button
          onClick={() => removeFromCart(product.id)}
          className="cart-delete-btn p-xs rounded-md text-text-muted hover:text-danger transition-colors"
          title="Remove item"
          aria-label="Remove item"
        >
          <Trash2 size={16} />
        </button>
        
        <div className="qty-picker-pill flex items-center border rounded-lg bg-bg-cream overflow-hidden">
          <button
            onClick={() => updateQuantity(product.id, quantity - 1)}
            className="qty-btn px-xs py-xs text-text-primary hover:bg-primary-soft hover:text-primary transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus size={12} />
          </button>
          <span className="qty-val font-bold text-xs px-xs text-text-primary text-center">{quantity}</span>
          <button
            onClick={() => updateQuantity(product.id, quantity + 1)}
            className="qty-btn px-xs py-xs text-text-primary hover:bg-primary-soft hover:text-primary transition-colors"
            aria-label="Increase quantity"
          >
            <Plus size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
