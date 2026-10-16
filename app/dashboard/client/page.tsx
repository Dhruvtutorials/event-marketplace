'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useMarketplace } from '@/lib/store';
import { ChatModal } from '@/components/ChatModal';
import { formatINR } from '@/lib/utils';
import {
  Calendar,
  MessageSquare,
  Star,
  ShieldCheck,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  ChevronRight,
  Sparkles,
  MapPin,
  ExternalLink,
  FileText,
  Printer,
  Download,
} from 'lucide-react';

export default function ClientDashboardPage() {
  const { bookings, clientEvent, updateBookingStatus, raiseDispute, invoices } = useMarketplace();

  // Active chat state
  const [activeChatBooking, setActiveChatBooking] = useState<{
    bookingId: string;
    vendorName: string;
    clientName: string;
  } | null>(null);

  // Review state
  const [reviewBookingId, setReviewBookingId] = useState<string | null>(null);
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState<string>('');
  const [reviewSubmitted, setReviewSubmitted] = useState<boolean>(false);

  const handleOpenChat = (b: any) => {
    setActiveChatBooking({
      bookingId: b.id,
      vendorName: b.vendor_name,
      clientName: b.client_name,
    });
  };

  const handleCancelBooking = (bookingId: string) => {
    const reason = prompt('Please enter cancellation reason (Subject to Section 13 Refund Policy):');
    if (reason) {
      updateBookingStatus(bookingId, 'CANCELLED_BY_CLIENT', { reason });
    }
  };

  const handleRaiseDispute = (bookingId: string) => {
    const reason = prompt('Describe the dispute issue for platform admin investigation:');
    if (reason) {
      raiseDispute(bookingId, reason);
      alert('Dispute raised. Admin team has paused vendor payout and will review within 24 hours.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-200 dark:border-zinc-800 gap-4">
        <div>
          <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
            Client Dashboard
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 dark:text-white mt-1">
            My Events, Bookings &amp; Invoices
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400 mt-1">
            Track multi-vendor reservation status, download tax invoice bills, message vendors with anti-fraud shield, and manage advance escrow.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 self-start sm:self-auto">
          {invoices.length > 0 && (
            <Link
              href={`/invoices/${invoices[0].id}`}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-400 font-bold text-xs hover:bg-orange-100 transition-colors shadow-sm"
            >
              <FileText className="w-4 h-4 text-orange-600" />
              <span>Latest Tax Invoice ({invoices[0].invoice_number})</span>
            </Link>
          )}

          <Link
            href={`/events/${clientEvent.id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 hover:bg-orange-700 transition-colors"
          >
            <span>View Active Event Plan</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
          <Calendar className="w-4 h-4 text-orange-600" />
          <span>Active Vendor Bookings ({bookings.length})</span>
        </h3>

        {bookings.length === 0 ? (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-8 text-center text-xs text-gray-500 dark:text-zinc-400">
            No bookings confirmed yet. Complete checkout from your event plan to generate bookings &amp; invoice.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {bookings.map((booking) => {
              const isConfirmed = booking.status === 'CONFIRMED';
              const isDisputed = booking.status === 'DISPUTED';
              const isCancelled = booking.status.startsWith('CANCELLED');

              const relatedInvoice =
                invoices.find(
                  (inv) =>
                    inv.event_id === booking.event_id ||
                    inv.items.some((item) => item.vendor_name === booking.vendor_name)
                ) || invoices[0];

              return (
                <div
                  key={booking.id}
                  className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-5 shadow-sm hover:border-gray-300 dark:hover:border-zinc-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  {/* Left Info */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-400 dark:text-zinc-500 font-mono">
                        #{booking.id}
                      </span>
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                        {booking.vendor_name}
                      </h4>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                          isConfirmed
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400'
                            : isDisputed
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-400'
                            : isCancelled
                            ? 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-400'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-zinc-400">
                      <span>
                        Service: <strong className="text-gray-700 dark:text-zinc-300">{booking.category_name}</strong>
                      </span>
                      <span>•</span>
                      <span>
                        Date: <strong className="text-gray-700 dark:text-zinc-300">{booking.event_date}</strong>
                      </span>
                      <span>•</span>
                      <span>
                        Total: <strong className="text-gray-900 dark:text-white">{formatINR(booking.amount)}</strong>
                      </span>
                      <span>•</span>
                      <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                        30% Advance Escrow: {formatINR(booking.advance_amount)}
                      </span>
                    </div>

                    {booking.cancellation_reason && (
                      <p className="text-xs text-red-600 bg-red-50 dark:bg-red-950/40 p-2 rounded-lg mt-2">
                        Cancellation note: {booking.cancellation_reason}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2">
                    {/* View Invoice Bill Button */}
                    {relatedInvoice && (
                      <Link
                        href={`/invoices/${relatedInvoice.id}`}
                        className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-orange-800 hover:bg-orange-100 dark:hover:bg-orange-900/60 transition-colors flex items-center gap-1.5 shadow-sm"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>View Bill / Invoice</span>
                      </Link>
                    )}

                    {/* Chat with Vendor Button */}
                    <button
                      onClick={() => handleOpenChat(booking)}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-gray-900 dark:bg-zinc-800 text-white hover:bg-black dark:hover:bg-zinc-700 transition-colors flex items-center gap-1.5 shadow-sm"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Chat with Vendor</span>
                    </button>

                    {/* Review Button if completed */}
                    {booking.status === 'CONFIRMED' && (
                      <button
                        onClick={() => {
                          updateBookingStatus(booking.id, 'COMPLETED');
                          setReviewBookingId(booking.id);
                        }}
                        className="px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-colors"
                      >
                        Mark Completed &amp; Review
                      </button>
                    )}

                    {/* Cancel Action */}
                    {!isCancelled && (
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="px-3 py-2 rounded-xl text-xs font-semibold text-gray-500 dark:text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                      >
                        Cancel
                      </button>
                    )}

                    {/* Dispute Action */}
                    {!isDisputed && !isCancelled && (
                      <button
                        onClick={() => handleRaiseDispute(booking.id)}
                        className="px-3 py-2 rounded-xl text-xs font-semibold text-gray-500 dark:text-zinc-400 hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-colors"
                      >
                        Raise Dispute
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Official Tax Invoices & Payment Receipts List */}
      <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-zinc-800">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-orange-600" />
            <span>Official Tax Invoices &amp; Payment Receipts ({invoices.length})</span>
          </h3>
          <span className="text-xs text-gray-500 dark:text-zinc-400">
            GST Compliant • Print &amp; PDF Download Available
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {invoices.map((inv) => (
            <div
              key={inv.id}
              className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-5 shadow-sm hover:border-orange-300 dark:hover:border-orange-500/40 transition-all flex flex-col justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-orange-600 bg-orange-50 dark:bg-orange-950/50 px-2.5 py-1 rounded-lg">
                    {inv.invoice_number}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 uppercase">
                    PAID (ESCROW)
                  </span>
                </div>

                <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                  {inv.event_title}
                </h4>

                <div className="text-xs text-gray-500 dark:text-zinc-400 space-y-1">
                  <p>
                    Event Date: <strong>{inv.event_date}</strong> • City: <strong>{inv.city}</strong>
                  </p>
                  <p>
                    Razorpay ID: <span className="font-mono text-gray-700 dark:text-zinc-300">{inv.razorpay_payment_id}</span>
                  </p>
                  <p className="text-gray-900 dark:text-white font-semibold">
                    Advance Paid: <span className="text-emerald-600 font-bold">{formatINR(inv.total_paid)}</span>
                    {inv.balance_due > 0 && (
                      <span className="text-gray-500 dark:text-zinc-400 font-normal ml-2">
                        (Remaining: {formatINR(inv.balance_due)})
                      </span>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-gray-100 dark:border-zinc-800">
                <Link
                  href={`/invoices/${inv.id}`}
                  className="flex-1 py-2 px-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs text-center flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>View &amp; Print Bill</span>
                </Link>
                <Link
                  href={`/invoices/${inv.id}`}
                  className="py-2 px-3 rounded-xl border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-zinc-800 font-semibold text-xs flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Modal */}
      {reviewBookingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-gray-200 dark:border-zinc-800">
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              Leave Verified Review &amp; Rating
            </h3>
            <p className="text-xs text-gray-500 dark:text-zinc-400">
              Only verified completed bookings are permitted to submit reviews (Section 8 Layer 3 Rule).
            </p>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600 dark:text-zinc-300">Rating (1 to 5 Stars)</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setReviewRating(star)}
                    className="p-1.5"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        reviewRating >= star ? 'text-amber-400 fill-amber-400' : 'text-gray-200 dark:text-zinc-700'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600 dark:text-zinc-300">Your Experience</label>
              <textarea
                rows={3}
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Mention cleanliness, punctuality, food taste, or music quality..."
                className="w-full text-xs p-3 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 dark:text-white"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setReviewBookingId(null)}
                className="w-1/2 py-2 rounded-xl text-xs font-semibold border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  alert('Thank you! Your verified review has been published on the vendor profile.');
                  setReviewBookingId(null);
                }}
                className="w-1/2 py-2 rounded-xl text-xs font-bold bg-orange-600 hover:bg-orange-700 text-white"
              >
                Submit Review
              </button>
            </div>
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
