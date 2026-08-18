import React from 'react';
import { ShieldCheck, Lock, Eye, FileText, Server, Bell, HelpCircle } from 'lucide-react';
import Breadcrumb from '../components/common/Breadcrumb';

export function PrivacyPolicyPage() {
  const breadcrumbItems = [
    { label: 'Privacy Policy' }
  ];

  return (
    <div className="privacy-policy-page container py-lg">
      <div className="mb-md">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div className="bg-surface p-2xl rounded-2xl border shadow-xs max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="border-b pb-lg mb-xl text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-md">
          <div>
            <div className="inline-flex items-center gap-xs px-sm py-xs bg-primary-soft text-primary-dark rounded-full text-xs font-bold mb-xs">
              <ShieldCheck size={16} />
              <span>Data Protection & Privacy</span>
            </div>
            <h1 className="text-3xl font-extrabold text-text-primary">Privacy Policy</h1>
            <p className="text-sm text-muted mt-xs">
              How NatureCart collects, uses, and protects your personal information.
            </p>
          </div>
          <div className="text-xs text-muted font-semibold bg-bg-cream px-md py-xs rounded-lg border">
            Last Updated: August 18, 2026
          </div>
        </div>

        {/* Highlight Callout */}
        <div className="p-md bg-primary-soft border border-primary-light rounded-xl mb-xl flex items-start gap-md">
          <Lock size={24} className="text-primary shrink-0 mt-xs" />
          <div>
            <h3 className="font-bold text-sm text-primary-dark">Your Privacy is Our Priority</h3>
            <p className="text-xs text-secondary mt-xs leading-relaxed">
              At NatureCart, we are committed to safeguarding your personal data. We utilize industry-standard 256-bit encryption for all transactions and strictly adhere to data protection regulations. We do not sell your personal information to third parties.
            </p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-xl text-text-secondary text-sm leading-relaxed">
          {/* Section 1 */}
          <section className="p-md rounded-xl border bg-bg-cream/40">
            <h2 className="text-lg font-bold text-text-primary mb-sm flex items-center gap-xs">
              <Eye size={20} className="text-primary" />
              1. Information We Collect
            </h2>
            <p className="mb-xs">
              To provide efficient 60-minute grocery delivery services, we collect necessary personal details when you interact with our platform:
            </p>
            <ul className="list-disc list-inside space-y-xs text-xs text-muted pl-xs">
              <li><strong className="text-text-primary">Account & Profile Information:</strong> Name, phone number, email address, and delivery addresses.</li>
              <li><strong className="text-text-primary">Order & Transaction Details:</strong> Products ordered, billing preferences, delivery notes, and purchase history.</li>
              <li><strong className="text-text-primary">Technical & Device Data:</strong> IP address, device type, browser settings, operating system, and session analytics.</li>
              <li><strong className="text-text-primary">Payment Security:</strong> Payment transactions are handled via PCI-DSS compliant secure payment gateways (UPI, Credit/Debit cards). NatureCart does not store sensitive card PINs or CVV details.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="p-md rounded-xl border bg-bg-cream/40">
            <h2 className="text-lg font-bold text-text-primary mb-sm flex items-center gap-xs">
              <FileText size={20} className="text-primary" />
              2. How We Use Your Information
            </h2>
            <p className="mb-xs">We process your personal information strictly for legitimate operational purposes:</p>
            <ul className="list-disc list-inside space-y-xs text-xs text-muted pl-xs">
              <li>Processing, fulfilling, and delivering your fresh grocery orders within 60 minutes.</li>
              <li>Sending live order updates, SMS dispatch notifications, and digital invoices.</li>
              <li>Providing responsive 24/7 customer service and handling return or refund inquiries.</li>
              <li>Customizing product recommendations, personalized discounts, and promotional offers.</li>
              <li>Enhancing website security, preventing fraudulent activity, and complying with legal obligations.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="p-md rounded-xl border bg-bg-cream/40">
            <h2 className="text-lg font-bold text-text-primary mb-sm flex items-center gap-xs">
              <Server size={20} className="text-primary" />
              3. Data Sharing & Security
            </h2>
            <p className="mb-xs">
              We maintain strict confidentiality. Your data is shared only with essential service partners under strict non-disclosure agreements:
            </p>
            <ul className="list-disc list-inside space-y-xs text-xs text-muted pl-xs">
              <li><strong className="text-text-primary">Delivery Partners:</strong> Assigned delivery personnel receive your name, address, and contact number solely for executing delivery.</li>
              <li><strong className="text-text-primary">Payment Service Providers:</strong> Encrypted financial routing through certified banking & UPI gateways.</li>
              <li><strong className="text-text-primary">Legal Compliance:</strong> Information may be disclosed if required by law enforcement or valid court orders.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="p-md rounded-xl border bg-bg-cream/40">
            <h2 className="text-lg font-bold text-text-primary mb-sm flex items-center gap-xs">
              <Bell size={20} className="text-primary" />
              4. Cookies & Preferences
            </h2>
            <p className="text-xs text-muted leading-relaxed">
              NatureCart uses essential session cookies to remember your shopping cart items, selected delivery location, and browsing preferences. You can manage or disable optional cookies in your browser settings, though certain interactive features may require cookies to operate smoothly.
            </p>
          </section>

          {/* Section 5 */}
          <section className="p-md rounded-xl border bg-bg-cream/40">
            <h2 className="text-lg font-bold text-text-primary mb-sm flex items-center gap-xs">
              <HelpCircle size={20} className="text-primary" />
              5. Your Rights & Data Officer Contact
            </h2>
            <p className="text-xs text-muted leading-relaxed mb-sm">
              You have the right to access, update, or request deletion of your personal account information at any time through your Account Profile page or by contacting our Data Protection Officer.
            </p>
            <div className="p-sm bg-surface rounded-lg border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-xs">
              <div>
                <span className="font-bold text-text-primary block">Data Protection Officer (DPO)</span>
                <span className="text-muted">Email: privacy@naturecart.com | Support: 1800-123-4567</span>
              </div>
              <span className="text-primary font-bold">NatureCart India Pvt Ltd</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicyPage;
