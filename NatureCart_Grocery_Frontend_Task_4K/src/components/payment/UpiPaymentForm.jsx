import React, { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import './UpiPaymentForm.css';

export function UpiPaymentForm({ upiId, onChangeUpiId, isVerified, onVerify }) {
  const [error, setError] = useState(null);

  const handleVerifyClick = (e) => {
    e.preventDefault();
    const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
    if (!upiId.trim() || !upiRegex.test(upiId.trim())) {
      setError('Please enter a valid UPI ID (e.g. username@bank, 9876543210@paytm).');
      return;
    }
    setError(null);
    onVerify(true);
  };

  return (
    <div className="upi-payment-form p-md rounded-lg bg-bg-cream border mt-sm">
      <label className="form-label text-xs font-semibold text-text-primary mb-xs block">
        Enter UPI ID / VPA *
      </label>

      <div className="flex gap-xs mb-xs">
        <input
          type="text"
          placeholder="e.g. archana@upi or 9876543210@paytm"
          value={upiId}
          onChange={(e) => {
            onChangeUpiId(e.target.value);
            onVerify(false);
            setError(null);
          }}
          className={`input-field text-xs uppercase flex-1 ${error ? 'error' : ''}`}
        />
        <button
          type="button"
          onClick={handleVerifyClick}
          className={`btn btn-sm ${isVerified ? 'btn-primary' : 'btn-outline'}`}
        >
          {isVerified ? 'Verified ✓' : 'Verify UPI ID'}
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-xs text-xs text-danger mt-xs">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}

      {isVerified && (
        <div className="flex items-center gap-xs text-xs text-primary font-bold mt-xs">
          <CheckCircle2 size={16} />
          <span>UPI ID format verified successfully!</span>
        </div>
      )}

      <p className="text-[11px] text-muted mt-sm">
        Supports Google Pay, PhonePe, Paytm, BHIM, and all major Indian bank UPI apps.
      </p>
    </div>
  );
}

export default UpiPaymentForm;
