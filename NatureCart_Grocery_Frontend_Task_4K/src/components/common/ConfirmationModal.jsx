import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import './ConfirmationModal.css';

export function ConfirmationModal({
  isOpen,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel
}) {
  if (!isOpen) return null;

  return (
    <div className="confirmation-modal-overlay" onClick={onCancel}>
      <div className="confirmation-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center pb-xs border-b mb-sm">
          <div className="flex items-center gap-xs font-bold text-base text-text-primary">
            <AlertTriangle size={20} className="text-warning" />
            <span>{title}</span>
          </div>
          <button onClick={onCancel} className="p-xs text-muted hover:text-text-primary">
            <X size={18} />
          </button>
        </div>

        <p className="text-sm text-secondary mb-lg leading-relaxed">{message}</p>

        <div className="flex justify-end gap-sm">
          <button onClick={onCancel} className="btn btn-outline btn-sm">
            {cancelText}
          </button>
          <button onClick={onConfirm} className="btn btn-primary btn-sm btn-danger-action">
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
