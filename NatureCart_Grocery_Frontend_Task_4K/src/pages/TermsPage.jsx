import React from 'react';
import { FileCheck, ShieldAlert, ShoppingBag, Truck, RefreshCw, Scale } from 'lucide-react';
import Breadcrumb from '../components/common/Breadcrumb';

export function TermsPage() {
  const breadcrumbItems = [
    { label: 'Terms & Conditions' }
  ];

  return (
    <div className="terms-page container py-lg">
      <div className="mb-md">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div className="bg-surface p-2xl rounded-2xl border shadow-xs max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="border-b pb-lg mb-xl text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-md">
          <div>
            <div className="inline-flex items-center gap-xs px-sm py-xs bg-primary-soft text-primary-dark rounded-full text-xs font-bold mb-xs">
              <FileCheck size={16} />
              <span>User Agreement</span>
            </div>
            <h1 className="text-3xl font-extrabold text-text-primary">Terms & Conditions</h1>
            <p className="text-sm text-muted mt-xs">
              Please read these terms carefully before placing orders on NatureCart.
            </p>
          </div>
          <div className="text-xs text-muted font-semibold bg-bg-cream px-md py-xs rounded-lg border">
            Effective Date: August 18, 2026
          </div>
        </div>

        {/* Highlight Callout */}
        <div className="p-md bg-bg-cream border rounded-xl mb-xl flex items-start gap-md">
          <Scale size={24} className="text-primary shrink-0 mt-xs" />
          <div>
            <h3 className="font-bold text-sm text-text-primary">Acceptance of Terms</h3>
            <p className="text-xs text-muted mt-xs leading-relaxed">
              By accessing, browsing, or making purchases on the NatureCart web application, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.
            </p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-xl text-text-secondary text-sm leading-relaxed">
          {/* Section 1 */}
          <section className="p-md rounded-xl border bg-bg-cream/40">
            <h2 className="text-lg font-bold text-text-primary mb-sm flex items-center gap-xs">
              <ShoppingBag size={20} className="text-primary" />
              1. Account & Ordering Terms
            </h2>
            <ul className="list-disc list-inside space-y-xs text-xs text-muted pl-xs">
              <li>Users must provide accurate and complete contact and delivery address information during checkout.</li>
              <li>You are responsible for maintaining the confidentiality of your account login credentials.</li>
              <li>NatureCart reserves the right to decline or cancel orders in cases of stock unavailability, pricing glitches, or suspected fraudulent activity.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="p-md rounded-xl border bg-bg-cream/40">
            <h2 className="text-lg font-bold text-text-primary mb-sm flex items-center gap-xs">
              <Truck size={20} className="text-primary" />
              2. Product Pricing, Freshness & Weight Variations
            </h2>
            <ul className="list-disc list-inside space-y-xs text-xs text-muted pl-xs">
              <li>All prices are listed in Indian Rupees (₹) and include applicable taxes (GST).</li>
              <li>For fresh produce (fruits, vegetables, meat), exact weights may slightly vary due to natural sizing. Final billing reflects the actual quantity delivered.</li>
              <li>We source 100% farm-fresh items. If any product does not meet quality standards, you may request doorstep replacement or refund at the time of delivery.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="p-md rounded-xl border bg-bg-cream/40">
            <h2 className="text-lg font-bold text-text-primary mb-sm flex items-center gap-xs">
              <RefreshCw size={20} className="text-primary" />
              3. 60-Minute Express Delivery & Cancellations
            </h2>
            <ul className="list-disc list-inside space-y-xs text-xs text-muted pl-xs">
              <li>Our 60-minute express delivery guarantee applies to valid serviceable pincodes under normal weather and traffic conditions.</li>
              <li>Orders can be cancelled free of charge prior to dispatch from our fulfillment store.</li>
              <li>If an order is cancelled after dispatch, a nominal restocking fee of ₹30 may apply.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="p-md rounded-xl border bg-bg-cream/40">
            <h2 className="text-lg font-bold text-text-primary mb-sm flex items-center gap-xs">
              <ShieldAlert size={20} className="text-primary" />
              4. Refunds & Dispute Resolution
            </h2>
            <p className="text-xs text-muted leading-relaxed mb-xs">
              Refunds for eligible returned or cancelled items are processed within 24 hours to your NatureCart Wallet or 3-5 business days to your original payment bank account.
            </p>
            <p className="text-xs text-muted leading-relaxed">
              For disputes or order concerns, please reach out via our <strong className="text-text-primary">Help & Support</strong> page or email us at <strong className="text-text-primary">support@naturecart.com</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default TermsPage;
