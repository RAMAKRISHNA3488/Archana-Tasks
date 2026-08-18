import React from 'react';
import { Banknote, ShieldCheck } from 'lucide-react';
import './CashOnDelivery.css';

export function CashOnDelivery() {
  return (
    <div className="cod-card p-md rounded-lg bg-bg-cream border mt-sm flex items-start gap-sm">
      <div className="p-xs rounded-full bg-primary-soft text-primary-dark">
        <Banknote size={24} />
      </div>
      <div>
        <h4 className="font-bold text-xs text-text-primary">Pay Cash or UPI on Delivery</h4>
        <p className="text-xs text-muted leading-relaxed mt-xs">
          Pay conveniently at your doorstep using cash, UPI, or credit/debit card on our delivery executive's POS terminal. No online pre-payment required!
        </p>
        <div className="flex items-center gap-xs text-[11px] text-primary font-semibold mt-xs">
          <ShieldCheck size={14} />
          <span>Zero COD convenience fees applicable.</span>
        </div>
      </div>
    </div>
  );
}

export default CashOnDelivery;
