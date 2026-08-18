import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/ui/Toast';
import { SearchModal } from './components/layout/SearchModal';
import { AuthModalPage } from './pages/AuthModalPage';

import { HomePage } from './pages/HomePage';
import { PropertiesListingPage } from './pages/PropertiesListingPage';
import { PropertyDetailsPage } from './pages/PropertyDetailsPage';
import { AgentsPage } from './pages/AgentsPage';
import { AddPropertyPage } from './pages/AddPropertyPage';
import { DashboardPage } from './pages/DashboardPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { MessagesPage } from './pages/MessagesPage';
import { AppointmentPage } from './pages/AppointmentPage';
import { BlogPage } from './pages/BlogPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';

// Scroll to top component on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppProvider>
        <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 antialiased font-sans selection:bg-brand-600 selection:text-white">
          <ScrollToTop />
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/properties" element={<PropertiesListingPage />} />
              <Route path="/properties/:id" element={<PropertyDetailsPage />} />
              <Route path="/agents" element={<AgentsPage />} />
              <Route path="/add-property" element={<AddPropertyPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/appointments" element={<AppointmentPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/contact" element={<ContactUsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer />
          <SearchModal />
          <AuthModalPage />
        </div>
      </AppProvider>
    </AuthProvider>
  );
};

export default App;
