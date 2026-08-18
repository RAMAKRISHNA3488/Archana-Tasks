import React from 'react';
import { UserCheck, PhoneCall, ShieldCheck, MapPin } from 'lucide-react';
import './DeliveryPartnerCard.css';

export function DeliveryPartnerCard({ status }) {
  const isOutForDelivery = status && status.toLowerCase().includes('out for delivery');

  return (
    <div className="delivery-partner-card bg-surface p-lg rounded-xl border mb-lg shadow-sm">
      <h3 className="text-sm font-bold text-text-primary mb-sm pb-xs border-b flex items-center gap-xs">
        <UserCheck size={16} className="text-primary" />
        <span>Delivery Partner & Dispatch Info</span>
      </h3>

      <div className="flex items-center justify-between p-sm rounded-lg bg-bg-cream border mb-md">
        <div className="flex items-center gap-md">
          <div className="agent-avatar-circle bg-primary-soft text-primary-dark font-bold flex items-center justify-center rounded-full w-10 h-10">
            RK
          </div>
          <div>
            <h4 className="font-bold text-xs text-text-primary">NatureCart Express Agent #402</h4>
            <span className="text-xs text-muted">Ramesh K. (Verified Delivery Partner)</span>
          </div>
        </div>

        <a href="tel:9876543210" className="btn btn-outline btn-xs flex items-center gap-xs">
          <PhoneCall size={12} />
          <span>Call Agent</span>
        </a>
      </div>

      {/* Live Map Tracking Visual Placeholder */}
      <div className="live-map-placeholder p-lg rounded-lg border text-center relative overflow-hidden bg-bg-cream">
        <div className="map-grid-bg" />
        <div className="relative z-10">
          <MapPin size={32} className="mx-auto text-primary mb-xs animate-bounce" />
          <h4 className="font-bold text-xs text-text-primary">
            {isOutForDelivery ? 'Agent is on the way to your doorstep!' : 'Live GPS Delivery Tracking Placeholder'}
          </h4>
          <p className="text-[11px] text-muted max-w-xs mx-auto mt-xs">
            Live delivery tracking activates when the agent picks up your order from the local distribution hub.
          </p>
        </div>
      </div>
    </div>
  );
}

export default DeliveryPartnerCard;
