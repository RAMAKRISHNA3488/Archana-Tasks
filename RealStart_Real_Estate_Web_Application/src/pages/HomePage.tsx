import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { Property, Agent } from '../types';
import { PropertyCard } from '../components/property/PropertyCard';
import { AgentCard } from '../components/agent/AgentCard';
import { Button } from '../components/ui/Button';
import {
  Search,
  MapPin,
  Home as HomeIcon,
  DollarSign,
  ShieldCheck,
  Tag,
  Users,
  ArrowRight,
  Building,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { setFilters } = useApp();

  const [activeTab, setActiveTab] = useState<'Buy' | 'Rent' | 'Sell'>('Buy');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('All Types');
  const [priceRange, setPriceRange] = useState('All Prices');

  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    api.getProperties().then((res) => {
      setFeaturedProperties(res.properties.slice(0, 4));
    });
    api.getAgents().then((res) => {
      setAgents(res.slice(0, 4));
    });
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters((prev) => ({
      ...prev,
      searchQuery: location,
      location: location || 'All Locations',
      propertyType: propertyType,
      purpose: activeTab === 'Rent' ? 'For Rent' : activeTab === 'Buy' ? 'For Sale' : 'All',
    }));
    navigate('/properties');
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section matching Reference Screen 1 */}
      <section className="relative bg-gradient-to-b from-blue-50/50 via-slate-50 to-white pt-8 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-block text-xs font-extrabold text-brand-600 uppercase tracking-widest bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-200/60">
                FIND. BUY. OWN.
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Find Your Dream Home <br />
                The <span className="text-brand-600">Perfect Start</span>
              </h1>

              <p className="text-base text-slate-600 max-w-lg leading-relaxed">
                Discover the best properties with RealStart. Your journey to the perfect home begins here with verified listings and trusted advisors.
              </p>

              {/* Floating Search Panel Card matching Screen 1 */}
              <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-card-hover border border-slate-200/80 space-y-4">
                {/* Buy / Rent / Sell Tabs */}
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  {(['Buy', 'Rent', 'Sell'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                        activeTab === tab
                          ? 'bg-brand-600 text-white shadow-sm'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Form Fields */}
                <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Location
                    </label>
                    <div className="relative flex items-center">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3" />
                      <input
                        type="text"
                        placeholder="Enter city or location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Property Type
                    </label>
                    <div className="relative flex items-center">
                      <HomeIcon className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                      <select
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white appearance-none cursor-pointer"
                      >
                        <option value="All Types">All Types</option>
                        <option value="House">House</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Villa">Villa</option>
                        <option value="Condo">Condo</option>
                        <option value="Commercial">Commercial</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Price Range
                    </label>
                    <div className="relative flex items-center">
                      <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                      <select
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-500 focus:bg-white appearance-none cursor-pointer"
                      >
                        <option value="All Prices">All Prices</option>
                        <option value="0-500k">$0 - $500,000</option>
                        <option value="500k-1m">$500,000 - $1,000,000</option>
                        <option value="1m+">$1,000,000+</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-3 pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      fullWidth
                      icon={<Search className="w-4 h-4" />}
                    >
                      Search Properties
                    </Button>
                  </div>
                </form>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-200/60">
                <div>
                  <h4 className="text-2xl font-extrabold text-brand-600">15K+</h4>
                  <p className="text-xs font-semibold text-slate-500">Properties Listed</p>
                </div>
                <div>
                  <h4 className="text-2xl font-extrabold text-brand-600">8K+</h4>
                  <p className="text-xs font-semibold text-slate-500">Happy Customers</p>
                </div>
                <div>
                  <h4 className="text-2xl font-extrabold text-brand-600">10+</h4>
                  <p className="text-xs font-semibold text-slate-500">Years Experience</p>
                </div>
                <div>
                  <h4 className="text-2xl font-extrabold text-brand-600">50+</h4>
                  <p className="text-xs font-semibold text-slate-500">Expert Agents</p>
                </div>
              </div>
            </div>

            {/* Right Hero Property Image Container */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200"
                  alt="Hero Modern Architecture Home"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass-panel border border-white/40 shadow-lg text-slate-900">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded">
                    Featured Listing
                  </span>
                  <h3 className="text-lg font-extrabold mt-1">Modern Luxury Residence</h3>
                  <p className="text-xs text-slate-600">223 Main Street, New York, USA • $750,000</p>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Trust Cards matching Reference Screen 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card flex items-center gap-4 hover:shadow-card-hover transition-all">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Verified Properties</h4>
                <p className="text-xs text-slate-500 mt-0.5">All listed properties are fully verified.</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card flex items-center gap-4 hover:shadow-card-hover transition-all">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                <Tag className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Best Price Deal</h4>
                <p className="text-xs text-slate-500 mt-0.5">We ensure competitive market pricing.</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card flex items-center gap-4 hover:shadow-card-hover transition-all">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Trusted Agents</h4>
                <p className="text-xs text-slate-500 mt-0.5">Connect with certified local experts.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-extrabold text-brand-600 uppercase tracking-widest">
              Featured Properties
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Explore Our Top Houses & Villas
            </h2>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/properties')}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            View All Properties
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProperties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      </section>

      {/* Top Agents Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-extrabold text-brand-600 uppercase tracking-widest">
              Expert Advisors
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Meet Our Certified Agents
            </h2>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/agents')}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            View All Agents
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </section>
    </div>
  );
};
