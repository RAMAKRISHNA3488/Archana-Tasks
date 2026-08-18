import React from 'react';

interface BadgeProps {
  variant?: 'for-sale' | 'for-rent' | 'active' | 'pending' | 'sold' | 'category';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'for-sale', children, className = '' }) => {
  const variants = {
    'for-sale': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'for-rent': 'bg-blue-100 text-blue-800 border-blue-200',
    'active': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'pending': 'bg-amber-50 text-amber-700 border-amber-200',
    'sold': 'bg-slate-100 text-slate-700 border-slate-200',
    'category': 'bg-brand-50 text-brand-700 border-brand-200 font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
