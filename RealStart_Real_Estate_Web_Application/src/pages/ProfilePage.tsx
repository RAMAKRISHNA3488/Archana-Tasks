import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import {
  LayoutDashboard,
  Building,
  Heart,
  MessageSquare,
  Calendar,
  User as UserIcon,
  Settings,
  LogOut,
  Camera,
  Save,
  ShieldCheck,
  Briefcase,
  Sliders,
} from 'lucide-react';

const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400';

const sanitizeEmail = (emailStr?: string) => (emailStr || '').trim().replace(/^['"]|['"]$/g, '');

export const ProfilePage: React.FC = () => {
  const { user, role, switchRole, updateUser, logout } = useAuth();
  const { addToast } = useApp();

  const [formData, setFormData] = useState({
    name: user?.name || 'John Doe',
    email: sanitizeEmail(user?.email || 'john.doe@example.com'),
    phone: user?.phone || '+1 (012) 345 6789',
    profileImage: user?.profileImage || DEFAULT_AVATAR,

    // Buyer details
    preferredType: user?.preferredType || 'House',
    preferredLocation: user?.preferredLocation || 'New York, USA',
    minPricePreference: user?.minPricePreference || 300000,
    maxPricePreference: user?.maxPricePreference || 1500000,

    // Agent details
    agentTitle: user?.agentTitle || 'Senior Real Estate Consultant',
    agencyName: user?.agencyName || 'RealStart Realty Group',
    licenseNumber: user?.licenseNumber || 'RE-LIC-984201',
    experienceYears: user?.experienceYears || 10,
    bio: user?.bio || 'Dedicated real estate professional committed to delivering premium home buying and selling experiences.',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || 'John Doe',
        email: sanitizeEmail(user.email || 'john.doe@example.com'),
        phone: user.phone || '+1 (012) 345 6789',
        profileImage: user.profileImage || DEFAULT_AVATAR,
        preferredType: user.preferredType || 'House',
        preferredLocation: user.preferredLocation || 'New York, USA',
        minPricePreference: user.minPricePreference || 300000,
        maxPricePreference: user.maxPricePreference || 1500000,
        agentTitle: user.agentTitle || 'Senior Real Estate Consultant',
        agencyName: user.agencyName || 'RealStart Realty Group',
        licenseNumber: user.licenseNumber || 'RE-LIC-984201',
        experienceYears: user.experienceYears || 10,
        bio: user.bio || 'Dedicated real estate professional committed to delivering premium home buying and selling experiences.',
      });
    }
  }, [user]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type.toLowerCase())) {
        addToast('error', 'Please select a valid JPG, PNG, or WEBP image under 5 MB.');
        return;
      }

      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        addToast('error', 'Please select a valid JPG, PNG, or WEBP image under 5 MB.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setFormData((prev) => ({ ...prev, profileImage: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const validateProfileForm = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = 'Please enter your full name.';
    }
    const cleanEmail = sanitizeEmail(formData.email);
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Please enter a valid phone number.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateProfileForm()) {
      return;
    }

    setIsSubmitting(true);
    const sanitizedEmail = sanitizeEmail(formData.email);
    try {
      await updateUser({
        name: formData.name.trim(),
        email: sanitizedEmail,
        phone: formData.phone.trim(),
        profileImage: formData.profileImage,
        preferredType: formData.preferredType,
        preferredLocation: formData.preferredLocation,
        minPricePreference: Number(formData.minPricePreference),
        maxPricePreference: Number(formData.maxPricePreference),
        agentTitle: formData.agentTitle,
        agencyName: formData.agencyName,
        licenseNumber: formData.licenseNumber,
        experienceYears: Number(formData.experienceYears),
        bio: formData.bio,
      });
      setFormData((prev) => ({ ...prev, email: sanitizedEmail }));
      setErrors({});
      addToast('success', 'Profile details updated successfully.');
    } catch (err) {
      addToast('error', 'Unable to update your profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const sidebarNavItems = [
    { label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" />, path: '/dashboard' },
    { label: 'My Properties', icon: <Building className="w-4 h-4" />, path: '/properties' },
    { label: 'Favorites', icon: <Heart className="w-4 h-4" />, path: '/favorites' },
    { label: 'Messages', icon: <MessageSquare className="w-4 h-4" />, path: '/messages' },
    { label: 'Appointments', icon: <Calendar className="w-4 h-4" />, path: '/appointments' },
    { label: 'Profile', icon: <UserIcon className="w-4 h-4" />, path: '/profile', active: true },
    { label: 'Settings', icon: <Settings className="w-4 h-4" />, path: '/settings' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar Navigation */}
        <aside className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-4 shadow-card space-y-1">
          {sidebarNavItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                item.active
                  ? 'bg-brand-50 text-brand-600 font-bold border border-brand-200/50'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}

          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors mt-4 border-t border-slate-100"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </aside>

        {/* Right Main Profile Form Container */}
        <main className="lg:col-span-9 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900">
                {role === 'agent' ? 'Agent Profile & Information' : 'Buyer Profile & Preferences'}
              </h1>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Manage your account credentials, {role === 'agent' ? 'agency details, and credentials' : 'buyer preferences, and search criteria'}.
              </p>
            </div>

            {/* Role Switcher Pill */}
            <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-xs font-bold shrink-0">
              <button
                onClick={() => switchRole('buyer')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  role === 'buyer' ? 'bg-white text-brand-600 shadow-sm font-extrabold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Buyer Profile
              </button>
              <button
                onClick={() => switchRole('agent')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  role === 'agent' ? 'bg-white text-brand-600 shadow-sm font-extrabold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Agent Profile
              </button>
            </div>
          </div>

          {/* Profile Photo Header */}
          <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={formData.profileImage}
                  alt={formData.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = DEFAULT_AVATAR;
                  }}
                  className="w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-sm"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900">{formData.name}</h3>
                  <span className="px-2 py-0.5 bg-brand-100 text-brand-700 text-[10px] font-bold uppercase rounded tracking-wider">
                    {role}
                  </span>
                </div>
                <p className="text-xs text-slate-500">{formData.email}</p>
              </div>
            </div>

            <label className="relative inline-flex items-center justify-center">
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <span className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors shadow-sm">
                <Camera className="w-3.5 h-3.5" />
                Change Photo
              </span>
            </label>
          </div>

          {/* Details Form */}
          <form onSubmit={handleSaveProfile} className="space-y-8">
            {/* General Contact Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <UserIcon className="w-4 h-4 text-brand-600" /> Account & Contact Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  error={errors.name}
                />

                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => {
                    const clean = e.target.value.trim().replace(/^['"]|['"]$/g, '');
                    setFormData({ ...formData, email: clean });
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  onBlur={() => setFormData({ ...formData, email: sanitizeEmail(formData.email) })}
                  error={errors.email}
                />

                <Input
                  label="Phone Number"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                    if (errors.phone) setErrors({ ...errors, phone: '' });
                  }}
                  error={errors.phone}
                />
              </div>
            </div>

            {/* Role Specific Section: Buyer Preferences */}
            {role === 'buyer' && (
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-brand-600" /> Buyer Search & Property Preferences
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    label="Preferred Property Type"
                    value={formData.preferredType}
                    onChange={(e) => setFormData({ ...formData, preferredType: e.target.value })}
                    options={['House', 'Apartment', 'Villa', 'Condo', 'Commercial']}
                  />

                  <Input
                    label="Preferred Target City / Location"
                    value={formData.preferredLocation}
                    onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                  />

                  <Input
                    label="Minimum Budget ($)"
                    type="number"
                    value={formData.minPricePreference.toString()}
                    onChange={(e) => setFormData({ ...formData, minPricePreference: Number(e.target.value) })}
                  />

                  <Input
                    label="Maximum Budget ($)"
                    type="number"
                    value={formData.maxPricePreference.toString()}
                    onChange={(e) => setFormData({ ...formData, maxPricePreference: Number(e.target.value) })}
                  />
                </div>
              </div>
            )}

            {/* Role Specific Section: Agent Professional Credentials */}
            {(role === 'agent' || role === 'admin') && (
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-brand-600" /> Agent Professional Profile & Credentials
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Professional Title"
                    placeholder="e.g. Senior Real Estate Consultant"
                    value={formData.agentTitle}
                    onChange={(e) => setFormData({ ...formData, agentTitle: e.target.value })}
                  />

                  <Input
                    label="Agency / Company Name"
                    placeholder="e.g. RealStart Realty"
                    value={formData.agencyName}
                    onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
                  />

                  <Input
                    label="Real Estate License ID"
                    placeholder="e.g. RE-LIC-984201"
                    value={formData.licenseNumber}
                    onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                    icon={<ShieldCheck className="w-4 h-4 text-emerald-500" />}
                  />

                  <Input
                    label="Years of Experience"
                    type="number"
                    value={formData.experienceYears.toString()}
                    onChange={(e) => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                    Agent Bio & Description
                  </label>
                  <textarea
                    rows={4}
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full bg-white text-slate-800 text-sm rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                    placeholder="Write a brief professional bio to introduce yourself to prospective buyers..."
                  />
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100">
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                icon={<Save className="w-4 h-4" />}
              >
                {isSubmitting ? 'Saving Profile...' : 'Save Profile Changes'}
              </Button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};
