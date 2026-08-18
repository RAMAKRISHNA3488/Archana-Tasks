import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useLocalStorage('naturecart_order_history', []);
  const [currentOrder, setCurrentOrder] = useLocalStorage('naturecart_current_order', null);

  const addOrder = (orderData) => {
    // Generate ONE single order ID if not provided
    const orderId = String(
      orderData.orderId || orderData.id || `NC-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`
    ).trim();

    const isCod = String(orderData.paymentMethod || '').toUpperCase() === 'COD';

    const normalizedOrder = {
      ...orderData,
      id: orderId,
      orderId: orderId,
      items: orderData.items || [],
      subtotal: orderData.subtotal || 0,
      deliveryFee: orderData.deliveryFee || 0,
      discount: orderData.discount || orderData.couponDiscount || 0,
      couponDiscount: orderData.couponDiscount || 0,
      total: orderData.total || orderData.totalAmount || 0,
      totalAmount: orderData.totalAmount || orderData.total || 0,
      paymentMethod: orderData.paymentMethod || 'UPI',
      paymentStatus: orderData.paymentStatus || (isCod ? 'pending' : 'paid'),
      orderStatus: orderData.orderStatus || 'confirmed',
      status: orderData.status || 'Confirmed',
      shippingAddress: orderData.shippingAddress || orderData.address || null,
      address: orderData.address || orderData.shippingAddress || null,
      deliveryOption: orderData.deliveryOption || 'standard',
      createdAt: orderData.createdAt || new Date().toISOString(),
      estimatedDeliveryDate: orderData.estimatedDeliveryDate || (orderData.deliveryOption === 'express' ? 'Today within 60 Mins' : '2–3 Days')
    };

    // Synchronously update localStorage and React state
    setCurrentOrder(normalizedOrder);
    setOrders(prev => {
      const existing = prev || [];
      // Deduplicate if order already exists
      const filtered = existing.filter(o => String(o.id || o.orderId) !== String(orderId));
      return [normalizedOrder, ...filtered];
    });

    return normalizedOrder;
  };

  const getOrder = (searchId) => {
    if (!searchId || searchId === 'current') return currentOrder;

    const normalizedSearch = String(searchId).trim().toLowerCase();

    // 1. Check currentOrder first
    if (currentOrder) {
      const currentId = String(currentOrder.id || currentOrder.orderId || '').trim().toLowerCase();
      if (currentId === normalizedSearch) return currentOrder;
    }

    // 2. Search orders history collection
    if (orders && orders.length > 0) {
      const matched = orders.find(o => {
        const id = String(o.id || '').trim().toLowerCase();
        const orderId = String(o.orderId || '').trim().toLowerCase();
        return id === normalizedSearch || orderId === normalizedSearch;
      });
      if (matched) return matched;
    }

    // Fallback to currentOrder if no specific ID match but search is generic
    return currentOrder;
  };

  const updateOrderStatus = (searchId, newStatus) => {
    const normalizedSearch = String(searchId || '').trim().toLowerCase();

    setOrders(prev =>
      (prev || []).map(o => {
        const id = String(o.id || '').trim().toLowerCase();
        const orderId = String(o.orderId || '').trim().toLowerCase();
        if (id === normalizedSearch || orderId === normalizedSearch) {
          return { ...o, status: newStatus, orderStatus: newStatus.toLowerCase() };
        }
        return o;
      })
    );

    if (currentOrder) {
      const currentId = String(currentOrder.id || currentOrder.orderId || '').trim().toLowerCase();
      if (currentId === normalizedSearch) {
        setCurrentOrder(prev => ({ ...prev, status: newStatus, orderStatus: newStatus.toLowerCase() }));
      }
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders: orders || [],
        currentOrder,
        addOrder,
        getOrder,
        updateOrderStatus
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}

export default OrderContext;
