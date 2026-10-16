import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-orange-600">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </Link>

      <div className="space-y-2">
        <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
          Legal Framework
        </span>
        <h1 className="text-3xl font-extrabold text-gray-950">Terms of Service</h1>
        <p className="text-xs text-gray-500">Amdavad Utsav Marketplace Terms for Clients &amp; Vendors</p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm space-y-6 text-xs text-gray-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-gray-950 uppercase">1. Marketplace Intermediary Status</h2>
          <p>
            Amdavad Utsav acts solely as a two-sided marketplace technology intermediary connecting event hosts (Clients) with independent service professionals (Vendors). The platform provides escrow-like payment collection, date reservation, and verified listings.
          </p>
        </section>

        <section className="space-y-2" id="kyc">
          <h2 className="text-sm font-bold text-gray-950 uppercase">2. Vendor 4-Layer KYC &amp; Conduct</h2>
          <p>
            All vendors operating in Ahmedabad agree to provide true identity, FSSAI certificates (if catering), land title agreements (if venues), and genuine portfolios. Misrepresentation leads to immediate listing suspension and ban.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-gray-950 uppercase">3. Chat &amp; Contact Masking Rule (Section 13 Rule 8)</h2>
          <p>
            Direct exchange of telephone numbers, personal emails, or direct bank transfer details prior to confirmed booking is prohibited and automatically masked by our safety filters.
          </p>
        </section>
      </div>
    </div>
  );
}
