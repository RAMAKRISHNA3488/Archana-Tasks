import React from 'react';
import { Building2 } from 'lucide-react';
import './NetBankingForm.css';

export function NetBankingForm({ selectedBank, onSelectBank }) {
  const popularBanks = [
    { id: 'sbi', name: 'State Bank of India (SBI)' },
    { id: 'hdfc', name: 'HDFC Bank' },
    { id: 'icici', name: 'ICICI Bank' },
    { id: 'axis', name: 'Axis Bank' },
    { id: 'kotak', name: 'Kotak Mahindra Bank' },
    { id: 'pnb', name: 'Punjab National Bank' }
  ];

  return (
    <div className="net-banking-form p-md rounded-lg bg-bg-cream border mt-sm">
      <label className="form-label text-xs font-semibold text-text-primary mb-xs block flex items-center gap-xs">
        <Building2 size={16} className="text-primary" />
        <span>Select Your Bank *</span>
      </label>

      <select
        value={selectedBank}
        onChange={(e) => onSelectBank(e.target.value)}
        className="input-field text-xs mb-sm"
      >
        <option value="">-- Choose Bank --</option>
        {popularBanks.map(bank => (
          <option key={bank.id} value={bank.id}>
            {bank.name}
          </option>
        ))}
      </select>

      <p className="text-[11px] text-muted">
        You will be securely redirected to your bank's portal to complete net banking authentication.
      </p>
    </div>
  );
}

export default NetBankingForm;
