import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { CONTACT_INFO } from '../../data/contactData';
import './ContactInfoCards.css';

export function ContactInfoCards() {
  return (
    <div className="contact-info-grid">
      {/* Phone Card */}
      <a
        href={CONTACT_INFO.phone.link}
        className="contact-info-card clickable-card"
      >
        <div className="contact-card-header">
          <div className="contact-card-icon-wrapper">
            <Phone size={22} />
          </div>
          <span className="contact-card-title">Call Support</span>
        </div>
        <div className="contact-card-body">
          <div className="contact-card-value">{CONTACT_INFO.phone.display}</div>
          <div className="contact-card-subtext">{CONTACT_INFO.phone.subtext}</div>
        </div>
      </a>

      {/* Email Card */}
      <a
        href={CONTACT_INFO.email.link}
        className="contact-info-card clickable-card"
      >
        <div className="contact-card-header">
          <div className="contact-card-icon-wrapper">
            <Mail size={22} />
          </div>
          <span className="contact-card-title">Email Us</span>
        </div>
        <div className="contact-card-body">
          <div className="contact-card-value">{CONTACT_INFO.email.display}</div>
          <div className="contact-card-subtext">{CONTACT_INFO.email.subtext}</div>
        </div>
      </a>

      {/* Store Location Card */}
      <div className="contact-info-card">
        <div className="contact-card-header">
          <div className="contact-card-icon-wrapper">
            <MapPin size={22} />
          </div>
          <span className="contact-card-title">Store Hub</span>
        </div>
        <div className="contact-card-body">
          <div className="contact-card-value" style={{ color: 'var(--color-text-primary)', fontSize: '0.9375rem' }}>
            {CONTACT_INFO.address.title}
          </div>
          <div className="contact-card-subtext">
            {CONTACT_INFO.address.street}, {CONTACT_INFO.address.cityStatePin}
          </div>
        </div>
      </div>

      {/* Support Hours Card */}
      <div className="contact-info-card">
        <div className="contact-card-header">
          <div className="contact-card-icon-wrapper">
            <Clock size={22} />
          </div>
          <span className="contact-card-title">Support Hours</span>
        </div>
        <div className="contact-card-body">
          <div className="contact-card-value" style={{ color: 'var(--color-text-primary)', fontSize: '0.9375rem' }}>
            {CONTACT_INFO.support.hours}
          </div>
          <div className="contact-card-subtext">{CONTACT_INFO.support.deliveryHours}</div>
        </div>
      </div>
    </div>
  );
}

export default ContactInfoCards;
