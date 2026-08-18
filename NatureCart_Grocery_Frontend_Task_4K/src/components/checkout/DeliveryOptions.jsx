import React from 'react';
import { Truck, Zap, CheckCircle2 } from 'lucide-react';
import { CART_CONFIG } from '../../data/cartConfig';
import './DeliveryOptions.css';

export function DeliveryOptions({ subtotal, selectedOption, onSelectOption }) {
  const standardFee = subtotal >= CART_CONFIG.FREE_DELIVERY_THRESHOLD ? 0 : CART_CONFIG.STANDARD_DELIVERY_FEE;

  const options = [
    {
      id: 'standard',
      title: 'Standard Doorstep Delivery',
      time: 'Delivered in 2–3 Days',
      fee: standardFee,
      feeText: standardFee === 0 ? 'FREE' : `₹${standardFee}`,
      icon: Truck
    },
    {
      id: 'express',
      title: 'Express 60-Minute Delivery',
      time: 'Delivered within 60 Minutes',
      fee: standardFee + 29,
      feeText: standardFee === 0 ? '₹29 Express' : `₹${standardFee + 29}`,
      icon: Zap
    }
  ];

  return (
    <div className="delivery-options-section bg-surface p-lg rounded-xl border mb-xl">
      <h3 className="text-base font-bold text-text-primary mb-md flex items-center gap-xs">
        <Truck size={20} className="text-primary" />
        <span>Select Delivery Option</span>
      </h3>

      <div className="grid grid-cols-2 gap-md">
        {options.map(opt => {
          const isSelected = selectedOption === opt.id;
          const Icon = opt.icon;
          return (
            <div
              key={opt.id}
              onClick={() => onSelectOption(opt.id)}
              className={`delivery-option-card p-md rounded-xl border cursor-pointer flex items-start justify-between transition-all ${
                isSelected ? 'selected' : ''
              }`}
            >
              <div className="flex items-start gap-sm">
                <div className={`option-icon-box p-xs rounded-lg ${isSelected ? 'active' : ''}`}>
                  <Icon size={20} className={isSelected ? 'text-primary-dark' : 'text-muted'} />
                </div>

                <div>
                  <h4 className="font-bold text-sm text-text-primary">{opt.title}</h4>
                  <p className="text-xs text-muted mt-xs">{opt.time}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="font-bold text-sm text-primary">{opt.feeText}</span>
                {isSelected && <CheckCircle2 size={16} className="text-primary ml-auto mt-xs" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DeliveryOptions;
