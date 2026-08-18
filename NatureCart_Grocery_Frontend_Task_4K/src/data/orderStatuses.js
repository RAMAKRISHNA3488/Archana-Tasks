import { CheckCircle2, Clock, PackageCheck, Truck, MapPin, Home, XCircle } from 'lucide-react';

export const ORDER_STATUSES = {
  ORDER_CONFIRMED: {
    id: 'ORDER_CONFIRMED',
    label: 'Order Confirmed',
    description: 'Your order has been placed and confirmed by our system.',
    stepIndex: 1,
    icon: CheckCircle2,
    badgeClass: 'badge-primary'
  },
  PROCESSING: {
    id: 'PROCESSING',
    label: 'Processing',
    description: 'Your items are being handpicked by our grocery specialists.',
    stepIndex: 2,
    icon: Clock,
    badgeClass: 'badge-warning'
  },
  PACKED: {
    id: 'PACKED',
    label: 'Packed',
    description: 'Hygienically packed in temperature-controlled eco-pouches.',
    stepIndex: 3,
    icon: PackageCheck,
    badgeClass: 'badge-primary'
  },
  SHIPPED: {
    id: 'SHIPPED',
    label: 'Shipped',
    description: 'Dispatched from our local distribution hub.',
    stepIndex: 4,
    icon: Truck,
    badgeClass: 'badge-primary'
  },
  OUT_FOR_DELIVERY: {
    id: 'OUT_FOR_DELIVERY',
    label: 'Out for Delivery',
    description: 'On the way with NatureCart Express agent.',
    stepIndex: 5,
    icon: MapPin,
    badgeClass: 'badge-primary'
  },
  DELIVERED: {
    id: 'DELIVERED',
    label: 'Delivered',
    description: 'Handed over at your doorstep.',
    stepIndex: 6,
    icon: Home,
    badgeClass: 'badge-success'
  },
  CANCELLED: {
    id: 'CANCELLED',
    label: 'Cancelled',
    description: 'This order was cancelled.',
    stepIndex: 0,
    icon: XCircle,
    badgeClass: 'badge-danger'
  }
};

export const TRACKING_STEPS = [
  ORDER_STATUSES.ORDER_CONFIRMED,
  ORDER_STATUSES.PROCESSING,
  ORDER_STATUSES.PACKED,
  ORDER_STATUSES.SHIPPED,
  ORDER_STATUSES.OUT_FOR_DELIVERY,
  ORDER_STATUSES.DELIVERED
];

export function getStatusConfig(statusString = 'Order Confirmed') {
  const normalized = statusString.toUpperCase().replace(/\s+/g, '_');
  if (ORDER_STATUSES[normalized]) return ORDER_STATUSES[normalized];

  const matched = Object.values(ORDER_STATUSES).find(
    s => s.label.toLowerCase() === statusString.toLowerCase()
  );
  return matched || ORDER_STATUSES.ORDER_CONFIRMED;
}

export function generateTimelineLogs(orderDateStr, currentStatus) {
  const baseDate = orderDateStr ? new Date(orderDateStr) : new Date();

  const formatDate = (dateObj) => {
    return dateObj.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) +
      ' • ' +
      dateObj.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  };

  const statusConfig = getStatusConfig(currentStatus);
  const isCancelled = statusConfig.id === 'CANCELLED';

  return TRACKING_STEPS.map((step, idx) => {
    const stepTime = new Date(baseDate.getTime() + idx * 45 * 60 * 1000);
    const isCompleted = !isCancelled && step.stepIndex <= statusConfig.stepIndex;
    const isCurrent = !isCancelled && step.stepIndex === statusConfig.stepIndex;

    return {
      ...step,
      timestamp: isCompleted ? formatDate(stepTime) : 'Pending',
      isCompleted,
      isCurrent
    };
  });
}
