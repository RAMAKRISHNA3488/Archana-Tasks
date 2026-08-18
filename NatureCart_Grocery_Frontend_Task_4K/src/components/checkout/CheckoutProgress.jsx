import React from 'react';
import { Check, MapPin, CreditCard, CheckCircle2 } from 'lucide-react';
import './CheckoutProgress.css';

export function CheckoutProgress({ currentStep = 'address' }) {
  const steps = [
    { id: 'cart', label: '1. Shopping Cart', icon: Check },
    { id: 'address', label: '2. Delivery Address', icon: MapPin },
    { id: 'payment', label: '3. Payment', icon: CreditCard },
    { id: 'confirmation', label: '4. Order Placed', icon: CheckCircle2 }
  ];

  const getStepStatus = (stepId) => {
    if (stepId === 'cart') return 'completed';
    if (stepId === currentStep) return 'active';
    return 'upcoming';
  };

  return (
    <div className="checkout-progress-bar flex items-center justify-between mb-xl bg-surface p-md rounded-xl border">
      {steps.map((step, idx) => {
        const status = getStepStatus(step.id);
        const Icon = step.icon;
        return (
          <React.Fragment key={step.id}>
            <div className={`checkout-step-item ${status}`}>
              <div className="step-badge">
                {status === 'completed' ? <Check size={14} /> : idx + 1}
              </div>
              <span className="step-label text-xs font-bold">{step.label}</span>
            </div>
            {idx < steps.length - 1 && (
              <div className={`step-connector-line ${status === 'completed' ? 'completed' : ''}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default CheckoutProgress;
