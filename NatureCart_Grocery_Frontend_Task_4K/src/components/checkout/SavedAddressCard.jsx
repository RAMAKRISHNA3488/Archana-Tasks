import React, { useState } from 'react';
import { Edit2, Trash2, Home, Briefcase, MapPin } from 'lucide-react';
import ConfirmationModal from '../common/ConfirmationModal';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import './SavedAddressCard.css';

export function SavedAddressCard({ address, isSelected, onSelect, onEdit }) {
  const { deleteAddress } = useAuth();
  const { showToast } = useNotification();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const getTypeIcon = (type) => {
    if (type === 'Work') return Briefcase;
    if (type === 'Other') return MapPin;
    return Home;
  };

  const TypeIcon = getTypeIcon(address.type);

  const handleConfirmDelete = () => {
    deleteAddress(address.id);
    setShowDeleteModal(false);
    showToast('Address removed successfully.', 'success');
  };

  return (
    <>
      <div
        onClick={onSelect}
        className={`saved-address-card p-md rounded-xl border mb-sm flex items-start justify-between cursor-pointer transition-all ${
          isSelected ? 'selected' : ''
        }`}
      >
        <div className="flex items-start gap-md">
          {/* Radio Indicator */}
          <div className={`address-radio-circle mt-xs ${isSelected ? 'checked' : ''}`}>
            {isSelected && <div className="radio-inner-dot" />}
          </div>

          <div>
            <div className="flex items-center gap-xs mb-xs">
              <span className="font-bold text-sm text-text-primary">{address.fullName || address.name}</span>
              <span className="badge badge-primary text-xs flex items-center gap-xs">
                <TypeIcon size={12} />
                <span>{address.type || 'Home'}</span>
              </span>
            </div>

            <p className="text-xs text-secondary leading-relaxed mb-xs">
              {address.house && `${address.house}, `}
              {address.street || address.area}, {address.city}, {address.state} - <strong>{address.pincode}</strong>
            </p>
            {address.landmark && (
              <p className="text-xs text-muted">Landmark: {address.landmark}</p>
            )}
            <p className="text-xs font-semibold text-text-primary mt-xs">Phone: {address.phone}</p>
          </div>
        </div>

        {/* Actions: Edit & Delete */}
        <div className="flex items-center gap-xs" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={() => onEdit(address)}
            className="action-icon-btn text-muted hover:text-primary"
            title="Edit Address"
          >
            <Edit2 size={16} />
          </button>
          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            className="action-icon-btn text-muted hover:text-danger"
            title="Delete Address"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        title="Remove Saved Address"
        message="Are you sure you want to remove this delivery address?"
        confirmText="Remove Address"
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </>
  );
}

export default SavedAddressCard;
