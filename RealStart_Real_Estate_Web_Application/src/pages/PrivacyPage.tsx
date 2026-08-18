import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Eye, Mail, ArrowLeft } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
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
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Privacy Policy</h1>
              <p className="text-xs text-slate-500 font-medium">Last updated: January 15, 2026</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-4 leading-relaxed">
            At <strong className="text-slate-800">RealStart</strong>, we are committed to protecting your personal privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you browse or interact with our platform.
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
              This Privacy Policy applies to the RealStart website and application services. By using RealStart, you consent to the data practices described in this statement.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-600"></span>
              2. Information We Collect
            </h2>
            <p>
              We collect information that you voluntarily provide to us when registering an account, scheduling property appointments, submitting contact forms, or saving favorite properties.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-600"></span>
              3. Account Information
            </h2>
            <p>
              Account registration details may include your full name, email address, phone number, role preference (buyer/agent), profile photo, and security credentials.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-600"></span>
              4. Property & Enquiry Information
            </h2>
            <p>
              When you submit inquiries or schedule property tours, we store details about your requested properties, preferred appointment dates, and contact messages to facilitate communication with designated agents.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-600"></span>
              5. Contact Information
            </h2>
            <p>
              If you reach out via our Support or Contact forms, we store your email address and message contents to respond effectively to your technical or property inquiries.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-600"></span>
              6. How We Use Information
            </h2>
            <p>
              We use collected information to operate, personalize, and improve RealStart. Uses include managing your account profile, scheduling property viewings, dispatching relevant alerts, and maintaining platform security.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-600"></span>
              7. Cookies & Local Storage
            </h2>
            <p>
              RealStart uses browser local storage and cookies to maintain your login session, save property preferences, and store theme configurations cleanly.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-600"></span>
              8. Data Sharing
            </h2>
            <p>
              We do not sell, rent, or trade your personal data to third-party marketers. Property inquiry details are shared strictly with the assigned real estate agents or property hosts you choose to contact.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-600"></span>
              9. Third-Party Services
            </h2>
            <p>
              We may utilize trusted third-party providers (such as image hosting services like Unsplash or analytics tools) that operate under strict confidentiality agreements to deliver application functionality.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-600"></span>
              10. Data Security
            </h2>
            <p>
              We implement industry-standard cryptographic techniques, including Web Crypto SHA-256 password hashing and secure HTTPS protocols, to safeguard your personal data from unauthorized access.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-600"></span>
              11. Data Retention
            </h2>
            <p>
              We retain your account details for as long as your account remains active or as needed to provide you with seamless access to saved properties and appointments.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-600"></span>
              12. User Rights
            </h2>
            <p>
              You have the right to inspect, update, or delete your account data at any time via your Profile and Settings pages or by contacting support.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-600"></span>
              13. Children's Privacy
            </h2>
            <p>
              RealStart does not knowingly collect personal information from children under 13. If we discover that a child under 13 has provided personal information, we will delete it immediately.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-600"></span>
              14. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time to reflect platform or legal updates. Revisions will be posted on this page with an updated modification date.
            </p>
          </section>

          <section className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Mail className="w-4 h-4 text-brand-600" />
              15. Contact Us
            </h2>
            <p className="text-xs text-slate-600">
              If you have any questions or privacy concerns regarding this policy, please reach out to our privacy officer:
            </p>
            <div className="text-xs font-semibold text-slate-800 space-y-1 pt-1">
              <p>Email: privacy@realstart.com</p>
              <p>Phone: +1 (012) 345 6789</p>
              <p>Address: 123 RealStart Street, New York, NY 10001</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
