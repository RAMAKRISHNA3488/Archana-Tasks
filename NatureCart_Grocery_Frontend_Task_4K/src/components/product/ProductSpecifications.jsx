import React from 'react';
import { List } from 'lucide-react';
import './ProductSpecifications.css';

export function ProductSpecifications({ specifications }) {
  if (!specifications || Object.keys(specifications).length === 0) return null;

  return (
    <div className="product-specs-card bg-surface p-xl rounded-2xl border shadow-sm h-full">
      <h3 className="text-lg font-bold mb-lg flex items-center gap-xs">
        <List size={22} className="text-primary" />
        <span>Product Specifications</span>
      </h3>

      <div className="specs-table-grid flex flex-col border rounded-xl overflow-hidden">
        {Object.entries(specifications).map(([key, value], idx) => (
          <div
            key={key}
            className={`specs-row flex justify-between p-md text-xs ${
              idx % 2 === 0 ? 'bg-bg-cream' : 'bg-surface'
            }`}
          >
            <span className="font-semibold text-text-muted">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
            <span className="font-bold text-text-primary">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductSpecifications;
