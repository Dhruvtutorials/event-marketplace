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
} from 'lucide-react';

export default function ClientDashboardPage() {
  const { bookings, clientEvent, updateBookingStatus, raiseDispute } = useMarketplace();

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-200 gap-4">
        <div>
          <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
            Client Dashboard
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 mt-1">
            My Events &amp; Confirmed Bookings
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Track multi-vendor reservation status, message vendors with anti-fraud shield, and manage advance escrow.
          </p>
        </div>

        <Link
          href={`/events/${clientEvent.id}`}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 hover:bg-orange-700 transition-colors self-start sm:self-auto"
        >
          <span>View Active Event Plan</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-orange-600" />
          Active Vendor Bookings ({bookings.length})
        </h3>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-xs text-gray-500">
            No bookings confirmed yet. Complete checkout from your event plan.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {bookings.map((booking) => {
              const isConfirmed = booking.status === 'CONFIRMED';
              const isDisputed = booking.status === 'DISPUTED';
              const isCancelled = booking.status.startsWith('CANCELLED');

              return (
                <div
                  key={booking.id}
                  className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:border-gray-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  {/* Left Info */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-400">#{booking.id}</span>
                      <h4 className="font-bold text-sm text-gray-900">{booking.vendor_name}</h4>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                          isConfirmed
                            ? 'bg-emerald-100 text-emerald-800'
                            : isDisputed
                            ? 'bg-purple-100 text-purple-800'
                            : isCancelled
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                      <span>Service: <strong className="text-gray-700">{booking.category_name}</strong></span>
                      <span>•</span>
                      <span>Date: <strong className="text-gray-700">{booking.event_date}</strong></span>
                      <span>•</span>
                      <span>Total: <strong className="text-gray-900">{formatINR(booking.amount)}</strong></span>
                      <span>•</span>
                      <span className="text-emerald-700 font-semibold">
                        30% Advance Escrow: {formatINR(booking.advance_amount)}
                      </span>
                    </div>

                    {booking.cancellation_reason && (
                      <p className="text-xs text-red-600 bg-red-50 p-2 rounded-lg mt-2">
                        Cancellation note: {booking.cancellation_reason}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Chat with Vendor Button */}
                    <button
                      onClick={() => handleOpenChat(booking)}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-gray-900 text-white hover:bg-black transition-colors flex items-center gap-1.5 shadow-sm"
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
                        className="px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                      >
                        Mark Completed &amp; Review
                      </button>
                    )}

                    {/* Cancel Action */}
                    {!isCancelled && (
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="px-3 py-2 rounded-xl text-xs font-semibold text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        Cancel
                      </button>
                    )}

                    {/* Dispute Action */}
                    {!isDisputed && !isCancelled && (
                      <button
                        onClick={() => handleRaiseDispute(booking.id)}
                        className="px-3 py-2 rounded-xl text-xs font-semibold text-gray-500 hover:text-purple-700 hover:bg-purple-50 transition-colors"
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

      {/* Review Modal */}
      {reviewBookingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-gray-200">
            <h3 className="text-base font-bold text-gray-900">
              Leave Verified Review &amp; Rating
            </h3>
            <p className="text-xs text-gray-500">
              Only verified completed bookings are permitted to submit reviews (Section 8 Layer 3 Rule).
            </p>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600">Rating (1 to 5 Stars)</label>
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
                        reviewRating >= star ? 'text-amber-400 fill-amber-400' : 'text-gray-200'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600">Your Experience</label>
              <textarea
                rows={3}
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Mention cleanliness, punctuality, food taste, or music quality..."
                className="w-full text-xs p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setReviewBookingId(null)}
                className="w-1/2 py-2 rounded-xl text-xs font-semibold border border-gray-300 hover:bg-gray-50"
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
