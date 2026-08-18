import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Property, Appointment } from '../types';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Badge } from '../components/ui/Badge';
import { Calendar, Clock, MapPin, Bed, Bath, Maximize2, CheckCircle2, User as UserIcon, PlusCircle, XCircle } from 'lucide-react';

export const AppointmentPage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedPropertyForAppointment, addToast } = useApp();
  const { user, role } = useAuth();

  const [activeTab, setActiveTab] = useState<'list' | 'create'>(
    selectedPropertyForAppointment ? 'create' : 'list'
  );

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [property, setProperty] = useState<Property | null>(selectedPropertyForAppointment);

  // Form State
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    time: '11:00 AM',
    name: user?.name || 'John Doe',
    phone: user?.phone || '+1 (012) 345 6789',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    api.getAppointments().then((res) => setAppointments(res));
  }, []);

  useEffect(() => {
    if (!property) {
      api.getProperties().then((res) => {
        if (res.properties.length > 0) setProperty(res.properties[0]);
      });
    }
  }, [property]);

  const handleUpdateStatus = async (id: string, status: Appointment['status']) => {
    const updated = await api.updateAppointmentStatus(id, status);
    if (updated) {
      setAppointments((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status } : app))
      );
      addToast('success', `Appointment status changed to ${status}.`);
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.date) errs.date = 'Please select a date.';
    if (!formData.name.trim()) errs.name = 'Please enter your name.';
    if (!formData.phone.trim()) errs.phone = 'Please enter your phone number.';

    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      errs.date = 'Date cannot be in the past.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !property) return;

    setIsSubmitting(true);
    try {
      const newApp = await api.createAppointment({
        propertyId: property.id,
        propertyTitle: property.title,
        propertyImage: property.images[0],
        propertyPrice: property.price,
        propertyLocation: property.location,
        propertyBeds: property.bedrooms,
        propertyBaths: property.bathrooms,
        propertyArea: property.area,
        userId: user?.id || 'usr_001',
        userName: formData.name,
        userEmail: (user?.email || 'john.doe@example.com').trim().replace(/^['"]|['"]$/g, ''),
        phone: formData.phone,
        date: formData.date,
        time: formData.time,
        message: formData.message,
      });

      setAppointments((prev) => [newApp, ...prev]);
      addToast('success', 'Appointment scheduled successfully!');
      setActiveTab('list');
    } catch (err) {
      addToast('error', 'Unable to schedule appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formattedPrice = property
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(property.price)
    : '$0';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Property Appointments & Tours</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            {role === 'agent'
              ? 'Manage prospective buyer tour requests and upcoming schedules.'
              : 'Book property viewings and manage your scheduled appointments.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs font-bold shrink-0">
          <button
            onClick={() => setActiveTab('list')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'list'
                ? 'bg-white text-brand-600 shadow-sm font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Scheduled Appointments ({appointments.length})
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              activeTab === 'create'
                ? 'bg-white text-brand-600 shadow-sm font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" /> Book New Tour
          </button>
        </div>
      </div>

      {/* Tab 1: Scheduled Appointments List */}
      {activeTab === 'list' && (
        <div className="space-y-6">
          {appointments.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-lg font-bold text-slate-800">No Appointments Scheduled</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                You haven't scheduled any property tours yet. Click below to book a visit to your dream property.
              </p>
              <Button variant="primary" onClick={() => setActiveTab('create')} icon={<PlusCircle className="w-4 h-4" />}>
                Book a Tour Now
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {appointments.map((app) => (
                <div
                  key={app.id}
                  className="bg-white rounded-3xl border border-slate-200 p-6 shadow-card hover:shadow-card-hover transition-all space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={app.propertyImage}
                          alt={app.propertyTitle}
                          className="w-16 h-14 rounded-xl object-cover shrink-0 border border-slate-200"
                        />
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{app.propertyTitle}</h4>
                          <span className="text-xs font-extrabold text-brand-600">
                            ${new Intl.NumberFormat().format(app.propertyPrice)}
                          </span>
                          <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                            <span className="line-clamp-1">{app.propertyLocation}</span>
                          </p>
                        </div>
                      </div>

                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase border shrink-0 ${
                          app.status === 'confirmed'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : app.status === 'pending'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : app.status === 'completed'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-red-50 text-red-700 border-red-200'
                        }`}
                      >
                        {app.status}
                      </span>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-slate-400 font-medium block">Tour Date & Time</span>
                        <span className="font-bold text-slate-800 block mt-0.5 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-brand-600" /> {app.date} at {app.time}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-medium block">
                          {role === 'agent' ? 'Applicant Buyer' : 'Contact Person'}
                        </span>
                        <span className="font-bold text-slate-800 block mt-0.5 flex items-center gap-1">
                          <UserIcon className="w-3.5 h-3.5 text-brand-600" /> {app.userName}
                        </span>
                      </div>
                    </div>

                    {app.message && (
                      <p className="text-xs text-slate-600 bg-amber-50/60 p-2.5 rounded-xl border border-amber-100 italic">
                        "{app.message}"
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/properties/${app.propertyId}`)}
                    >
                      View Property
                    </Button>

                    <div className="flex gap-1.5">
                      {role === 'agent' && app.status === 'pending' && (
                        <button
                          onClick={() => handleUpdateStatus(app.id, 'confirmed')}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors shadow-sm"
                        >
                          Confirm Tour
                        </button>
                      )}
                      {app.status !== 'cancelled' && app.status !== 'completed' && (
                        <button
                          onClick={() => handleUpdateStatus(app.id, 'cancelled')}
                          className="px-3 py-1.5 rounded-xl bg-red-50 text-red-600 border border-red-200 font-bold text-xs hover:bg-red-100 transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Book New Tour Form */}
      {activeTab === 'create' && property && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Property Summary Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 shadow-card space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Selected Property Details
            </h3>

            <div className="rounded-2xl overflow-hidden h-48 bg-slate-100 border border-slate-200">
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">{property.title}</h2>
              <span className="text-xl font-extrabold text-brand-600 block mt-0.5">
                {formattedPrice}
              </span>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{property.location}</span>
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 pt-3 border-t border-slate-100">
              <span className="flex items-center gap-1 font-semibold">
                <Bed className="w-4 h-4 text-slate-400" /> {property.bedrooms} Beds
              </span>
              <span className="flex items-center gap-1 font-semibold">
                <Bath className="w-4 h-4 text-slate-400" /> {property.bathrooms} Baths
              </span>
              <span className="flex items-center gap-1 font-semibold">
                <Maximize2 className="w-4 h-4 text-slate-400" /> {property.area} Sqft
              </span>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-6">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Schedule Tour Appointment
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  error={errors.date}
                  icon={<Calendar className="w-4 h-4 text-slate-400" />}
                />

                <Select
                  label="Time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  options={['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:30 PM', '04:00 PM']}
                  icon={<Clock className="w-4 h-4 text-slate-400" />}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Your Full Name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  error={errors.name}
                />

                <Input
                  label="Phone Number"
                  placeholder="Enter your phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  error={errors.phone}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  Message or Special Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter any specific questions or preferred meeting requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white text-slate-800 text-sm rounded-xl border border-slate-200 p-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  size="lg"
                  disabled={isSubmitting}
                  icon={<CheckCircle2 className="w-4 h-4" />}
                >
                  {isSubmitting ? 'Scheduling Tour...' : 'Confirm & Schedule Tour'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
