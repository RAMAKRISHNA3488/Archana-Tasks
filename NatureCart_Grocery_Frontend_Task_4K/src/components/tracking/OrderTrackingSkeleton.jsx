import React from 'react';
import './OrderTrackingSkeleton.css';

export function OrderTrackingSkeleton() {
  return (
    <div className="order-tracking-skeleton animate-pulse flex flex-col gap-lg">
      <div className="skeleton-hero-header p-xl bg-surface border rounded-xl" />
      <div className="skeleton-hero-status p-lg bg-surface border rounded-xl" />
      <div className="skeleton-timeline-card p-xl bg-surface border rounded-xl" />
      <div className="grid grid-cols-2 gap-md">
        <div className="skeleton-small-card p-lg bg-surface border rounded-xl" />
        <div className="skeleton-small-card p-lg bg-surface border rounded-xl" />
      </div>
    </div>
  );
}

export default OrderTrackingSkeleton;
