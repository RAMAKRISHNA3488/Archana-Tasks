import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { Search, MapPin, Home as HomeIcon } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const navigate = useNavigate();
  const { searchModalOpen, setSearchModalOpen, setFilters } = useApp();

  const [query, setQuery] = useState('');
  const [type, setType] = useState('All Types');
  const [location, setLocation] = useState('All Locations');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters((prev) => ({
      ...prev,
      searchQuery: query,
      propertyType: type,
      location: location,
    }));
    setSearchModalOpen(false);
    navigate('/properties');
  };

  return (
    <Modal
      isOpen={searchModalOpen}
      onClose={() => setSearchModalOpen(false)}
      title="Search Properties"
      maxWidth="lg"
    >
      <form onSubmit={handleSearch} className="space-y-4">
        <Input
          label="Keyword Search"
          placeholder="e.g. Modern Villa, Pool, Waterfront..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          icon={<Search className="w-4 h-4 text-slate-400" />}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Property Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            options={['All Types', 'House', 'Apartment', 'Villa', 'Condo', 'Commercial']}
            icon={<HomeIcon className="w-4 h-4 text-slate-400" />}
          />

          <Select
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            options={[
              'All Locations',
              'New York, USA',
              'Los Angeles, USA',
              'Chicago, USA',
              'Seattle, USA',
              'Miami, USA',
              'San Francisco, USA',
            ]}
            icon={<MapPin className="w-4 h-4 text-slate-400" />}
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            fullWidth
            size="lg"
            icon={<Search className="w-4 h-4" />}
          >
            Find Properties
          </Button>
        </div>
      </form>
    </Modal>
  );
};
