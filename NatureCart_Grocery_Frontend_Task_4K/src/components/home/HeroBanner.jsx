import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Tag, ShieldCheck, RefreshCw, ArrowRight } from 'lucide-react';
import './HeroBanner.css';

export function HeroBanner() {
  return (
    <section className="hero-banner-section">
      <div className="container flex items-center justify-between hero-banner-inner">
        {/* Left Column Content */}
        <div className="hero-content">
          <span className="hero-tagline flex items-center gap-xs">
            <span className="tagline-dot" />
            FAST. FRESH. RELIABLE.
          </span>

          <h1 className="hero-title">
            Groceries <br />
            Delivered <br />
            in <span className="highlight-text">60 Minutes</span>
          </h1>

          <p className="hero-subtitle">
            Everything you need, right when you need it. From fresh produce to daily essentials.
          </p>

          {/* Feature Badges Row */}
          <div className="hero-features-row flex items-center gap-md">
            <div className="hero-badge-item text-center">
              <div className="badge-icon-box">
                <Clock size={16} />
              </div>
              <span className="badge-title">60 Min</span>
              <span className="badge-sub">Delivery</span>
            </div>

            <div className="hero-badge-item text-center">
              <div className="badge-icon-box">
                <Tag size={16} />
              </div>
              <span className="badge-title">Best</span>
              <span className="badge-sub">Prices</span>
            </div>

            <div className="hero-badge-item text-center">
              <div className="badge-icon-box">
                <ShieldCheck size={16} />
              </div>
              <span className="badge-title">100%</span>
              <span className="badge-sub">Quality</span>
            </div>

            <div className="hero-badge-item text-center">
              <div className="badge-icon-box">
                <RefreshCw size={16} />
              </div>
              <span className="badge-title">Easy</span>
              <span className="badge-sub">Returns</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hero-actions flex items-center gap-md">
            <Link to="/shop" className="btn btn-primary btn-lg flex items-center gap-xs">
              <span>Shop Now</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/offers" className="btn btn-outline btn-lg">
              View Offers
            </Link>
          </div>
        </div>

        {/* Right Column Graphic */}
        <div className="hero-graphic-box relative">
          <div className="delivery-badge-floating text-center">
            <span className="badge-number">60</span>
            <span className="badge-label">MINUTES DELIVERY</span>
          </div>

          <div className="hero-bag-wrapper">
            <img
              src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80"
              alt="NatureCart Fresh Groceries"
              className="hero-grocery-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
