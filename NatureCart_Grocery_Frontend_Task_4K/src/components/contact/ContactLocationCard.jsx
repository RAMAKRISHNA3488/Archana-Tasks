import React from 'react';
import { MapPin, Navigation, Truck, ShieldCheck } from 'lucide-react';
import { CONTACT_INFO } from '../../data/contactData';
import './ContactLocationCard.css';

export function ContactLocationCard() {
  return (
    <div className="location-card-container">
      <div className="location-card-grid">
        {/* Left Column: Details & Directions */}
        <div className="location-details-col">
          <div>
            <div className="location-header">
              <div className="location-header-icon">
                <MapPin size={22} />
              </div>
              <h2 className="location-title">Flagship Store & Distribution Hub</h2>
            </div>

            <p className="location-address">
              {CONTACT_INFO.address.street}, {CONTACT_INFO.address.cityStatePin}
            </p>

            <div className="location-features-list">
              <div className="location-feature-chip">
                <Truck size={18} />
                <span>60-Min Express Delivery Zone (Within 15km radius)</span>
              </div>

              <div className="location-feature-chip">
                <ShieldCheck size={18} />
                <span>100% Insulated Cold-Chain Storage & Packaging</span>
              </div>
            </div>
          </div>

          <div className="location-action-bar">
            <span className="location-action-prompt">Need direction to our physical store?</span>
            <a
              href={CONTACT_INFO.address.link}
              target="_blank"
              rel="noopener noreferrer"
              className="get-directions-btn"
            >
              <Navigation size={16} />
              <span>Get Directions</span>
            </a>
          </div>
        </div>

        {/* Right Column: Visual Location Map Panel */}
        <div className="location-map-col">
          <div className="map-grid-pattern" />
          <div className="map-card-overlay">
            <div className="map-pin-pulse">
              <MapPin size={24} />
            </div>
            <h3 className="map-overlay-title">{CONTACT_INFO.address.title}</h3>
            <p className="map-overlay-desc">{CONTACT_INFO.address.street}, {CONTACT_INFO.address.cityStatePin}</p>
            <div className="map-status-pill">
              <span className="status-dot" />
              <span>Store Open • Express Hub Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactLocationCard;
