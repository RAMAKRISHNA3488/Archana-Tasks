import React from 'react';
import { Smartphone, CreditCard, Building2, Banknote, CheckCircle2 } from 'lucide-react';
import UpiPaymentForm from './UpiPaymentForm';
import CardPaymentForm from './CardPaymentForm';
import NetBankingForm from './NetBankingForm';
import CashOnDelivery from './CashOnDelivery';
import './PaymentMethodSelector.css';

export function PaymentMethodSelector({
  selectedMethod,
  onSelectMethod,
  upiId,
  onChangeUpiId,
  isUpiVerified,
  onVerifyUpi,
  cardData,
  onChangeCardData,
  cardErrors,
  selectedBank,
  onSelectBank
}) {
  const methods = [
    {
      id: 'upi',
      title: 'UPI (GPay / PhonePe / Paytm)',
      desc: 'Instant payment via UPI app',
      icon: Smartphone
    },
    {
      id: 'card',
      title: 'Credit / Debit Card',
      desc: 'Visa, Mastercard, RuPay, Maestro',
      icon: CreditCard
    },
    {
      id: 'netbanking',
      title: 'Net Banking',
      desc: 'All major Indian retail banks',
      icon: Building2
    },
    {
      id: 'cod',
      title: 'Cash on Delivery (COD)',
      desc: 'Pay cash/UPI at doorstep',
      icon: Banknote
    }
  ];

  return (
    <div className="payment-method-selector bg-surface p-lg rounded-xl border mb-lg">
      <h3 className="text-base font-bold text-text-primary mb-md pb-xs border-b">
        Select Payment Method
      </h3>

      <div className="flex flex-col gap-sm">
        {methods.map(method => {
          const isSelected = selectedMethod === method.id;
          const Icon = method.icon;

          return (
            <div key={method.id} className="payment-method-item-wrapper">
              <div
                onClick={() => onSelectMethod(method.id)}
                className={`payment-method-card p-md rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                  isSelected ? 'selected' : ''
                }`}
              >
                <div className="flex items-center gap-md">
                  <div className={`method-radio-circle ${isSelected ? 'checked' : ''}`}>
                    {isSelected && <div className="radio-inner-dot" />}
                  </div>
                  <div className={`method-icon-box p-xs rounded-lg ${isSelected ? 'active' : ''}`}>
                    <Icon size={22} className={isSelected ? 'text-primary-dark' : 'text-muted'} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-text-primary">{method.title}</h4>
                    <p className="text-xs text-muted">{method.desc}</p>
                  </div>
                </div>

                {isSelected && <CheckCircle2 size={18} className="text-primary" />}
              </div>

              {/* Expandable Form details for active method */}
              {isSelected && (
                <div className="method-details-pane mt-xs">
                  {method.id === 'upi' && (
                    <UpiPaymentForm
                      upiId={upiId}
                      onChangeUpiId={onChangeUpiId}
                      isVerified={isUpiVerified}
                      onVerify={onVerifyUpi}
                    />
                  )}
                  {method.id === 'card' && (
                    <CardPaymentForm
                      cardData={cardData}
                      onChangeCardData={onChangeCardData}
                      errors={cardErrors}
                    />
                  )}
                  {method.id === 'netbanking' && (
                    <NetBankingForm
                      selectedBank={selectedBank}
                      onSelectBank={onSelectBank}
                    />
                  )}
                  {method.id === 'cod' && <CashOnDelivery />}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PaymentMethodSelector;
