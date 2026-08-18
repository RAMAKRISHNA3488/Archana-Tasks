import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { Property } from '../types';
import { PropertyCard } from '../components/property/PropertyCard';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { Input } from '../components/ui/Input';
import { Pagination } from '../components/ui/Pagination';
import {
  Grid,
  List,
  Filter,
  RotateCcw,
  SlidersHorizontal,
  MapPin,
  Home as HomeIcon,
  ChevronDown,
  X,
} from 'lucide-react';

export const PropertiesListingPage: React.FC = () => {
  const { filters, setFilters, resetFilters } = useApp();
  const [properties, setProperties] = useState<Property[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const itemsPerPage = 12;

  useEffect(() => {
    setLoading(true);
    // Simulate brief network fetch for smooth loading skeleton demonstration
    const timer = setTimeout(() => {
      api.getProperties(filters).then((res) => {
        setProperties(res.properties);
        setTotalCount(res.total);
        setLoading(false);
      });
    }, 200);
    return () => clearTimeout(timer);
  }, [filters]);

  const totalPages = Math.ceil(totalCount / itemsPerPage) || 1;
  const paginatedProperties = properties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterChange = (key: keyof typeof filters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleResetAll = () => {
    resetFilters();
    setCurrentPage(1);
  };

  const SidebarContent = (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-card space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <Filter className="w-4 h-4 text-brand-600" />
          Filters
        </h3>
        <button
          onClick={handleResetAll}
          className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      {/* Location */}
      <Select
        label="Location"
        value={filters.location}
        onChange={(e) => handleFilterChange('location', e.target.value)}
        options={[
          'All Locations',
          'New York, USA',
          'Los Angeles, USA',
          'Chicago, USA',
          'Seattle, USA',
          'Miami, USA',
          'San Francisco, USA',
          'Boston, USA',
        ]}
        icon={<MapPin className="w-4 h-4" />}
      />

      {/* Property Type */}
      <Select
        label="Property Type"
        value={filters.propertyType}
        onChange={(e) => handleFilterChange('propertyType', e.target.value)}
        options={['All Types', 'House', 'Apartment', 'Villa', 'Condo', 'Commercial']}
        icon={<HomeIcon className="w-4 h-4" />}
      />

      {/* Price Range */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
          Price Range ($)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            placeholder="Min ($)"
            type="number"
            value={filters.minPrice || ''}
            onChange={(e) => handleFilterChange('minPrice', Number(e.target.value))}
          />
          <Input
            placeholder="Max ($)"
            type="number"
            value={filters.maxPrice || ''}
            onChange={(e) => handleFilterChange('maxPrice', Number(e.target.value))}
          />
        </div>
      </div>

      {/* Bedrooms */}
      <Select
        label="Bedrooms"
        value={filters.bedrooms}
        onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
        options={['Any', '1', '2', '3', '4', '5']}
      />

      {/* Bathrooms */}
      <Select
        label="Bathrooms"
        value={filters.bathrooms}
        onChange={(e) => handleFilterChange('bathrooms', e.target.value)}
        options={['Any', '1', '2', '3', '4']}
      />

      {/* Expandable More Filters */}
      <div>
        <button
          onClick={() => setShowMoreFilters(!showMoreFilters)}
          className="w-full flex items-center justify-between text-xs font-bold text-slate-700 py-2 border-t border-slate-100"
        >
          <span>More Filters</span>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform ${
              showMoreFilters ? 'rotate-180' : ''
            }`}
          />
        </button>

        {showMoreFilters && (
          <div className="pt-3 space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-600 mb-1.5">Purpose</label>
              <div className="flex gap-2">
                {['All', 'For Sale', 'For Rent'].map((p) => (
                  <button
                    key={p}
                    onClick={() => handleFilterChange('purpose', p)}
                    className={`flex-1 py-1.5 rounded-lg border font-semibold ${
                      filters.purpose === p
                        ? 'bg-brand-50 border-brand-500 text-brand-600'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-600">Furnished</span>
              <input
                type="checkbox"
                checked={!!filters.furnished}
                onChange={(e) => handleFilterChange('furnished', e.target.checked)}
                className="w-4 h-4 rounded text-brand-600"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-600">Parking Space</span>
              <input
                type="checkbox"
                checked={!!filters.parking}
                onChange={(e) => handleFilterChange('parking', e.target.checked)}
                className="w-4 h-4 rounded text-brand-600"
              />
            </div>
          </div>
        )}
      </div>

      <div className="pt-2 space-y-2">
        <Button variant="primary" fullWidth onClick={() => setMobileFilterOpen(false)}>
          Apply Filters
        </Button>
        <Button variant="outline" fullWidth onClick={handleResetAll}>
          Reset
        </Button>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900">Properties Listing</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Showing {paginatedProperties.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-
            {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount} properties
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 hidden sm:inline">Sort by:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value as any)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 outline-none focus:border-brand-500"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => handleFilterChange('viewMode', 'grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                filters.viewMode === 'grid'
                  ? 'bg-white text-brand-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleFilterChange('viewMode', 'list')}
              className={`p-1.5 rounded-lg transition-colors ${
                filters.viewMode === 'list'
                  ? 'bg-white text-brand-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Left Sidebar */}
        <aside className="hidden lg:block lg:col-span-3">{SidebarContent}</aside>

        {/* Mobile Filter Drawer */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setMobileFilterOpen(false)}
            />
            <div className="relative ml-auto w-full max-w-xs bg-white h-full p-6 overflow-y-auto z-10 space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="font-bold text-slate-800">Filters</h3>
                <button onClick={() => setMobileFilterOpen(false)}>
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              {SidebarContent}
            </div>
          </div>
        )}

        {/* Main Property Cards Section */}
        <main className="lg:col-span-9">
          {loading ? (
            <div
              className={
                filters.viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="h-80 bg-slate-200/60 animate-pulse rounded-2xl border border-slate-200"
                />
              ))}
            </div>
          ) : paginatedProperties.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <HomeIcon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">No Properties Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                We couldn't find any properties matching your exact filter criteria. Try resetting or relaxing your filters.
              </p>
              <Button variant="primary" onClick={handleResetAll}>
                Reset All Filters
              </Button>
            </div>
          ) : (
            <div
              className={
                filters.viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {paginatedProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} viewMode={filters.viewMode} />
              ))}
            </div>
          )}

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </main>
      </div>
    </div>
  );
};
