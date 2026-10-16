'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMarketplace } from '@/lib/store';
import { formatINR } from '@/lib/utils';
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
} from 'lucide-react';

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id as string;

  const { clientEvent, settings, checkoutEventPlan } = useMarketplace();

  // Payment type state (default 30% advance)
  const [paymentType, setPaymentType] = useState<'ADVANCE' | 'FULL'>('ADVANCE');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showRazorpayModal, setShowRazorpayModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

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
      setPaymentSuccess(true);

      // Execute transaction in store
      checkoutEventPlan(paymentType);

      setTimeout(() => {
        router.push('/dashboard/client');
      }, 1500);
    }, 1800);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Checkout Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Section 14: Escrow-Protected Single Checkout</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950">
          Confirm Your Multi-Vendor Reservation
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Book all your event vendors in a single Razorpay transaction. 100% calendar date-lock guaranteed.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Vendor Items Breakdown */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wider">
              Selected Vendors for {clientEvent.event_date}
            </h3>

            <div className="divide-y divide-gray-100">
              {clientEvent.plan_items.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                  <div>
                    <h4 className="font-bold text-gray-900">{item.vendor_name}</h4>
                    <span className="text-gray-500">{item.package_name}</span>
                    {item.addons && item.addons.length > 0 && (
                      <span className="text-orange-600 font-medium ml-2">
                        (+{item.addons.length} add-ons)
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-gray-900 block">{formatINR(item.price)}</span>
                    <span className="text-[10px] text-gray-400">
                      Adv: {formatINR(Math.round(item.price * 0.3))}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Type Selection */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wider">
              Choose Payment Option
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => setPaymentType('ADVANCE')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentType === 'ADVANCE'
                    ? 'border-orange-600 bg-orange-50/50 ring-2 ring-orange-500/20'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-orange-900">
                    Pay 30% Advance (Recommended)
                  </span>
                  {paymentType === 'ADVANCE' && <Check className="w-4 h-4 text-orange-600" />}
                </div>
                <p className="text-lg font-black text-gray-900">
                  {formatINR(Math.round(totalAmount * (advancePercentage / 100)))}
                </p>
                <p className="text-[11px] text-gray-500 mt-1 leading-snug">
                  Locks vendor dates now. Remaining balance paid post-event completion.
                </p>
              </div>

              <div
                onClick={() => setPaymentType('FULL')}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentType === 'FULL'
                    ? 'border-orange-600 bg-orange-50/50 ring-2 ring-orange-500/20'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-gray-800">Pay 100% Full Amount</span>
                  {paymentType === 'FULL' && <Check className="w-4 h-4 text-orange-600" />}
                </div>
                <p className="text-lg font-black text-gray-900">{formatINR(totalAmount)}</p>
                <p className="text-[11px] text-gray-500 mt-1 leading-snug">
                  Held securely in platform escrow and distributed on milestone completion.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-md space-y-4">
            <h3 className="font-bold text-sm text-gray-950 uppercase tracking-wider">
              Payment Summary
            </h3>

            <div className="space-y-2 text-xs py-3 border-y border-gray-100">
              <div className="flex justify-between text-gray-600">
                <span>Total Services Cost</span>
                <span className="font-semibold text-gray-900">{formatINR(totalAmount)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Platform Convenience Fee</span>
                <span className="font-semibold text-emerald-600">FREE (Ahmedabad Launch)</span>
              </div>
              <div className="flex justify-between text-xs font-bold text-orange-950 pt-2 border-t border-gray-100">
                <span>Payable Now ({paymentType === 'ADVANCE' ? '30%' : '100%'}):</span>
                <span className="text-base text-orange-600">{formatINR(payableAmount)}</span>
              </div>
              {paymentType === 'ADVANCE' && (
                <div className="flex justify-between text-[11px] text-gray-500">
                  <span>Balance Due Post-Event:</span>
                  <span>{formatINR(remainingAmount)}</span>
                </div>
              )}
            </div>

            <button
              onClick={handleOpenRazorpay}
              disabled={paymentSuccess}
              className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 ${
                paymentSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-orange-600 hover:bg-orange-700 text-white shadow-orange-500/30 active:scale-95'
              }`}
            >
              {paymentSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Payment Confirmed! Redirecting...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Pay {formatINR(payableAmount)} via Razorpay</span>
                </>
              )}
            </button>

            <div className="pt-2 text-[11px] text-gray-400 space-y-1 text-center">
              <p>🔒 256-bit encrypted Razorpay Route</p>
              <p>100% Refundable according to Section 13 policy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Razorpay Simulation Modal */}
      {showRazorpayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-6 relative border border-gray-200">
            {/* Razorpay Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                  R
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Razorpay Payment Gateway</h4>
                  <p className="text-[10px] text-gray-400">Order: #ORD-AMD-2026-9921</p>
                </div>
              </div>
              <span className="text-sm font-extrabold text-gray-900">{formatINR(payableAmount)}</span>
            </div>

            {/* Test Payment Simulation Details */}
            <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 text-xs space-y-2 text-blue-900">
              <p className="font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-600" />
                Section 14 Test Mode Active
              </p>
              <p className="text-[11px] text-blue-800 leading-relaxed">
                Platform will issue an atomic transaction: client advance is held in escrow, vendor calendars are locked for {clientEvent.event_date}, and booking status is updated to CONFIRMED.
              </p>
            </div>

            {/* Simulated Payment Methods */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-gray-500 uppercase tracking-wider block">
                Select Test Instrument:
              </span>
              <div className="p-3 rounded-xl border border-gray-300 bg-gray-50 flex items-center justify-between">
                <span className="font-semibold text-gray-800">UPI / QR Code (GPay, PhonePe, Paytm)</span>
                <span className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px]">
                  ✓
                </span>
              </div>
              <div className="p-3 rounded-xl border border-gray-200 text-gray-500 flex items-center justify-between">
                <span>NetBanking (HDFC, ICICI, SBI, Axis)</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowRazorpayModal(false)}
                className="w-1/3 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold text-gray-600 hover:bg-gray-50"
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
                  <span>Simulate Successful Payment</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
