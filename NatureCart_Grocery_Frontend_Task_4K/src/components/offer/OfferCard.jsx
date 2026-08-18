import React from 'react';
import { Link } from 'react-router-dom';
import './OfferCard.css';

export function OfferCard({ offer }) {
  return (
    <div
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
  );
}

export default OfferCard;
