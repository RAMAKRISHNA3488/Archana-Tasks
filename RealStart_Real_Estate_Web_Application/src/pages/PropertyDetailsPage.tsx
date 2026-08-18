import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Property } from '../types';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import {
  Heart,
  Share2,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Calendar,
  Car,
  Home as HomeIcon,
  Phone,
  Mail,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Maximize,
  CheckCircle2,
} from 'lucide-react';

export const PropertyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite, setSelectedPropertyForAppointment, addToast } = useApp();

  const [property, setProperty] = useState<Property | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      api.getPropertyById(id).then((p) => {
        setProperty(p);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm font-semibold text-slate-500">Loading Property Details...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Property Not Found</h2>
        <p className="text-xs text-slate-500">The property you are looking for does not exist or has been removed.</p>
        <Button variant="primary" onClick={() => navigate('/properties')}>
          Back to Properties
        </Button>
      </div>
    );
  }

  const favorite = isFavorite(property.id);

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(property.price);

  const handleScheduleTourClick = () => {
    setSelectedPropertyForAppointment(property);
    navigate('/appointments');
  };

  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast('success', 'Property URL copied to clipboard!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant={property.purpose === 'For Sale' ? 'for-sale' : 'for-rent'}>
              {property.purpose}
            </Badge>
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider bg-brand-50 px-2.5 py-0.5 rounded">
              ID: {property.id}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{property.title}</h1>
          <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
            <span>{property.location}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => toggleFavorite(property.id, property.title)}
            className={`p-3 rounded-2xl border transition-all ${
              favorite
                ? 'bg-red-500 text-white border-red-500 shadow-md'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
            title="Favorite Property"
          >
            <Heart className={`w-5 h-5 ${favorite ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleShareClick}
            className="p-3 rounded-2xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors"
            title="Share Property"
          >
            <Share2 className="w-5 h-5" />
          </button>
          <div className="text-right pl-4 border-l border-slate-200">
            <span className="text-xs text-slate-400 font-semibold block">Price</span>
            <span className="text-2xl font-extrabold text-brand-600">{formattedPrice}</span>
          </div>
        </div>
      </div>

      {/* Main Image Gallery matching Reference Screen 3 */}
      <div className="space-y-4">
        <div className="relative h-[420px] sm:h-[500px] rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-card group">
          <img
            src={property.images[selectedImageIndex] || property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => setLightboxOpen(true)}
            className="absolute top-4 right-4 p-3 rounded-2xl bg-slate-900/60 backdrop-blur-md text-white hover:bg-slate-900 transition-colors"
            title="View Fullscreen"
          >
            <Maximize className="w-5 h-5" />
          </button>

          {property.images.length > 1 && (
            <>
              <button
                onClick={() =>
                  setSelectedImageIndex(
                    (selectedImageIndex - 1 + property.images.length) % property.images.length
                  )
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/80 text-slate-800 hover:bg-white transition-all shadow-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() =>
                  setSelectedImageIndex((selectedImageIndex + 1) % property.images.length)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/80 text-slate-800 hover:bg-white transition-all shadow-md"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails Bar */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 custom-scrollbar">
          {property.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImageIndex(idx)}
              className={`relative w-28 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                selectedImageIndex === idx
                  ? 'border-brand-600 ring-2 ring-brand-500/20 opacity-100 scale-105'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column - Specs, Overview, Details */}
        <div className="lg:col-span-8 space-y-8">
          {/* Quick Specs Bar matching Screen 3 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-card grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <span className="text-2xl font-extrabold text-slate-900 block">{property.bedrooms}</span>
              <span className="text-xs font-semibold text-slate-500 flex items-center justify-center gap-1">
                <Bed className="w-4 h-4 text-slate-400" /> Bedrooms
              </span>
            </div>
            <div className="space-y-1 border-x border-slate-100">
              <span className="text-2xl font-extrabold text-slate-900 block">{property.bathrooms}</span>
              <span className="text-xs font-semibold text-slate-500 flex items-center justify-center gap-1">
                <Bath className="w-4 h-4 text-slate-400" /> Bathrooms
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-2xl font-extrabold text-slate-900 block">{property.area}</span>
              <span className="text-xs font-semibold text-slate-500 flex items-center justify-center gap-1">
                <Maximize2 className="w-4 h-4 text-slate-400" /> Sqft Area
              </span>
            </div>
          </div>

          {/* Overview & Description */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-card space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Overview</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{property.description}</p>
          </div>

          {/* Property Information Table matching Screen 3 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-card space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Property Details</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Property ID</span>
                <span className="font-bold text-slate-800 text-sm mt-0.5 block">{property.id}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Property Type</span>
                <span className="font-bold text-slate-800 text-sm mt-0.5 block">{property.type}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Area</span>
                <span className="font-bold text-slate-800 text-sm mt-0.5 block">{property.area} Sqft</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Year Built</span>
                <span className="font-bold text-slate-800 text-sm mt-0.5 block">{property.yearBuilt}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Garage</span>
                <span className="font-bold text-slate-800 text-sm mt-0.5 block">{property.garage} Cars</span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Lot Size</span>
                <span className="font-bold text-slate-800 text-sm mt-0.5 block">0.25 Acre</span>
              </div>
            </div>
          </div>

          {/* Amenities */}
          {property.amenities && property.amenities.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-card space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Amenities & Features</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-semibold text-slate-700">
                {property.amenities.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Agent Info Card matching Reference Screen 3 */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-card text-center space-y-4">
            <img
              src={property.agentImage}
              alt={property.agentName}
              className="w-20 h-20 rounded-full object-cover mx-auto ring-4 ring-brand-50"
            />
            <div>
              <h3 className="text-base font-bold text-slate-900">{property.agentName}</h3>
              <p className="text-xs font-medium text-slate-500">{property.agentRole || 'Senior Agent'}</p>
            </div>

            <div className="pt-2 space-y-3">
              <Button
                variant="primary"
                fullWidth
                size="lg"
                onClick={handleScheduleTourClick}
                icon={<Calendar className="w-4 h-4" />}
              >
                Schedule Tour
              </Button>
              <Button
                variant="outline"
                fullWidth
                size="md"
                onClick={() => navigate('/messages')}
                icon={<MessageSquare className="w-4 h-4" />}
              >
                Contact Agent
              </Button>
            </div>

            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-2 text-left">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-600 shrink-0" />
                <span>{property.agentPhone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-600 shrink-0" />
                <span>{property.agentEmail}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <Modal isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} maxWidth="4xl">
        <div className="space-y-4">
          <img
            src={property.images[selectedImageIndex]}
            alt="Fullscreen view"
            className="w-full max-h-[70vh] object-contain rounded-xl"
          />
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>
              Image {selectedImageIndex + 1} of {property.images.length}
            </span>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() =>
                  setSelectedImageIndex(
                    (selectedImageIndex - 1 + property.images.length) % property.images.length
                  )
                }
              >
                Previous
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() =>
                  setSelectedImageIndex((selectedImageIndex + 1) % property.images.length)
                }
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
