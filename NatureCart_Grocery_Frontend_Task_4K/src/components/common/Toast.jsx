import React from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';
import './Toast.css';

export function Toast() {
  const { toast, hideToast } = useNotification();

  if (!toast) return null;

  return (
    <div className={`toast-notification toast-${toast.type} flex items-center justify-between`}>
      <div className="flex items-center gap-sm">
        {toast.type === 'success' ? (
          <CheckCircle2 size={18} className="toast-icon" />
        ) : (
          <AlertCircle size={18} className="toast-icon" />
        )}
        <span className="toast-message">{toast.message}</span>
      </div>
      <button onClick={hideToast} className="toast-close-btn" aria-label="Close notification">
        <X size={14} />
      </button>
    </div>
  );
}

export default Toast;
