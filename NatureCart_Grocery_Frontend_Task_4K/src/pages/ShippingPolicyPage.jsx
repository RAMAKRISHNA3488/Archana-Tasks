import React from 'react';
import { Truck, Zap, ShieldCheck, MapPin, Clock, PackageCheck, AlertCircle } from 'lucide-react';
import Breadcrumb from '../components/common/Breadcrumb';

export function ShippingPolicyPage() {
  const breadcrumbItems = [
    { label: 'Shipping & Delivery Policy' }
  ];

  return (
    <div className="shipping-policy-page container py-lg">
      <div className="mb-md">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div className="bg-surface p-2xl rounded-2xl border shadow-xs max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="border-b pb-lg mb-xl text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-md">
          <div>
            <div className="inline-flex items-center gap-xs px-sm py-xs bg-primary-soft text-primary-dark rounded-full text-xs font-bold mb-xs">
              <Truck size={16} />
              <span>Express Delivery SLA</span>
            </div>
            <h1 className="text-3xl font-extrabold text-text-primary">Shipping & Delivery Policy</h1>
            <p className="text-sm text-muted mt-xs">
              Fast, farm-fresh, temperature-controlled delivery guaranteed in 60 minutes.
            </p>
          </div>
          <div className="text-xs text-muted font-semibold bg-bg-cream px-md py-xs rounded-lg border">
            Active Operating Hours: 6:00 AM - 11:00 PM
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-md mb-xl">
          <div className="p-md rounded-xl bg-primary-soft border border-primary-light text-center">
            <Zap size={24} className="mx-auto text-primary mb-xs" />
            <h4 className="font-bold text-sm text-primary-dark">60-Min Express</h4>
            <p className="text-[11px] text-secondary mt-[2px]">Superfast doorstep fulfillment</p>
          </div>
          <div className="p-md rounded-xl bg-bg-cream border text-center">
            <PackageCheck size={24} className="mx-auto text-primary mb-xs" />
            <h4 className="font-bold text-sm text-text-primary">FREE Shipping</h4>
            <p className="text-[11px] text-muted mt-[2px]">On orders above ₹499</p>
          </div>
          <div className="p-md rounded-xl bg-bg-cream border text-center">
            <ShieldCheck size={24} className="mx-auto text-primary mb-xs" />
            <h4 className="font-bold text-sm text-text-primary">Cold-Chain Guard</h4>
            <p className="text-[11px] text-muted mt-[2px]">Insulated thermal safety</p>
          </div>
          <div className="p-md rounded-xl bg-bg-cream border text-center">
            <MapPin size={24} className="mx-auto text-primary mb-xs" />
            <h4 className="font-bold text-sm text-text-primary">Live Tracking</h4>
            <p className="text-[11px] text-muted mt-[2px]">Real-time GPS order progress</p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-xl text-text-secondary text-sm leading-relaxed">
          {/* Section 1 */}
          <section className="p-md rounded-xl border bg-bg-cream/40">
            <h2 className="text-lg font-bold text-text-primary mb-sm flex items-center gap-xs">
              <Zap size={20} className="text-primary" />
              1. 60-Minute Guaranteed Express Delivery
            </h2>
            <p className="text-xs text-muted leading-relaxed mb-xs">
              NatureCart operates hyper-local dark stores optimized for speed and freshness. Orders placed during operating hours (6:00 AM to 11:00 PM) are packed within 10 minutes and dispatched immediately with dedicated express riders.
            </p>
            <p className="text-xs text-muted leading-relaxed">
              If delivery exceeds 60 minutes due to our operational delay, you will receive a <strong className="text-primary font-bold">₹50 Express Compensation Voucher</strong> in your account.
            </p>
          </section>

          {/* Section 2 */}
          <section className="p-md rounded-xl border bg-bg-cream/40">
            <h2 className="text-lg font-bold text-text-primary mb-sm flex items-center gap-xs">
              <PackageCheck size={20} className="text-primary" />
              2. Shipping Charges & Rates
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border rounded-lg overflow-hidden">
                <thead className="bg-bg-cream font-bold text-text-primary border-b">
                  <tr>
                    <th className="p-xs">Order Value</th>
                    <th className="p-xs">Delivery Fee</th>
                    <th className="p-xs">Estimated Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-muted">
                  <tr>
                    <td className="p-xs font-semibold text-text-primary">₹499 and Above</td>
                    <td className="p-xs font-bold text-primary">FREE Delivery</td>
                    <td className="p-xs">30 - 60 Mins</td>
                  </tr>
                  <tr>
                    <td className="p-xs font-semibold text-text-primary">Under ₹499</td>
                    <td className="p-xs font-semibold text-text-primary">₹29 Flat Fee</td>
                    <td className="p-xs">30 - 60 Mins</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3 */}
          <section className="p-md rounded-xl border bg-bg-cream/40">
            <h2 className="text-lg font-bold text-text-primary mb-sm flex items-center gap-xs">
              <ShieldCheck size={20} className="text-primary" />
              3. Freshness & Temperature Control Packaging
            </h2>
            <p className="text-xs text-muted leading-relaxed">
              All dairy, milk, fresh fruit, vegetables, and frozen items are transported in insulated, food-grade thermal bags with ice gel packs to maintain optimal temperature and farm-fresh quality upon arrival.
            </p>
          </section>

          {/* Section 4 */}
          <section className="p-md rounded-xl border bg-bg-cream/40">
            <h2 className="text-lg font-bold text-text-primary mb-sm flex items-center gap-xs">
              <Clock size={20} className="text-primary" />
              4. Delivery Slots & Slot Booking
            </h2>
            <p className="text-xs text-muted leading-relaxed mb-xs">
              You can choose between <strong className="text-text-primary">Instant 60-Min Express Delivery</strong> or schedule a preferred slot for later today or tomorrow:
            </p>
            <ul className="list-disc list-inside space-y-xs text-xs text-muted pl-xs">
              <li>Morning Slot: 7:00 AM - 10:00 AM</li>
              <li>Afternoon Slot: 12:00 PM - 3:00 PM</li>
              <li>Evening Slot: 5:00 PM - 9:00 PM</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="p-md rounded-xl border bg-bg-cream/40">
            <h2 className="text-lg font-bold text-text-primary mb-sm flex items-center gap-xs">
              <AlertCircle size={20} className="text-primary" />
              5. Delivery Address & Unattended Deliveries
            </h2>
            <p className="text-xs text-muted leading-relaxed">
              Delivery is verified via OTP or contact at the door. If you are unavailable, our delivery executive will attempt to contact you via phone and wait up to 10 minutes, after which the delivery may be rescheduled.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ShippingPolicyPage;
