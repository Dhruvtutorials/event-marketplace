'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMarketplace } from '@/lib/store';
import { CategoryChecklist } from '@/components/CategoryChecklist';
import { BudgetTracker } from '@/components/BudgetTracker';
import { formatINR } from '@/lib/utils';
import {
  Calendar,
  MapPin,
  Users,
  CreditCard,
  ShieldCheck,
  ArrowRight,
  Clock,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export default function EventPlanPage() {
  const router = useRouter();
  const { clientEvent, settings } = useMarketplace();

  const totalCost = clientEvent.plan_items.reduce((sum, item) => sum + item.price, 0);
  const advanceAmount = Math.round(totalCost * (settings.advance_percent / 100));
  const hasVendors = clientEvent.plan_items.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-gray-900 dark:text-gray-100">
      {/* Plan Header */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300">
              {clientEvent.event_type_name}
            </span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
              Status: {clientEvent.status}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 dark:text-white">
            {clientEvent.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 dark:text-gray-400 pt-1">
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-4 h-4 text-orange-600" />
              {clientEvent.event_date}
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-4 h-4 text-orange-600" />
              {clientEvent.city || 'Ahmedabad'}, India
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Users className="w-4 h-4 text-orange-600" />
              {clientEvent.guest_count} Guests
            </span>
          </div>
        </div>

        {/* Quick Checkout Trigger */}
        <div className="bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 text-right flex flex-col justify-between shrink-0 min-w-[260px]">
          <div>
            <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
              30% Advance (Single Checkout)
            </span>
            <span className="text-2xl font-black text-gray-950 dark:text-white block">
              {formatINR(advanceAmount)}
            </span>
            <span className="text-[11px] text-gray-500 dark:text-gray-400">
              Total Plan: {formatINR(totalCost)}
            </span>
          </div>

          <div className="pt-3 mt-2 border-t border-gray-200 dark:border-gray-700">
            <Link
              href={`/checkout/${clientEvent.id}`}
              className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all ${
                hasVendors
                  ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-orange-500/30'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 pointer-events-none'
              }`}
            >
              <span>Single Multi-Vendor Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Grid: Checklist & Budget Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Smart Checklist */}
        <div className="lg:col-span-2 space-y-6">
          <CategoryChecklist />
        </div>

        {/* Right Column: Live Budget Tracker & Protection rules */}
        <div className="space-y-6">
          <BudgetTracker />

          {/* Section 13 Escrow & Date Lock Box */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm space-y-4">
            <h4 className="font-bold text-xs text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Platform Guarantees
            </h4>

            <ul className="space-y-2.5 text-xs text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>
                  <strong>Date Lock Transaction:</strong> Confirmed bookings lock the vendor availability calendar automatically.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>
                  <strong>Escrow Security:</strong> Your 30% advance is safely held in escrow. Payouts are made after your event completes.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>
                  <strong>Backup Vendor Shield:</strong> In rare vendor cancellations, platform provides an equivalent verified backup or 100% refund.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
