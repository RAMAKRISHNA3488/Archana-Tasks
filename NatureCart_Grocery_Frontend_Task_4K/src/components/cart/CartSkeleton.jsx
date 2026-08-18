import React from 'react';
import './CartSkeleton.css';

export function CartSkeleton() {
  return (
    <div className="cart-skeleton-grid grid grid-cols-3 gap-xl animate-pulse">
      <div className="col-span-2 flex flex-col gap-sm">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="cart-skeleton-row p-md bg-surface border rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-md">
              <div className="skeleton-box-thumb" />
              <div className="flex flex-col gap-xs">
                <div className="skeleton-box-title" />
                <div className="skeleton-box-sub" />
              </div>
            </div>
            <div className="skeleton-box-btn" />
          </div>
        ))}
      </div>

      <div className="bg-surface p-lg rounded-xl border h-fit flex flex-col gap-md">
        <div className="skeleton-box-title" />
        <div className="skeleton-box-sub" />
        <div className="skeleton-box-btn" />
      </div>
    </div>
  );
}

export default CartSkeleton;
