import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, XCircle } from 'lucide-react';
import ConfirmationModal from '../common/ConfirmationModal';
import { useNotification } from '../../context/NotificationContext';
import { getStatusConfig } from '../../data/orderStatuses';
import './OrderTrackingActions.css';

export function OrderTrackingActions({ status, onCancelOrder }) {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const { showToast } = useNotification();
  const statusConfig = getStatusConfig(status);

  const isEligibleForCancel =
    statusConfig.id === 'ORDER_CONFIRMED' || statusConfig.id === 'PROCESSING';

  const handleConfirmCancel = () => {
    onCancelOrder();
    setShowCancelModal(false);
    showToast('Your order has been cancelled.', 'success');
  };

  return (
    <>
      <div className="order-tracking-actions flex items-center justify-between gap-md my-xl flex-wrap">
        <Link to="/categories" className="btn btn-primary btn-lg flex items-center gap-xs">
          <ShoppingBag size={18} />
          <span>Continue Shopping</span>
        </Link>

        {isEligibleForCancel && (
          <button
            type="button"
            onClick={() => setShowCancelModal(true)}
            className="btn btn-outline btn-lg text-danger border-danger hover:bg-discount-bg flex items-center gap-xs"
          >
            <XCircle size={18} />
            <span>Cancel Order</span>
          </button>
        )}
      </div>

      {/* Cancel Order Confirmation Modal */}
      <ConfirmationModal
        isOpen={showCancelModal}
        title="Cancel Order"
        message="Are you sure you want to cancel this order? This action cannot be undone."
        confirmText="Yes, Cancel Order"
        onConfirm={handleConfirmCancel}
        onCancel={() => setShowCancelModal(false)}
      />
    </>
  );
}

export default OrderTrackingActions;
