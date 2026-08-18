import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import './CategoryStrip.css';

export function CategoryStrip() {
  return (
    <section className="category-strip-section py-lg">
      <div className="container">
        <div className="category-strip-card flex items-center justify-between gap-md">
          {CATEGORIES.map(cat => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              className="category-circle-item flex flex-col items-center text-center"
            >
              <div className="category-circle-img">
                <img src={cat.image} alt={cat.name} loading="lazy" />
              </div>
              <span className="category-circle-name">{cat.name}</span>
            </Link>
          ))}

          {/* View All Categories Link */}
          <Link
            to="/shop"
            className="category-circle-item flex flex-col items-center text-center view-all-item"
          >
            <div className="category-circle-img view-all-icon flex items-center justify-center">
              <ChevronRight size={24} />
            </div>
            <span className="category-circle-name font-bold">View All Categories</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CategoryStrip;
