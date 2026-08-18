import React from 'react';
import { PackageSearch, RefreshCw } from 'lucide-react';
import './EmptyState.css';

export function EmptyState({
  title = "No products found",
  message = "We couldn't find any products matching your current filters.",
  onReset
}) {
  return (
    <div className="empty-state-box text-center py-2xl px-md">
      <div className="empty-state-icon-circle mx-auto mb-md flex items-center justify-center">
        <PackageSearch size={48} className="text-muted" />
      </div>
      <h3 className="text-xl font-bold mb-xs">{title}</h3>
      <p className="text-sm text-muted mb-lg max-w-md mx-auto">{message}</p>
      {onReset && (
        <button onClick={onReset} className="btn btn-primary btn-md inline-flex items-center gap-xs">
          <RefreshCw size={16} />
          <span>Clear All Filters</span>
        </button>
      )}
    </div>
  );
}

export default EmptyState;
