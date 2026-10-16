'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMarketplace } from '@/lib/store';
import { formatINR } from '@/lib/utils';
import { Invoice } from '@/types';
import {
  CreditCard,
  ShieldCheck,
  CheckCircle,
  Lock,
  ArrowRight,
  AlertCircle,
  Building,
  Check,
  Sparkles,
  FileText,
  Printer,
  Download,
  Calendar,
  User,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id as string;

  const { clientEvent, settings, checkoutEventPlan } = useMarketplace();

  // Billing details state
  const [clientName, setClientName] = useState('Parth Patel');
  const [clientEmail, setClientEmail] = useState('parth.patel@example.com');
  const [clientPhone, setClientPhone] = useState('+91 98250 99999');
  const [billingAddress, setBillingAddress] = useState('402, High Street, Sindhu Bhavan Road, Bodakdev, Ahmedabad');

  // Payment type state (default 30% advance)
  const [paymentType, setPaymentType] = useState<'ADVANCE' | 'FULL'>('ADVANCE');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showRazorpayModal, setShowRazorpayModal] = useState(false);
  const [generatedInvoice, setGeneratedInvoice] = useState<Invoice | null>(null);

  const totalAmount = clientEvent.plan_items.reduce((sum, item) => sum + item.price, 0);
  const advancePercentage = settings.advance_percent; // 30%
  const payableAmount = paymentType === 'ADVANCE' ? Math.round(totalAmount * (advancePercentage / 100)) : totalAmount;
  const remainingAmount = totalAmount - payableAmount;

  const handleOpenRazorpay = () => {
    setShowRazorpayModal(true);
  };

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowRazorpayModal(false);

      // Execute transaction in store and generate official Tax Invoice Bill
      const { invoice } = checkoutEventPlan(paymentType, {
        clientName,
        clientEmail,
        clientPhone,
        billingAddress,
      });

      setGeneratedInvoice(invoice);
    }, 1600);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Checkout Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 text-xs font-bold uppercase">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Section 14: Escrow-Protected Single Checkout</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 dark:text-white">
          Confirm Your Multi-Vendor Reservation
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400">
          Book all your event vendors in a single transaction with instant GST-ready Invoice &amp; Bill generation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Vendor Items Breakdown & Billing Info */}
        <div className="md:col-span-2 space-y-6">
          {/* Customer / Billing Details */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-orange-600" />
              <span>Billing Details for Tax Invoice (Bill)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-gray-600 dark:text-zinc-400 font-semibold mb-1">
                  Full Name / Company Name
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-gray-600 dark:text-zinc-400 font-semibold mb-1">
                  Contact Phone (WhatsApp for Invoice)
                </label>
                <input
                  type="text"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-gray-600 dark:text-zinc-400 font-semibold mb-1">
                  Email Address (Invoice Copy Sent Here)
                </label>
                <input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-gray-600 dark:text-zinc-400 font-semibold mb-1">
                  Billing Address (City, State)
                </label>
                <input
                  type="text"
                  value={billingAddress}
                  onChange={(e) => setBillingAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Vendors Breakdown */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider">
              Selected Vendors for {clientEvent.event_date} ({clientEvent.city})
            </h3>

            <div className="divide-y divide-gray-100 dark:divide-zinc-800">
              {clientEvent.plan_items.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{item.vendor_name}</h4>
                    <span className="text-gray-500 dark:text-zinc-400">{item.package_name}</span>
                    {item.addons && item.addons.length > 0 && (
                      <span className="text-orange-600 font-medium ml-2">
                        (+{item.addons.length} add-ons)
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-gray-900 dark:text-white block">
                      {formatINR(item.price)}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      Adv: {formatINR(Math.round(item.price * 0.3))}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Type Selection */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider">
              Choose Payment Option
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => setPaymentType('ADVANCE')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentType === 'ADVANCE'
                    ? 'border-orange-600 bg-orange-50/50 dark:bg-orange-950/20 ring-2 ring-orange-500/20'
                    : 'border-gray-200 dark:border-zinc-800 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-orange-900 dark:text-orange-300">
                    Pay 30% Advance (Recommended)
                  </span>
                  {paymentType === 'ADVANCE' && <Check className="w-4 h-4 text-orange-600" />}
                </div>
                <p className="text-lg font-black text-gray-900 dark:text-white">
                  {formatINR(Math.round(totalAmount * (advancePercentage / 100)))}
                </p>
                <p className="text-[11px] text-gray-500 dark:text-zinc-400 mt-1 leading-snug">
                  Locks vendor dates now. Remaining balance paid post-event completion.
                </p>
              </div>

              <div
                onClick={() => setPaymentType('FULL')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentType === 'FULL'
                    ? 'border-orange-600 bg-orange-50/50 dark:bg-orange-950/20 ring-2 ring-orange-500/20'
                    : 'border-gray-200 dark:border-zinc-800 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-gray-800 dark:text-zinc-200">
                    Pay 100% Full Amount
                  </span>
                  {paymentType === 'FULL' && <Check className="w-4 h-4 text-orange-600" />}
                </div>
                <p className="text-lg font-black text-gray-900 dark:text-white">{formatINR(totalAmount)}</p>
                <p className="text-[11px] text-gray-500 dark:text-zinc-400 mt-1 leading-snug">
                  Held securely in platform escrow and distributed on milestone completion.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-6 shadow-md space-y-4">
            <h3 className="font-bold text-sm text-gray-950 dark:text-white uppercase tracking-wider">
              Payment Summary
            </h3>

            <div className="space-y-2 text-xs py-3 border-y border-gray-100 dark:divide-zinc-800">
              <div className="flex justify-between text-gray-600 dark:text-zinc-400">
                <span>Total Services Cost</span>
                <span className="font-semibold text-gray-900 dark:text-white">{formatINR(totalAmount)}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-zinc-400">
                <span>Platform Convenience Fee</span>
                <span className="font-semibold text-emerald-600">FREE (Launch Promo)</span>
              </div>
              <div className="flex justify-between text-xs font-bold text-orange-950 dark:text-orange-400 pt-2 border-t border-gray-100 dark:border-zinc-800">
                <span>Payable Now ({paymentType === 'ADVANCE' ? '30%' : '100%'}):</span>
                <span className="text-base text-orange-600">{formatINR(payableAmount)}</span>
              </div>
              {paymentType === 'ADVANCE' && (
                <div className="flex justify-between text-[11px] text-gray-500 dark:text-zinc-400">
                  <span>Balance Due Post-Event:</span>
                  <span>{formatINR(remainingAmount)}</span>
                </div>
              )}
            </div>

            <button
              onClick={handleOpenRazorpay}
              disabled={!!generatedInvoice}
              className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 ${
                generatedInvoice
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'bg-orange-600 hover:bg-orange-700 text-white shadow-orange-500/30 active:scale-95'
              }`}
            >
              {generatedInvoice ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Payment Completed! Invoice Generated</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Pay {formatINR(payableAmount)} &amp; Get Bill</span>
                </>
              )}
            </button>

            <div className="pt-2 text-[11px] text-gray-400 dark:text-zinc-500 space-y-1 text-center">
              <p>🔒 256-bit encrypted Razorpay Escrow Route</p>
              <p>100% Refundable according to Section 13 policy</p>
              <p>📄 Official GST-ready Bill generated instantly</p>
            </div>
          </div>
        </div>
      </div>

      {/* Razorpay Simulation Modal */}
      {showRazorpayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-6 relative border border-gray-200 dark:border-zinc-800">
            {/* Razorpay Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                  R
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white">Razorpay Payment Gateway</h4>
                  <p className="text-[10px] text-gray-400">Order: #ORD-AMD-2026-9921</p>
                </div>
              </div>
              <span className="text-sm font-extrabold text-gray-900 dark:text-white">{formatINR(payableAmount)}</span>
            </div>

            {/* Test Payment Simulation Details */}
            <div className="bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-2xl p-4 text-xs space-y-2 text-blue-900 dark:text-blue-300">
              <p className="font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-600" />
                Section 14 Secure Escrow Active
              </p>
              <p className="text-[11px] text-blue-800 dark:text-blue-200 leading-relaxed">
                Advance payment of {formatINR(payableAmount)} is securely deposited into escrow. Your official tax invoice &amp; bill will be generated immediately upon confirmation.
              </p>
            </div>

            {/* Simulated Payment Methods */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-gray-500 uppercase tracking-wider block">
                Select Test Instrument:
              </span>
              <div className="p-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 flex items-center justify-between">
                <span className="font-semibold text-gray-800 dark:text-white">UPI / QR Code (GPay, PhonePe, Paytm)</span>
                <span className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px]">
                  ✓
                </span>
              </div>
              <div className="p-3 rounded-xl border border-gray-200 dark:border-zinc-800 text-gray-500 flex items-center justify-between">
                <span>NetBanking (HDFC, ICICI, SBI, Axis)</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowRazorpayModal(false)}
                className="w-1/3 py-2.5 rounded-xl border border-gray-300 dark:border-zinc-700 text-xs font-semibold text-gray-600 dark:text-zinc-300 hover:bg-gray-50 dark:hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSimulatePayment}
                disabled={isProcessing}
                className="w-2/3 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/30 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span>Authorizing Payment...</span>
                ) : (
                  <span>Simulate Payment &amp; Get Bill</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Success & Official Invoice Bill Generated Screen */}
      {generatedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-fadeIn">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative border border-gray-200 dark:border-zinc-800 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center shadow-inner">
              <CheckCircle className="w-9 h-9" />
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                Payment Success • Escrow Locked
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-gray-950 dark:text-white pt-2">
                Aapka Payment Ho Gaya &amp; Invoice Bill Ready Hai!
              </h2>
              <p className="text-xs text-gray-500 dark:text-zinc-400">
                Aapke vendors ke calendars lock ho chuke hain aur official GST Tax Invoice generate ho chuki hai.
              </p>
            </div>

            {/* Bill Summary Card */}
            <div className="bg-orange-50/60 dark:bg-zinc-800/60 p-4 rounded-2xl border border-orange-100 dark:border-zinc-700 text-left text-xs space-y-2">
              <div className="flex justify-between items-center pb-2 border-b border-orange-100 dark:border-zinc-700">
                <span className="text-gray-500 dark:text-zinc-400">Invoice Number:</span>
                <span className="font-extrabold text-gray-900 dark:text-white font-mono">
                  {generatedInvoice.invoice_number}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 dark:text-zinc-400">Razorpay Payment ID:</span>
                <span className="font-mono text-gray-800 dark:text-zinc-200">
                  {generatedInvoice.razorpay_payment_id}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 dark:text-zinc-400">Amount Paid (Escrow):</span>
                <span className="font-extrabold text-emerald-600 text-sm">
                  {formatINR(generatedInvoice.total_paid)}
                </span>
              </div>
              {generatedInvoice.balance_due > 0 && (
                <div className="flex justify-between items-center text-[11px] text-gray-500 dark:text-zinc-400">
                  <span>Balance Due Post-Event:</span>
                  <span>{formatINR(generatedInvoice.balance_due)}</span>
                </div>
              )}
            </div>

            {/* Direct Action Buttons for Invoice */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href={`/invoices/${generatedInvoice.id}`}
                className="flex-1 py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <FileText className="w-4 h-4" />
                <span>View &amp; Print Bill (Invoice)</span>
              </Link>
              <Link
                href="/dashboard/client"
                className="flex-1 py-3 px-4 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-zinc-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Go to Client Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
