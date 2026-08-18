import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Heart } from 'lucide-react';
import QuantitySelector from '../product/QuantitySelector';
import ConfirmationModal from '../common/ConfirmationModal';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useNotification } from '../../context/NotificationContext';
import './CartItemRow.css';

export function CartItemRow({ item }) {
  const { updateQuantity, removeFromCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useNotification();
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const { product, quantity } = item;
  const isWishlisted = isInWishlist(product.id);
  const itemSubtotal = product.price * quantity;

  const handleIncrease = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      setShowRemoveModal(true);
    }
  };

  const handleConfirmRemove = () => {
    removeFromCart(product.id);
    setShowRemoveModal(false);
    showToast(`${product.name} removed from your cart.`, 'success');
  };

  const handleMoveToWishlist = () => {
    if (!isWishlisted) {
      toggleWishlist(product);
    }
    removeFromCart(product.id);
    showToast(`${product.name} moved to your wishlist.`, 'success');
  };

  return (
    <>
      <div className="cart-item-row-card flex items-center justify-between gap-md p-md bg-surface rounded-xl border mb-sm">
        {/* Product Image & Title */}
        <div className="flex items-center gap-md flex-1">
          <Link to={`/product/${product.id}`} className="cart-item-thumb-box">
            <img src={product.image} alt={product.name} className="cart-item-thumb-img" />
          </Link>

          <div>
            <span className="badge badge-primary text-xs mb-xs">{product.brand}</span>
            <Link to={`/product/${product.id}`} className="cart-item-name font-bold text-sm text-text-primary block hover:text-primary">
              {product.name}
            </Link>
            <span className="text-xs text-muted">{product.weight || product.unit}</span>

            <div className="flex items-center gap-xs mt-xs">
              <span className="font-bold text-sm">₹{product.price}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-muted line-through">₹{product.originalPrice}</span>
              )}
              {product.discountPercentage && (
                <span className="badge-discount text-xs">{product.discountPercentage}% OFF</span>
              )}
            </div>
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-md">
          <QuantitySelector
            quantity={quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />

          {/* Item Subtotal */}
          <div className="text-right min-w-24">
            <div className="text-xs text-muted">Subtotal</div>
            <div className="font-bold text-base text-primary">₹{itemSubtotal}</div>
          </div>

          {/* Actions: Wishlist & Remove */}
          <div className="flex items-center gap-xs">
            <button
              onClick={handleMoveToWishlist}
              className="action-icon-btn text-muted hover:text-primary"
              title="Move to Wishlist"
            >
              <Heart size={18} fill={isWishlisted ? '#d32f2f' : 'none'} color={isWishlisted ? '#d32f2f' : 'currentColor'} />
            </button>
            <button
              onClick={() => setShowRemoveModal(true)}
              className="action-icon-btn text-muted hover:text-danger"
              title="Remove Item"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Remove Item Confirmation Modal */}
      <ConfirmationModal
        isOpen={showRemoveModal}
        title="Remove Product"
        message={`Remove ${product.name} from your shopping cart?`}
        confirmText="Remove"
        onConfirm={handleConfirmRemove}
        onCancel={() => setShowRemoveModal(false)}
      />
    </>
  );
}

export default CartItemRow;
