import React from 'react';
import { FileText } from 'lucide-react';
import './ProductDescription.css';

export function ProductDescription({ description }) {
  return (
    <div className="product-description-card bg-surface p-xl rounded-2xl border shadow-sm h-full">
      <h3 className="text-lg font-bold mb-lg flex items-center gap-xs">
        <FileText size={22} className="text-primary" />
        <span>Product Description</span>
      </h3>
      <p className="text-sm text-secondary leading-relaxed mt-md">
        {description}
      </p>
    </div>
  );
}

export default ProductDescription;
