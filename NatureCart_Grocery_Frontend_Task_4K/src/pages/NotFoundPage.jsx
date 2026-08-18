import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="not-found-page container py-2xl text-center">
      <AlertTriangle size={64} className="text-warning mx-auto mb-md" />
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-sm text-muted mt-xs mb-lg">
        The page you are looking for might have been removed or is temporarily unavailable.
      </p>
      <Link to="/" className="btn btn-primary btn-lg inline-flex items-center gap-xs">
        <Home size={18} /> Return to Homepage
      </Link>
    </div>
  );
}

export default NotFoundPage;
