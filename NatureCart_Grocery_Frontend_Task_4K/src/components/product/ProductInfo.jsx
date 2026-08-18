import React from 'react';
import { Star, ShoppingBag, Heart, Zap, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import QuantitySelector from './QuantitySelector';
import './ProductInfo.css';

export function ProductInfo({
  product,
  quantity,
  onQuantityIncrease,
  onQuantityDecrease,
  onAddToCart,
  onBuyNow,
  onWishlistToggle,
  isWishlisted
}) {
  const isOutOfStock = !product.inStock || product.availability === 'Out of Stock';
  const savings = product.originalPrice && product.originalPrice > product.price 
    ? product.originalPrice - product.price 
    : 0;

  return (
    <div className="product-info-column flex flex-col justify-between h-full">
      <div>
        {/* Brand & Stock Status Header */}
        <div className="flex items-center justify-between mb-xs">
          <span className="badge badge-primary font-bold text-xs">{product.brand}</span>
          <span className={`stock-status-pill ${isOutOfStock ? 'out-of-stock' : 'in-stock'}`}>
            {isOutOfStock ? 'Out of Stock' : 'In Stock'}
          </span>
        </div>

        {/* Product Title & Weight */}
        <h1 className="product-info-title text-3xl font-bold mt-xs">{product.name}</h1>
        <p className="product-info-unit text-sm text-muted mt-xs">{product.weight || product.unit}</p>

        {/* Ratings & Reviews */}
        <div className="flex items-center gap-xs mt-sm pb-sm border-b">
          <div className="flex text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
            ))}
          </div>
          <span className="text-xs font-bold text-text-primary ml-xs">{product.rating}</span>
          <span className="text-xs text-muted">({product.reviewCount} verified reviews)</span>
        </div>

        {/* Price Hierarchy */}
        <div className="price-hierarchy-box flex items-center gap-md my-md">
          <span className="price-main text-3xl font-bold text-primary">₹{product.price}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="price-struck text-lg text-muted line-through">₹{product.originalPrice}</span>
          )}
          {product.discountPercentage && (
            <span className="badge badge-discount">{product.discountPercentage}% OFF</span>
          )}
          {savings > 0 && (
            <span className="text-xs font-semibold text-primary-dark bg-primary-soft px-sm py-xs rounded-md ml-auto">
              Save ₹{savings}
            </span>
          )}
        </div>

        {/* Short Description */}
        <p className="product-info-desc text-sm text-secondary leading-relaxed mb-lg">
          {product.description}
        </p>
      </div>

      {/* Action Area: Quantity + Add to Cart + Buy Now + Wishlist */}
      <div className="product-actions-area pt-md border-t">
        <div className="flex items-center gap-md mb-md flex-wrap">
          <span className="text-xs font-semibold text-muted">Quantity:</span>
          <QuantitySelector
            quantity={quantity}
            onIncrease={onQuantityIncrease}
            onDecrease={onQuantityDecrease}
            disabled={isOutOfStock}
          />
          <button
            onClick={onWishlistToggle}
            className={`btn btn-outline btn-lg wishlist-action-btn ${isWishlisted ? 'wishlisted' : ''}`}
            title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <Heart size={20} fill={isWishlisted ? '#d32f2f' : 'none'} color={isWishlisted ? '#d32f2f' : '#798a7c'} />
          </button>
        </div>

        <div className="flex gap-md mb-lg">
          <button
            onClick={onAddToCart}
            disabled={isOutOfStock}
            className="btn btn-primary btn-lg flex-1 flex items-center justify-center gap-xs"
          >
            <ShoppingBag size={20} />
            <span>{isOutOfStock ? 'Out of Stock' : 'Add to Cart'}</span>
          </button>

          <button
            onClick={onBuyNow}
            disabled={isOutOfStock}
            className="btn btn-secondary btn-lg flex-1 flex items-center justify-center gap-xs buy-now-btn"
          >
            <Zap size={20} />
            <span>Buy Now</span>
          </button>
        </div>

        {/* Trust Badges Footer Bar */}
        <div className="trust-badges-bar grid grid-cols-3 gap-xs pt-md border-t text-center">
          <div className="flex flex-col items-center gap-xs p-xs">
            <Truck size={18} className="text-primary" />
            <span className="text-xs font-semibold text-text-secondary">60-Min Express</span>
          </div>
          <div className="flex flex-col items-center gap-xs p-xs">
            <ShieldCheck size={18} className="text-primary" />
            <span className="text-xs font-semibold text-text-secondary">100% Authentic</span>
          </div>
          <div className="flex flex-col items-center gap-xs p-xs">
            <RotateCcw size={18} className="text-primary" />
            <span className="text-xs font-semibold text-text-secondary">Easy Returns</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
