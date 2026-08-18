import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { Property } from '../types';
import { PropertyCard } from '../components/property/PropertyCard';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Heart, Search, Building } from 'lucide-react';

export const FavoritesPage: React.FC = () => {
  const navigate = useNavigate();
  const { favorites } = useApp();
  const [favoriteProperties, setFavoriteProperties] = useState<Property[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getProperties().then((res) => {
      const favList = res.properties.filter((p) => favorites.includes(p.id));
      setFavoriteProperties(favList);
      setLoading(false);
    });
  }, [favorites]);

  const filteredProperties = favoriteProperties.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header matching Screen 7 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">My Favorites</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Properties you have saved for quick access and comparison.
          </p>
        </div>

        {favoriteProperties.length > 0 && (
          <div className="w-full sm:w-72">
            <Input
              placeholder="Search saved properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-4 h-4 text-slate-400" />}
            />
          </div>
        )}
      </div>

      {/* Main Grid or Empty State matching Screen 7 */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-72 bg-slate-200/60 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : favoriteProperties.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center space-y-4 max-w-md mx-auto shadow-card">
          <div className="w-20 h-20 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto ring-8 ring-red-50/50">
            <Heart className="w-10 h-10 fill-current" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">No Saved Properties Yet</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            You haven't added any properties to your favorites. Explore our listings and click the heart icon on any property to save it here.
          </p>
          <div className="pt-2">
            <Button
              variant="primary"
              onClick={() => navigate('/properties')}
              icon={<Building className="w-4 h-4" />}
            >
              Explore Properties
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProperties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      )}
    </div>
  );
};
