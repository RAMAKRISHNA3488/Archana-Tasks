import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  role: Role;
  login: (email: string, role?: Role) => Promise<boolean>;
  register: (name: string, email: string, role?: Role) => Promise<boolean>;
  logout: () => void;
  switchRole: (newRole: Role) => void;
  updateUser: (updates: Partial<User>) => Promise<void>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
  authModalOpen: boolean;
  authModalTab: 'signin' | 'signup' | 'forgot';
  openAuthModal: (tab?: 'signin' | 'signup' | 'forgot') => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'signin' | 'signup' | 'forgot'>('signin');

  useEffect(() => {
    // Load initial user
    api.getUserProfile().then((u) => {
      if (u && u.email) {
        u.email = u.email.trim().replace(/^['"]|['"]$/g, '');
      }
      setUser(u);
    });
  }, []);

  const login = async (email: string, role: Role = 'agent'): Promise<boolean> => {
    const cleanEmail = email.trim().replace(/^['"]|['"]$/g, '');
    const existing = await api.getUserProfile();
    const updatedUser = { ...existing, email: cleanEmail, role };
    await api.updateUserProfile(updatedUser);
    setUser(updatedUser);
    setAuthModalOpen(false);
    return true;
  };

  const register = async (name: string, email: string, role: Role = 'buyer'): Promise<boolean> => {
    const cleanEmail = email.trim().replace(/^['"]|['"]$/g, '');
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name,
      email: cleanEmail,
      role,
      profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      createdAt: new Date().toISOString().split('T')[0],
    };
    await api.updateUserProfile(newUser);
    setUser(newUser);
    setAuthModalOpen(false);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = async (newRole: Role) => {
    const currentUser = user || await api.getUserProfile();
    const updated = { ...currentUser, role: newRole };
    setUser(updated);
    await api.updateUserProfile(updated);
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!user) return;
    if (updates.email) {
      updates.email = updates.email.trim().replace(/^['"]|['"]$/g, '');
    }
    const updated = await api.updateUserProfile(updates);
    setUser(updated);
  };

  const updatePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    const success = await api.updateUserPassword(currentPassword, newPassword);
    if (success) {
      const refreshed = await api.getUserProfile();
      setUser(refreshed);
    }
    return success;
  };

  const openAuthModal = (tab: 'signin' | 'signup' | 'forgot' = 'signin') => {
    setAuthModalTab(tab);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        role: user?.role || 'buyer',
        login,
        register,
        logout,
        switchRole,
        updateUser,
        updatePassword,
        authModalOpen,
        authModalTab,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
