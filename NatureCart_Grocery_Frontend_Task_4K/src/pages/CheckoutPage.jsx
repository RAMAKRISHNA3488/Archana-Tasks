import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import Breadcrumb from '../components/common/Breadcrumb';
import CheckoutProgress from '../components/checkout/CheckoutProgress';
import AddressList from '../components/checkout/AddressList';
import DeliveryOptions from '../components/checkout/DeliveryOptions';
import CheckoutOrderSummary from '../components/checkout/CheckoutOrderSummary';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { useLocalStorage } from '../hooks/useLocalStorage';

export function CheckoutPage() {
  const { cartItems, subtotal } = useCart();
  const { selectedAddress } = useAuth();
  const { showToast } = useNotification();
  const navigate = useNavigate();

  const [deliveryOption, setDeliveryOption] = useState('standard');
  const [, setCheckoutSession] = useLocalStorage('naturecart_checkout_session', null);

  const breadcrumbItems = [
    { label: 'Cart', link: '/cart' },
    { label: 'Checkout' }
  ];

  // 1. Empty Cart Protection
  if (cartItems.length === 0) {
    return (
      <div className="checkout-empty-protection container py-2xl text-center">
        <div className="max-w-md mx-auto bg-surface p-2xl rounded-xl border shadow-sm">
          <div className="empty-icon-circle mx-auto mb-md flex items-center justify-center bg-bg-cream rounded-full w-20 h-20">
            <ShoppingBag size={48} className="text-muted" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-xs">Your Cart is Empty</h2>
          <p className="text-sm text-muted mb-lg">
            Add products to your cart before proceeding to checkout.
          </p>
          <Link to="/categories" className="btn btn-primary btn-lg inline-flex items-center gap-xs">
            <ArrowLeft size={18} />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  // 2. Continue to Payment Action
  const handleContinueToPayment = () => {
    if (!selectedAddress) {
      showToast('Please select or add a delivery address to continue.', 'warning');
      return;
    }

    setCheckoutSession({
      address: selectedAddress,
      deliveryOption,
      timestamp: Date.now()
    });

    showToast('Address and delivery option selected successfully.', 'success');
    navigate('/payment');
  };

  return (
    <div className="checkout-page container py-lg">
      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Stepper Header */}
      <CheckoutProgress currentStep="address" />

      <h1 className="text-2xl font-bold mb-md">Delivery & Address Details</h1>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-3 gap-xl items-start">
        {/* Left 2 Cols: Address & Delivery Options */}
        <div className="col-span-2">
          {/* Address Selection / Form List */}
          <AddressList />

          {/* Delivery Options Selector */}
          <DeliveryOptions
            subtotal={subtotal}
            selectedOption={deliveryOption}
            onSelectOption={setDeliveryOption}
          />
        </div>

        {/* Right Col: Checkout Summary */}
        <div>
          <CheckoutOrderSummary
            deliveryOption={deliveryOption}
            onContinueToPayment={handleContinueToPayment}
          />
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
