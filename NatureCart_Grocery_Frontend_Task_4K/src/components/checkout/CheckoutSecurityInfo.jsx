import React from 'react';
import { ShieldCheck, Lock, Truck, RefreshCw } from 'lucide-react';
import './CheckoutSecurityInfo.css';

export function CheckoutSecurityInfo() {
  const items = [
    { icon: ShieldCheck, title: 'Safe & Secure Checkout', desc: 'Encrypted transaction' },
    { icon: Truck, title: '60 Min Express Delivery', desc: 'Guaranteed fresh' },
    { icon: RefreshCw, title: 'Easy Returns & Refund', desc: 'No questions asked' }
  ];

  return (
    <div className="checkout-security-info bg-surface p-md rounded-xl border mb-lg flex items-center justify-between gap-sm">
      {items.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div key={idx} className="flex items-center gap-xs text-xs">
            <Icon size={18} className="text-primary flex-shrink-0" />
            <div>
              <div className="font-bold text-text-primary">{item.title}</div>
              <div className="text-muted text-[10px]">{item.desc}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CheckoutSecurityInfo;
