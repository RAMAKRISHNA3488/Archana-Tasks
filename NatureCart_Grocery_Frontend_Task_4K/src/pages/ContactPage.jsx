import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, MessageSquare } from 'lucide-react';
import { CONTACT_INFO } from '../data/contactData';
import { useNotification } from '../context/NotificationContext';
import ContactLocationCard from '../components/contact/ContactLocationCard';
import ContactFAQ from '../components/contact/ContactFAQ';
import './ContactPage.css';

export function ContactPage() {
  const { showToast } = useNotification();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!formData.name.trim()) {
      newErrors.name = 'Full Name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (formData.phone.trim() && !phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid mobile number.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please enter your message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must contain at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Please fill out all required fields correctly.', 'warning');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      showToast('Your message has been sent successfully. We will get back to you shortly!', 'success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      setErrors({});
    }, 1000);
  };

  return (
    <div className="contact-page-wrapper">
      {/* Top Banner Header */}
      <div className="contact-header-banner">
        <div className="contact-banner-content">
          <h1 className="contact-header-title">Contact Us</h1>
          <p className="contact-header-subtitle">
            Have questions about your order or need help? We're here to support you 24/7.
          </p>
        </div>
      </div>

      <div className="contact-main-container">
        {/* Main 2-Column Contact Card Box */}
        <div className="contact-card-box">
          {/* Left Column: Info */}
          <div className="contact-info-col">
            <div>
              <h2 className="contact-info-title">We're Here to Help!</h2>
              <p className="contact-info-subtitle">
                Have a question or need support? Reach out to us anytime.
              </p>

              <div className="contact-details-list">
                {/* Phone */}
                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <Phone size={18} />
                  </div>
                  <div>
                    <div className="contact-detail-label">Phone</div>
                    <div className="contact-detail-val">
                      <a href={CONTACT_INFO.phone.link}>{CONTACT_INFO.phone.display}</a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="contact-detail-label">Email</div>
                    <div className="contact-detail-val">
                      <a href={CONTACT_INFO.email.link}>{CONTACT_INFO.email.display}</a>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="contact-detail-label">Address</div>
                    <div className="contact-detail-val">
                      {CONTACT_INFO.address.street}, {CONTACT_INFO.address.cityStatePin}
                    </div>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <Clock size={18} />
                  </div>
                  <div>
                    <div className="contact-detail-label">Working Hours</div>
                    <div className="contact-detail-val">
                      Mon - Sat: 9:00 AM - 10:00 PM<br />
                      Sun: 9:00 AM - 6:00 PM
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-info-badge">
              <CheckCircle size={16} />
              <span>Quick response within 2 business hours</span>
            </div>
          </div>

          {/* Right Column: Send us a Message */}
          <div className="contact-form-col">
            <h3 className="contact-form-title">
              <MessageSquare size={20} className="inline-icon" /> Send us a Message
            </h3>

            <form onSubmit={handleSubmit} className="contact-form-fields">
              {/* Full Name */}
              <div className="contact-field-group">
                <label className="contact-field-label">Full name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`contact-field-input ${errors.name ? 'input-error' : ''}`}
                />
                {errors.name && <span className="contact-error-msg">{errors.name}</span>}
              </div>

              {/* Email */}
              <div className="contact-field-group">
                <label className="contact-field-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className={`contact-field-input ${errors.email ? 'input-error' : ''}`}
                />
                {errors.email && <span className="contact-error-msg">{errors.email}</span>}
              </div>

              {/* Phone Number */}
              <div className="contact-field-group">
                <label className="contact-field-label">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter 10-digit mobile number"
                  className={`contact-field-input ${errors.phone ? 'input-error' : ''}`}
                />
                {errors.phone && <span className="contact-error-msg">{errors.phone}</span>}
              </div>

              {/* Message */}
              <div className="contact-field-group">
                <label className="contact-field-label">Message</label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message or inquiry here..."
                  className={`contact-field-input ${errors.message ? 'input-error' : ''}`}
                />
                {errors.message && <span className="contact-error-msg">{errors.message}</span>}
              </div>

              {/* Send Message Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="contact-submit-btn"
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Location & Directions Card */}
        <div className="contact-section-divider">
          <ContactLocationCard />
        </div>

        {/* FAQ Accordion Section */}
        <div className="contact-section-divider">
          <ContactFAQ />
        </div>
      </div>
    </div>
  );
}

export default ContactPage;

