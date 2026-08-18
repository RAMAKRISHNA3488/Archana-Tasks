import React from 'react';
import { CheckCircle2, Clock, Package, Truck, Home } from 'lucide-react';
import './OrderStatusProgress.css';

export function OrderStatusProgress({ currentStatus = 'Order Confirmed' }) {
  const steps = [
    { id: 'confirmed', label: 'Order Confirmed', icon: CheckCircle2 },
    { id: 'processing', label: 'Processing', icon: Clock },
    { id: 'packed', label: 'Packed', icon: Package },
    { id: 'shipped', label: 'Shipped', icon: Truck },
    { id: 'delivered', label: 'Delivered', icon: Home }
  ];

  // Determine current active step index
  const activeIndex = Math.max(
    0,
    steps.findIndex(s => s.label.toLowerCase() === (currentStatus || '').toLowerCase())
  );

  return (
    <div className="order-status-card">
      <div className="status-card-header">
        <span className="status-header-title">Live Order Status Progress</span>
        <span className="status-live-indicator">
          <span className="live-dot" />
          <span>Real-time Tracking</span>
        </span>
      </div>

      <div className="status-stepper-wrapper">
        {steps.map((step, idx) => {
          const isCompleted = idx < activeIndex;
          const isCurrent = idx === activeIndex;
          const Icon = step.icon;

          return (
            <React.Fragment key={step.id}>
              <div className={`status-step-node ${isCompleted ? 'completed' : isCurrent ? 'active' : 'upcoming'}`}>
                <div className="status-icon-circle">
                  {isCompleted ? <CheckCircle2 size={18} /> : <Icon size={18} />}
                </div>
                <span className="status-label">{step.label}</span>
              </div>

              {idx < steps.length - 1 && (
                <div className={`status-line-connector ${idx < activeIndex ? 'completed' : ''}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default OrderStatusProgress;

