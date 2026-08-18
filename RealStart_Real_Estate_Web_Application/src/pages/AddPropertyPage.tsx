import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { PropertyType, PropertyPurpose } from '../types';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import {
  Info,
  Sliders,
  MapPin,
  DollarSign,
  Camera,
  CheckCircle,
  Upload,
  X,
  ArrowLeft,
  ArrowRight,
  Plus,
} from 'lucide-react';

export const AddPropertyPage: React.FC = () => {
  const navigate = useNavigate();
  const { addToast } = useApp();
  const { user } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    title: '',
    type: 'House' as PropertyType,
    description: '',
    purpose: 'For Sale' as PropertyPurpose,

    // Step 2: Details
    bedrooms: 3,
    bathrooms: 2,
    area: 2000,
    yearBuilt: 2022,
    garage: 2,
    parking: true,
    furnished: true,
    amenities: ['Swimming Pool', 'Central Air Conditioning', 'Security System'],

    // Step 3: Location
    address: '',
    city: 'New York',
    state: 'NY',
    country: 'USA',
    zipCode: '10001',

    // Step 4: Pricing
    price: 650000,
    rentFrequency: 'Monthly',
    securityDeposit: 5000,

    // Step 5: Photos
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    ],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    { number: 1, title: 'Basic Information', icon: <Info className="w-4 h-4" /> },
    { number: 2, title: 'Property Details', icon: <Sliders className="w-4 h-4" /> },
    { number: 3, title: 'Location', icon: <MapPin className="w-4 h-4" /> },
    { number: 4, title: 'Pricing', icon: <DollarSign className="w-4 h-4" /> },
    { number: 5, title: 'Photos', icon: <Camera className="w-4 h-4" /> },
    { number: 6, title: 'Review', icon: <CheckCircle className="w-4 h-4" /> },
  ];

  const validateStep = (step: number) => {
    const errs: Record<string, string> = {};
    if (step === 1) {
      if (!formData.title.trim()) errs.title = 'Property title is required.';
      if (!formData.description.trim()) errs.description = 'Description is required.';
    }
    if (step === 3) {
      if (!formData.address.trim()) errs.address = 'Address is required.';
      if (!formData.city.trim()) errs.city = 'City is required.';
    }
    if (step === 4) {
      if (formData.price <= 0) errs.price = 'Price must be greater than zero.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 6));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            setFormData((prev) => ({
              ...prev,
              images: [...prev.images, reader.result as string],
            }));
          }
        };
        reader.readAsDataURL(file);
      });
      addToast('success', `${files.length} photo(s) uploaded successfully!`);
    }
  };

  const handleRemovePhoto = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== idx),
    }));
  };

  const handlePublish = async () => {
    if (!validateStep(1) || !validateStep(3) || !validateStep(4)) {
      addToast('error', 'Please complete all required fields before publishing.');
      return;
    }

    try {
      const newProp = await api.addProperty({
        title: formData.title,
        type: formData.type,
        purpose: formData.purpose,
        description: formData.description,
        price: Number(formData.price),
        location: `${formData.address}, ${formData.city}, ${formData.country}`,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        zipCode: formData.zipCode,
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        area: Number(formData.area),
        yearBuilt: Number(formData.yearBuilt),
        garage: Number(formData.garage),
        parking: formData.parking,
        furnished: formData.furnished,
        amenities: formData.amenities,
        status: 'active',
        agentId: user?.id || 'agent_1',
        agentName: user?.name || 'John Smith',
        agentPhone: user?.phone || '+1 (555) 234-5678',
        agentEmail: (user?.email || 'john.smith@realstart.com').trim().replace(/^['"]|['"]$/g, ''),
        agentImage: user?.profileImage || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
        images: formData.images.length > 0 ? formData.images : ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800'],
      });

      addToast('success', `Property "${newProp.title}" published successfully!`);
      navigate(`/properties/${newProp.id}`);
    } catch (err) {
      addToast('error', 'Failed to publish property. Please try again.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">Add New Property</h1>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Fill in the details to list your property on RealStart platform.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Step Navigation Sidebar matching Screen 5 */}
        <aside className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-4 shadow-card space-y-1">
          {steps.map((step) => {
            const isCurrent = currentStep === step.number;
            const isPassed = currentStep > step.number;

            return (
              <button
                key={step.number}
                onClick={() => setCurrentStep(step.number)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                  isCurrent
                    ? 'bg-brand-600 text-white shadow-sm font-bold'
                    : isPassed
                    ? 'text-brand-600 bg-brand-50/60'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    isCurrent
                      ? 'bg-white text-brand-600'
                      : isPassed
                      ? 'bg-brand-600 text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {isPassed ? '✓' : step.number}
                </div>
                <span>{step.title}</span>
              </button>
            );
          })}
        </aside>

        {/* Right Content Form Body */}
        <main className="lg:col-span-9 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-6">
          {/* Step 1: Basic Information matching Reference Screen 5 */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Basic Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label="Property Title"
                  placeholder="e.g. Modern Luxury Family Villa"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  error={errors.title}
                />

                <Select
                  label="Property Type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as PropertyType })}
                  options={['House', 'Apartment', 'Villa', 'Condo', 'Commercial']}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Enter full description of the property, neighborhood highlights, school zones, etc..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-white text-slate-800 text-sm rounded-xl border border-slate-200 p-3.5 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                />
                {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                  Purpose
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                    <input
                      type="radio"
                      name="purpose"
                      checked={formData.purpose === 'For Sale'}
                      onChange={() => setFormData({ ...formData, purpose: 'For Sale' })}
                      className="w-4 h-4 text-brand-600 focus:ring-brand-500"
                    />
                    For Sale
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                    <input
                      type="radio"
                      name="purpose"
                      checked={formData.purpose === 'For Rent'}
                      onChange={() => setFormData({ ...formData, purpose: 'For Rent' })}
                      className="w-4 h-4 text-brand-600 focus:ring-brand-500"
                    />
                    For Rent
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Property Details */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Property Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <Input
                  label="Bedrooms"
                  type="number"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                />
                <Input
                  label="Bathrooms"
                  type="number"
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                />
                <Input
                  label="Area (Sqft)"
                  type="number"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: Number(e.target.value) })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label="Year Built"
                  type="number"
                  value={formData.yearBuilt}
                  onChange={(e) => setFormData({ ...formData, yearBuilt: Number(e.target.value) })}
                />
                <Input
                  label="Garage (Cars)"
                  type="number"
                  value={formData.garage}
                  onChange={(e) => setFormData({ ...formData, garage: Number(e.target.value) })}
                />
              </div>

              <div className="flex gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={formData.parking}
                    onChange={(e) => setFormData({ ...formData, parking: e.target.checked })}
                    className="w-4 h-4 rounded text-brand-600"
                  />
                  Parking Available
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={formData.furnished}
                    onChange={(e) => setFormData({ ...formData, furnished: e.target.checked })}
                    className="w-4 h-4 rounded text-brand-600"
                  />
                  Furnished
                </label>
              </div>
            </div>
          )}

          {/* Step 3: Location */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Location Details
              </h3>

              <Input
                label="Address"
                placeholder="e.g. 223 Main Street"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                error={errors.address}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label="City"
                  placeholder="e.g. New York"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  error={errors.city}
                />
                <Input
                  label="State / Province"
                  placeholder="e.g. NY"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label="Country"
                  placeholder="e.g. USA"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                />
                <Input
                  label="Zip / Postal Code"
                  placeholder="e.g. 10001"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* Step 4: Pricing */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Pricing & Deposit
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  label="Price ($)"
                  type="number"
                  placeholder="e.g. 750000"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  error={errors.price}
                />
                <Input
                  label="Security Deposit ($)"
                  type="number"
                  placeholder="e.g. 5000"
                  value={formData.securityDeposit}
                  onChange={(e) => setFormData({ ...formData, securityDeposit: Number(e.target.value) })}
                />
              </div>
            </div>
          )}

          {/* Step 5: Photos */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Property Photos
              </h3>

              {/* Upload Dropzone */}
              <div className="border-2 border-dashed border-slate-200 hover:border-brand-500 rounded-2xl p-8 text-center bg-slate-50 hover:bg-brand-50/20 transition-all cursor-pointer relative">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <Upload className="w-10 h-10 text-brand-600 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-800">Click to upload photos</p>
                <p className="text-xs text-slate-400 mt-1">PNG, JPG, or WEBP up to 10MB each</p>
              </div>

              {/* Uploaded Thumbnails Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                {formData.images.map((img, idx) => (
                  <div key={idx} className="relative group h-28 rounded-xl overflow-hidden border border-slate-200">
                    <img src={img} alt={`Uploaded ${idx}`} className="w-full h-full object-cover" />
                    <button
                      onClick={() => handleRemovePhoto(idx)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-red-500 text-white shadow hover:scale-110 transition-transform"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    {idx === 0 && (
                      <span className="absolute bottom-2 left-2 bg-brand-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        Primary
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Review & Publish */}
          {currentStep === 6 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Review Property Summary
              </h3>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-4 text-xs">
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                  <div>
                    <h4 className="text-base font-bold text-slate-900">{formData.title || 'Untitled Property'}</h4>
                    <p className="text-slate-500">{formData.address}, {formData.city}, {formData.country}</p>
                  </div>
                  <span className="text-lg font-extrabold text-brand-600">
                    ${new Intl.NumberFormat().format(formData.price)}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <span className="text-slate-400 font-medium">Type</span>
                    <p className="font-bold text-slate-800">{formData.type}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Purpose</span>
                    <p className="font-bold text-slate-800">{formData.purpose}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Bed / Bath</span>
                    <p className="font-bold text-slate-800">{formData.bedrooms} Beds / {formData.bathrooms} Baths</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Area</span>
                    <p className="font-bold text-slate-800">{formData.area} Sqft</p>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-slate-400 font-medium block mb-1">Uploaded Images</span>
                  <div className="flex gap-2 overflow-x-auto">
                    {formData.images.map((img, idx) => (
                      <img key={idx} src={img} alt="thumb" className="w-16 h-16 rounded-lg object-cover border border-slate-200" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stepper Bottom Controls matching Screen 5 */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            <Button
              variant="outline"
              onClick={currentStep === 1 ? () => navigate('/dashboard') : handleBack}
              icon={<ArrowLeft className="w-4 h-4" />}
            >
              {currentStep === 1 ? 'Cancel' : 'Back'}
            </Button>

            {currentStep < 6 ? (
              <Button
                variant="primary"
                onClick={handleNext}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Next Step
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handlePublish}
                icon={<CheckCircle className="w-4 h-4" />}
              >
                Publish Property
              </Button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
