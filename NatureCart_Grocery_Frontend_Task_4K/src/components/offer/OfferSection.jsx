import React from 'react';
import { Link } from 'react-router-dom';
import { Tag, ChevronRight } from 'lucide-react';
import { TOP_OFFERS } from '../../data/offers';
import OfferCard from './OfferCard';
import './OfferSection.css';

export function OfferSection() {
  return (
    <section className="offer-section py-lg">
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
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default OfferSection;
