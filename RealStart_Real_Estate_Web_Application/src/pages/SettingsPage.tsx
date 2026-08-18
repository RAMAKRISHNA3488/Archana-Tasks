import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import {
  LayoutDashboard,
  Building,
  Heart,
  MessageSquare,
  Calendar,
  User as UserIcon,
  Settings,
  LogOut,
  Lock,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { updatePassword, logout } = useAuth();
  const { addToast } = useApp();

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanCurrent = passwordData.currentPassword.trim();
    const cleanNew = passwordData.newPassword.trim();
    const cleanConfirm = passwordData.confirmPassword.trim();

    if (!cleanCurrent) {
      addToast('error', 'Current password is required.');
      return;
    }

    if (!cleanNew) {
      addToast('error', 'New password is required.');
      return;
    }

    if (cleanNew.length < 6) {
      addToast('error', 'Password must contain at least 6 characters.');
      return;
    }

    if (cleanNew !== cleanConfirm) {
      addToast('error', 'Passwords do not match.');
      return;
    }

    setIsUpdatingPassword(true);
    try {
      await updatePassword(cleanCurrent, cleanNew);
      addToast('success', 'Password updated successfully.');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowCurrentPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);
    } catch (err: any) {
      const message = err?.message || 'Unable to update password. Please try again.';
      addToast('error', message);
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const sidebarNavItems = [
    { label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" />, path: '/dashboard' },
    { label: 'My Properties', icon: <Building className="w-4 h-4" />, path: '/properties' },
    { label: 'Favorites', icon: <Heart className="w-4 h-4" />, path: '/favorites' },
    { label: 'Messages', icon: <MessageSquare className="w-4 h-4" />, path: '/messages' },
    { label: 'Appointments', icon: <Calendar className="w-4 h-4" />, path: '/appointments' },
    { label: 'Profile', icon: <UserIcon className="w-4 h-4" />, path: '/profile' },
    { label: 'Settings', icon: <Settings className="w-4 h-4" />, path: '/settings', active: true },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar Navigation matching Screen 12 */}
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

        {/* Right Main Settings Container matching Screen 12 */}
        <main className="lg:col-span-9 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-8">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Account Settings</h1>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Manage your security credentials and update your account password.
            </p>
          </div>

          {/* Password Change Form */}
          <div className="space-y-6 max-w-md">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Lock className="w-5 h-5 text-brand-600" />
              Security & Password
            </h3>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <Input
                label="Current Password"
                type="password"
                placeholder="••••••••"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                isPasswordVisible={showCurrentPassword}
                onTogglePasswordVisibility={() => setShowCurrentPassword((prev) => !prev)}
              />
              <Input
                label="New Password"
                type="password"
                placeholder="••••••••"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                isPasswordVisible={showNewPassword}
                onTogglePasswordVisibility={() => setShowNewPassword((prev) => !prev)}
              />
              <Input
                label="Confirm New Password"
                type="password"
                placeholder="••••••••"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                isPasswordVisible={showConfirmPassword}
                onTogglePasswordVisibility={() => setShowConfirmPassword((prev) => !prev)}
              />
              <div className="pt-2">
                <Button type="submit" variant="primary" disabled={isUpdatingPassword}>
                  {isUpdatingPassword ? 'Updating Password...' : 'Update Password'}
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};
