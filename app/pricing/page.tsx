'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useMarketplace } from '@/lib/store';
import { formatINR } from '@/lib/utils';
import {
  Check,
  Sparkles,
  ShieldCheck,
  Star,
  Zap,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

export default function PricingPage() {
  const { plans, currentVendorId, updateVendorSubscription, getVendorById } = useMarketplace();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [upgradedSuccess, setUpgradedSuccess] = useState<string | null>(null);

  const currentVendor = getVendorById(currentVendorId);
  const activePlanId = currentVendor?.current_subscription?.plan_id || 'plan-basic';

  const handleSelectPlan = (planId: string) => {
    updateVendorSubscription(currentVendorId, planId);
    setUpgradedSuccess(planId);
    setTimeout(() => setUpgradedSuccess(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
          Section 7: Vendor Subscription Model
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-950">
          Grow Your Event Business in Ahmedabad
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Reach thousands of clients planning weddings, Navratri Garba, and corporate galas. Zero hidden fees.
        </p>

        {/* Billing cycle toggle */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <div className="bg-gray-100 p-1 rounded-xl flex items-center text-xs font-semibold">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-lg transition-all ${
                billingCycle === 'monthly' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                billingCycle === 'yearly' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500'
              }`}
            >
              <span>Yearly (Save 17%)</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                2 Mo Free
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan) => {
          const isPro = plan.id === 'plan-pro';
          const isPremium = plan.id === 'plan-premium';
          const price = billingCycle === 'monthly' ? plan.price_monthly : plan.price_yearly;
          const isCurrent = activePlanId === plan.id;

          return (
            <div
              key={plan.id}
              className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all relative ${
                isPremium
                  ? 'bg-gradient-to-b from-orange-50/70 via-white to-orange-50/30 border-2 border-orange-500 shadow-xl'
                  : isPro
                  ? 'bg-white border-2 border-orange-200 shadow-md'
                  : 'bg-white border border-gray-200 shadow-sm'
              }`}
            >
              {isPremium && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-orange-600 text-white text-[11px] font-bold rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Most Popular for Ahmedabad
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-950">{plan.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {plan.name === 'Basic'
                      ? 'Essential starter presence for single-service suppliers.'
                      : plan.name === 'Pro'
                      ? 'Top choice for established caterers, photographers & decorators.'
                      : 'High-visibility tier for banquet lawns & elite wedding planners.'}
                  </p>
                </div>

                <div className="pt-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-black text-gray-950">
                      {formatINR(price)}
                    </span>
                    <span className="text-xs text-gray-400">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                  </div>
                  <span className="text-[10px] text-gray-400 block mt-0.5">+ 18% GST Applicable</span>
                </div>

                {/* Features list */}
                <div className="pt-4 border-t border-gray-100 space-y-2.5 text-xs text-gray-600">
                  <div className="font-bold text-gray-900 pb-1">Included Privileges:</div>
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-8">
                <button
                  type="button"
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={isCurrent}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                    isCurrent
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 cursor-default'
                      : isPremium
                      ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-md shadow-orange-500/30'
                      : 'bg-gray-900 hover:bg-black text-white shadow-sm'
                  }`}
                >
                  {isCurrent ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Current Active Plan</span>
                    </>
                  ) : (
                    <>
                      <span>Choose {plan.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

                {upgradedSuccess === plan.id && (
                  <p className="text-[11px] font-bold text-emerald-600 text-center mt-2 animate-fadeIn">
                    ✓ Subscribed successfully! Status: ACTIVE
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Rules Notice */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-xs text-gray-600 space-y-2 max-w-3xl mx-auto">
        <h4 className="font-bold text-gray-900">Subscription Compliance Rules (Section 7):</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>Unpaid/expired subscriptions auto-hide listings from the search directory.</li>
          <li>Fraud or fake document submission results in permanent ban without refund.</li>
          <li>All limits (categories &amp; services) are enforced at the backend data layer.</li>
        </ul>
      </div>
    </div>
  );
}
