import React, { useState } from 'react';
import { Property } from '../../types';
import { useApp } from '../../context/AppContext';
import { Badge } from '../ui/Badge';
import { Heart, Bed, Bath, Maximize2, MapPin, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PropertyCardProps {
  property: Property;
  viewMode?: 'grid' | 'list';
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, viewMode = 'grid' }) => {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useApp();
  const favorite = isFavorite(property.id);
  const [imageError, setImageError] = useState(false);

  const handleCardClick = () => {
    navigate(`/properties/${property.id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(property.id, property.title);
  };

  const handleImageError = () => {
    console.warn(`[RealStart] Property image failed to load for ${property.id}: ${property.images[0]}`);
    setImageError(true);
  };

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(property.price);

  const renderImage = () => {
    if (imageError || !property.images[0]) {
      return (
        <div className="w-full h-full bg-slate-200 flex flex-col items-center justify-center text-slate-400 p-4 text-center">
          <Building className="w-10 h-10 mb-1 opacity-60" />
          <span className="text-[11px] font-semibold text-slate-500">{property.title}</span>
        </div>
      );
    }
    return (
      <img
        src={property.images[0]}
        alt={property.title}
        onError={handleImageError}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
    );
  };

  if (viewMode === 'list') {
    return (
      <div
        onClick={handleCardClick}
        className="group bg-white rounded-2xl border border-slate-200 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden cursor-pointer flex flex-col sm:flex-row"
      >
        <div className="relative sm:w-72 h-48 sm:h-auto shrink-0 overflow-hidden bg-slate-100">
          {renderImage()}
          <div className="absolute top-3 left-3">
            <Badge variant={property.purpose === 'For Sale' ? 'for-sale' : 'for-rent'}>
              {property.purpose}
            </Badge>
          </div>
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all ${
              favorite
                ? 'bg-red-500 text-white shadow-md scale-110'
                : 'bg-white/80 text-slate-700 hover:bg-white hover:text-red-500'
            }`}
            title={favorite ? 'Remove from Favorites' : 'Add to Favorites'}
          >
            <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide">
                {property.type}
              </span>
              <span className="text-xl font-extrabold text-brand-600">{formattedPrice}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-800 group-hover:text-brand-600 transition-colors line-clamp-1">
              {property.title}
            </h3>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-1 mb-3">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="line-clamp-1">{property.location}</span>
            </p>
            <p className="text-xs text-slate-600 line-clamp-2 mb-4">
              {property.description}
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 font-medium">
                <Bed className="w-4 h-4 text-slate-400" />
                {property.bedrooms} Beds
              </span>
              <span className="flex items-center gap-1 font-medium">
                <Bath className="w-4 h-4 text-slate-400" />
                {property.bathrooms} Baths
              </span>
              <span className="flex items-center gap-1 font-medium">
                <Maximize2 className="w-4 h-4 text-slate-400" />
                {property.area} Sqft
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white rounded-2xl border border-slate-200 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden cursor-pointer flex flex-col h-full"
    >
      <div className="relative h-52 overflow-hidden bg-slate-100 shrink-0">
        {renderImage()}
        <div className="absolute top-3 left-3">
          <Badge variant={property.purpose === 'For Sale' ? 'for-sale' : 'for-rent'}>
            {property.purpose}
          </Badge>
        </div>
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all ${
            favorite
              ? 'bg-red-500 text-white shadow-md scale-110'
              : 'bg-white/80 text-slate-700 hover:bg-white hover:text-red-500'
          }`}
          title={favorite ? 'Remove from Favorites' : 'Add to Favorites'}
        >
          <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <h3 className="text-base font-bold text-slate-800 group-hover:text-brand-600 transition-colors line-clamp-1">
              {property.title}
            </h3>
          </div>
          <p className="text-xs text-slate-500 flex items-center gap-1 mb-3">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="line-clamp-1">{property.location}</span>
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between text-xs text-slate-600 py-3 border-t border-b border-slate-100 mb-3">
            <span className="flex items-center gap-1 font-medium">
              <Bed className="w-3.5 h-3.5 text-slate-400" />
              {property.bedrooms} Beds
            </span>
            <span className="flex items-center gap-1 font-medium">
              <Bath className="w-3.5 h-3.5 text-slate-400" />
              {property.bathrooms} Baths
            </span>
            <span className="flex items-center gap-1 font-medium">
              <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
              {property.area} Sqft
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">Price</span>
            <span className="text-lg font-extrabold text-brand-600">{formattedPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
