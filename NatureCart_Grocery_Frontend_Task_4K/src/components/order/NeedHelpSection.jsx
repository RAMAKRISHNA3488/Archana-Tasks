import React from 'react';
import { HelpCircle, PhoneCall, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import './NeedHelpSection.css';

export function NeedHelpSection() {
  return (
    <div className="need-help-card">
      <div className="help-card-header">
        <HelpCircle size={18} className="help-icon" />
        <span className="help-title">Need help with your order?</span>
      </div>
      <p className="help-desc">
        Have questions regarding items, delivery status, or refunds? Our customer support team is available 24/7.
      </p>

      <div className="help-actions-row">
        <a href="tel:18001234567" className="help-btn">
          <PhoneCall size={14} />
          <span>Call 1800-123-4567</span>
        </a>
        <Link to="/contact" className="help-btn">
          <MessageCircle size={14} />
          <span>Contact Us</span>
        </Link>
      </div>
    </div>
  );
}

export default NeedHelpSection;

