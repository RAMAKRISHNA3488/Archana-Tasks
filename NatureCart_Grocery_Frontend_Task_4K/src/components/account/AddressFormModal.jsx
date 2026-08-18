import React, { useState, useEffect } from 'react';
import { X, MapPin, Check } from 'lucide-react';
import './AddressFormModal.css';

export function AddressFormModal({ isOpen, initialData, onSave, onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    house: '',
    street: '',
    area: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
    type: 'Home',
    isDefault: false
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        fullName: initialData.fullName || initialData.name || '',
        phone: initialData.phone || '',
        house: initialData.house || '',
        street: initialData.street || '',
        area: initialData.area || '',
        city: initialData.city || '',
        state: initialData.state || '',
        pincode: initialData.pincode || '',
        landmark: initialData.landmark || '',
        type: initialData.type || 'Home',
        isDefault: !!initialData.isDefault
      });
    } else {
      setFormData({
        fullName: '',
        phone: '',
        house: '',
        street: '',
        area: '',
        city: '',
        state: '',
        pincode: '',
        landmark: '',
        type: 'Home',
        isDefault: false
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const phoneRegex = /^[6-9]\d{9}$/;
    const pinRegex = /^\d{6}$/;

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!formData.phone.trim()) newErrors.phone = 'Mobile number is required.';
    else if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Valid 10-digit mobile required.';

    if (!formData.house.trim()) newErrors.house = 'House / Flat number is required.';
    if (!formData.street.trim()) newErrors.street = 'Street or locality is required.';
    if (!formData.city.trim()) newErrors.city = 'City is required.';
    if (!formData.state.trim()) newErrors.state = 'State is required.';
    if (!formData.pincode.trim()) newErrors.pincode = 'PIN Code is required.';
    else if (!pinRegex.test(formData.pincode.trim())) newErrors.pincode = '6-digit PIN Code required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content address-modal-box max-w-xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between pb-sm border-b mb-md">
          <div className="flex items-center gap-xs">
            <MapPin size={20} className="text-primary" />
            <h3 className="text-lg font-bold text-text-primary">
              {initialData ? 'Edit Delivery Address' : 'Add New Delivery Address'}
            </h3>
          </div>

          <button type="button" onClick={onClose} className="p-xs text-muted hover:text-text-primary rounded-full">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-sm">
          {/* Full Name */}
          <div className="form-group">
            <label className="text-xs font-semibold text-text-primary block mb-xs">
              Full Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Archana Sharma"
              className={`input-field ${errors.fullName ? 'input-error' : ''}`}
            />
            {errors.fullName && <span className="text-xs text-danger mt-xs block">{errors.fullName}</span>}
          </div>

          {/* Mobile Phone */}
          <div className="form-group">
            <label className="text-xs font-semibold text-text-primary block mb-xs">
              Mobile Number <span className="text-danger">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="10-digit phone"
              maxLength={10}
              className={`input-field ${errors.phone ? 'input-error' : ''}`}
            />
            {errors.phone && <span className="text-xs text-danger mt-xs block">{errors.phone}</span>}
          </div>

          {/* House / Flat */}
          <div className="form-group">
            <label className="text-xs font-semibold text-text-primary block mb-xs">
              House / Flat No. <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="house"
              value={formData.house}
              onChange={handleChange}
              placeholder="e.g. Flat 402, Green Valley"
              className={`input-field ${errors.house ? 'input-error' : ''}`}
            />
            {errors.house && <span className="text-xs text-danger mt-xs block">{errors.house}</span>}
          </div>

          {/* Street / Locality */}
          <div className="form-group">
            <label className="text-xs font-semibold text-text-primary block mb-xs">
              Street / Area <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="street"
              value={formData.street}
              onChange={handleChange}
              placeholder="e.g. MG Road, Sector 14"
              className={`input-field ${errors.street ? 'input-error' : ''}`}
            />
            {errors.street && <span className="text-xs text-danger mt-xs block">{errors.street}</span>}
          </div>

          {/* City */}
          <div className="form-group">
            <label className="text-xs font-semibold text-text-primary block mb-xs">
              City <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="e.g. Mumbai"
              className={`input-field ${errors.city ? 'input-error' : ''}`}
            />
            {errors.city && <span className="text-xs text-danger mt-xs block">{errors.city}</span>}
          </div>

          {/* State */}
          <div className="form-group">
            <label className="text-xs font-semibold text-text-primary block mb-xs">
              State <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="e.g. Maharashtra"
              className={`input-field ${errors.state ? 'input-error' : ''}`}
            />
            {errors.state && <span className="text-xs text-danger mt-xs block">{errors.state}</span>}
          </div>

          {/* PIN Code */}
          <div className="form-group">
            <label className="text-xs font-semibold text-text-primary block mb-xs">
              PIN Code <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="6-digit PIN"
              maxLength={6}
              className={`input-field ${errors.pincode ? 'input-error' : ''}`}
            />
            {errors.pincode && <span className="text-xs text-danger mt-xs block">{errors.pincode}</span>}
          </div>

          {/* Landmark */}
          <div className="form-group">
            <label className="text-xs font-semibold text-text-primary block mb-xs">
              Landmark (Optional)
            </label>
            <input
              type="text"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              placeholder="e.g. Near Central Park"
              className="input-field"
            />
          </div>

          {/* Address Type Selection */}
          <div className="col-span-2 form-group">
            <label className="text-xs font-semibold text-text-primary block mb-xs">Address Type</label>
            <div className="flex gap-md">
              {['Home', 'Work', 'Other'].map(t => (
                <label key={t} className="flex items-center gap-xs cursor-pointer select-none text-xs">
                  <input
                    type="radio"
                    name="type"
                    value={t}
                    checked={formData.type === t}
                    onChange={handleChange}
                    className="text-primary focus:ring-primary"
                  />
                  <span>{t}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Default Address Checkbox */}
          <div className="col-span-2 form-group">
            <label className="flex items-center gap-xs cursor-pointer select-none text-xs text-muted">
              <input
                type="checkbox"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleChange}
                className="rounded text-primary focus:ring-primary"
              />
              <span>Set as default delivery address</span>
            </label>
          </div>

          <div className="col-span-2 flex items-center justify-end gap-sm pt-sm border-t mt-xs">
            <button type="button" onClick={onClose} className="btn btn-outline btn-md">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-md flex items-center gap-xs">
              <Check size={16} />
              <span>{initialData ? 'Update Address' : 'Save Address'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddressFormModal;
