import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, AlertCircle } from 'lucide-react';
import Breadcrumb from '../components/common/Breadcrumb';
import CheckoutProgress from '../components/checkout/CheckoutProgress';
import OrderReview from '../components/payment/OrderReview';
import PaymentMethodSelector from '../components/payment/PaymentMethodSelector';
import PaymentSummary from '../components/payment/PaymentSummary';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { useOrder } from '../context/OrderContext';
import { useLocalStorage } from '../hooks/useLocalStorage';

export function PaymentPage() {
  const { cartItems, subtotal, deliveryFee, appliedCoupon, couponDiscount, clearCart } = useCart();
  const { selectedAddress } = useAuth();
  const { showToast } = useNotification();
  const { addOrder } = useOrder();
  const navigate = useNavigate();

  const [checkoutSession] = useLocalStorage('naturecart_checkout_session', null);
  const deliveryOption = checkoutSession?.deliveryOption || 'standard';

  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [isUpiVerified, setIsUpiVerified] = useState(false);
  const [cardData, setCardData] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [cardErrors, setCardErrors] = useState({});
  const [selectedBank, setSelectedBank] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const breadcrumbItems = [
    { label: 'Cart', link: '/cart' },
    { label: 'Checkout', link: '/checkout' },
    { label: 'Payment' }
  ];

  // 1. Empty Cart Protection
  if (cartItems.length === 0) {
    return (
      <div className="payment-empty-protection container py-2xl text-center">
        <div className="max-w-md mx-auto bg-surface p-2xl rounded-xl border shadow-sm">
          <div className="empty-icon-circle mx-auto mb-md flex items-center justify-center bg-bg-cream rounded-full w-20 h-20">
            <ShoppingBag size={48} className="text-muted" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-xs">Your Cart is Empty</h2>
          <p className="text-sm text-muted mb-lg">
            Please add products before proceeding to payment.
          </p>
          <Link to="/categories" className="btn btn-primary btn-lg inline-flex items-center gap-xs">
            <ArrowLeft size={18} />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  // 2. Missing Delivery Address Protection
  if (!selectedAddress) {
    return (
      <div className="payment-address-protection container py-2xl text-center">
        <div className="max-w-md mx-auto bg-surface p-2xl rounded-xl border shadow-sm">
          <div className="empty-icon-circle mx-auto mb-md flex items-center justify-center bg-discount-bg text-danger rounded-full w-20 h-20">
            <AlertCircle size={48} />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-xs">Delivery Details Required</h2>
          <p className="text-sm text-muted mb-lg">
            Please select or enter your delivery address before proceeding to payment.
          </p>
          <Link to="/checkout" className="btn btn-primary btn-lg inline-flex items-center gap-xs">
            <ArrowLeft size={18} />
            <span>Back to Checkout</span>
          </Link>
        </div>
      </div>
    );
  }

  // 3. Payment Form Validation
  const validatePayment = () => {
    if (selectedMethod === 'upi') {
      const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
      if (!upiId.trim() || !upiRegex.test(upiId.trim())) {
        showToast('Please enter a valid UPI ID (e.g. username@bank).', 'warning');
        return false;
      }
    } else if (selectedMethod === 'card') {
      const errs = {};
      if (!cardData.number || cardData.number.replace(/\s/g, '').length < 16) {
        errs.number = 'Please enter a valid 16-digit card number.';
      }
      if (!cardData.name || !cardData.name.trim()) {
        errs.name = 'Please enter the cardholder name.';
      }
      if (!cardData.expiry || cardData.expiry.length < 5) {
        errs.expiry = 'Please enter expiry in MM/YY format.';
      }
      if (!cardData.cvv || cardData.cvv.length < 3) {
        errs.cvv = 'Please enter a 3-digit CVV.';
      }
      setCardErrors(errs);
      if (Object.keys(errs).length > 0) {
        showToast('Please complete the required card details.', 'warning');
        return false;
      }
    } else if (selectedMethod === 'netbanking') {
      if (!selectedBank) {
        showToast('Please select your bank for Net Banking.', 'warning');
        return false;
      }
    }
    return true;
  };

  // 4. Payment Submission & Single Order Creation
  const handlePay = () => {
    if (!validatePayment()) return;

    setIsProcessing(true);

    const expressFee = deliveryOption === 'express' ? 29 : 0;
    const finalFee = deliveryFee + expressFee;
    const grandTotal = Math.max(0, subtotal + finalFee - couponDiscount);

    // Single Order ID Generation
    const generatedId = `NC-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const isCod = selectedMethod.toLowerCase() === 'cod';

    const orderPayload = {
      id: generatedId,
      orderId: generatedId,
      items: [...cartItems],
      subtotal,
      deliveryFee: finalFee,
      discount: couponDiscount,
      couponDiscount,
      appliedCoupon,
      total: grandTotal,
      totalAmount: grandTotal,
      shippingAddress: selectedAddress,
      address: selectedAddress,
      deliveryOption,
      paymentMethod: selectedMethod.toUpperCase(),
      paymentStatus: isCod ? 'pending' : 'paid',
      orderStatus: 'confirmed',
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
      estimatedDeliveryDate: deliveryOption === 'express' ? 'Today within 60 Mins' : '2–3 Days'
    };

    setTimeout(() => {
      // 1. Store order using OrderContext (synchronous localStorage & state update)
      const createdOrder = addOrder(orderPayload);

      // 2. Clear active cart
      clearCart();
      setIsProcessing(false);

      showToast('Payment completed successfully! Order placed.', 'success');

      // 3. Navigate to Order Confirmation with generated order ID
      navigate(`/order-confirmation/${createdOrder.orderId}`, { state: { orderId: createdOrder.orderId } });
    }, 1200);
  };

  return (
    <div className="payment-page container py-lg">
      <Breadcrumb items={breadcrumbItems} />
      <CheckoutProgress currentStep="payment" />

      <h1 className="text-2xl font-bold mb-xs">Secure Payment</h1>
      <p className="text-xs text-muted mb-lg">
        Choose your preferred payment method to complete your grocery order.
      </p>

      <div className="grid grid-cols-3 gap-xl items-start">
        <div className="col-span-2">
          <OrderReview deliveryOption={deliveryOption} />
          <PaymentMethodSelector
            selectedMethod={selectedMethod}
            onSelectMethod={setSelectedMethod}
            upiId={upiId}
            onChangeUpiId={setUpiId}
            isUpiVerified={isUpiVerified}
            onVerifyUpi={setIsUpiVerified}
            cardData={cardData}
            onChangeCardData={setCardData}
            cardErrors={cardErrors}
            selectedBank={selectedBank}
            onSelectBank={setSelectedBank}
          />
        </div>

        <div>
          <PaymentSummary
            deliveryOption={deliveryOption}
            selectedMethod={selectedMethod}
            isProcessing={isProcessing}
            onPay={handlePay}
          />
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
