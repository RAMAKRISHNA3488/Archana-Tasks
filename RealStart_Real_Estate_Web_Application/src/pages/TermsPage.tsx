import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ShieldCheck, Scale, Mail, ArrowLeft } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Link */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-brand-600 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      {/* Main Container */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-card space-y-10">
        {/* Header */}
        <div className="border-b border-slate-100 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center border border-brand-100">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Terms of Service</h1>
              <p className="text-xs text-slate-500 font-medium">Last updated: January 15, 2026</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-4 leading-relaxed">
            Welcome to <strong className="text-slate-800">RealStart</strong>. Please read these Terms of Service ("Terms") carefully before using our website, web application, and real estate services.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8 text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-600"></span>
              1. Introduction
            </h2>
            <p>
              RealStart provides a digital platform connecting property buyers, renters, sellers, and licensed real estate agents. By accessing or using our platform, you agree to comply with and be bound by these Terms of Service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-600"></span>
              2. Acceptance of Terms
            </h2>
            <p>
              By visiting, registering, or navigating RealStart, you confirm that you have read, understood, and accepted these Terms. If you do not agree with any part of these Terms, you must discontinue using our services immediately.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-600"></span>
              3. User Eligibility
            </h2>
            <p>
              You must be at least 18 years of age or the legal age of majority in your jurisdiction to create an account or submit property inquiries on RealStart.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-600"></span>
              4. Account Registration & Security
            </h2>
            <p>
              When creating an account, you agree to provide accurate and complete details. You are responsible for maintaining the confidentiality of your credentials and for all activities occurring under your account.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-600"></span>
              5. User Responsibilities
            </h2>
            <p>
              Users agree to use RealStart solely for lawful real estate transactions and inquiries. You shall not submit misleading property information, spam other users, or attempt to breach platform security.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-600"></span>
              6. Property Listings & Information
            </h2>
            <p>
              Property prices, descriptions, images, and availability posted on RealStart are provided for informational purposes. While we encourage accuracy, listings may be subject to errors, omissions, or prior sale/lease.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-600"></span>
              7. Property Search & Enquiries
            </h2>
            <p>
              Inquiries submitted through property pages or contact forms are delivered directly to the designated listing agent or host. RealStart facilitates communication but is not a party to direct rental or sales contracts unless specified.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-600"></span>
              8. Appointments & Communication
            </h2>
            <p>
              Scheduled property tours and agent appointments are arranged through our platform calendar system. Users and agents are expected to honor booked appointment times or cancel reasonably in advance.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-600"></span>
              9. Payments & Fees
            </h2>
            <p>
              Browsing listings and submitting inquiries on RealStart is free for home buyers and renters. Listing agent subscriptions or featured placement fees, if applicable, are governed by separate commercial agreements.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-600"></span>
              10. Third-Party Services
            </h2>
            <p>
              Our platform may contain links or integrations with third-party mapping, financial calculators, or communication tools. RealStart is not responsible for the content or privacy practices of third-party platforms.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-600"></span>
              11. Intellectual Property
            </h2>
            <p>
              All trademarks, software code, UI designs, graphics, and brand assets on RealStart are the intellectual property of RealStart Inc. You may not copy, reproduce, or redistribute platform assets without permission.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-600"></span>
              12. Prohibited Activities
            </h2>
            <p>
              Users are strictly prohibited from scraping data, deploying automated bots, attempting SQL/XSS injections, posting fraudulent properties, or harassing platform agents and users.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-600"></span>
              13. Disclaimer of Warranties
            </h2>
            <p>
              RealStart is provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied, including fitness for a particular real estate transaction.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-600"></span>
              14. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, RealStart Inc. shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform or property transactions.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-600"></span>
              15. Account Suspension or Termination
            </h2>
            <p>
              We reserve the right to suspend or terminate user accounts that violate these Terms or engage in illegal or harmful activity on the platform.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-600"></span>
              16. Changes to Terms
            </h2>
            <p>
              We may update these Terms periodically. Continued use of RealStart following posted revisions constitutes acceptance of the modified Terms.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-600"></span>
              17. Governing Law
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law principles.
            </p>
          </section>

          <section className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Mail className="w-4 h-4 text-brand-600" />
              18. Contact Information
            </h2>
            <p className="text-xs text-slate-600">
              If you have any questions regarding these Terms of Service, please contact our legal support team:
            </p>
            <div className="text-xs font-semibold text-slate-800 space-y-1 pt-1">
              <p>Email: legal@realstart.com</p>
              <p>Phone: +1 (012) 345 6789</p>
              <p>Address: 123 RealStart Street, New York, NY 10001</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
