import React from 'react';
import { generateTimelineLogs } from '../../data/orderStatuses';
import './OrderMobileTimeline.css';

export function OrderMobileTimeline({ orderDate, currentStatus }) {
  const logs = generateTimelineLogs(orderDate, currentStatus);

  return (
    <div className="order-mobile-timeline-card bg-surface p-lg rounded-xl border mb-lg shadow-sm">
      <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-md">
        Detailed Delivery Timeline
      </h3>

      <div className="vertical-timeline-list flex flex-col gap-md pl-sm relative">
        <div className="timeline-connector-vertical-bar" />

        {logs.map((log) => {
          const Icon = log.icon;
          return (
            <div key={log.id} className={`timeline-step-row flex items-start gap-md relative z-10 ${
              log.isCurrent ? 'current' : log.isCompleted ? 'completed' : 'upcoming'
            }`}>
              <div className={`timeline-dot-circle ${log.isCurrent ? 'current' : log.isCompleted ? 'completed' : 'upcoming'}`}>
                <Icon size={14} />
              </div>

              <div>
                <div className="flex items-center gap-xs">
                  <span className="font-bold text-xs text-text-primary">{log.label}</span>
                  <span className="text-[11px] text-muted ml-auto">{log.timestamp}</span>
                </div>
                <p className="text-xs text-secondary mt-xs">{log.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrderMobileTimeline;
