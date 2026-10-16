import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export default function RefundPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-orange-600">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </Link>

      <div className="space-y-2">
        <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
          Compliance &amp; Consumer Protection
        </span>
        <h1 className="text-3xl font-extrabold text-gray-950">
          Refund, Cancellation &amp; Escrow Policy
        </h1>
        <p className="text-xs text-gray-500">
          Standardized Ahmedabad Marketplace Terms (Section 13 Rule 6)
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm space-y-6 text-xs text-gray-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-gray-950 uppercase">1. Platform Escrow-Like Model</h2>
          <p>
            When a client completes booking checkout, the payable advance (standard 30%) is held securely in platform escrow. The vendor does not receive the bulk payout until 3 days post-event completion, ensuring complete client satisfaction and contractual delivery.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-gray-950 uppercase">2. Client Cancellation Refund Slabs (Section 13 Rule 6)</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border text-xs">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-bold text-gray-700">Notice Period</th>
                  <th className="px-4 py-2 text-left font-bold text-gray-700">Refund Entitlement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-4 py-2 font-medium">30+ Days prior to Event Date</td>
                  <td className="px-4 py-2 text-emerald-700 font-bold">100% Refund (minus payment gateway fee)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">15 to 30 Days prior to Event Date</td>
                  <td className="px-4 py-2 text-amber-700 font-bold">50% Advance Refund</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Less than 15 Days prior to Event Date</td>
                  <td className="px-4 py-2 text-red-600 font-bold">No Refund (retained as vendor date-lock compensation)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-gray-950 uppercase">3. Vendor Cancellation Protection</h2>
          <p>
            If a confirmed vendor cancels or defaults, the client receives an immediate <strong>100% refund</strong> of all monies paid, along with prioritized recommendations for an equivalent verified backup vendor in Ahmedabad. The defaulting vendor faces a Trust Score reduction and penalty.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-gray-950 uppercase">4. Anti-Disintermediation Policy</h2>
          <p>
            Any client or vendor attempting to conduct transactions outside the platform platform forfeits escrow protection, date-lock guarantees, and review eligibility.
          </p>
        </section>
      </div>
    </div>
  );
}
