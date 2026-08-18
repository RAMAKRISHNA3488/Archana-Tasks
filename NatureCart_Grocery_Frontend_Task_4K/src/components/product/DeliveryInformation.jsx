import React, { useState } from 'react';
import { MapPin, Truck, CheckCircle2, AlertCircle } from 'lucide-react';
import './DeliveryInformation.css';

export function DeliveryInformation() {
  const [pincode, setPincode] = useState('400001');
  const [status, setStatus] = useState({ checked: true, deliverable: true, message: 'Express 60-Minute Delivery Available!' });

  const handleCheck = (e) => {
    e.preventDefault();
    if (pincode.trim().length === 6) {
      setStatus({
        checked: true,
        deliverable: true,
        message: `Express 60-Minute Delivery Available for Pincode ${pincode}!`
      });
    } else {
      setStatus({
        checked: true,
        deliverable: false,
        message: 'Please enter a valid 6-digit Pincode.'
      });
    }
  };

  return (
    <div className="delivery-info-card bg-surface p-xl rounded-2xl border shadow-sm h-full flex flex-col justify-between">
      <h3 className="text-lg font-bold mb-lg flex items-center gap-xs">
        <Truck size={22} className="text-primary" />
        <span>Delivery Information</span>
      </h3>

      <form onSubmit={handleCheck} className="pincode-check-form flex items-center gap-sm mb-sm">
        <div className="relative flex-1">
          <input
            type="text"
            maxLength={6}
            placeholder="Enter 6-digit pincode (e.g. 400001)..."
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
            className="input-field pincode-input text-xs"
          />
          <MapPin size={16} className="pincode-pin-icon" />
        </div>
        <button type="submit" className="btn btn-outline btn-sm">
          Check Delivery
        </button>
      </form>

      {status.checked && (
        <div className={`pincode-status-msg flex items-center gap-xs text-xs font-semibold p-sm rounded-md ${
          status.deliverable ? 'bg-primary-soft text-primary-dark' : 'bg-discount-bg text-danger'
        }`}>
          {status.deliverable ? (
            <CheckCircle2 size={16} className="text-primary" />
          ) : (
            <AlertCircle size={16} className="text-danger" />
          )}
          <span>{status.message}</span>
        </div>
      )}
    </div>
  );
}

export default DeliveryInformation;
