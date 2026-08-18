import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('relevance');

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedBrand('all');
    setPriceRange([0, 1000]);
    setSortBy('relevance');
  };

  return (
    <FilterContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedBrand,
        setSelectedBrand,
        priceRange,
        setPriceRange,
        sortBy,
        setSortBy,
        resetFilters
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
}
