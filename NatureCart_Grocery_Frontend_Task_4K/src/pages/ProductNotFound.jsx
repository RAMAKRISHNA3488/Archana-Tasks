import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import './ProductNotFound.css';

export function ProductNotFound() {
  return (
    <div className="product-not-found-container container py-2xl text-center">
      <div className="max-w-md mx-auto bg-surface p-2xl rounded-xl border shadow-sm">
        <div className="not-found-icon-circle mx-auto mb-md flex items-center justify-center">
          <ShoppingBag size={54} className="text-muted" />
        </div>
        <h1 className="text-2xl font-bold text-text-primary mb-xs">Product Not Found</h1>
        <p className="text-sm text-muted mb-lg">
          We couldn't find the product you're looking for. It may have been renamed or is no longer available in our grocery store.
        </p>
        <Link to="/categories" className="btn btn-primary btn-lg inline-flex items-center gap-xs">
          <ArrowLeft size={18} />
          <span>Continue Shopping</span>
        </Link>
      </div>
    </div>
  );
}

export default ProductNotFound;
