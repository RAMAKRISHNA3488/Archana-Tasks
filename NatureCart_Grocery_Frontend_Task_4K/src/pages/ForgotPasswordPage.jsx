import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import AuthLayout from '../components/auth/AuthLayout';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

export function ForgotPasswordPage() {
  const { users } = useAuth();
  const { showToast } = useNotification();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      setError('Please enter your registered email address.');
      return;
    }
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    const normalizedEmail = email.trim().toLowerCase();
    const found = (users || []).find(
      u => String(u.email || '').trim().toLowerCase() === normalizedEmail
    );

    setTimeout(() => {
      setIsSubmitting(false);

      if (found) {
        setIsSent(true);
        showToast('Password reset instructions have been sent.', 'success');
      } else {
        setError('No account found with this email.');
        showToast('No account found with this email.', 'error');
      }
    }, 800);
  };

  return (
    <AuthLayout
      title="Reset Your Password"
      subtitle="Enter your registered email address and we'll send you instructions to reset your password."
    >
      {isSent ? (
        <div className="text-center py-md flex flex-col gap-sm">
          <div className="mx-auto flex items-center justify-center bg-primary-soft text-primary-dark rounded-full w-14 h-14">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="font-bold text-base text-text-primary">Instructions Sent</h3>
          <p className="text-xs text-muted leading-relaxed">
            Password reset instructions have been sent to <strong>{email}</strong>.
          </p>

          <div className="p-xs bg-bg-cream rounded border text-[11px] text-muted max-w-xs mx-auto mt-xs">
            (Frontend simulation: For password updates in this demo, you may sign up or log in using test credentials.)
          </div>

          <Link to="/login" className="btn btn-primary btn-md inline-flex items-center justify-center gap-xs mt-sm">
            <ArrowLeft size={16} />
            <span>Back to Sign In</span>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-md">
          {error && (
            <div className="p-sm rounded-lg bg-discount-bg text-danger text-xs font-semibold border border-danger flex items-center gap-xs">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className="form-group mb-xs">
            <label htmlFor="forgot-email" className="text-xs font-semibold text-text-primary block mb-xs">
              Email Address <span className="text-danger">*</span>
            </label>
            <div className="input-icon-container">
              <span className="input-left-icon">
                <Mail size={16} className="text-muted" />
              </span>
              <input
                id="forgot-email"
                type="email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                placeholder="e.g. archana@example.com"
                className={`input-field input-with-left-icon ${error ? 'input-error' : ''}`}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary btn-lg w-full flex items-center justify-center gap-xs"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Sending Instructions...</span>
              </>
            ) : (
              <>
                <span>Send Reset Link</span>
                <Send size={16} />
              </>
            )}
          </button>

          <div className="text-center text-xs text-muted pt-sm border-t">
            <Link to="/login" className="text-primary font-bold hover:underline inline-flex items-center gap-xs">
              <span>Back to Sign In</span>
            </Link>
          </div>
        </form>
      )}
    </AuthLayout>
  );
}

export default ForgotPasswordPage;
