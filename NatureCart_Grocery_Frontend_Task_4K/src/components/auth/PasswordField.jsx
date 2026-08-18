import React, { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import './PasswordField.css';

export function PasswordField({
  id = 'password',
  name = 'password',
  label = 'Password',
  value,
  onChange,
  placeholder = '••••••••',
  error,
  required = true,
  autoComplete = 'current-password',
  showToggle = true
}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPassword(prev => !prev);
  };

  return (
    <div className="form-group mb-sm">
      {label && (
        <label htmlFor={id} className="text-xs font-semibold text-text-primary block mb-xs">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}

      <div className="input-icon-container">
        <span className="input-left-icon">
          <Lock size={16} className="text-muted" />
        </span>

        <input
          id={id}
          name={name}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`input-field ${showToggle ? 'input-with-both-icons' : 'input-with-left-icon'} ${error ? 'input-error' : ''}`}
        />

        {showToggle && (
          <button
            type="button"
            onClick={handleToggle}
            className="password-toggle-btn text-muted hover:text-primary transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            title={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        )}
      </div>

      {error && <span className="text-xs text-danger mt-xs block">{error}</span>}
    </div>
  );
}

export default PasswordField;
