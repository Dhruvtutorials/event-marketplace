'use client';

import React from 'react';
import Link from 'next/link';
import { Vendor } from '@/types';
import { formatINR } from '@/lib/utils';
import { ShieldCheck, Star, MapPin, Check, Plus, Sparkles, Crown } from 'lucide-react';
import { useMarketplace } from '@/lib/store';

interface VendorCardProps {
  vendor: Vendor;
  highlightCategory?: string;
}

export function VendorCard({ vendor, highlightCategory }: VendorCardProps) {
  const { clientEvent, addVendorToPlan } = useMarketplace();

  // Check if this vendor is already added in the client's current plan
  const isAdded = clientEvent.plan_items.some((item) => item.vendor_id === vendor.id);

  const targetCategory = highlightCategory || vendor.category_ids[0];
  const primaryService = vendor.services.find((s) => s.category_id === targetCategory) || vendor.services[0];
  const defaultPackage = primaryService?.packages[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (defaultPackage) {
      addVendorToPlan(targetCategory, vendor, defaultPackage.id);
    }
  };

  return (
    <div className="luxury-card bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200/90 dark:border-zinc-800 overflow-hidden shadow-sm flex flex-col group relative">
      {/* Cover Image & Badges */}
      <div className="relative h-52 w-full overflow-hidden bg-gray-100 dark:bg-zinc-800">
        <img
          src={vendor.cover_image}
          alt={vendor.business_name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {vendor.verified_badge && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-extrabold bg-emerald-600/95 text-white backdrop-blur-md shadow-md">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-200" />
              <span>Verified Artisan</span>
            </span>
          )}
          {vendor.current_subscription?.plan_id === 'plan-premium' && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-extrabold bg-gradient-to-r from-amber-500 to-amber-600 text-white backdrop-blur-md shadow-md">
              <Crown className="w-3.5 h-3.5 text-amber-200" />
              <span>Royal Tier</span>
            </span>
          )}
        </div>

        {/* Trust Score Top Right */}
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-semibold flex items-center gap-1.5 shadow-md border border-white/10 z-10">
          <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">Trust Score</span>
          <span className="font-black text-white">{vendor.trust_score}%</span>
        </div>

        {/* Bottom Locality & Rating on Cover */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs z-10">
          <span className="inline-flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-xl font-semibold border border-white/10">
            <MapPin className="w-3.5 h-3.5 text-orange-400" />
            <span>{vendor.locality}, {vendor.city}</span>
          </span>
          <span className="flex items-center gap-1 font-bold bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/10">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{vendor.rating.toFixed(1)}</span>
            <span className="text-[10px] text-gray-300 font-normal">({vendor.review_count})</span>
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="font-extrabold text-base text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-1">
            {vendor.business_name}
          </h3>
          <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
            {vendor.description}
          </p>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-3 border-t border-gray-100 dark:border-zinc-800/80 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-gray-400 dark:text-zinc-500 block font-bold uppercase tracking-wider">
              Starting from
            </span>
            <span className="text-base font-black text-gray-900 dark:text-white">
              {formatINR(vendor.min_price)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/vendors/${vendor.id}`}
              className="px-3.5 py-2 text-xs font-bold text-gray-700 dark:text-zinc-200 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-xl transition-all"
            >
              Portfolio
            </Link>

            {isAdded ? (
              <span className="inline-flex items-center gap-1 px-3.5 py-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl">
                <Check className="w-3.5 h-3.5" />
                <span>In Plan</span>
              </span>
            ) : (
              <button
                onClick={handleQuickAdd}
                className="inline-flex items-center gap-1 px-3.5 py-2 text-xs font-bold text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 rounded-xl shadow-md shadow-orange-500/20 active:scale-95 transition-all"
                title="Add default package to active event plan"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add to Plan</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
