import React, { createContext, useContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { validateCoupon } from '../data/coupons';
import { CART_CONFIG } from '../data/cartConfig';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useLocalStorage('naturecart_cart', []);
  const [appliedCoupon, setAppliedCoupon] = useLocalStorage('naturecart_coupon', null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingIndex = prevItems.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prevItems, { product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(prev => !prev);

  // Calculations
  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const originalSubtotal = cartItems.reduce(
    (sum, item) => sum + (item.product.originalPrice || item.product.price) * item.quantity,
    0
  );

  const totalSavings = originalSubtotal - subtotal;

  const deliveryFee =
    subtotal >= CART_CONFIG.FREE_DELIVERY_THRESHOLD || subtotal === 0
      ? 0
      : CART_CONFIG.STANDARD_DELIVERY_FEE;

  // Coupon Logic
  let couponDiscount = 0;
  if (appliedCoupon && subtotal > 0) {
    const valResult = validateCoupon(appliedCoupon.code, subtotal);
    if (valResult.valid) {
      couponDiscount = valResult.discountAmount;
    } else {
      // Clear invalid coupon automatically
      setAppliedCoupon(null);
    }
  }

  const applyCoupon = (code) => {
    if (appliedCoupon && appliedCoupon.code.toUpperCase() === code.trim().toUpperCase()) {
      return { success: false, message: 'Coupon is already applied.' };
    }
    const result = validateCoupon(code, subtotal);
    if (result.valid) {
      setAppliedCoupon({
        code: result.coupon.code,
        description: result.coupon.description,
        discountAmount: result.discountAmount
      });
      return { success: true, message: result.message };
    }
    return { success: false, message: result.message };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    return { success: true, message: 'Coupon removed.' };
  };

  const finalTotal = Math.max(0, subtotal + deliveryFee - couponDiscount);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        toggleCart,
        totalItemsCount,
        subtotal,
        originalSubtotal,
        totalSavings,
        deliveryFee,
        appliedCoupon,
        couponDiscount,
        applyCoupon,
        removeCoupon,
        finalTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
