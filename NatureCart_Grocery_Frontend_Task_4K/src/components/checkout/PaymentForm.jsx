import React, { useState } from 'react';
import { CreditCard, Wallet, Truck, CheckCircle2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';

export function PaymentForm({ onPlaceOrder }) {
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const { finalTotal } = useCart();
  const { showToast } = useNotification();

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast('Placing your order...', 'success');
    onPlaceOrder({
      paymentMethod,
      amount: finalTotal,
      orderId: `NC-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString()
    });
  };

  return (
    <form onSubmit={handleSubmit} className="payment-step-box">
      <h3 className="text-xl font-bold mb-md">2. Select Payment Method</h3>

      <div className="payment-options flex flex-col gap-sm mb-lg">
        <label className={`payment-option flex items-center gap-md p-md border rounded-lg cursor-pointer ${paymentMethod === 'cod' ? 'border-primary bg-primary-soft' : ''}`}>
          <input
            type="radio"
            name="payment"
            value="cod"
            checked={paymentMethod === 'cod'}
            onChange={() => setPaymentMethod('cod')}
            className="accent-primary"
          />
          <Truck size={20} className="text-primary" />
          <div>
            <div className="font-bold text-sm">Cash on Delivery (COD)</div>
            <div className="text-xs text-muted">Pay cash or UPI when your groceries arrive at your doorstep</div>
          </div>
        </label>

        <label className={`payment-option flex items-center gap-md p-md border rounded-lg cursor-pointer ${paymentMethod === 'upi' ? 'border-primary bg-primary-soft' : ''}`}>
          <input
            type="radio"
            name="payment"
            value="upi"
            checked={paymentMethod === 'upi'}
            onChange={() => setPaymentMethod('upi')}
            className="accent-primary"
          />
          <Wallet size={20} className="text-primary" />
          <div>
            <div className="font-bold text-sm">UPI (Google Pay, PhonePe, Paytm)</div>
            <div className="text-xs text-muted">Instant payment using any UPI app</div>
          </div>
        </label>

        <label className={`payment-option flex items-center gap-md p-md border rounded-lg cursor-pointer ${paymentMethod === 'card' ? 'border-primary bg-primary-soft' : ''}`}>
          <input
            type="radio"
            name="payment"
            value="card"
            checked={paymentMethod === 'card'}
            onChange={() => setPaymentMethod('card')}
            className="accent-primary"
          />
          <CreditCard size={20} className="text-primary" />
          <div>
            <div className="font-bold text-sm">Credit / Debit Card</div>
            <div className="text-xs text-muted">Visa, Mastercard, RuPay cards accepted</div>
          </div>
        </label>
      </div>

      <button type="submit" className="btn btn-primary btn-lg flex items-center gap-xs">
        <CheckCircle2 size={20} />
        <span>Place Order (₹{finalTotal.toFixed(0)})</span>
      </button>
    </form>
  );
}

export default PaymentForm;
