import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ArrowRight } from 'lucide-react';
import { useOrder } from '../../context/OrderContext';
import './AccountOrders.css';

export function AccountOrders() {
  const { orders } = useOrder();

  return (
    <div className="account-orders-container">
      <div className="flex items-center justify-between pb-sm border-b mb-md">
        <div>
          <h2 className="text-xl font-bold text-text-primary">My Orders</h2>
          <p className="text-xs text-muted">View past order details, track live shipments, and reorder fresh items.</p>
        </div>
      </div>

      {!orders || orders.length === 0 ? (
        <div className="text-center py-xl bg-bg-cream rounded-lg border">
          <Package size={40} className="mx-auto text-muted mb-xs" />
          <h3 className="font-bold text-base text-text-primary mb-xs">No Orders Yet</h3>
          <p className="text-xs text-muted mb-md">Start shopping fresh groceries and your orders will appear here.</p>
          <Link to="/categories" className="btn btn-primary btn-sm">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-md">
          {orders.map(order => (
            <div
              key={order.id || order.orderId}
              className="border rounded-xl p-md text-sm bg-surface flex justify-between items-center flex-wrap gap-md shadow-xs hover:shadow-sm transition-shadow"
            >
              <div>
                <div className="flex items-center gap-xs mb-xs">
                  <span className="font-bold text-base text-primary">Order #{order.orderId || order.id}</span>
                  <span className={`badge ${order.status === 'Cancelled' ? 'badge-danger' : 'badge-primary'} text-xs font-bold`}>
                    {order.status || 'Confirmed'}
                  </span>
                </div>

                <div className="text-xs text-muted">
                  {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} • {order.items?.length || 0} Items • {order.paymentMethod}
                </div>
              </div>

              <div className="flex items-center gap-md">
                <div className="text-right">
                  <div className="font-bold text-base text-primary">
                    ₹{(order.total || order.totalAmount || 0).toFixed(0)}
                  </div>
                  <div className="text-xs text-success font-semibold">
                    {order.deliveryOption === 'express' ? 'Express 60 Mins' : 'Standard Delivery'}
                  </div>
                </div>

                <Link
                  to={`/orders/${order.orderId || order.id}`}
                  className="btn btn-outline btn-sm flex items-center gap-xs"
                >
                  <span>View Details</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AccountOrders;
