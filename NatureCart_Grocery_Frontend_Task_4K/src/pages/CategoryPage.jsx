import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CategoryBanner from '../components/category/CategoryBanner';
import CategoryNavigation from '../components/category/CategoryNavigation';
import CategoryFilter from '../components/category/CategoryFilter';
import FilterChip from '../components/category/FilterChip';
import SortDropdown from '../components/category/SortDropdown';
import CategoryProductGrid from '../components/category/CategoryProductGrid';
import EmptyState from '../components/common/EmptyState';
import ProductSkeleton from '../components/common/ProductSkeleton';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import './CategoryPage.css';

export function CategoryPage() {
  const { categoryId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [activeSubcategory, setActiveSubcategory] = useState(null);

  // Active Category Object
  const currentCategory = useMemo(() => {
    if (!categoryId || categoryId === 'all') return null;
    return CATEGORIES.find(c => c.slug === categoryId || c.id === categoryId) || null;
  }, [categoryId]);

  // Initial Filter State
  const initialFilters = {
    maxPrice: 500,
    minRating: 0,
    minDiscount: 0,
    brand: 'all',
    inStockOnly: false,
    searchQuery: ''
  };

  const [filters, setFilters] = useState(initialFilters);
  const [sortBy, setSortBy] = useState('relevance');

  // Trigger loading effect when category changes
  useEffect(() => {
    setIsLoading(true);
    setActiveSubcategory(null);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 250);
    return () => clearTimeout(timer);
  }, [categoryId]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleRemoveFilter = (filterType) => {
    if (filterType === 'maxPrice') handleFilterChange('maxPrice', 500);
    if (filterType === 'minRating') handleFilterChange('minRating', 0);
    if (filterType === 'minDiscount') handleFilterChange('minDiscount', 0);
    if (filterType === 'brand') handleFilterChange('brand', 'all');
    if (filterType === 'searchQuery') handleFilterChange('searchQuery', '');
    if (filterType === 'inStockOnly') handleFilterChange('inStockOnly', false);
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
    setSortBy('relevance');
    setActiveSubcategory(null);
  };

  const handleSelectSubcategory = (subSlug) => {
    setActiveSubcategory(prev => (prev === subSlug ? null : subSlug));
  };

  // Base Products for current category
  const baseCategoryProducts = useMemo(() => {
    if (!currentCategory) return PRODUCTS;
    return PRODUCTS.filter(
      p => p.category === currentCategory.slug || p.category === currentCategory.id
    );
  }, [currentCategory]);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    let result = [...baseCategoryProducts];

    // Filter by Subcategory if selected
    if (activeSubcategory) {
      const q = activeSubcategory.replace('-', ' ').toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.subcategory && p.subcategory.toLowerCase() === activeSubcategory.toLowerCase()) ||
        p.category.toLowerCase().includes(q)
      );
      if (result.length === 0) {
        // Fallback to base category items if subcategory filter yields 0
        result = [...baseCategoryProducts];
      }
    }

    // Filter by Price
    result = result.filter(p => p.price <= filters.maxPrice);

    // Filter by Rating
    if (filters.minRating > 0) {
      result = result.filter(p => (p.rating || 0) >= filters.minRating);
    }

    // Filter by Discount
    if (filters.minDiscount > 0) {
      result = result.filter(p => (p.discountPercentage || 0) >= filters.minDiscount);
    }

    // Filter by Brand
    if (filters.brand !== 'all') {
      result = result.filter(p => p.brand.toLowerCase() === filters.brand.toLowerCase());
    }

    // Filter by In-Stock
    if (filters.inStockOnly) {
      result = result.filter(p => p.inStock);
    }

    // Filter by Search
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    }

    // Sort Results
    if (sortBy === 'price-low-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high-low') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'discount') {
      result.sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));
    }

    return result;
  }, [baseCategoryProducts, filters, sortBy, activeSubcategory]);

  const isHouseholdCategory = categoryId === 'household-needs' || currentCategory?.id === 'household-needs';

  return (
    <div className="category-page-container">
      {/* 1. Category Banner */}
      <CategoryBanner category={currentCategory} />

      {/* 2. Main Layout: Fixed 270px Sidebar + Flexible 4-Column Product Grid */}
      <div className="category-main-flex">
        {/* Left Sidebars Wrapper (Fixed Width 270px) */}
        <aside className="category-sidebar-col">
          <CategoryNavigation activeCategoryId={categoryId || 'all'} />
          <CategoryFilter
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
          />
        </aside>

        {/* Right Content Area (Remaining Width) */}
        <main className="category-products-col">
          {/* Active Chips & Sorting Controls Header */}
          <div className="category-toolbar-row">
            <FilterChip
              filters={filters}
              activeCategoryId={categoryId}
              totalProductsCount={baseCategoryProducts.length}
              filteredProductsCount={filteredProducts.length}
              onRemoveFilter={handleRemoveFilter}
              onClearAll={handleResetFilters}
            />
            <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
          </div>

          {/* Product Grid / Skeleton / Empty State */}
          {isLoading ? (
            <ProductSkeleton count={8} />
          ) : filteredProducts.length === 0 ? (
            <EmptyState
              title="No products match your filters"
              message="Try loosening your price range, rating, or discount criteria to see more products."
              onReset={handleResetFilters}
            />
          ) : (
            <CategoryProductGrid products={filteredProducts} />
          )}
        </main>
      </div>
    </div>
  );
}

export default CategoryPage;
