import React from 'react';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  icon: Icon = null,
  ...props
}) {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const sizeClass = `btn-${size}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {Icon && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
      {children}
    </button>
  );
}

export default Button;
