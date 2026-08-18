import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { api } from '../services/api';
import { Property, DashboardStats, Appointment } from '../types';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { PropertyCard } from '../components/property/PropertyCard';
import {
  LayoutDashboard,
  Building,
  Heart,
  MessageSquare,
  Calendar,
  User as UserIcon,
  Settings,
  LogOut,
  PlusCircle,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  MapPin,
  Phone,
  Mail,
  UserCheck,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, role, switchRole, logout } = useAuth();
  const { favorites, addToast, setSelectedPropertyForAppointment } = useApp();

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [propertyToDelete, setPropertyToDelete] = useState<Property | null>(null);

  useEffect(() => {
    api.getDashboardStats().then((res) => setStats(res));
    api.getProperties().then((res) => setProperties(res.properties));
    api.getAppointments().then((res) => setAppointments(res));
  }, []);

  const handleDeleteConfirm = async () => {
    if (!propertyToDelete) return;
    const success = await api.deleteProperty(propertyToDelete.id);
    if (success) {
      setProperties((prev) => prev.filter((p) => p.id !== propertyToDelete.id));
      addToast('success', `Property "${propertyToDelete.title}" deleted.`);
    } else {
      addToast('error', 'Failed to delete property.');
    }
    setPropertyToDelete(null);
  };

  const handleUpdateAppointmentStatus = async (id: string, newStatus: Appointment['status']) => {
    const updated = await api.updateAppointmentStatus(id, newStatus);
    if (updated) {
      setAppointments((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
      );
      addToast('success', `Appointment status updated to ${newStatus}.`);
    }
  };

  const favoriteProperties = properties.filter((p) => favorites.includes(p.id));

  const sidebarNavItems = [
    { label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" />, path: '/dashboard', active: true },
    { label: 'My Properties', icon: <Building className="w-4 h-4" />, path: '/properties' },
    { label: 'Favorites', icon: <Heart className="w-4 h-4" />, path: '/favorites' },
    { label: 'Messages', icon: <MessageSquare className="w-4 h-4" />, path: '/messages' },
    { label: 'Appointments', icon: <Calendar className="w-4 h-4" />, path: '/appointments' },
    { label: 'Profile', icon: <UserIcon className="w-4 h-4" />, path: '/profile' },
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

        {/* Right Main Dashboard Panel */}
        <main className="lg:col-span-9 space-y-8">
          {/* Top Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-card">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-slate-900">
                  Welcome back, {user?.name || 'John'}!
                </h1>
                <span className="px-2.5 py-0.5 bg-brand-50 text-brand-700 text-xs font-extrabold uppercase rounded-full border border-brand-200">
                  {role === 'agent' ? 'Agent Mode' : 'Buyer Mode'}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1">
                {role === 'agent'
                  ? "Here's what's happening with your real estate listings, leads, and client tour requests."
                  : 'Track your saved dream homes, message history, and scheduled property tours.'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Role Switcher Pill */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600">
                <button
                  onClick={() => switchRole('buyer')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    role === 'buyer' ? 'bg-white text-brand-600 shadow-sm font-bold' : 'hover:text-slate-900'
                  }`}
                >
                  Buyer View
                </button>
                <button
                  onClick={() => switchRole('agent')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    role === 'agent' ? 'bg-white text-brand-600 shadow-sm font-bold' : 'hover:text-slate-900'
                  }`}
                >
                  Agent View
                </button>
              </div>

              {(role === 'agent' || role === 'admin') && (
                <Button
                  variant="primary"
                  onClick={() => navigate('/add-property')}
                  icon={<PlusCircle className="w-4 h-4" />}
                >
                  Add Property
                </Button>
              )}
            </div>
          </div>

          {/* Stat Cards - Role Dependent */}
          {role === 'buyer' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card space-y-2">
                <span className="text-xs font-semibold text-slate-500 block">Saved Favorites</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-extrabold text-slate-900">{favorites.length}</span>
                  <Link to="/favorites" className="text-xs font-bold text-brand-600 hover:underline">
                    View All
                  </Link>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card space-y-2">
                <span className="text-xs font-semibold text-slate-500 block">Booked Tours</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-extrabold text-slate-900">{appointments.length}</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Active
                  </span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card space-y-2">
                <span className="text-xs font-semibold text-slate-500 block">Agent Messages</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-extrabold text-slate-900">4</span>
                  <Link to="/messages" className="text-xs font-bold text-brand-600 hover:underline">
                    Open Chat
                  </Link>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card space-y-2">
                <span className="text-xs font-semibold text-slate-500 block">Available Listings</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-extrabold text-slate-900">{properties.length}</span>
                  <Link to="/properties" className="text-xs font-bold text-brand-600 hover:underline">
                    Explore
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card space-y-2">
                <span className="text-xs font-semibold text-slate-500 block">My Listed Properties</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-extrabold text-slate-900">
                    {stats?.totalProperties || properties.length}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <TrendingUp className="w-3 h-3" /> +{stats?.propertiesTrend || 18.2}%
                  </span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card space-y-2">
                <span className="text-xs font-semibold text-slate-500 block">Total Listing Views</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-extrabold text-slate-900">
                    {stats?.totalViews ? new Intl.NumberFormat().format(stats.totalViews) : '3,245'}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <TrendingUp className="w-3 h-3" /> +{stats?.viewsTrend || 12.5}%
                  </span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card space-y-2">
                <span className="text-xs font-semibold text-slate-500 block">Client Inquiries</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-extrabold text-slate-900">
                    {stats?.inquiries || 89}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <TrendingUp className="w-3 h-3" /> +{stats?.inquiriesTrend || 10.5}%
                  </span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card space-y-2">
                <span className="text-xs font-semibold text-slate-500 block">Tour Appointments</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-extrabold text-slate-900">
                    {appointments.length}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <TrendingUp className="w-3 h-3" /> +{stats?.appointmentsTrend || 6.1}%
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* BUYER VIEW SECTIONS */}
          {role === 'buyer' ? (
            <div className="space-y-8">
              {/* Scheduled Property Visits / Appointments */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">My Booked Property Tours</h3>
                    <p className="text-xs text-slate-400">Scheduled visits with listing agents.</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/appointments')}
                    icon={<Calendar className="w-4 h-4" />}
                  >
                    Schedule New Tour
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                      <tr>
                        <th className="p-4 pl-6">Property</th>
                        <th className="p-4">Date & Time</th>
                        <th className="p-4">Applicant</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 pr-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {appointments.map((app) => (
                        <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-4 pl-6 flex items-center gap-3">
                            <img
                              src={app.propertyImage}
                              alt={app.propertyTitle}
                              className="w-12 h-10 rounded-lg object-cover shrink-0 border border-slate-200"
                            />
                            <div>
                              <span className="font-bold text-slate-800 block text-xs line-clamp-1">
                                {app.propertyTitle}
                              </span>
                              <span className="text-[11px] text-slate-400">{app.propertyLocation}</span>
                            </div>
                          </td>
                          <td className="p-4 font-semibold text-slate-800">
                            <span className="block font-bold">{app.date}</span>
                            <span className="text-[11px] text-slate-400">{app.time}</span>
                          </td>
                          <td className="p-4">
                            <span className="font-bold text-slate-800 block">{app.userName}</span>
                            <span className="text-[11px] text-slate-400">{app.phone}</span>
                          </td>
                          <td className="p-4">
                            <span
                              className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                                app.status === 'confirmed'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : app.status === 'pending'
                                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                                  : app.status === 'completed'
                                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                                  : 'bg-red-50 text-red-700 border-red-200'
                              }`}
                            >
                              {app.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="p-4 pr-6 text-right space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate(`/properties/${app.propertyId}`)}
                            >
                              View Property
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Saved Favorites Quick Grid */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-card space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Saved Favorites</h3>
                    <p className="text-xs text-slate-400">Properties you have bookmarked.</p>
                  </div>
                  <Link to="/favorites" className="text-xs font-bold text-brand-600 hover:underline">
                    View All ({favorites.length})
                  </Link>
                </div>

                {favoriteProperties.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteProperties.slice(0, 3).map((prop) => (
                      <PropertyCard key={prop.id} property={prop} />
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 text-center py-6">
                    No saved properties yet. Browse properties and click the heart icon to save.
                  </p>
                )}
              </div>
            </div>
          ) : (
            /* AGENT VIEW SECTIONS */
            <div className="space-y-8">
              {/* Agent Properties Table */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Active Listings & Properties</h3>
                    <p className="text-xs text-slate-400">Properties assigned to your agent account.</p>
                  </div>
                  <Link
                    to="/properties"
                    className="text-xs font-semibold text-brand-600 hover:text-brand-700"
                  >
                    View All Properties
                  </Link>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                      <tr>
                        <th className="p-4 pl-6">Property</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Views</th>
                        <th className="p-4">Inquiries</th>
                        <th className="p-4 pr-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {properties.map((prop) => (
                        <tr key={prop.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-4 pl-6 flex items-center gap-3">
                            <img
                              src={prop.images[0]}
                              alt={prop.title}
                              className="w-12 h-10 rounded-lg object-cover shrink-0 border border-slate-200"
                            />
                            <div>
                              <span className="font-bold text-slate-800 block text-xs line-clamp-1">
                                {prop.title}
                              </span>
                              <span className="text-[11px] text-slate-400">{prop.location}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge variant={prop.purpose === 'For Sale' ? 'for-sale' : 'for-rent'}>
                              {prop.purpose}
                            </Badge>
                          </td>
                          <td className="p-4 font-semibold text-slate-800">
                            {new Intl.NumberFormat().format(prop.views)}
                          </td>
                          <td className="p-4 font-semibold text-slate-800">{prop.inquiries}</td>
                          <td className="p-4 pr-6 text-right space-x-2">
                            <button
                              onClick={() => navigate(`/properties/${prop.id}`)}
                              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-brand-600 hover:bg-white"
                              title="View Property"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => navigate('/add-property')}
                              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-brand-600 hover:bg-white"
                              title="Edit Property"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setPropertyToDelete(prop)}
                              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-red-600 hover:bg-white"
                              title="Delete Property"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Client Appointments Request Management Table */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Client Tour Requests</h3>
                    <p className="text-xs text-slate-400">Review and confirm client property viewings.</p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                      <tr>
                        <th className="p-4 pl-6">Buyer Name</th>
                        <th className="p-4">Property Requested</th>
                        <th className="p-4">Date & Time</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 pr-6 text-right">Manage Request</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {appointments.map((app) => (
                        <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-4 pl-6">
                            <span className="font-bold text-slate-800 block">{app.userName}</span>
                            <span className="text-[11px] text-slate-400 block">{app.userEmail}</span>
                            <span className="text-[11px] text-slate-500 block">{app.phone}</span>
                          </td>
                          <td className="p-4">
                            <span className="font-bold text-slate-800 block line-clamp-1">{app.propertyTitle}</span>
                            <span className="text-[11px] text-slate-400">{app.propertyLocation}</span>
                          </td>
                          <td className="p-4">
                            <span className="font-bold text-slate-800 block">{app.date}</span>
                            <span className="text-[11px] text-slate-400">{app.time}</span>
                          </td>
                          <td className="p-4">
                            <span
                              className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                                app.status === 'confirmed'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : app.status === 'pending'
                                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                                  : app.status === 'completed'
                                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                                  : 'bg-red-50 text-red-700 border-red-200'
                              }`}
                            >
                              {app.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="p-4 pr-6 text-right space-x-1">
                            {app.status === 'pending' && (
                              <button
                                onClick={() => handleUpdateAppointmentStatus(app.id, 'confirmed')}
                                className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700 transition-colors"
                              >
                                Confirm
                              </button>
                            )}
                            {app.status === 'confirmed' && (
                              <button
                                onClick={() => handleUpdateAppointmentStatus(app.id, 'completed')}
                                className="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-bold text-[11px] hover:bg-blue-700 transition-colors"
                              >
                                Mark Completed
                              </button>
                            )}
                            {app.status !== 'cancelled' && (
                              <button
                                onClick={() => handleUpdateAppointmentStatus(app.id, 'cancelled')}
                                className="px-2.5 py-1 rounded-lg bg-red-50 text-red-600 border border-red-200 font-bold text-[11px] hover:bg-red-100 transition-colors"
                              >
                                Cancel
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Delete Confirmation Dialog */}
      {propertyToDelete && (
        <ConfirmDialog
          isOpen={!!propertyToDelete}
          onClose={() => setPropertyToDelete(null)}
          onConfirm={handleDeleteConfirm}
          title="Delete Property?"
          message={`Are you sure you want to permanently delete "${propertyToDelete.title}"? This action cannot be undone.`}
        />
      )}
    </div>
  );
};
