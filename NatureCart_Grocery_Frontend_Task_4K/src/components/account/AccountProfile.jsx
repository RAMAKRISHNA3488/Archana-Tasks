import React, { useState } from 'react';
import { User, Mail, Phone, Edit2, Check, X, Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import './AccountProfile.css';

export function AccountProfile() {
  const { user, updateProfile } = useAuth();
  const { showToast } = useNotification();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Mobile number is required.';
    } else if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const res = updateProfile(formData);
    if (res.success) {
      setIsEditing(false);
      showToast('Profile updated successfully.', 'success');
    } else {
      showToast(res.error || 'Failed to update profile.', 'error');
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || ''
    });
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className="account-profile-card">
      <div className="flex items-center justify-between pb-sm border-b mb-md">
        <div>
          <h2 className="text-xl font-bold text-text-primary">Profile Information</h2>
          <p className="text-xs text-muted">Manage your personal account details and communication preferences.</p>
        </div>

        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="btn btn-outline btn-sm flex items-center gap-xs"
          >
            <Edit2 size={14} />
            <span>Edit Profile</span>
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSave} className="flex flex-col gap-md max-w-lg">
          <div className="form-group">
            <label className="text-xs font-semibold text-text-primary block mb-xs">
              Full Name <span className="text-danger">*</span>
            </label>
            <div className="relative">
              <span className="input-left-icon">
                <User size={16} className="text-muted" />
              </span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`input-field input-with-left-icon ${errors.name ? 'input-error' : ''}`}
              />
            </div>
            {errors.name && <span className="text-xs text-danger mt-xs block">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label className="text-xs font-semibold text-text-primary block mb-xs">
              Email Address <span className="text-danger">*</span>
            </label>
            <div className="relative">
              <span className="input-left-icon">
                <Mail size={16} className="text-muted" />
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`input-field input-with-left-icon ${errors.email ? 'input-error' : ''}`}
              />
            </div>
            {errors.email && <span className="text-xs text-danger mt-xs block">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label className="text-xs font-semibold text-text-primary block mb-xs">
              Mobile Number <span className="text-danger">*</span>
            </label>
            <div className="relative">
              <span className="input-left-icon">
                <Phone size={16} className="text-muted" />
              </span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                maxLength={10}
                className={`input-field input-with-left-icon ${errors.phone ? 'input-error' : ''}`}
              />
            </div>
            {errors.phone && <span className="text-xs text-danger mt-xs block">{errors.phone}</span>}
          </div>

          <div className="flex items-center gap-sm mt-xs">
            <button type="submit" className="btn btn-primary btn-md flex items-center gap-xs">
              <Save size={16} />
              <span>Save Changes</span>
            </button>
            <button type="button" onClick={handleCancel} className="btn btn-outline btn-md flex items-center gap-xs">
              <X size={16} />
              <span>Cancel</span>
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-2 gap-lg text-sm max-w-xl">
          <div className="bg-bg-cream p-md rounded-lg border">
            <span className="text-xs text-muted block mb-xs">Full Name</span>
            <div className="font-bold text-text-primary text-base">{user?.name}</div>
          </div>

          <div className="bg-bg-cream p-md rounded-lg border">
            <span className="text-xs text-muted block mb-xs">Email Address</span>
            <div className="font-bold text-text-primary text-base">{user?.email}</div>
          </div>

          <div className="bg-bg-cream p-md rounded-lg border">
            <span className="text-xs text-muted block mb-xs">Mobile Number</span>
            <div className="font-bold text-text-primary text-base">+91 {user?.phone}</div>
          </div>

          <div className="bg-bg-cream p-md rounded-lg border">
            <span className="text-xs text-muted block mb-xs">Default Location</span>
            <div className="font-bold text-text-primary text-base">
              {user?.deliveryCity || 'Mumbai'} ({user?.deliveryPincode || '400001'})
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountProfile;
