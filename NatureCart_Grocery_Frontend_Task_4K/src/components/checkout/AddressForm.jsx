import React, { useState, useEffect } from 'react';
import { Home, Briefcase, MapPin, X, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import './AddressForm.css';

export function AddressForm({ initialAddress = null, onCancel, onSuccess }) {
  const { addAddress, updateAddress } = useAuth();
  const { showToast } = useNotification();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    house: '',
    street: '',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    landmark: '',
    type: 'Home'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialAddress) {
      setFormData(initialAddress);
    }
  }, [initialAddress]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length !== 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number.';
    }

    if (!formData.house.trim()) {
      newErrors.house = 'Please enter flat, house or building details.';
    }

    if (!formData.street.trim()) {
      newErrors.street = 'Please enter street, area or sector.';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'Please enter city.';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'Please enter state.';
    }

    const cleanPincode = formData.pincode.replace(/\D/g, '');
    if (!cleanPincode || cleanPincode.length !== 6) {
      newErrors.pincode = 'Please enter a valid 6-digit PIN code.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Please fix the form errors before saving.', 'warning');
      return;
    }

    if (initialAddress && initialAddress.id) {
      updateAddress({ ...formData, id: initialAddress.id });
      showToast('Address updated successfully.', 'success');
    } else {
      addAddress(formData);
      showToast('Delivery address saved successfully.', 'success');
    }

    if (onSuccess) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="address-form-box bg-surface p-lg rounded-xl border mb-lg">
      <div className="flex justify-between items-center pb-xs border-b mb-md">
        <h3 className="text-base font-bold text-text-primary">
          {initialAddress ? 'Edit Delivery Address' : 'Add New Delivery Address'}
        </h3>
        {onCancel && (
          <button type="button" onClick={onCancel} className="p-xs text-muted hover:text-text-primary">
            <X size={18} />
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-md mb-md">
        {/* Full Name */}
        <div>
          <label className="form-label text-xs font-semibold text-text-primary mb-xs block">Full Name *</label>
          <input
            type="text"
            name="fullName"
            placeholder="e.g. Archana Sharma"
            value={formData.fullName}
            onChange={handleChange}
            className={`input-field text-xs ${errors.fullName ? 'error' : ''}`}
          />
          {errors.fullName && <span className="error-text text-xs text-danger mt-xs block">{errors.fullName}</span>}
        </div>

        {/* Mobile Number */}
        <div>
          <label className="form-label text-xs font-semibold text-text-primary mb-xs block">Mobile Number *</label>
          <input
            type="text"
            name="phone"
            maxLength={10}
            placeholder="10-digit mobile number"
            value={formData.phone}
            onChange={handleChange}
            className={`input-field text-xs ${errors.phone ? 'error' : ''}`}
          />
          {errors.phone && <span className="error-text text-xs text-danger mt-xs block">{errors.phone}</span>}
        </div>

        {/* House / Flat */}
        <div>
          <label className="form-label text-xs font-semibold text-text-primary mb-xs block">Flat / House No. / Building *</label>
          <input
            type="text"
            name="house"
            placeholder="e.g. Flat 402, Green Valley Apts"
            value={formData.house}
            onChange={handleChange}
            className={`input-field text-xs ${errors.house ? 'error' : ''}`}
          />
          {errors.house && <span className="error-text text-xs text-danger mt-xs block">{errors.house}</span>}
        </div>

        {/* Street / Area */}
        <div>
          <label className="form-label text-xs font-semibold text-text-primary mb-xs block">Street / Area / Sector *</label>
          <input
            type="text"
            name="street"
            placeholder="e.g. MG Road, Sector 14"
            value={formData.street}
            onChange={handleChange}
            className={`input-field text-xs ${errors.street ? 'error' : ''}`}
          />
          {errors.street && <span className="error-text text-xs text-danger mt-xs block">{errors.street}</span>}
        </div>

        {/* City */}
        <div>
          <label className="form-label text-xs font-semibold text-text-primary mb-xs block">City *</label>
          <input
            type="text"
            name="city"
            placeholder="e.g. Mumbai"
            value={formData.city}
            onChange={handleChange}
            className={`input-field text-xs ${errors.city ? 'error' : ''}`}
          />
          {errors.city && <span className="error-text text-xs text-danger mt-xs block">{errors.city}</span>}
        </div>

        {/* State */}
        <div>
          <label className="form-label text-xs font-semibold text-text-primary mb-xs block">State *</label>
          <input
            type="text"
            name="state"
            placeholder="e.g. Maharashtra"
            value={formData.state}
            onChange={handleChange}
            className={`input-field text-xs ${errors.state ? 'error' : ''}`}
          />
          {errors.state && <span className="error-text text-xs text-danger mt-xs block">{errors.state}</span>}
        </div>

        {/* PIN Code */}
        <div>
          <label className="form-label text-xs font-semibold text-text-primary mb-xs block">PIN Code *</label>
          <input
            type="text"
            name="pincode"
            maxLength={6}
            placeholder="6-digit PIN code (e.g. 400001)"
            value={formData.pincode}
            onChange={handleChange}
            className={`input-field text-xs ${errors.pincode ? 'error' : ''}`}
          />
          {errors.pincode && <span className="error-text text-xs text-danger mt-xs block">{errors.pincode}</span>}
        </div>

        {/* Landmark */}
        <div>
          <label className="form-label text-xs font-semibold text-text-primary mb-xs block">Landmark (Optional)</label>
          <input
            type="text"
            name="landmark"
            placeholder="e.g. Opposite Central Park"
            value={formData.landmark}
            onChange={handleChange}
            className="input-field text-xs"
          />
        </div>
      </div>

      {/* Address Type Selectable Pills */}
      <div className="mb-lg">
        <label className="form-label text-xs font-semibold text-text-primary mb-xs block">Save Address As</label>
        <div className="flex gap-sm">
          {[
            { label: 'Home', icon: Home },
            { label: 'Work', icon: Briefcase },
            { label: 'Other', icon: MapPin }
          ].map(item => {
            const Icon = item.icon;
            const isSelected = formData.type === item.label;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, type: item.label }))}
                className={`type-pill-btn flex items-center gap-xs text-xs px-md py-xs rounded-full border font-semibold ${
                  isSelected ? 'active' : ''
                }`}
              >
                <Icon size={14} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-sm pt-sm border-t">
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn btn-outline btn-sm">
            Cancel
          </button>
        )}
        <button type="submit" className="btn btn-primary btn-sm flex items-center gap-xs">
          <Check size={16} />
          <span>Save & Use Address</span>
        </button>
      </div>
    </form>
  );
}

export default AddressForm;
