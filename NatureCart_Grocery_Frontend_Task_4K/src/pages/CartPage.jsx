import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2 } from 'lucide-react';
import Breadcrumb from '../components/common/Breadcrumb';
import DeliveryProgress from '../components/cart/DeliveryProgress';
import CartItemRow from '../components/cart/CartItemRow';
import CartSummary from '../components/cart/CartSummary';
import EmptyCart from '../components/cart/EmptyCart';
import CartSkeleton from '../components/cart/CartSkeleton';
import ConfirmationModal from '../components/common/ConfirmationModal';
import ProductGrid from '../components/product/ProductGrid';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';
import { PRODUCTS } from '../data/products';

export function CartPage() {
  const { cartItems, clearCart, subtotal, totalItemsCount } = useCart();
  const { showToast } = useNotification();
  const [isLoading, setIsLoading] = useState(true);
  const [showClearModal, setShowClearModal] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const handleConfirmClear = () => {
    clearCart();
    setShowClearModal(false);
    showToast('Your cart has been cleared.', 'success');
  };

  // Recommended products (excluding items currently in cart)
  const cartProductIds = new Set(cartItems.map(i => i.product.id));
  const recommendedProducts = PRODUCTS.filter(p => !cartProductIds.has(p.id)).slice(0, 4);

  const breadcrumbItems = [{ label: 'Cart' }];

  return (
    <div className="cart-page container py-lg">
      {/* 1. Breadcrumbs */}
      <Breadcrumb items={breadcrumbItems} />

      {isLoading ? (
        <CartSkeleton />
      ) : cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          {/* 2. Cart Page Header */}
          <div className="cart-page-header flex items-center justify-between mb-lg pb-sm border-b">
            <div>
              <h1 className="text-3xl font-bold text-text-primary">Your Shopping Cart</h1>
              <p className="text-sm text-muted mt-xs">
                Review your items ({totalItemsCount} {totalItemsCount === 1 ? 'unit' : 'units'}) before proceeding to checkout.
              </p>
            </div>

            <button
              onClick={() => setShowClearModal(true)}
              className="btn btn-outline btn-sm text-danger border-danger hover:bg-discount-bg"
            >
              <Trash2 size={16} />
              <span>Clear Cart</span>
            </button>
          </div>

          {/* 3. Main Cart Grid Layout */}
          <div className="grid grid-cols-3 gap-xl items-start">
            {/* Left 2 Cols: Free Delivery Progress & Items List */}
            <div className="col-span-2 cart-items-section">
              <DeliveryProgress subtotal={subtotal} />

              <div className="cart-items-list">
                {cartItems.map(item => (
                  <CartItemRow key={item.product.id} item={item} />
                ))}
              </div>
            </div>

            {/* Right Col: Cart Financial Summary */}
            <div className="cart-summary-section">
              <CartSummary />
            </div>
          </div>

          {/* 4. You May Also Like / Recommended Products */}
          {recommendedProducts.length > 0 && (
            <div className="recommended-cart-section mt-2xl pt-lg border-t">
              <h2 className="text-2xl font-bold mb-md">You May Also Like</h2>
              <ProductGrid products={recommendedProducts} />
            </div>
          )}

          {/* Clear Cart Confirmation Modal */}
          <ConfirmationModal
            isOpen={showClearModal}
            title="Clear Shopping Cart"
            message="Are you sure you want to remove all items from your shopping cart?"
            confirmText="Clear All Items"
            onConfirm={handleConfirmClear}
            onCancel={() => setShowClearModal(false)}
          />
        </>
      )}
    </div>
  );
}

export default CartPage;
