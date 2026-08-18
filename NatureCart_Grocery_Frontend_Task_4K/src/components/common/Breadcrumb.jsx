import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './Breadcrumb.css';

export function Breadcrumb({ items = [] }) {
  return (
    <nav className="breadcrumb-nav flex items-center gap-xs text-xs mb-md">
      <Link to="/" className="breadcrumb-link">Home</Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight size={12} className="breadcrumb-icon" />
            {isLast || !item.link ? (
              <span className="breadcrumb-current">{item.label}</span>
            ) : (
              <Link to={item.link} className="breadcrumb-link">
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

export default Breadcrumb;
