import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import CategoryPage from '../pages/CategoryPage';
import BrandsPage from '../pages/BrandsPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import OffersPage from '../pages/OffersPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import PaymentPage from '../pages/PaymentPage';
import OrderSuccessPage from '../pages/OrderSuccessPage';
import OrderTrackingPage from '../pages/OrderTrackingPage';
import AccountPage from '../pages/AccountPage';
import WishlistPage from '../pages/WishlistPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import ContactPage from '../pages/ContactPage';
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage';
import TermsPage from '../pages/TermsPage';
import ShippingPolicyPage from '../pages/ShippingPolicyPage';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import NotFoundPage from '../pages/NotFoundPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/categories" element={<CategoryPage />} />
      <Route path="/categories/:categoryId" element={<CategoryPage />} />
      <Route path="/category/:categoryId" element={<CategoryPage />} />
      <Route path="/brands" element={<BrandsPage />} />
      <Route path="/brands/:brandId" element={<BrandsPage />} />
      <Route path="/brand/:brandId" element={<BrandsPage />} />
      <Route path="/shop" element={<CategoryPage />} />
      <Route path="/products/:productId" element={<ProductDetailPage />} />
      <Route path="/product/:productId" element={<ProductDetailPage />} />
      <Route path="/offers" element={<OffersPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/order-confirmation" element={<OrderSuccessPage />} />
      <Route path="/order-confirmation/:orderId" element={<OrderSuccessPage />} />
      <Route path="/orders/:orderId" element={<OrderTrackingPage />} />
      <Route path="/orders" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />
      <Route path="/account" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/terms-and-conditions" element={<TermsPage />} />
      <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
      <Route path="/shipping" element={<ShippingPolicyPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
