import React from 'react';
import { Link } from 'react-router-dom';
import { Tag, ChevronRight } from 'lucide-react';
import { TOP_OFFERS } from '../../data/offers';
import './TopOffers.css';

export function TopOffers() {
  return (
    <section className="top-offers-section py-lg">
      <div className="container">
        {/* Section Header */}
        <div className="section-header flex items-center justify-between mb-md">
          <div className="flex items-center gap-xs">
            <Tag size={22} className="text-primary" />
            <h2 className="text-2xl font-bold">Top Offers for You</h2>
          </div>
          <Link to="/offers" className="view-all-link flex items-center gap-xs font-semibold text-sm">
            <span>View All Offers</span>
            <ChevronRight size={16} />
          </Link>
        </div>

        {/* Offers Grid */}
        <div className="offers-grid grid grid-cols-4 gap-md">
          {TOP_OFFERS.map(offer => (
            <div
              key={offer.id}
              className="offer-card flex flex-col justify-between"
              style={{ background: offer.bgGradient }}
            >
              <div className="offer-card-top">
                <span className="offer-badge-pill">{offer.badgeText}</span>
                <h3 className="offer-main-title">{offer.title}</h3>
                <p className="offer-subtitle">{offer.subtitle}</p>
              </div>

              <div className="offer-card-bottom flex items-center justify-between mt-md">
                <Link
                  to={`/category/${offer.categorySlug}`}
                  className="btn btn-primary btn-sm offer-cta-btn"
                >
                  {offer.buttonText}
                </Link>
                <img src={offer.image} alt={offer.title} className="offer-thumb" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TopOffers;
