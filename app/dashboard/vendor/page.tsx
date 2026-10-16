'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useMarketplace } from '@/lib/store';
import { ChatModal } from '@/components/ChatModal';
import { formatINR } from '@/lib/utils';
import {
  Store,
  ShieldCheck,
  Calendar,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  MessageSquare,
  AlertCircle,
  Plus,
  Sparkles,
  Settings,
  CreditCard,
  Building,
} from 'lucide-react';

export default function VendorDashboardPage() {
  const {
    currentVendorId,
    getVendorById,
    bookings,
    updateBookingStatus,
    settings,
  } = useMarketplace();

  const vendor = getVendorById(currentVendorId) || getVendorById('vnd-1');

  // Active chat state
  const [activeChatBooking, setActiveChatBooking] = useState<{
    bookingId: string;
    vendorName: string;
    clientName: string;
  } | null>(null);

  // Counter-offer modal state
  const [counterBookingId, setCounterBookingId] = useState<string | null>(null);
  const [counterPrice, setCounterPrice] = useState<number>(0);
  const [counterNote, setCounterNote] = useState<string>('');

  if (!vendor) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <h2 className="text-xl font-bold">No Vendor Profile Selected</h2>
      </div>
    );
  }

  // Filter bookings for this vendor
  const vendorBookings = bookings.filter((b) => b.vendor_id === vendor.id);

  // Financial calculations
  const totalEarnings = vendorBookings
    .filter((b) => b.status === 'CONFIRMED' || b.status === 'COMPLETED')
    .reduce((sum, b) => sum + b.amount, 0);

  const platformFee = Math.round(totalEarnings * (settings.commission_percent / 100));
  const netEarnings = totalEarnings - platformFee;
  const advanceEscrowReceived = Math.round(totalEarnings * (settings.advance_percent / 100));

  const handleAccept = (bookingId: string) => {
    updateBookingStatus(bookingId, 'ACCEPTED');
  };

  const handleReject = (bookingId: string) => {
    const reason = prompt('Reason for rejecting booking request:');
    if (reason) {
      updateBookingStatus(bookingId, 'REJECTED', { reason });
    }
  };

  const handleCounterOfferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!counterBookingId) return;
    updateBookingStatus(counterBookingId, 'COUNTER_OFFERED', {
      counterAmount: counterPrice,
      counterNote,
    });
    setCounterBookingId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Vendor Profile & KYC Status Banner */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xl shrink-0 overflow-hidden">
            <img src={vendor.cover_image} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-gray-950">
                {vendor.business_name}
              </h1>
              {vendor.verified_badge ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Vendor
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                  KYC Under Review
                </span>
              )}
            </div>

            <p className="text-xs text-gray-500">
              {vendor.locality}, {vendor.city} • Trust Score: <strong>{vendor.trust_score}%</strong> • Rating: <strong>{vendor.rating} ★</strong>
            </p>
          </div>
        </div>

        {/* Subscription Plan Pill */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
              Current Tier
            </span>
            <span className="text-sm font-extrabold text-orange-600">
              {vendor.current_subscription?.plan_id.replace('plan-', '').toUpperCase()} PLAN
            </span>
            <span className="text-[11px] text-gray-500 block">
              Auto-renews: {vendor.current_subscription?.end_date}
            </span>
          </div>
          <Link
            href="/pricing"
            className="px-3 py-1.5 rounded-xl bg-white border border-gray-300 hover:bg-gray-50 text-xs font-semibold text-gray-700 shadow-2xs"
          >
            Upgrade Tier
          </Link>
        </div>
      </div>

      {/* Financial Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <span className="text-xs font-semibold text-gray-500">Gross Booking Volume</span>
          <p className="text-xl font-black text-gray-950 mt-1">{formatINR(totalEarnings)}</p>
          <span className="text-[11px] text-emerald-600 font-medium">Across confirmed dates</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <span className="text-xs font-semibold text-gray-500">Platform Fee ({settings.commission_percent}%)</span>
          <p className="text-xl font-black text-gray-700 mt-1">-{formatINR(platformFee)}</p>
          <span className="text-[11px] text-gray-400">Deducted at payout settlement</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <span className="text-xs font-semibold text-gray-500">Advance Held in Escrow</span>
          <p className="text-xl font-black text-orange-600 mt-1">{formatINR(advanceEscrowReceived)}</p>
          <span className="text-[11px] text-orange-700">30% advance locked</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <span className="text-xs font-semibold text-gray-500">Net Estimated Payout</span>
          <p className="text-xl font-black text-emerald-700 mt-1">{formatINR(netEarnings)}</p>
          <span className="text-[11px] text-emerald-600">Settles {settings.payout_delay_days} days post-event</span>
        </div>
      </div>

      {/* Booking Requests Manager */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-gray-950 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-orange-600" />
            Client Booking Requests &amp; Date Locks ({vendorBookings.length})
          </h3>
          <span className="text-xs text-gray-500">Auto-expires in 48 hours (Section 13 Rule 12)</span>
        </div>

        {vendorBookings.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-xs text-gray-500">
            No booking requests received yet for your Ahmedabad listing.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {vendorBookings.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-400">#{b.id}</span>
                    <h4 className="font-bold text-sm text-gray-900">{b.client_name}</h4>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 uppercase">
                      {b.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                    <span>Occasion: <strong>{b.event_title}</strong></span>
                    <span>•</span>
                    <span>Target Date: <strong className="text-orange-600">{b.event_date}</strong></span>
                    <span>•</span>
                    <span>Total: <strong className="text-gray-900">{formatINR(b.amount)}</strong></span>
                  </div>

                  {b.counter_amount && (
                    <div className="text-xs bg-amber-50 text-amber-900 p-2 rounded-lg mt-2">
                      Counter Proposed: {formatINR(b.counter_amount)} — {b.counter_note}
                    </div>
                  )}
                </div>

                {/* Vendor Action Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() =>
                      setActiveChatBooking({
                        bookingId: b.id,
                        vendorName: b.vendor_name,
                        clientName: b.client_name,
                      })
                    }
                    className="px-3 py-2 rounded-xl text-xs font-semibold bg-gray-900 text-white hover:bg-black transition-colors flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Chat Client</span>
                  </button>

                  {b.status === 'REQUESTED' && (
                    <>
                      <button
                        onClick={() => handleAccept(b.id)}
                        className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                      >
                        Accept Date
                      </button>

                      <button
                        onClick={() => {
                          setCounterBookingId(b.id);
                          setCounterPrice(b.amount);
                        }}
                        className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500 text-white hover:bg-amber-600 transition-colors"
                      >
                        Counter Offer
                      </button>

                      <button
                        onClick={() => handleReject(b.id)}
                        className="px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        Decline
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Calendar Availability Matrix */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-gray-950 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-orange-600" />
              Calendar &amp; Availability Date Locks
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Section 13 Rule 1: Confirmed platform bookings automatically lock calendar dates to prevent double booking.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5 pt-2">
          {['2026-11-20', '2026-11-21', '2026-11-22', '2026-11-23', '2026-11-27', '2026-11-28', '2026-11-29'].map((dt) => {
            const isBooked = vendorBookings.some((b) => b.event_date === dt && (b.status === 'CONFIRMED' || b.status === 'ACCEPTED'));
            return (
              <div
                key={dt}
                className={`p-3 rounded-xl border text-center text-xs transition-colors ${
                  isBooked
                    ? 'border-red-300 bg-red-50 text-red-800'
                    : 'border-emerald-200 bg-emerald-50 text-emerald-800'
                }`}
              >
                <span className="font-bold block">{dt.slice(5)}</span>
                <span className="text-[10px] uppercase font-extrabold mt-1 block">
                  {isBooked ? '🔒 BOOKED' : '✓ FREE'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Counter Offer Modal */}
      {counterBookingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-gray-200">
            <h3 className="text-base font-bold text-gray-950">
              Propose Counter-Offer to Client
            </h3>
            <p className="text-xs text-gray-500">
              Propose an updated price or specify conditions (Section 13 Rule 11). Client must accept for booking to advance.
            </p>

            <form onSubmit={handleCounterOfferSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Counter Price (INR)</label>
                <input
                  type="number"
                  value={counterPrice}
                  onChange={(e) => setCounterPrice(Number(e.target.value))}
                  className="w-full text-xs font-bold p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Reason / Custom Note</label>
                <textarea
                  rows={3}
                  value={counterNote}
                  onChange={(e) => setCounterNote(e.target.value)}
                  placeholder="e.g. Higher guest count requires additional generator and 2 extra buffet counters."
                  className="w-full text-xs p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCounterBookingId(null)}
                  className="w-1/2 py-2 rounded-xl text-xs font-semibold border border-gray-300 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2 rounded-xl text-xs font-bold bg-orange-600 hover:bg-orange-700 text-white"
                >
                  Send Counter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Chat Modal */}
      {activeChatBooking && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="relative">
            <button
              onClick={() => setActiveChatBooking(null)}
              className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-gray-900 text-white font-bold flex items-center justify-center text-xs shadow-md z-10 hover:bg-black"
            >
              ✕
            </button>
            <ChatModal
              bookingId={activeChatBooking.bookingId}
              vendorName={activeChatBooking.vendorName}
              clientName={activeChatBooking.clientName}
            />
          </div>
        </div>
      )}
    </div>
  );
}
