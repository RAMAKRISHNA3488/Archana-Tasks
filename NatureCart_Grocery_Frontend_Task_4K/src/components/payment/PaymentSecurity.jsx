import React from 'react';
import { ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';
import './PaymentSecurity.css';

export function PaymentSecurity() {
  return (
    <div className="payment-security-card p-md rounded-xl bg-surface border mb-lg flex items-center justify-between gap-sm text-xs">
      <div className="flex items-center gap-xs">
        <ShieldCheck size={20} className="text-primary flex-shrink-0" />
        <div>
          <div className="font-bold text-text-primary">256-Bit Encrypted Checkout</div>
          <div className="text-muted text-[10px]">Your information is handled securely</div>
        </div>
      </div>

      <div className="flex items-center gap-xs">
        <Lock size={18} className="text-primary flex-shrink-0" />
        <div>
          <div className="font-bold text-text-primary">Trusted & Verified</div>
          <div className="text-muted text-[10px]">No hidden charges</div>
        </div>
      </div>
    </div>
  );
}

export default PaymentSecurity;
