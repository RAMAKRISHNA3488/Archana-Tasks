import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Mail, Lock, User as UserIcon, LogIn, UserPlus } from 'lucide-react';
import { Role } from '../types';

export const AuthModalPage: React.FC = () => {
  const { authModalOpen, authModalTab, closeAuthModal, openAuthModal, login, register } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<Role>('buyer');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const sanitizedEmail = email.trim().replace(/^['"]|['"]$/g, '');
    if (!sanitizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedEmail)) {
      setErrors({ email: 'Please enter a valid email.' });
      return;
    }
    await login(sanitizedEmail, role);
    setEmail('');
    setPassword('');
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrors({ name: 'Name is required.' });
      return;
    }
    const sanitizedEmail = email.trim().replace(/^['"]|['"]$/g, '');
    if (!sanitizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedEmail)) {
      setErrors({ email: 'Please enter a valid email.' });
      return;
    }
    await register(name, sanitizedEmail, role);
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <Modal isOpen={authModalOpen} onClose={closeAuthModal} maxWidth="md">
      <div className="space-y-6">
        {/* Tabs */}
        <div className="flex border-b border-slate-100">
          <button
            onClick={() => openAuthModal('signin')}
            className={`flex-1 py-3 text-sm font-bold transition-all border-b-2 ${
              authModalTab === 'signin'
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => openAuthModal('signup')}
            className={`flex-1 py-3 text-sm font-bold transition-all border-b-2 ${
              authModalTab === 'signup'
                ? 'border-brand-600 text-brand-600'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Sign In Form */}
        {authModalTab === 'signin' && (
          <form onSubmit={handleSignIn} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="john.doe@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim().replace(/^['"]|['"]$/g, ''))}
              error={errors.email}
              icon={<Mail className="w-4 h-4 text-slate-400" />}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="w-4 h-4 text-slate-400" />}
            />

            <Select
              label="Select Role"
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              options={[
                { value: 'buyer', label: 'User / Buyer' },
                { value: 'agent', label: 'Real Estate Agent' },
                { value: 'admin', label: 'Platform Admin' },
              ]}
            />

            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              icon={<LogIn className="w-4 h-4" />}
            >
              Sign In
            </Button>
          </form>
        )}

        {/* Sign Up Form */}
        {authModalTab === 'signup' && (
          <form onSubmit={handleSignUp} className="space-y-4">
            <Input
              label="Full Name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              icon={<UserIcon className="w-4 h-4 text-slate-400" />}
            />

            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="john.doe@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim().replace(/^['"]|['"]$/g, ''))}
              error={errors.email}
              icon={<Mail className="w-4 h-4 text-slate-400" />}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="w-4 h-4 text-slate-400" />}
            />

            <Select
              label="Account Role"
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              options={[
                { value: 'buyer', label: 'User / Buyer' },
                { value: 'agent', label: 'Real Estate Agent' },
                { value: 'admin', label: 'Platform Admin' },
              ]}
            />

            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              icon={<UserPlus className="w-4 h-4" />}
            >
              Register Account
            </Button>
          </form>
        )}
      </div>
    </Modal>
  );
};
