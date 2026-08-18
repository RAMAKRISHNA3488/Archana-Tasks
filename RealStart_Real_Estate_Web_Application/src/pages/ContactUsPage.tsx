import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export const ContactUsPage: React.FC = () => {
  const { addToast } = useApp();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user?.email) {
      const sanitizedUserEmail = user.email.trim().replace(/^['"]|['"]$/g, '');
      const sanitizedUserName = user.name ? user.name.trim().replace(/^['"]|['"]$/g, '') : '';
      setFormData((prev) => ({
        ...prev,
        name: prev.name || sanitizedUserName,
        email: prev.email || sanitizedUserEmail,
      }));
    }
  }, [user]);

  const validate = () => {
    const errs: Record<string, string> = {};
    const sanitizedEmail = formData.email.trim().replace(/^['"]|['"]$/g, '');

    if (!formData.name.trim()) errs.name = 'Your name is required.';
    if (!sanitizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedEmail)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim()) errs.subject = 'Subject is required.';
    if (!formData.message.trim()) errs.message = 'Message is required.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const sanitizedEmail = formData.email.trim().replace(/^['"]|['"]$/g, '');
    
    if (sanitizedEmail !== formData.email) {
      setFormData((prev) => ({ ...prev, email: sanitizedEmail }));
    }

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await api.submitContactForm({
        ...formData,
        email: sanitizedEmail,
      });
      addToast('success', 'Thank you! Your message has been sent successfully.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    } catch (err) {
      addToast('error', 'Unable to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Get in Touch</h1>
        <p className="text-sm text-slate-500 font-medium">
          We'd love to hear from you. Please fill out the form or reach us directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Contact Info Card matching Screen 11 */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-6">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Address</h4>
                <p className="text-sm font-semibold text-slate-800 mt-0.5">
                  123 RealStart Street, New York, NY 10001
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phone</h4>
                <p className="text-sm font-semibold text-slate-800 mt-0.5">+1 (012) 345 6789</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email</h4>
                <p className="text-sm font-semibold text-slate-800 mt-0.5">info@realstart.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4 pt-4 border-t border-slate-100">
              <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Office Hours</h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Mon - Fri: 9:00 AM - 6:00 PM <br />
                  Sat: 10:00 AM - 4:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Contact Form Card matching Screen 11 */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Your Name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={errors.name}
            />

            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => {
                const val = e.target.value.trim().replace(/^['"]|['"]$/g, '');
                setFormData({ ...formData, email: val });
                if (errors.email) setErrors({ ...errors, email: '' });
              }}
              onBlur={() => {
                const sanitized = formData.email.trim().replace(/^['"]|['"]$/g, '');
                if (sanitized !== formData.email) {
                  setFormData({ ...formData, email: sanitized });
                }
              }}
              required
              error={errors.email}
            />

            <Input
              label="Subject"
              placeholder="Enter subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              error={errors.subject}
            />

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Enter your message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`w-full bg-white text-slate-800 text-sm rounded-xl border border-slate-200 p-3.5 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 ${
                  errors.message ? 'border-red-500' : ''
                }`}
              />
              {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                disabled={isSubmitting}
                icon={<Send className="w-4 h-4" />}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
