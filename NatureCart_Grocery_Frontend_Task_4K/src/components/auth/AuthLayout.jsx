import React from 'react';
import { ShieldCheck, Zap, Heart, ShoppingBag } from 'lucide-react';
import './AuthLayout.css';

export function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="auth-page-container container py-xl">
      <div className="auth-card-wrapper max-w-4xl mx-auto bg-surface rounded-2xl border shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Column: NatureCart Grocery Visual Card (Matching Images 09 & 10) */}
        <div className="auth-visual-side bg-primary-soft p-2xl flex flex-col justify-between text-primary-dark border-r">
          <div className="visual-top-content">
            <div className="inline-flex items-center gap-xs bg-surface text-primary-dark px-sm py-xs rounded-full font-bold text-xs shadow-xs mb-md border">
              <ShoppingBag size={14} className="text-primary" />
              <span>NatureCart Fresh Grocery</span>
            </div>

            <h2 className="text-2xl font-bold text-primary-dark mb-sm leading-snug">
              Groceries Delivered in 60 Minutes.
            </h2>
            <p className="text-xs text-secondary leading-relaxed mb-lg">
              Everything you need, right when you need it. From fresh produce to daily essentials.
            </p>
          </div>

          <div className="visual-bottom-features flex flex-col gap-sm">
            <div className="feature-pill flex items-center gap-sm text-xs font-semibold bg-surface p-sm rounded-xl border shadow-xs">
              <div className="feature-icon-box p-xs rounded-lg bg-primary-soft text-primary-dark">
                <Zap size={18} />
              </div>
              <div>
                <div className="font-bold text-text-primary">Express Delivery</div>
                <div className="text-[11px] text-muted">Doorstep delivery within 60 Mins</div>
              </div>
            </div>

            <div className="feature-pill flex items-center gap-sm text-xs font-semibold bg-surface p-sm rounded-lg border shadow-xs">
              <div className="feature-icon-box p-xs rounded-lg bg-primary-soft text-primary-dark">
                <ShieldCheck size={18} />
              </div>
              <div>
                <div className="font-bold text-text-primary">100% Quality Guaranteed</div>
                <div className="text-[11px] text-muted">Handpicked fresh organic produce</div>
              </div>
            </div>

            <div className="feature-pill flex items-center gap-sm text-xs font-semibold bg-surface p-sm rounded-lg border shadow-xs">
              <div className="feature-icon-box p-xs rounded-lg bg-primary-soft text-primary-dark">
                <Heart size={18} />
              </div>
              <div>
                <div className="font-bold text-text-primary">Insulated Packaging</div>
                <div className="text-[11px] text-muted">Hygienic eco-friendly cold pouches</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form Container */}
        <div className="auth-form-side p-2xl flex flex-col justify-center bg-surface">
          <div className="auth-form-header mb-lg">
            {title && <h1 className="text-2xl font-bold text-text-primary mb-xs">{title}</h1>}
            {subtitle && <p className="text-xs text-muted leading-relaxed">{subtitle}</p>}
          </div>

          <div className="auth-form-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
