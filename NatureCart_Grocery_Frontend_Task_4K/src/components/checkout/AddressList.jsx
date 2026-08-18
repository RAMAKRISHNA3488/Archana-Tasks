import React, { useState } from 'react';
import { Plus, MapPin } from 'lucide-react';
import SavedAddressCard from './SavedAddressCard';
import AddressForm from './AddressForm';
import { useAuth } from '../../context/AuthContext';
import './AddressList.css';

export function AddressList() {
  const { addresses, selectedAddressId, setSelectedAddressId } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const handleStartAdd = () => {
    setEditingAddress(null);
    setShowForm(true);
  };

  const handleStartEdit = (address) => {
    setEditingAddress(address);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingAddress(null);
  };

  return (
    <div className="address-list-section mb-xl">
      <div className="flex items-center justify-between mb-md">
        <h2 className="text-xl font-bold flex items-center gap-xs">
          <MapPin size={22} className="text-primary" />
          <span>Delivery Address</span>
        </h2>

        {!showForm && (
          <button
            type="button"
            onClick={handleStartAdd}
            className="btn btn-outline btn-sm flex items-center gap-xs"
          >
            <Plus size={16} />
            <span>Add New Address</span>
          </button>
        )}
      </div>

      {showForm ? (
        <AddressForm
          initialAddress={editingAddress}
          onCancel={() => setShowForm(false)}
          onSuccess={handleFormSuccess}
        />
      ) : addresses.length === 0 ? (
        <AddressForm onSuccess={handleFormSuccess} />
      ) : (
        <div className="saved-addresses-wrapper">
          {addresses.map(addr => (
            <SavedAddressCard
              key={addr.id}
              address={addr}
              isSelected={selectedAddressId === addr.id}
              onSelect={() => setSelectedAddressId(addr.id)}
              onEdit={handleStartEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AddressList;
