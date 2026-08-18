import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { User, Package, Heart, MapPin, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useOrder } from '../context/OrderContext';
import { useNotification } from '../context/NotificationContext';
import AccountProfile from '../components/account/AccountProfile';
import AccountAddresses from '../components/account/AccountAddresses';
import AccountOrders from '../components/account/AccountOrders';
import AccountWishlist from '../components/account/AccountWishlist';

export function AccountPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabParam || 'profile');

  const { user, addresses, logout } = useAuth();
  const { wishlist } = useWishlist();
  const { orders } = useOrder();
  const { showToast } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setSearchParams({ tab: tabName });
  };

  const handleLogout = () => {
    logout();
    showToast('You have been logged out.', 'success');
    navigate('/', { replace: true });
  };

  return (
    <div className="account-page container py-lg">
      <div className="flex items-center justify-between mb-lg flex-wrap gap-md">
        <div>
          <span className="badge badge-primary font-bold text-xs mb-xs">Member Account</span>
          <h1 className="text-3xl font-bold text-text-primary">
            Welcome, {user?.name || 'NatureCart Customer'}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-lg">
        {/* Navigation Sidebar */}
        <div className="bg-surface p-md rounded-xl border h-fit flex flex-col gap-xs shadow-xs">
          <button
            type="button"
            onClick={() => handleTabChange('profile')}
            className={`flex items-center gap-sm p-sm rounded-md text-sm font-semibold text-left transition-colors ${
              activeTab === 'profile' ? 'bg-primary-soft text-primary-dark font-bold' : 'hover:bg-bg-cream text-secondary'
            }`}
          >
            <User size={18} /> My Profile
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('orders')}
            className={`flex items-center gap-sm p-sm rounded-md text-sm font-semibold text-left transition-colors ${
              activeTab === 'orders' ? 'bg-primary-soft text-primary-dark font-bold' : 'hover:bg-bg-cream text-secondary'
            }`}
          >
            <Package size={18} /> My Orders ({orders?.length || 0})
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('wishlist')}
            className={`flex items-center gap-sm p-sm rounded-md text-sm font-semibold text-left transition-colors ${
              activeTab === 'wishlist' ? 'bg-primary-soft text-primary-dark font-bold' : 'hover:bg-bg-cream text-secondary'
            }`}
          >
            <Heart size={18} /> My Wishlist ({wishlist.length})
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('addresses')}
            className={`flex items-center gap-sm p-sm rounded-md text-sm font-semibold text-left transition-colors ${
              activeTab === 'addresses' ? 'bg-primary-soft text-primary-dark font-bold' : 'hover:bg-bg-cream text-secondary'
            }`}
          >
            <MapPin size={18} /> Saved Addresses ({addresses?.length || 0})
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-sm p-sm rounded-md text-sm font-semibold text-left text-danger hover:bg-discount-bg mt-md border-t pt-sm transition-colors"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>

        {/* Tab Content Panel */}
        <div className="col-span-3 bg-surface p-xl rounded-xl border shadow-xs">
          {activeTab === 'profile' && <AccountProfile />}
          {activeTab === 'orders' && <AccountOrders />}
          {activeTab === 'wishlist' && <AccountWishlist />}
          {activeTab === 'addresses' && <AccountAddresses />}
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
