import React from 'react';
import { Zap, ShieldCheck, Award, Headphones } from 'lucide-react';
import './TrustSection.css';

export function TrustSection() {
  return (
    <div className="trust-section grid grid-cols-4 gap-md my-xl bg-surface p-xl rounded-xl border shadow-xs">
      <div className="trust-item flex items-center gap-sm">
        <div className="p-sm rounded-xl bg-primary-soft text-primary-dark">
          <Zap size={24} />
        </div>
        <div>
          <div className="font-bold text-sm text-text-primary">60-Min Express</div>
          <div className="text-xs text-muted">Lightning fast doorstep delivery</div>
        </div>
      </div>

      <div className="trust-item flex items-center gap-sm">
        <div className="p-sm rounded-xl bg-primary-soft text-primary-dark">
          <ShieldCheck size={24} />
        </div>
        <div>
          <div className="font-bold text-sm text-text-primary">100% Quality</div>
          <div className="text-xs text-muted">Fresh & handpicked daily produce</div>
        </div>
      </div>

      <div className="trust-item flex items-center gap-sm">
        <div className="p-sm rounded-xl bg-primary-soft text-primary-dark">
          <Award size={24} />
        </div>
        <div>
          <div className="font-bold text-sm text-text-primary">Certified Organic</div>
          <div className="text-xs text-muted">Zero artificial chemicals</div>
        </div>
      </div>

      <div className="trust-item flex items-center gap-sm">
        <div className="p-sm rounded-xl bg-primary-soft text-primary-dark">
          <Headphones size={24} />
        </div>
        <div>
          <div className="font-bold text-sm text-text-primary">24/7 Support</div>
          <div className="text-xs text-muted">Always ready to help you</div>
        </div>
      </div>
    </div>
  );
}

export default TrustSection;
