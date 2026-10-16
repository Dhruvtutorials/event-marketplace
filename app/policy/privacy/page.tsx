import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-orange-600">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </Link>

      <div className="space-y-2">
        <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
          Compliance &amp; DPDP Act
        </span>
        <h1 className="text-3xl font-extrabold text-gray-950">Privacy Policy</h1>
        <p className="text-xs text-gray-500">Data Protection &amp; Encryption at Rest</p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm space-y-6 text-xs text-gray-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-gray-950 uppercase">1. Data Collected</h2>
          <p>
            We collect names, contact numbers, event dates, and locations to facilitate vendor matching and booking contracts. For vendors, bank account and tax identity documents are stored encrypted at rest.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-gray-950 uppercase">2. Security &amp; Encryption</h2>
          <p>
            In compliance with Section 17 non-functional requirements, all communications use HTTPS, passwords use secure cryptographic hashing, and financial data is tokenized via Razorpay.
          </p>
        </section>
      </div>
    </div>
  );
}
