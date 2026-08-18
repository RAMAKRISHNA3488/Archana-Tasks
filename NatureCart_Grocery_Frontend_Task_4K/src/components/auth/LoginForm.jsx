import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import PasswordField from './PasswordField';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import './LoginForm.css';

export function LoginForm() {
  const { login } = useAuth();
  const { showToast } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from || '/account';

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: true
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

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.password) {
      newErrors.password = 'Please enter your password.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Please complete all required fields.', 'warning');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const res = login(formData.email.trim(), formData.password);
      setIsSubmitting(false);

      if (res.success) {
        showToast(`Welcome back to NatureCart, ${res.user.name}!`, 'success');
        navigate(redirectPath, { replace: true });
      } else {
        const errorMsg = res.error || 'Invalid email or password.';
        setErrors({ form: errorMsg });
        showToast(errorMsg, 'error');
      }
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="login-form flex flex-col gap-md">
      {errors.form && (
        <div className="p-sm rounded-lg bg-discount-bg text-danger text-xs font-semibold border border-danger flex items-center gap-xs">
          <AlertCircle size={16} />
          <span>{errors.form}</span>
        </div>
      )}

      {/* Email Input Field */}
      <div className="form-group mb-xs">
        <label htmlFor="login-email" className="text-xs font-semibold text-text-primary block mb-xs">
          Email Address <span className="text-danger">*</span>
        </label>
        <div className="input-icon-container">
          <span className="input-left-icon">
            <Mail size={16} className="text-muted" />
          </span>
          <input
            id="login-email"
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

      {/* Password Input Field with Show/Hide Toggle */}
      <PasswordField
        id="login-password"
        name="password"
        label="Password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter your password"
        error={errors.password}
      />

      {/* Remember Me & Forgot Password Row */}
      <div className="flex items-center justify-between text-xs my-xs">
        <label className="flex items-center gap-xs cursor-pointer select-none text-muted">
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="rounded text-primary focus:ring-primary"
          />
          <span>Remember me</span>
        </label>

        <Link to="/forgot-password" className="text-primary font-semibold hover:underline">
          Forgot Password?
        </Link>
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
            <span>Signing In...</span>
          </>
        ) : (
          <>
            <span>Sign In</span>
            <ArrowRight size={18} />
          </>
        )}
      </button>

      {/* Account Navigation Links */}
      <div className="text-center text-xs text-muted mt-sm pt-md border-t flex flex-col gap-xs">
        <p>
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary font-bold hover:underline">
            Create Account
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

export default LoginForm;
