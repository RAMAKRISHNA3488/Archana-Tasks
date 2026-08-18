import React from 'react';
import { TRACKING_STEPS, getStatusConfig } from '../../data/orderStatuses';
import './OrderProgressTracker.css';

export function OrderProgressTracker({ currentStatus = 'Order Confirmed' }) {
  const statusConfig = getStatusConfig(currentStatus);
  const isCancelled = statusConfig.id === 'CANCELLED';

  return (
    <div className="order-progress-tracker-card bg-surface p-lg rounded-xl border mb-lg shadow-sm">
      <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-md">
        Order Progress Stepper
      </h3>

      <div className="flex items-center justify-between">
        {TRACKING_STEPS.map((step, idx) => {
          const isCompleted = !isCancelled && step.stepIndex <= statusConfig.stepIndex;
          const isCurrent = !isCancelled && step.stepIndex === statusConfig.stepIndex;
          const Icon = step.icon;

          return (
            <React.Fragment key={step.id}>
              <div className={`tracker-step-node flex flex-col items-center text-center ${
                isCurrent ? 'current' : isCompleted ? 'completed' : 'upcoming'
              }`}>
                <div className={`tracker-icon-badge ${
                  isCurrent ? 'current' : isCompleted ? 'completed' : 'upcoming'
                }`}>
                  <Icon size={18} />
                </div>
                <span className="tracker-label text-xs font-bold mt-xs">{step.label}</span>
              </div>

              {idx < TRACKING_STEPS.length - 1 && (
                <div className={`tracker-line ${
                  !isCancelled && TRACKING_STEPS[idx + 1].stepIndex <= statusConfig.stepIndex ? 'completed' : ''
                }`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default OrderProgressTracker;
