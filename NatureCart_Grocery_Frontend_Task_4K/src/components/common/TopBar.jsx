import React from 'react';
import { Truck, MapPin } from 'lucide-react';
import './TopBar.css';

export function TopBar() {
  return (
    <div className="topbar-wrapper">
      <div className="container flex items-center justify-between">
        <div className="topbar-left flex items-center gap-sm">
          <Truck size={14} className="topbar-icon" />
          <span>Free Delivery on orders above ₹499</span>
        </div>
        <div className="topbar-right topbar-right-info flex items-center gap-sm">
          <MapPin size={14} className="topbar-icon" />
          <span>Delivering happiness in Maharashtra since 2018</span>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
