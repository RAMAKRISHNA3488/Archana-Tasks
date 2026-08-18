import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import PasswordField from './PasswordField';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import './SignupForm.css';

export function SignupForm() {
  const { signup } = useAuth();
  const { showToast } = useNotification();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: true
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name] || errors.form) {
      setErrors(prev => ({ ...prev, [name]: '', form: '' }));
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

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your 10-digit mobile number.';
    } else if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number.';
    }

    if (!formData.password) {
      newErrors.password = 'Please enter a password.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'Please accept the Terms & Conditions.';
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
      const res = signup({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password
      });

      setIsSubmitting(false);

      if (res.success) {
        showToast('Account created successfully!', 'success');
        navigate('/account', { replace: true });
      } else {
        const errorMsg = res.error || 'An account with this email already exists.';
        setErrors({ email: errorMsg });
        showToast(errorMsg, 'error');
      }
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form flex flex-col gap-sm">
      {errors.form && (
        <div className="p-sm rounded-lg bg-discount-bg text-danger text-xs font-semibold border border-danger flex items-center gap-xs">
          <AlertCircle size={16} />
          <span>{errors.form}</span>
        </div>
      )}

      {/* Full Name */}
      <div className="form-group">
        <label htmlFor="signup-name" className="text-xs font-semibold text-text-primary block mb-xs">
          Full Name <span className="text-danger">*</span>
        </label>
        <div className="input-icon-container">
          <span className="input-left-icon">
            <User size={16} className="text-muted" />
          </span>
          <input
            id="signup-name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Archana Sharma"
            className={`input-field input-with-left-icon ${errors.name ? 'input-error' : ''}`}
          />
        </div>
        {errors.name && <span className="text-xs text-danger mt-xs block">{errors.name}</span>}
      </div>

      {/* Email Address */}
      <div className="form-group">
        <label htmlFor="signup-email" className="text-xs font-semibold text-text-primary block mb-xs">
          Email Address <span className="text-danger">*</span>
        </label>
        <div className="input-icon-container">
          <span className="input-left-icon">
            <Mail size={16} className="text-muted" />
          </span>
          <input
            id="signup-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g. archana@example.com"
            autoComplete="email"
            className={`input-field input-with-left-icon ${errors.email ? 'input-error' : ''}`}
          />
        </div>
        {errors.email && <span className="text-xs text-danger mt-xs block">{errors.email}</span>}
      </div>

      {/* Mobile Number */}
      <div className="form-group">
        <label htmlFor="signup-phone" className="text-xs font-semibold text-text-primary block mb-xs">
          Mobile Number <span className="text-danger">*</span>
        </label>
        <div className="input-icon-container">
          <span className="input-left-icon">
            <Phone size={16} className="text-muted" />
          </span>
          <input
            id="signup-phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. 9876543210"
            maxLength={10}
            className={`input-field input-with-left-icon ${errors.phone ? 'input-error' : ''}`}
          />
        </div>
        {errors.phone && <span className="text-xs text-danger mt-xs block">{errors.phone}</span>}
      </div>

      {/* Password Inputs */}
      <PasswordField
        id="signup-password"
        name="password"
        label="Password"
        value={formData.password}
        onChange={handleChange}
        placeholder="At least 8 characters"
        error={errors.password}
        autoComplete="new-password"
      />

      <PasswordField
        id="signup-confirm-password"
        name="confirmPassword"
        label="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Re-enter password"
        error={errors.confirmPassword}
        autoComplete="new-password"
      />

      {/* Terms Checkbox */}
      <div className="form-group">
        <label className="flex items-center gap-xs cursor-pointer select-none text-xs text-muted">
          <input
            type="checkbox"
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleChange}
            className="rounded text-primary focus:ring-primary"
          />
          <span>
            I agree to NatureCart's{' '}
            <a href="#terms" onClick={e => e.preventDefault()} className="text-primary font-semibold hover:underline">
              Terms & Conditions
            </a>
          </span>
        </label>
        {errors.agreeTerms && <span className="text-xs text-danger mt-xs block">{errors.agreeTerms}</span>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-primary btn-lg w-full flex items-center justify-center gap-xs mt-xs"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            <span>Creating Account...</span>
          </>
        ) : (
          <>
            <span>Create Account</span>
            <ArrowRight size={18} />
          </>
        )}
      </button>

      {/* Footer Navigation Links */}
      <div className="text-center text-xs text-muted mt-sm pt-md border-t flex flex-col gap-xs">
        <p>
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-bold hover:underline">
            Sign In
          </Link>
        </p>

        <p>
          <Link to="/" className="text-muted hover:text-text-primary text-xs">
            Back to Home
          </Link>
        </p>
      </div>
    </form>
  );
}

export default SignupForm;
