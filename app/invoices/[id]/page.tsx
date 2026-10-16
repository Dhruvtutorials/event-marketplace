'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMarketplace } from '@/lib/store';
import { formatINR } from '@/lib/utils';
import {
  Printer,
  Download,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Calendar,
  CreditCard,
  FileText,
  MapPin,
  Sparkles,
} from 'lucide-react';

export default function InvoicePage() {
  const params = useParams();
  const router = useRouter();
  const invoiceId = params.id as string;
  const { getInvoiceById, invoices } = useMarketplace();

  // Try finding by id or fallback to the latest invoice
  const invoice = getInvoiceById(invoiceId) || invoices[0];

  const handlePrint = () => {
    window.print();
  };

  if (!invoice) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <FileText className="w-12 h-12 text-gray-400 mx-auto" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Invoice Not Found</h2>
        <p className="text-sm text-gray-500">The requested tax invoice could not be located.</p>
        <Link
          href="/dashboard/client"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-600 text-white font-semibold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Dashboard</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Top Action Bar (hidden in print) */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm print:hidden">
        <Link
          href="/dashboard/client"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 dark:text-gray-300 hover:text-orange-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-200 text-xs font-bold hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors shadow-sm"
          >
            <Printer className="w-4 h-4 text-orange-600" />
            <span>Print Invoice</span>
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-all shadow-md shadow-orange-500/20 active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Download Bill (PDF)</span>
          </button>
        </div>
      </div>

      {/* Official Tax Invoice Container */}
      <div
        id="invoice-document"
        className="bg-white text-gray-900 rounded-3xl border border-gray-200 p-6 sm:p-10 shadow-lg space-y-8 print:shadow-none print:border-none print:p-0 print:rounded-none"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-6 border-b border-gray-200 gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 text-white font-black flex items-center justify-center text-base shadow-sm">
                U
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-gray-950">
                  UTSAV MARKETPLACE
                </h1>
                <p className="text-[10px] font-semibold text-orange-600 uppercase tracking-wider">
                  Event Planning &amp; Vendor Services
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500 font-medium">
              {invoice.company_name}
            </p>
            <p className="text-[11px] text-gray-500 leading-relaxed max-w-sm">
              {invoice.company_address}
            </p>
            <div className="flex flex-wrap gap-x-4 text-[11px] text-gray-600 font-medium pt-1">
              <span><strong>GSTIN:</strong> {invoice.company_gst}</span>
              <span><strong>PAN:</strong> {invoice.company_pan}</span>
              <span><strong>State:</strong> Gujarat (Code 24)</span>
            </div>
          </div>

          <div className="text-left sm:text-right space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold uppercase tracking-wide">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>TAX INVOICE &amp; PAYMENT RECEIPT</span>
            </div>
            <div className="space-y-0.5">
              <p className="text-xs text-gray-400 font-semibold uppercase">Invoice Number</p>
              <p className="text-base sm:text-lg font-black text-gray-950 tracking-wider">
                {invoice.invoice_number}
              </p>
            </div>
            <div className="text-[11px] text-gray-500 space-y-0.5">
              <p><strong>Date:</strong> {new Date(invoice.payment_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
              <p><strong>Razorpay Payment ID:</strong> <span className="font-mono text-gray-800">{invoice.razorpay_payment_id}</span></p>
              <p><strong>Payment Status:</strong> <span className="text-emerald-700 font-bold">PAID (Escrow-Locked)</span></p>
            </div>
          </div>
        </div>

        {/* Billed To / Event Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-orange-50/50 p-5 rounded-2xl border border-orange-100">
          <div className="space-y-1 text-xs">
            <span className="font-bold text-[10px] text-orange-900 uppercase tracking-wider block">
              Billed To (Customer Details)
            </span>
            <p className="text-sm font-extrabold text-gray-900">{invoice.client_name}</p>
            <p className="text-gray-600">{invoice.client_email}</p>
            <p className="text-gray-600">{invoice.client_phone}</p>
            <p className="text-gray-500 text-[11px] pt-1">{invoice.billing_address}</p>
          </div>

          <div className="space-y-1 text-xs sm:border-l sm:border-orange-200/70 sm:pl-6">
            <span className="font-bold text-[10px] text-orange-900 uppercase tracking-wider block">
              Event &amp; Reservation Details
            </span>
            <p className="text-sm font-extrabold text-gray-900">{invoice.event_title}</p>
            <div className="flex items-center gap-1.5 text-gray-600 pt-0.5">
              <Calendar className="w-3.5 h-3.5 text-orange-600" />
              <span>Event Date: <strong>{invoice.event_date}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-600">
              <MapPin className="w-3.5 h-3.5 text-orange-600" />
              <span>City: <strong>{invoice.city}</strong></span>
            </div>
            <p className="text-[11px] text-emerald-700 font-semibold pt-1">
              🔒 100% Calendar Date-Lock Verified
            </p>
          </div>
        </div>

        {/* Items Table */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-gray-950 uppercase tracking-wider">
            Booked Services &amp; Packages Breakdown
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-50 text-gray-600">
                  <th className="py-2.5 px-3 font-bold">#</th>
                  <th className="py-2.5 px-3 font-bold">Service / Vendor Name</th>
                  <th className="py-2.5 px-3 font-bold">SAC Code</th>
                  <th className="py-2.5 px-3 font-bold text-right">Package Cost</th>
                  <th className="py-2.5 px-3 font-bold text-right">
                    Paid Now ({invoice.payment_type === 'ADVANCE' ? '30%' : '100%'})
                  </th>
                  <th className="py-2.5 px-3 font-bold text-right">Balance Due</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {invoice.items.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-gray-50/50">
                    <td className="py-3 px-3 text-gray-400 font-mono">{idx + 1}</td>
                    <td className="py-3 px-3">
                      <p className="font-bold text-gray-900">{item.vendor_name}</p>
                      <p className="text-[11px] text-gray-500">
                        {item.category_name} • {item.package_name}
                      </p>
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-gray-500">
                      {item.sac_code.split(' ')[0]}
                    </td>
                    <td className="py-3 px-3 font-semibold text-right text-gray-900">
                      {formatINR(item.amount)}
                    </td>
                    <td className="py-3 px-3 font-bold text-right text-emerald-700">
                      {formatINR(item.advance_paid)}
                    </td>
                    <td className="py-3 px-3 text-right text-gray-500">
                      {formatINR(item.balance_due)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Calculation Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-200">
          {/* Payment Terms & Escrow Notes */}
          <div className="space-y-3 bg-gray-50 p-4 rounded-2xl border border-gray-200/80 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-gray-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Section 14: Escrow Protection Terms</span>
            </div>
            <ul className="space-y-1.5 text-[11px] text-gray-600 leading-relaxed list-disc list-inside">
              <li>
                Client advance of <strong>{formatINR(invoice.total_paid)}</strong> is held in platform escrow account.
              </li>
              <li>
                Remaining balance of <strong>{formatINR(invoice.balance_due)}</strong> is payable after event completion upon milestone confirmation.
              </li>
              <li>
                Governed by Section 13 Refund Policy (100% refund if cancelled 30+ days prior; 50% if 15–29 days).
              </li>
              <li>
                All dispute settlements handled under Ahmedabad jurisdiction.
              </li>
            </ul>
          </div>

          {/* Totals Table */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-gray-600 py-1">
              <span>Total Booking Value:</span>
              <span className="font-semibold text-gray-900">{formatINR(invoice.total_booking_value)}</span>
            </div>
            <div className="flex justify-between text-gray-600 py-1">
              <span>Platform Convenience Fee:</span>
              <span className="font-semibold text-emerald-600">FREE (Launch Promotion)</span>
            </div>
            <div className="flex justify-between text-gray-600 py-1">
              <span>GST (18% SAC 998599):</span>
              <span className="font-semibold text-gray-700">Included in Package</span>
            </div>
            <div className="flex justify-between text-sm font-black text-gray-950 py-2 border-t-2 border-gray-900">
              <span>Amount Paid via Razorpay:</span>
              <span className="text-base text-emerald-700">{formatINR(invoice.total_paid)}</span>
            </div>
            {invoice.balance_due > 0 && (
              <div className="flex justify-between text-xs font-bold text-orange-950 bg-orange-50 p-2.5 rounded-xl border border-orange-200">
                <span>Balance Due Post-Event:</span>
                <span className="text-orange-700 font-extrabold">{formatINR(invoice.balance_due)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer / Digital Signatory */}
        <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[11px] text-gray-500">
          <div>
            <p className="font-semibold text-gray-700">This is a computer-generated tax invoice &amp; bill.</p>
            <p>No physical signature required. Verified on Utsav Event Platform.</p>
          </div>
          <div className="text-left sm:text-right">
            <div className="inline-block px-3 py-1.5 rounded-lg border border-dashed border-gray-300 text-gray-600 bg-gray-50 font-mono text-[10px]">
              AUTHENTICATED ELECTRONIC RECORD
            </div>
            <p className="text-[10px] text-gray-400 mt-1">Generated: {new Date(invoice.payment_date).toLocaleString('en-IN')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
