import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, AlertCircle } from 'lucide-react';
import Breadcrumb from '../components/common/Breadcrumb';
import OrderTrackingHeader from '../components/tracking/OrderTrackingHeader';
import OrderStatusHero from '../components/tracking/OrderStatusHero';
import OrderProgressTracker from '../components/tracking/OrderProgressTracker';
import OrderMobileTimeline from '../components/tracking/OrderMobileTimeline';
import DeliveryPartnerCard from '../components/tracking/DeliveryPartnerCard';
import OrderItemsList from '../components/order/OrderItemsList';
import OrderInfoCards from '../components/order/OrderInfoCards';
import OrderFinancialSummary from '../components/order/OrderFinancialSummary';
import OrderTrackingActions from '../components/tracking/OrderTrackingActions';
import NeedHelpSection from '../components/order/NeedHelpSection';
import OrderTrackingSkeleton from '../components/tracking/OrderTrackingSkeleton';
import ProductGrid from '../components/product/ProductGrid';
import { useOrder } from '../context/OrderContext';
import { PRODUCTS } from '../data/products';

export function OrderTrackingPage() {
  const { orderId } = useParams();
  const { getOrder, updateOrderStatus } = useOrder();
  const [isLoading, setIsLoading] = useState(true);

  const targetOrder = useMemo(() => {
    if (!orderId) return null;
    return getOrder(orderId);
  }, [orderId, getOrder]);

  const [activeStatus, setActiveStatus] = useState('Confirmed');

  useEffect(() => {
    setIsLoading(true);
    if (targetOrder) {
      setActiveStatus(targetOrder.status || targetOrder.orderStatus || 'Confirmed');
    }
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 150);
    return () => clearTimeout(timer);
  }, [targetOrder]);

  const handleCancelOrder = () => {
    if (targetOrder) {
      updateOrderStatus(targetOrder.orderId || targetOrder.id, 'Cancelled');
      setActiveStatus('Cancelled');
    }
  };

  const breadcrumbItems = [
    { label: 'Order Confirmation', link: '/order-confirmation' },
    { label: `Track #${orderId || 'Order'}` }
  ];

  // 1. Genuine Order Not Found State
  if (!isLoading && !targetOrder) {
    return (
      <div className="order-not-found-container container py-2xl text-center">
        <div className="max-w-md mx-auto bg-surface p-2xl rounded-xl border shadow-sm">
          <div className="mx-auto mb-md flex items-center justify-center bg-discount-bg text-danger rounded-full w-20 h-20">
            <AlertCircle size={48} />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-xs">Order Details Unavailable</h2>
          <p className="text-sm text-muted mb-lg">
            We couldn't find an order associated with tracking reference #{orderId}.
          </p>
          <Link to="/categories" className="btn btn-primary btn-lg inline-flex items-center gap-xs">
            <ArrowLeft size={18} />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  const recommendedProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="order-tracking-page container py-lg">
      <Breadcrumb items={breadcrumbItems} />

      {isLoading ? (
        <OrderTrackingSkeleton />
      ) : (
        <>
          <OrderTrackingHeader
            orderId={targetOrder.orderId || targetOrder.id}
            orderDate={targetOrder.createdAt}
            status={activeStatus}
            deliveryOption={targetOrder.deliveryOption}
          />

          <OrderStatusHero
            status={activeStatus}
            deliveryOption={targetOrder.deliveryOption}
          />

          <OrderProgressTracker currentStatus={activeStatus} />
          <OrderMobileTimeline
            orderDate={targetOrder.createdAt}
            currentStatus={activeStatus}
          />

          <DeliveryPartnerCard status={activeStatus} />

          <OrderItemsList items={targetOrder.items} />

          <OrderInfoCards
            address={targetOrder.shippingAddress || targetOrder.address}
            paymentMethod={targetOrder.paymentMethod}
          />

          <OrderFinancialSummary
            subtotal={targetOrder.subtotal}
            deliveryFee={targetOrder.deliveryFee}
            appliedCoupon={targetOrder.appliedCoupon}
            couponDiscount={targetOrder.couponDiscount || targetOrder.discount}
            totalAmount={targetOrder.total || targetOrder.totalAmount}
            isCod={String(targetOrder.paymentMethod).toUpperCase() === 'COD'}
          />

          <OrderTrackingActions
            status={activeStatus}
            onCancelOrder={handleCancelOrder}
          />

          <NeedHelpSection />

          <div className="recommended-order-section mt-xl pt-lg border-t">
            <h2 className="text-2xl font-bold mb-md">You May Also Like</h2>
            <ProductGrid products={recommendedProducts} />
          </div>
        </>
      )}
    </div>
  );
}

export default OrderTrackingPage;
