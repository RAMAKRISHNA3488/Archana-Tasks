import React from 'react';
import { CheckCircle2, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import './ProductHighlights.css';

export function ProductHighlights({ highlights = [] }) {
  const defaultHighlights = [
    '100% Quality & Freshness Guaranteed',
    'Directly Farm Harvested & Sourced',
    'Hygienically Handpicked & Packed',
    '60 Minute Express Doorstep Delivery'
  ];

  const displayHighlights = highlights.length > 0 ? highlights : defaultHighlights;

  return (
    <div className="product-highlights-card bg-surface p-xl rounded-2xl border shadow-sm h-full flex flex-col justify-between">
      <h3 className="text-lg font-bold mb-lg flex items-center gap-xs">
        <ShieldCheck size={22} className="text-primary" />
        <span>Product Highlights</span>
      </h3>

      <div className="grid grid-cols-2 gap-md flex-1">
        {displayHighlights.map((item, index) => (
          <div key={index} className="highlight-item flex items-center gap-sm p-md rounded-xl bg-bg-cream">
            <CheckCircle2 size={18} className="text-primary flex-shrink-0" />
            <span className="text-xs font-semibold text-text-primary">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductHighlights;
