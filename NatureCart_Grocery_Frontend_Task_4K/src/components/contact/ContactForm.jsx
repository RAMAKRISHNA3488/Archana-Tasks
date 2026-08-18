import React, { useState } from 'react';
import { Send, User, Mail, Phone, Tag, Hash, Loader2 } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';
import './ContactForm.css';

export function ContactForm() {
  const { showToast } = useNotification();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    orderId: '',
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
      newErrors.name = 'Full name is required.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (formData.phone.trim() && !phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number.';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required.';
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
      showToast('Please correct the highlighted errors.', 'warning');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      showToast('Your message has been sent successfully.', 'success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        orderId: '',
        message: ''
      });
      setErrors({});
    }, 1000);
  };

  return (
    <div className="contact-form-card">
      <div className="contact-form-header">
        <h3 className="contact-form-title">Send Us a Message</h3>
        <p className="contact-form-subtitle">Fill out the form below and our support team will respond promptly.</p>
      </div>

      <form onSubmit={handleSubmit} className="contact-form-grid">
        {/* Full Name */}
        <div className="form-group-half">
          <label htmlFor="contact-name" className="input-label">
            Full Name <span className="required-star">*</span>
          </label>
          <div className="input-icon-container">
            <span className="input-left-icon">
              <User size={18} />
            </span>
            <input
              id="contact-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Archana Sharma"
              className={`input-field input-with-left-icon ${errors.name ? 'input-error' : ''}`}
            />
          </div>
          {errors.name && <span className="form-error-msg">{errors.name}</span>}
        </div>

        {/* Email Address */}
        <div className="form-group-half">
          <label htmlFor="contact-email" className="input-label">
            Email Address <span className="required-star">*</span>
          </label>
          <div className="input-icon-container">
            <span className="input-left-icon">
              <Mail size={18} />
            </span>
            <input
              id="contact-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. archana@example.com"
              className={`input-field input-with-left-icon ${errors.email ? 'input-error' : ''}`}
            />
          </div>
          {errors.email && <span className="form-error-msg">{errors.email}</span>}
        </div>

        {/* Mobile Number */}
        <div className="form-group-half">
          <label htmlFor="contact-phone" className="input-label">
            Mobile Number
          </label>
          <div className="input-icon-container">
            <span className="input-left-icon">
              <Phone size={18} />
            </span>
            <input
              id="contact-phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. 9876543210"
              maxLength={10}
              className={`input-field input-with-left-icon ${errors.phone ? 'input-error' : ''}`}
            />
          </div>
          {errors.phone && <span className="form-error-msg">{errors.phone}</span>}
        </div>

        {/* Order ID (Optional) */}
        <div className="form-group-half">
          <label htmlFor="contact-orderid" className="input-label">
            Order ID (Optional)
          </label>
          <div className="input-icon-container">
            <span className="input-left-icon">
              <Hash size={18} />
            </span>
            <input
              id="contact-orderid"
              type="text"
              name="orderId"
              value={formData.orderId}
              onChange={handleChange}
              placeholder="e.g. NC-2026-70157"
              className="input-field input-with-left-icon"
            />
          </div>
        </div>

        {/* Subject */}
        <div className="form-group-full">
          <label htmlFor="contact-subject" className="input-label">
            Subject <span className="required-star">*</span>
          </label>
          <div className="input-icon-container">
            <span className="input-left-icon">
              <Tag size={18} />
            </span>
            <input
              id="contact-subject"
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="e.g. Delivery Status / Product Quality Inquiry"
              className={`input-field input-with-left-icon ${errors.subject ? 'input-error' : ''}`}
            />
          </div>
          {errors.subject && <span className="form-error-msg">{errors.subject}</span>}
        </div>

        {/* Message */}
        <div className="form-group-full">
          <label htmlFor="contact-message" className="input-label">
            Message <span className="required-star">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="Please write your detailed message or inquiry here..."
            className={`input-field ${errors.message ? 'input-error' : ''}`}
          />
          {errors.message && <span className="form-error-msg">{errors.message}</span>}
        </div>

        {/* Submit Button */}
        <div className="form-submit-wrapper">
          <button
            type="submit"
            disabled={isSubmitting}
            className="contact-submit-btn"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <span>Send Message</span>
                <Send size={18} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
