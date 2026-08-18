import React from 'react';
import { Truck, MapPin } from 'lucide-react';
import './AnnouncementBar.css';

export function AnnouncementBar() {
  return (
    <div className="announcement-bar">
      <div className="container flex items-center justify-between">
        <div className="announcement-left flex items-center gap-xs">
          <Truck size={14} className="announcement-icon" />
          <span>Free Delivery on Orders Above ₹499</span>
        </div>
        <div className="announcement-right flex items-center gap-xs">
          <MapPin size={14} className="announcement-icon" />
          <span>Delivering happiness in Maharashtra since 2018</span>
        </div>
      </div>
    </div>
  );
}

export default AnnouncementBar;
