import React, { createContext, useContext, useState, useEffect } from 'react';
import { FilterState, Property } from '../types';
import { api } from '../services/api';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AppContextType {
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string, propertyTitle?: string) => Promise<void>;
  toasts: ToastMessage[];
  addToast: (type: 'success' | 'error' | 'info', message: string) => void;
  removeToast: (id: string) => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  selectedPropertyForAppointment: Property | null;
  setSelectedPropertyForAppointment: (prop: Property | null) => void;
  searchModalOpen: boolean;
  setSearchModalOpen: (open: boolean) => void;
}

export const initialFilters: FilterState = {
  searchQuery: '',
  location: 'All Locations',
  propertyType: 'All Types',
  purpose: 'All',
  minPrice: 0,
  maxPrice: 2000000,
  bedrooms: 'Any',
  bathrooms: 'Any',
  minArea: 0,
  maxArea: 10000,
  furnished: null,
  parking: null,
  amenities: [],
  sortBy: 'newest',
  viewMode: 'grid',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [selectedPropertyForAppointment, setSelectedPropertyForAppointment] = useState<Property | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  useEffect(() => {
    api.getFavorites().then((favs) => setFavorites(favs));
  }, []);

  const isFavorite = (id: string) => favorites.includes(id);

  const toggleFavorite = async (id: string, propertyTitle?: string) => {
    const res = await api.toggleFavorite(id);
    setFavorites(res.favorites);
    const title = propertyTitle ? `"${propertyTitle}"` : 'Property';
    if (res.isFavorite) {
      addToast('success', `${title} added to favorites!`);
    } else {
      addToast('info', `${title} removed from favorites.`);
    }
  };

  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const newToast: ToastMessage = { id: `toast_${Date.now()}_${Math.random()}`, type, message };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      removeToast(newToast.id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  return (
    <AppContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
        toasts,
        addToast,
        removeToast,
        filters,
        setFilters,
        resetFilters,
        selectedPropertyForAppointment,
        setSelectedPropertyForAppointment,
        searchModalOpen,
        setSearchModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
