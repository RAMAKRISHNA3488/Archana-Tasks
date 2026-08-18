import React from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, AlertCircle } from 'lucide-react';
import Breadcrumb from '../components/common/Breadcrumb';
import OrderSuccessHeader from '../components/order/OrderSuccessHeader';
import OrderStatusProgress from '../components/order/OrderStatusProgress';
import OrderDeliveryEstimate from '../components/order/OrderDeliveryEstimate';
import OrderInfoCards from '../components/order/OrderInfoCards';
import OrderItemsList from '../components/order/OrderItemsList';
import OrderFinancialSummary from '../components/order/OrderFinancialSummary';
import OrderActions from '../components/order/OrderActions';
import NeedHelpSection from '../components/order/NeedHelpSection';
import ProductGrid from '../components/product/ProductGrid';
import { useOrder } from '../context/OrderContext';
import { PRODUCTS } from '../data/products';
import './OrderSuccessPage.css';

export function OrderSuccessPage() {
  const { orderId: paramOrderId } = useParams();
  const location = useLocation();
  const { currentOrder, getOrder } = useOrder();

  const searchId = paramOrderId || location.state?.orderId;
  const activeOrder = getOrder(searchId) || currentOrder;

  const breadcrumbItems = [
    { label: 'Cart', link: '/cart' },
    { label: 'Checkout', link: '/checkout' },
    { label: 'Payment', link: '/payment' },
    { label: 'Order Confirmation' }
  ];

  // 1. Genuine Order Not Found Protection State
  if (!activeOrder) {
    return (
      <div className="order-not-found-container">
        <div className="order-not-found-card">
          <div className="not-found-icon-circle">
            <AlertCircle size={44} />
          </div>
          <h2 className="not-found-title">Order Details Unavailable</h2>
          <p className="not-found-desc">
            We couldn't find active order details for #{paramOrderId || 'requested order'}. You may explore our fresh grocery products.
          </p>
          <Link to="/categories" className="btn-back-shop">
            <ArrowLeft size={16} />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  const recommendedProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="order-success-page-wrapper">
      <div className="order-success-container">
        <Breadcrumb items={breadcrumbItems} />

        {/* Top Hero Banner */}
        <OrderSuccessHeader
          orderId={activeOrder.orderId || activeOrder.id}
          orderDate={activeOrder.createdAt}
        />

        {/* Main 2-Column Layout */}
        <div className="order-success-grid-layout">
          {/* Main Left Column */}
          <div className="order-main-column">
            <OrderStatusProgress currentStatus={activeOrder.status || activeOrder.orderStatus || 'Confirmed'} />

            <OrderDeliveryEstimate
              deliveryOption={activeOrder.deliveryOption}
              createdAt={activeOrder.createdAt}
            />

            <OrderItemsList items={activeOrder.items} />

            <OrderInfoCards
              address={activeOrder.shippingAddress || activeOrder.address}
              paymentMethod={activeOrder.paymentMethod}
            />
          </div>

          {/* Sticky Right Sidebar Column */}
          <div className="order-sidebar-column">
            <OrderFinancialSummary
              subtotal={activeOrder.subtotal}
              deliveryFee={activeOrder.deliveryFee}
              appliedCoupon={activeOrder.appliedCoupon}
              couponDiscount={activeOrder.couponDiscount || activeOrder.discount}
              totalAmount={activeOrder.total || activeOrder.totalAmount}
              isCod={String(activeOrder.paymentMethod || '').toUpperCase() === 'COD'}
            />

            <OrderActions orderId={activeOrder.orderId || activeOrder.id} />

            <NeedHelpSection />
          </div>
        </div>

        {/* Recommended Products Section */}
        <div className="recommended-order-section">
          <h2 className="recommended-section-title">You May Also Like</h2>
          <ProductGrid products={recommendedProducts} />
        </div>
      </div>
    </div>
  );
}

export default OrderSuccessPage;

