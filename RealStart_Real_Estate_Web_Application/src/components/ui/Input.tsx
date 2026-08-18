import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  showPasswordToggle?: boolean;
  isPasswordVisible?: boolean;
  onTogglePasswordVisibility?: () => void;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      icon,
      fullWidth = true,
      showPasswordToggle = true,
      isPasswordVisible,
      onTogglePasswordVisibility,
      className = '',
      type = 'text',
      ...props
    },
    ref
  ) => {
    const [internalShowPassword, setInternalShowPassword] = useState(false);

    const isPasswordType = type === 'password' || isPasswordVisible !== undefined;
    const isVisible = isPasswordVisible !== undefined ? isPasswordVisible : internalShowPassword;
    const effectiveType = isPasswordType ? (isVisible ? 'text' : 'password') : type;
    const enableToggle = isPasswordType && showPasswordToggle;

    const handleToggle = () => {
      if (onTogglePasswordVisibility) {
        onTogglePasswordVisibility();
      } else {
        setInternalShowPassword((prev) => !prev);
      }
    };

    return (
      <div className={`${fullWidth ? 'w-full' : ''} space-y-1.5`}>
        {label && (
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            {...props}
            type={effectiveType}
            className={`w-full bg-white text-slate-800 text-sm rounded-xl border border-slate-200 ${
              icon ? 'pl-10' : 'pl-3.5'
            } ${enableToggle ? 'pr-10' : 'pr-3.5'} py-2.5 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 disabled:bg-slate-50 disabled:text-slate-400 ${
              error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
            } ${className}`}
          />
          {enableToggle && (
            <button
              type="button"
              onClick={handleToggle}
              className="absolute right-3.5 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none flex items-center justify-center p-0.5 rounded"
              title={isVisible ? 'Hide password' : 'Show password'}
              tabIndex={-1}
            >
              {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          )}
        </div>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
