import React from 'react';
import { Link } from 'react-router-dom';
import { Building, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = React.useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newsletterEmail.trim().replace(/^['"]|['"]$/g, '');
    if (clean) {
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white">
                <Building className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold text-white tracking-tight leading-tight">
                  Real<span className="text-brand-500">Start</span>
                </span>
                <span className="text-[10px] font-medium text-slate-400 -mt-1 tracking-widest uppercase">
                  Real Estate Platform
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              RealStart is the leading digital real-estate platform connecting property buyers, sellers, renters, and top certified agents nationwide.
            </p>
            <div className="space-y-2 text-xs text-slate-400 pt-2">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-500 shrink-0" />
                123 RealStart Street, New York, NY 10001
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-500 shrink-0" />
                +1 (012) 345 6789
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-500 shrink-0" />
                info@realstart.com
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="hover:text-brand-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/properties" className="hover:text-brand-400 transition-colors">
                  Properties Discovery
                </Link>
              </li>
              <li>
                <Link to="/agents" className="hover:text-brand-400 transition-colors">
                  Top Agents Directory
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-brand-400 transition-colors">
                  Real Estate News & Tips
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-400 transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Property Types</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/properties?type=House" className="hover:text-brand-400 transition-colors">
                  Single Family Houses
                </Link>
              </li>
              <li>
                <Link to="/properties?type=Apartment" className="hover:text-brand-400 transition-colors">
                  Modern City Apartments
                </Link>
              </li>
              <li>
                <Link to="/properties?type=Villa" className="hover:text-brand-400 transition-colors">
                  Luxury Ocean Villas
                </Link>
              </li>
              <li>
                <Link to="/properties?type=Condo" className="hover:text-brand-400 transition-colors">
                  Waterfront Condos
                </Link>
              </li>
              <li>
                <Link to="/properties?type=Commercial" className="hover:text-brand-400 transition-colors">
                  Commercial Offices
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Newsletter</h4>
            <p className="text-xs text-slate-400 mb-3">
              Subscribe to get market updates and new property listings.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                name="email"
                placeholder="Your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value.trim().replace(/^['"]|['"]$/g, ''))}
                required
                className="w-full bg-slate-800 text-white text-xs rounded-xl border border-slate-700 px-3.5 py-2.5 outline-none focus:border-brand-500"
              />
              <Button type="submit" variant="primary" size="sm" fullWidth icon={<ArrowRight className="w-3.5 h-3.5" />}>
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 RealStart Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-brand-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-brand-400 transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="hover:text-brand-400 transition-colors">
              Cookie Preferences
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
