import React from 'react';
import { CATEGORIES } from '../../data/categories';
import CategoryCard from './CategoryCard';
import './CategorySection.css';

export function CategorySection() {
  return (
    <section className="category-section py-lg">
      <div className="container">
        <div className="category-section-container flex items-center justify-between gap-md">
          {CATEGORIES.map(cat => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
          <CategoryCard isViewAll={true} />
        </div>
      </div>
    </section>
  );
}

export default CategorySection;
