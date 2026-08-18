import React from 'react';
import { Truck, CheckCircle2 } from 'lucide-react';
import { CART_CONFIG } from '../../data/cartConfig';
import './DeliveryProgress.css';

export function DeliveryProgress({ subtotal }) {
  const threshold = CART_CONFIG.FREE_DELIVERY_THRESHOLD;
  const isUnlocked = subtotal >= threshold;
  const neededAmount = Math.max(0, threshold - subtotal);
  const percentage = Math.min(100, Math.round((subtotal / threshold) * 100));

  return (
    <div className="delivery-progress-card bg-surface p-md rounded-xl border mb-lg">
      <div className="flex items-center justify-between mb-xs">
        <div className="flex items-center gap-xs text-xs font-bold">
          {isUnlocked ? (
            <CheckCircle2 size={18} className="text-primary" />
          ) : (
            <Truck size={18} className="text-primary" />
          )}
          <span>
            {isUnlocked
              ? "🎉 You've unlocked FREE Express Delivery!"
              : `Add ₹${neededAmount.toFixed(0)} more to unlock FREE Delivery!`}
          </span>
        </div>
        <span className="text-xs font-bold text-primary">{percentage}%</span>
      </div>

      {/* Progress Track */}
      <div className="progress-track-bg">
        <div
          className="progress-track-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default DeliveryProgress;
