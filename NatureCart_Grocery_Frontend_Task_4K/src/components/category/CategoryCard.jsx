import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryCard.css';

export function CategoryCard({ category, isViewAll = false }) {
  if (isViewAll) {
    return (
      <Link
        to="/shop"
        className="category-card-item flex flex-col items-center text-center view-all-card"
      >
        <div className="category-card-img-box view-all-box flex items-center justify-center font-bold text-primary">
          ➔
        </div>
        <span className="category-card-name font-bold">View All Categories</span>
      </Link>
    );
  }

  return (
    <Link
      to={`/category/${category.slug}`}
      className="category-card-item flex flex-col items-center text-center"
    >
      <div className="category-card-img-box">
        <img src={category.image} alt={category.name} loading="lazy" />
      </div>
      <span className="category-card-name">{category.name}</span>
      {category.itemCount && (
        <span className="category-card-count text-xs text-muted">{category.itemCount} items</span>
      )}
    </Link>
  );
}

export default CategoryCard;
