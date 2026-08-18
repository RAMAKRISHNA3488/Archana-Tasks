import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Award, SlidersHorizontal, Star, Check, Sparkles, Search, X } from 'lucide-react';
import Breadcrumb from '../components/common/Breadcrumb';
import FilterChip from '../components/category/FilterChip';
import SortDropdown from '../components/category/SortDropdown';
import CategoryProductGrid from '../components/category/CategoryProductGrid';
import EmptyState from '../components/common/EmptyState';
import ProductSkeleton from '../components/common/ProductSkeleton';
import { BRANDS } from '../data/brands';
import { PRODUCTS } from '../data/products';
import './BrandsPage.css';

export function BrandsPage() {
  const { brandId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [brandSearchQuery, setBrandSearchQuery] = useState('');

  // Selected Brand from URL params or state
  const selectedBrand = useMemo(() => {
    if (!brandId || brandId === 'all') return null;
    return BRANDS.find(
      b => b.slug === brandId.toLowerCase() || b.name.toLowerCase() === brandId.toLowerCase()
    ) || null;
  }, [brandId]);

  // Initial Filter State
  const initialFilters = {
    maxPrice: 500,
    minRating: 0,
    minDiscount: 0,
    inStockOnly: false
  };

  const [filters, setFilters] = useState(initialFilters);
  const [sortBy, setSortBy] = useState('relevance');

  useEffect(() => {
    setIsLoading(true);
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 250);
    return () => clearTimeout(timer);
  }, [brandId]);

  const handleSelectBrand = (brandObj) => {
    if (!brandObj) {
      navigate('/brands');
    } else {
      navigate(`/brands/${brandObj.slug}`);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
    setSortBy('relevance');
    navigate('/brands');
  };

  // Base Products for current selected brand or all branded products
  const baseBrandProducts = useMemo(() => {
    if (!selectedBrand) return PRODUCTS;
    return PRODUCTS.filter(
      p => p.brand.toLowerCase() === selectedBrand.name.toLowerCase()
    );
  }, [selectedBrand]);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    let result = [...baseBrandProducts];

    // Price Filter
    result = result.filter(p => p.price <= filters.maxPrice);

    // Rating Filter
    if (filters.minRating > 0) {
      result = result.filter(p => (p.rating || 0) >= filters.minRating);
    }

    // Discount Filter
    if (filters.minDiscount > 0) {
      result = result.filter(p => (p.discountPercentage || 0) >= filters.minDiscount);
    }

    // In Stock Filter
    if (filters.inStockOnly) {
      result = result.filter(p => p.inStock);
    }

    // Sorting
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
  }, [baseBrandProducts, filters, sortBy]);

  // Filtered list of brands in sidebar search
  const visibleBrands = useMemo(() => {
    if (!brandSearchQuery.trim()) return BRANDS;
    const q = brandSearchQuery.toLowerCase();
    return BRANDS.filter(b => b.name.toLowerCase().includes(q) || b.category.toLowerCase().includes(q));
  }, [brandSearchQuery]);

  const breadcrumbItems = [
    { label: 'Brands', link: '/brands' },
    ...(selectedBrand ? [{ label: selectedBrand.name }] : [{ label: 'All Brands' }])
  ];

  return (
    <div className="brands-page-container container py-lg">
      <Breadcrumb items={breadcrumbItems} />

      {/* 1. Brands Hero Showcase Header */}
      <div className="brands-hero-card bg-surface p-xl rounded-2xl border shadow-sm mb-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-lg">
        <div className="flex-1">
          <div className="flex items-center gap-xs mb-xs">
            <Award size={20} className="text-primary" />
            <span className="badge badge-primary font-bold text-xs">Official Brand Store</span>
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-xs">
            {selectedBrand ? selectedBrand.name : 'Explore Top Brands'}
          </h1>
          <p className="text-sm text-secondary max-w-2xl">
            {selectedBrand
              ? selectedBrand.description
              : 'Shop 100% authentic grocery & household products directly from India’s most trusted brands.'}
          </p>
        </div>

        {/* Right Side Stats / Selected Brand Badge */}
        <div className="brands-hero-stats flex items-center gap-md bg-bg-cream p-md rounded-xl border">
          {selectedBrand ? (
            <div className="flex items-center gap-md">
              <div>
                <span className="text-xs text-muted block">Selected Brand</span>
                <span className="text-sm font-bold text-primary-dark">{selectedBrand.name}</span>
              </div>
              <button
                onClick={() => handleSelectBrand(null)}
                className="btn btn-outline btn-sm flex items-center gap-xs text-xs"
              >
                <X size={14} />
                <span>Show All Brands</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-lg">
              <div className="text-center">
                <span className="text-xl font-bold text-primary block">{BRANDS.length}</span>
                <span className="text-xs text-muted">Top Brands</span>
              </div>
              <div className="w-px h-8 bg-border"></div>
              <div className="text-center">
                <span className="text-xl font-bold text-primary block">{PRODUCTS.length}</span>
                <span className="text-xs text-muted">Products</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. Main Flex Layout: Left Sidebar + Product Showcase */}
      <div className="category-main-flex">
        {/* Left Brands & Filters Sidebar */}
        <aside className="category-sidebar-col flex flex-col gap-lg">
          {/* Brand Selector Widget */}
          <div className="bg-surface p-lg rounded-xl border shadow-sm">
            <h3 className="font-bold text-base mb-sm flex items-center justify-between">
              <span>Brands List</span>
              <span className="text-xs text-muted">({BRANDS.length})</span>
            </h3>

            {/* Brand Search Input */}
            <div className="relative mb-sm">
              <input
                type="text"
                placeholder="Search brands..."
                value={brandSearchQuery}
                onChange={(e) => setBrandSearchQuery(e.target.value)}
                className="input-field text-xs pl-lg py-xs"
              />
              <Search size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-muted" />
            </div>

            <div className="brand-select-list flex flex-col gap-xs max-h-64 overflow-y-auto pr-xs">
              <button
                onClick={() => handleSelectBrand(null)}
                className={`brand-list-item flex items-center justify-between p-xs rounded-md text-xs font-semibold ${
                  !selectedBrand ? 'selected' : ''
                }`}
              >
                <span>All Brands</span>
                <span>{PRODUCTS.length}</span>
              </button>

              {visibleBrands.map(brand => (
                <button
                  key={brand.id}
                  onClick={() => handleSelectBrand(brand)}
                  className={`brand-list-item flex items-center justify-between p-xs rounded-md text-xs ${
                    selectedBrand?.id === brand.id ? 'selected font-bold' : ''
                  }`}
                >
                  <span>{brand.name}</span>
                  <span className="text-muted text-xs">({brand.itemCount})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Refinements & Price Filter Widget */}
          <div className="bg-surface p-lg rounded-xl border shadow-sm">
            <div className="flex items-center justify-between pb-xs border-b mb-md">
              <div className="flex items-center gap-xs">
                <SlidersHorizontal size={18} className="text-primary" />
                <h3 className="font-bold text-base">Filter Products</h3>
              </div>
              <button onClick={handleResetFilters} className="text-xs font-semibold text-primary hover:underline">
                Reset All
              </button>
            </div>

            {/* Price Filter */}
            <div className="mb-md">
              <div className="flex justify-between items-center mb-xs">
                <span className="text-xs font-semibold">Max Price</span>
                <span className="text-xs font-bold text-primary">₹{filters.maxPrice}</span>
              </div>
              <input
                type="range"
                min="20"
                max="500"
                step="10"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
            </div>

            {/* Rating Filter */}
            <div className="mb-md">
              <span className="text-xs font-semibold block mb-xs">Minimum Rating</span>
              <div className="flex flex-col gap-xs">
                {[4, 3, 2].map(star => (
                  <button
                    key={star}
                    onClick={() => handleFilterChange('minRating', filters.minRating === star ? 0 : star)}
                    className={`rating-filter-btn flex items-center justify-between p-xs rounded-md text-xs ${
                      filters.minRating === star ? 'selected bg-primary-soft text-primary-dark font-bold' : ''
                    }`}
                  >
                    <div className="flex items-center gap-xs">
                      <Star size={12} fill="#f59e0b" color="#f59e0b" />
                      <span>{star}★ & above</span>
                    </div>
                    {filters.minRating === star && <Check size={14} className="text-primary" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div>
              <label className="flex items-center gap-xs text-xs font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.inStockOnly}
                  onChange={(e) => handleFilterChange('inStockOnly', e.target.checked)}
                  className="accent-primary"
                />
                <span>In Stock Only</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Right Main Product Showcase Column */}
        <main className="category-products-col">
          {/* Header Controls */}
          <div className="category-toolbar-row flex items-center justify-between mb-md pb-xs border-b">
            <div className="text-sm font-semibold">
              <span>{filteredProducts.length} Products found</span>
              {selectedBrand && <span className="text-muted ml-xs">for {selectedBrand.name}</span>}
            </div>

            <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
          </div>

          {/* Product Grid */}
          {isLoading ? (
            <ProductSkeleton count={8} />
          ) : filteredProducts.length === 0 ? (
            <EmptyState
              title={`No products found for ${selectedBrand ? selectedBrand.name : 'selected filters'}`}
              message="Try selecting another brand or adjusting your price & rating criteria."
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

export default BrandsPage;
