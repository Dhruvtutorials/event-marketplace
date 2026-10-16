'use client';

import React from 'react';
import { useMarketplace } from '@/lib/store';
import { formatINR } from '@/lib/utils';
import { AlertCircle, CheckCircle2, TrendingUp, Wallet, ShieldAlert } from 'lucide-react';

export function BudgetTracker() {
  const { clientEvent, settings } = useMarketplace();

  const totalAllocated = clientEvent.plan_items.reduce((sum, item) => sum + item.price, 0);
  const minBudget = clientEvent.budget_min;
  const maxBudget = clientEvent.budget_max;

  const advanceAmount = Math.round(totalAllocated * (settings.advance_percent / 100));
  const remainingAmount = totalAllocated - advanceAmount;

  const percentageUsed = maxBudget > 0 ? Math.min(100, Math.round((totalAllocated / maxBudget) * 100)) : 0;
  const isOverBudget = totalAllocated > maxBudget && maxBudget > 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-2">
        <div>
          <span className="text-xs font-semibold text-orange-600 tracking-wider uppercase">Live Budget Health</span>
          <h3 className="text-base font-bold text-gray-900">{clientEvent.title}</h3>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-500">Target Range:</span>
          <span className="font-semibold text-gray-800">
            {formatINR(minBudget)} – {formatINR(maxBudget)}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="py-4 space-y-2">
        <div className="flex justify-between text-xs font-medium">
          <span className="text-gray-600">Total Booked Services</span>
          <span className={`font-bold ${isOverBudget ? 'text-red-600' : 'text-gray-900'}`}>
            {formatINR(totalAllocated)} ({percentageUsed}% of max budget)
          </span>
        </div>
        <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              isOverBudget
                ? 'bg-red-500'
                : percentageUsed > 80
                ? 'bg-amber-500'
                : 'bg-emerald-500'
            }`}
            style={{ width: `${Math.min(100, percentageUsed)}%` }}
          />
        </div>
      </div>

      {/* Financial Split: Advance vs Remaining */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <div className="bg-orange-50/70 border border-orange-200/60 rounded-xl p-3">
          <div className="flex items-center gap-1.5 text-xs text-orange-800 font-semibold mb-1">
            <Wallet className="w-3.5 h-3.5 text-orange-600" />
            <span>Payable Advance ({settings.advance_percent}%)</span>
          </div>
          <p className="text-lg font-bold text-orange-950">{formatINR(advanceAmount)}</p>
          <p className="text-[11px] text-orange-700 mt-0.5">Held in Escrow until confirmation</p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-700 font-semibold mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-gray-600" />
            <span>Post-Event Payout</span>
          </div>
          <p className="text-lg font-bold text-gray-900">{formatINR(remainingAmount)}</p>
          <p className="text-[11px] text-gray-500 mt-0.5">Released {settings.payout_delay_days} days after event</p>
        </div>
      </div>

      {isOverBudget && (
        <div className="mt-3 flex items-start gap-2 p-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
          <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <span>
            You have exceeded your max budget by {formatINR(totalAllocated - maxBudget)}. Consider adjusting packages or add-ons.
          </span>
        </div>
      )}
    </div>
  );
}
