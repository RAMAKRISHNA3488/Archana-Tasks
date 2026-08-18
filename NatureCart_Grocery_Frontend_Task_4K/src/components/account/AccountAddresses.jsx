import React, { useState } from 'react';
import { MapPin, Plus, Edit2, Trash2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import AddressFormModal from './AddressFormModal';
import './AccountAddresses.css';

export function AccountAddresses() {
  const { addresses, addAddress, updateAddress, deleteAddress, setDefaultAddress, selectedAddressId } = useAuth();
  const { showToast } = useNotification();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const handleOpenAdd = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (addr) => {
    setEditingAddress(addr);
    setIsModalOpen(true);
  };

  const handleSave = (formData) => {
    if (editingAddress) {
      updateAddress({ ...formData, id: editingAddress.id });
      showToast('Address updated successfully.', 'success');
    } else {
      addAddress(formData);
      showToast('Address added successfully.', 'success');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (addrId) => {
    deleteAddress(addrId);
    showToast('Address removed successfully.', 'success');
  };

  const handleSetDefault = (addrId) => {
    setDefaultAddress(addrId);
    showToast('Default address updated.', 'success');
  };

  return (
    <div className="account-addresses-container">
      <div className="flex items-center justify-between pb-sm border-b mb-md">
        <div>
          <h2 className="text-xl font-bold text-text-primary">Saved Delivery Addresses</h2>
          <p className="text-xs text-muted">Manage your delivery locations for fast grocery dispatch.</p>
        </div>

        <button type="button" onClick={handleOpenAdd} className="btn btn-primary btn-sm flex items-center gap-xs">
          <Plus size={16} />
          <span>Add New Address</span>
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-xl bg-bg-cream rounded-lg border">
          <MapPin size={40} className="mx-auto text-muted mb-xs" />
          <h3 className="font-bold text-base text-text-primary mb-xs">No Saved Addresses</h3>
          <p className="text-xs text-muted mb-md">Add a delivery address to speed up your grocery checkout.</p>
          <button type="button" onClick={handleOpenAdd} className="btn btn-primary btn-sm">
            Add Address Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-md">
          {addresses.map(addr => {
            const isDefault = addr.isDefault || addr.id === selectedAddressId;
            return (
              <div
                key={addr.id}
                className={`address-card p-md rounded-xl border bg-surface flex flex-col justify-between ${
                  isDefault ? 'border-primary shadow-xs' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-xs">
                    <div className="flex items-center gap-xs">
                      <span className="font-bold text-sm text-text-primary">{addr.fullName || addr.name}</span>
                      <span className="badge badge-primary text-xs">{addr.type || 'Home'}</span>
                    </div>

                    {isDefault && (
                      <span className="flex items-center gap-xs text-[11px] font-bold text-primary-dark bg-primary-soft px-xs py-[2px] rounded">
                        <CheckCircle2 size={12} />
                        <span>Default</span>
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-secondary leading-relaxed mb-sm">
                    <p>{addr.house}, {addr.street}</p>
                    {addr.area && <p>{addr.area}</p>}
                    <p>{addr.city}, {addr.state} - <strong>{addr.pincode}</strong></p>
                    {addr.landmark && <p className="text-muted">Landmark: {addr.landmark}</p>}
                    <p className="font-semibold text-text-primary mt-xs">Mobile: {addr.phone}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t pt-xs text-xs">
                  {!isDefault ? (
                    <button
                      type="button"
                      onClick={() => handleSetDefault(addr.id)}
                      className="text-primary font-semibold hover:underline"
                    >
                      Set as Default
                    </button>
                  ) : (
                    <span className="text-muted text-[11px]">Primary Location</span>
                  )}

                  <div className="flex items-center gap-xs">
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(addr)}
                      className="p-xs text-muted hover:text-primary"
                      title="Edit Address"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(addr.id)}
                      className="p-xs text-muted hover:text-danger"
                      title="Delete Address"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Popup Form Modal */}
      <AddressFormModal
        isOpen={isModalOpen}
        initialData={editingAddress}
        onSave={handleSave}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default AccountAddresses;
