import React from 'react';

export function Card({ children, className = '', onClick }) {
  return (
    <div
      onClick={onClick}
      className={`nc-card ${className}`}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {children}
    </div>
  );
}

export default Card;
