import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Mail,
  Phone,
  Clock,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  ArrowRight,
  CreditCard
} from 'lucide-react';
import { CONTACT_INFO } from '../../data/contactData';
import { useNotification } from '../../context/NotificationContext';
import BackToTop from './BackToTop';
import './Footer.css';

export function Footer() {
  const { showToast } = useNotification();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      showToast('Please enter your email address.', 'warning');
      return;
    }

    if (!emailRegex.test(email.trim())) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      showToast('Thank you for subscribing to NatureCart!', 'success');
      setEmail('');
    }, 600);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="nc-footer" id="footer">
      {/* 1. Newsletter Banner Section (Top of Footer) */}
      <div className="footer-newsletter-banner">
        <div className="container newsletter-content">
          <div className="newsletter-info flex items-center gap-md">
            <div className="newsletter-icon-circle shrink-0">
              <Mail size={22} color="#ffffff" />
            </div>
            <div>
              <h3 className="newsletter-title">Subscribe to NatureCart</h3>
              <p className="newsletter-desc">
                Get weekly updates on fresh organic arrivals, exclusive discounts, and seasonal offers.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="newsletter-input"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="newsletter-btn"
            >
              <span>{isSubmitting ? 'Subscribing...' : 'Subscribe'}</span>
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* 2. Service / Trust Features Row */}
      <div className="footer-features-bar">
        <div className="container footer-features-grid">
          <div className="feature-item">
            <div className="feature-icon-box">
              <Zap size={20} />
            </div>
            <div className="feature-text text-left">
              <h4>60-Min Express</h4>
              <p>Doorstep express delivery</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon-box">
              <ShieldCheck size={20} />
            </div>
            <div className="feature-text text-left">
              <h4>100% Fresh Quality</h4>
              <p>Handpicked organic produce</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon-box">
              <CheckCircle2 size={20} />
            </div>
            <div className="feature-text text-left">
              <h4>Secure Payments</h4>
              <p>UPI, Cards, NetBanking & COD</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon-box">
              <Clock size={20} />
            </div>
            <div className="feature-text text-left">
              <h4>24/7 Support</h4>
              <p>Always ready to assist you</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Footer Content (4 Columns Grid Layout - Aligned Top) */}
      <div className="footer-main">
        <div className="container footer-grid-4">
          {/* Column 1: Brand Info */}
          <div className="footer-col">
            <Link to="/" className="nc-logo flex items-center gap-xs mb-xs">
              <div className="p-xs bg-primary text-white rounded-lg inline-flex">
                <ShoppingBag size={18} />
              </div>
              <span className="font-bold text-lg text-primary-dark">NatureCart</span>
            </Link>
            <p className="text-xs text-muted leading-relaxed mb-sm">
              Fresh groceries, everyday essentials and farm-fresh organic products delivered directly to your doorstep with 60-minute express service.
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center gap-xs">
              <a href="#facebook" onClick={e => e.preventDefault()} className="social-btn" title="Facebook" aria-label="Facebook">
                <Facebook size={15} />
              </a>
              <a href="#instagram" onClick={e => e.preventDefault()} className="social-btn" title="Instagram" aria-label="Instagram">
                <Instagram size={15} />
              </a>
              <a href="#youtube" onClick={e => e.preventDefault()} className="social-btn" title="YouTube" aria-label="YouTube">
                <Youtube size={15} />
              </a>
              <a href="#twitter" onClick={e => e.preventDefault()} className="social-btn" title="Twitter" aria-label="Twitter">
                <Twitter size={15} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/categories">Categories</Link></li>
              <li><Link to="/offers">Special Offers</Link></li>
              <li><Link to="/brands">Brands Store</Link></li>
              <li><Link to="/categories/staples-pulses">Combo Packs</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Top Categories */}
          <div className="footer-col">
            <h4>Top Categories</h4>
            <ul className="footer-links-list">
              <li><Link to="/categories/fruits-vegetables">Fruits & Vegetables</Link></li>
              <li><Link to="/categories/dairy-breakfast">Dairy & Bakery</Link></li>
              <li><Link to="/categories/staples-pulses">Staples & Atta</Link></li>
              <li><Link to="/categories/snacks-munchies">Snacks & Beverages</Link></li>
              <li><Link to="/categories/personal-care">Personal Care</Link></li>
              <li><Link to="/categories/household-needs">Household Essentials</Link></li>
            </ul>
          </div>

          {/* Column 4: Customer Care & Contact */}
          <div className="footer-col">
            <h4>Customer Care</h4>
            <ul className="footer-links-list mb-sm">
              <li><Link to="/account">My Account</Link></li>
              <li><Link to="/account?tab=orders">My Orders & Tracking</Link></li>
              <li><Link to="/wishlist">Saved Wishlist</Link></li>
              <li><Link to="/contact">Help & Support</Link></li>
            </ul>

            <div className="footer-contact-box">
              <div className="contact-item">
                <Phone size={14} className="text-primary shrink-0" />
                <a href={CONTACT_INFO.phone.link}>{CONTACT_INFO.phone.display}</a>
              </div>
              <div className="contact-item">
                <Mail size={14} className="text-primary shrink-0" />
                <a href={CONTACT_INFO.email.link}>{CONTACT_INFO.email.display}</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Payment Gateway Bar */}
      <div className="footer-payment-bar">
        <div className="container flex items-center justify-center">
          <div className="flex items-center gap-xs text-[11px] font-semibold text-muted">
            <CreditCard size={14} className="text-primary" />
            <span>100% Safe Payment Gateway (UPI / Credit Card / Debit Card / NetBanking / COD)</span>
          </div>
        </div>
      </div>

      {/* 5. Copyright / Legal Section */}
      <div className="footer-bottom">
        <div className="container flex items-center justify-between text-xs text-muted flex-wrap gap-sm">
          <p>© {currentYear} NatureCart. All rights reserved.</p>

          <div className="footer-legal-links flex items-center gap-md flex-wrap">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <span className="text-muted">|</span>
            <Link to="/terms">Terms & Conditions</Link>
            <span className="text-muted">|</span>
            <Link to="/shipping-policy">Shipping Policy</Link>
          </div>
        </div>
      </div>

      {/* Floating Back to Top Action */}
      <BackToTop />
    </footer>
  );
}

export default Footer;
