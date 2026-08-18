import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import {
  Home,
  Search,
  Heart,
  MessageSquare,
  User as UserIcon,
  Menu,
  X,
  ChevronDown,
  Building,
  LogOut,
  PlusCircle,
  LayoutDashboard,
  Shield,
  Settings,
} from 'lucide-react';

export const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, role, logout, switchRole, openAuthModal } = useAuth();
  const { favorites, setSearchModalOpen } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/properties' },
    { name: 'Agents', path: '/agents' },
    {
      name: 'Pages',
      path: '#',
      isDropdown: true,
      children: [
        { name: 'Add Property', path: '/add-property' },
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Favorites', path: '/favorites' },
        { name: 'Messages', path: '/messages' },
        { name: 'Appointment', path: '/appointments' },
        { name: 'Profile', path: '/profile' },
      ],
    },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <Building className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold text-slate-900 tracking-tight leading-tight flex items-center gap-1">
              Real<span className="text-brand-600">Start</span>
            </span>
            <span className="text-[10px] font-medium text-slate-400 -mt-1 tracking-widest uppercase">
              Real Estate
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            if (link.isDropdown) {
              return (
                <div key={link.name} className="relative group/dropdown">
                  <button
                    onClick={() => setPagesDropdownOpen(!pagesDropdownOpen)}
                    className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-brand-600 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <span>{link.name}</span>
                    <ChevronDown className="w-4 h-4 text-slate-400 group-hover/dropdown:rotate-180 transition-transform" />
                  </button>

                  <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-2xl shadow-modal border border-slate-100 p-2 hidden group-hover/dropdown:block z-50 animate-in fade-in duration-200">
                    {link.children?.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className={`flex items-center px-3.5 py-2.5 text-xs font-semibold rounded-xl transition-colors ${
                          isActive(child.path)
                            ? 'bg-brand-50 text-brand-600'
                            : 'text-slate-700 hover:bg-slate-50 hover:text-brand-600'
                        }`}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors relative ${
                  isActive(link.path)
                    ? 'text-brand-600 bg-brand-50/70 font-bold'
                    : 'text-slate-700 hover:text-brand-600 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Action Header Bar */}
        <div className="hidden md:flex items-center gap-3">
          {/* Quick Search Trigger */}
          <button
            onClick={() => setSearchModalOpen(true)}
            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-brand-600 hover:bg-slate-50 transition-colors"
            title="Search Properties"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Quick Favorite Counter */}
          <Link
            to="/favorites"
            className="relative p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-red-500 hover:bg-slate-50 transition-colors"
            title="Saved Favorites"
          >
            <Heart className="w-4 h-4" />
            {favorites.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                {favorites.length}
              </span>
            )}
          </Link>

          {/* Messages Direct Link */}
          <Link
            to="/messages"
            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-brand-600 hover:bg-slate-50 transition-colors"
            title="Messages"
          >
            <MessageSquare className="w-4 h-4" />
          </Link>

          {/* Role Switcher Pill */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/60 text-xs font-semibold text-slate-600">
            <button
              onClick={() => switchRole('buyer')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                role === 'buyer' ? 'bg-white text-brand-600 shadow-sm font-bold' : 'hover:text-slate-900'
              }`}
              title="Buyer Mode"
            >
              Buyer
            </button>
            <button
              onClick={() => switchRole('agent')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                role === 'agent' ? 'bg-white text-brand-600 shadow-sm font-bold' : 'hover:text-slate-900'
              }`}
              title="Agent Mode"
            >
              Agent
            </button>
          </div>

          {/* User Sign In / Profile */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-white transition-all shadow-sm"
              >
                <img
                  src={user.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
                  alt={user.name}
                  className="w-8 h-8 rounded-lg object-cover"
                />
                <span className="text-xs font-bold text-slate-800">{user.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {userDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-modal border border-slate-100 p-2 z-50"
                  onClick={() => setUserDropdownOpen(false)}
                >
                  <div className="p-3 border-b border-slate-100 mb-1">
                    <p className="text-xs font-bold text-slate-800">{user.name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{user.email ? user.email.trim().replace(/^['"]|['"]$/g, '') : ''}</p>
                    <span className="inline-block mt-1.5 px-2 py-0.5 bg-brand-50 text-brand-700 text-[10px] font-bold uppercase tracking-wider rounded">
                      Role: {user.role}
                    </span>
                  </div>

                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-brand-600 rounded-xl"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>

                  {(role === 'agent' || role === 'admin') && (
                    <Link
                      to="/add-property"
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-brand-600 rounded-xl"
                    >
                      <PlusCircle className="w-4 h-4" />
                      Add Property
                    </Link>
                  )}

                  <Link
                    to="/profile"
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-brand-600 rounded-xl"
                  >
                    <UserIcon className="w-4 h-4" />
                    Profile
                  </Link>

                  <Link
                    to="/settings"
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-brand-600 rounded-xl"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>

                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl mt-1"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Button variant="primary" size="md" onClick={() => openAuthModal('signin')}>
              Sign In
            </Button>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setSearchModalOpen(true)}
            className="p-2 text-slate-600 hover:text-brand-600"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              if (link.isDropdown) {
                return (
                  <div key={link.name} className="space-y-1 pl-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 py-1">
                      {link.name}
                    </span>
                    {link.children?.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block px-3 py-2 text-sm font-semibold rounded-xl ${
                          isActive(child.path)
                            ? 'bg-brand-50 text-brand-600 font-bold'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                );
              }
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3.5 py-2.5 text-sm font-semibold rounded-xl ${
                    isActive(link.path)
                      ? 'bg-brand-50 text-brand-600 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600 px-1">
              <span>Current Role:</span>
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                <button
                  onClick={() => switchRole('buyer')}
                  className={`px-2 py-0.5 rounded text-[11px] ${role === 'buyer' ? 'bg-white text-brand-600 font-bold shadow-sm' : ''}`}
                >
                  Buyer
                </button>
                <button
                  onClick={() => switchRole('agent')}
                  className={`px-2 py-0.5 rounded text-[11px] ${role === 'agent' ? 'bg-white text-brand-600 font-bold shadow-sm' : ''}`}
                >
                  Agent
                </button>
              </div>
            </div>

            {isAuthenticated ? (
              <Button
                variant="outline"
                fullWidth
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
              >
                Sign Out
              </Button>
            ) : (
              <Button
                variant="primary"
                fullWidth
                onClick={() => {
                  openAuthModal('signin');
                  setMobileMenuOpen(false);
                }}
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
