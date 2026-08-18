import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useNotification } from '../../context/NotificationContext';
import './ProductCard.css';

const DEFAULT_PRODUCT_IMAGE = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=300&q=80';

export function ProductCard({ product }) {
  const navigate = useNavigate();
  const { cartItems, addToCart, updateQuantity } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useNotification();

  const [imgSrc, setImgSrc] = useState(product.image || DEFAULT_PRODUCT_IMAGE);

  useEffect(() => {
    setImgSrc(product.image || DEFAULT_PRODUCT_IMAGE);
  }, [product.image, product.id]);

  const cartItem = cartItems.find(item => item.product.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;
  const isWishlisted = isInWishlist(product.id);

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    showToast(`${product.name} added to your cart.`, 'success');
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
    showToast(
      isWishlisted ? `${product.name} removed from wishlist.` : `${product.name} added to wishlist.`,
      'success'
    );
  };

  const handleImageError = () => {
    setImgSrc(DEFAULT_PRODUCT_IMAGE);
  };

  return (
    <div className="product-card flex flex-col justify-between" onClick={handleCardClick}>
      <div>
        {/* Badges & Wishlist Trigger */}
        <div className="product-card-header flex items-center justify-between">
          {product.discountPercentage ? (
            <span className="badge-discount">{product.discountPercentage}% OFF</span>
          ) : <span />}

          <button
            onClick={handleWishlistToggle}
            className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
            aria-label="Add to Wishlist"
          >
            <Heart size={18} fill={isWishlisted ? '#d32f2f' : 'none'} color={isWishlisted ? '#d32f2f' : '#798a7c'} />
          </button>
        </div>

        {/* Product Image */}
        <div className="product-image-box flex items-center justify-center">
          <img
            src={imgSrc}
            alt={product.name}
            onError={handleImageError}
            loading="lazy"
            className="product-img"
          />
        </div>

        {/* Product Body Details */}
        <div className="product-card-info">
          <h3 className="product-title text-sm font-semibold text-text-primary mb-[2px] line-clamp-2">
            {product.name}
          </h3>
          <p className="product-unit text-xs text-muted mb-xs">{product.weight || product.unit || 'Standard'}</p>
        </div>
      </div>

      {/* Product Price & Add to Cart Action (Pinned to Bottom) */}
      <div className="product-card-footer mt-xs">
        <div className="product-price-row flex items-center gap-xs mb-xs flex-wrap">
          <span className="price-current font-bold text-sm text-text-primary">₹{product.price}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="price-original text-xs text-muted line-through">₹{product.originalPrice}</span>
          )}
          {product.discountPercentage && (
            <span className="discount-tag text-[10px] font-bold text-discount-badge">{product.discountPercentage}% OFF</span>
          )}
        </div>

        {/* Add to Cart / Quantity Control */}
        <div className="product-card-action">
          {quantityInCart === 0 ? (
            <button onClick={handleAddToCart} className="add-cart-btn flex items-center justify-center gap-xs w-full">
              <ShoppingBag size={16} />
              <span>Add to Cart</span>
            </button>
          ) : (
            <div className="qty-control flex items-center justify-between w-full" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={(e) => { e.stopPropagation(); updateQuantity(product.id, quantityInCart - 1); }}
                className="qty-btn"
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              <span className="qty-count font-bold text-xs">{quantityInCart}</span>
              <button
                onClick={(e) => { e.stopPropagation(); updateQuantity(product.id, quantityInCart + 1); }}
                className="qty-btn"
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
