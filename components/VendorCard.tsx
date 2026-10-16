'use client';

import React from 'react';
import Link from 'next/link';
import { Vendor } from '@/types';
import { formatINR } from '@/lib/utils';
import { ShieldCheck, Star, MapPin, Check, Plus, Sparkles } from 'lucide-react';
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
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group">
      {/* Cover Image & Badges */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={vendor.cover_image}
          alt={vendor.business_name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {vendor.verified_badge && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-600/90 text-white backdrop-blur-md shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Vendor
            </span>
          )}
          {vendor.current_subscription?.plan_id === 'plan-premium' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/90 text-white backdrop-blur-md shadow-sm">
              <Sparkles className="w-3 h-3" />
              Featured
            </span>
          )}
        </div>

        {/* Trust Score Top Right */}
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-xs font-medium flex items-center gap-1">
          <span className="text-[10px] text-gray-300">Trust</span>
          <span className="font-bold text-amber-300">{vendor.trust_score}%</span>
        </div>

        {/* Bottom Locality on Cover */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
          <span className="inline-flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-md font-medium">
            <MapPin className="w-3 h-3 text-orange-400" />
            {vendor.locality}, {vendor.city}
          </span>
          <span className="flex items-center gap-1 font-semibold bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-md">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            {vendor.rating.toFixed(1)} ({vendor.review_count})
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-gray-900 dark:text-gray-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-1">
              {vendor.business_name}
            </h3>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 leading-relaxed">
            {vendor.description}
          </p>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-4 mt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] text-gray-400 dark:text-gray-500 block font-medium">Starting from</span>
            <span className="text-base font-extrabold text-gray-900 dark:text-white">
              {formatINR(vendor.min_price)}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Link
              href={`/vendors/${vendor.id}`}
              className="px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Details
            </Link>

            {isAdded ? (
              <span className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg">
                <Check className="w-3.5 h-3.5" />
                In Plan
              </span>
            ) : (
              <button
                onClick={handleQuickAdd}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-lg shadow-sm transition-colors"
                title="Add default package to active event plan"
              >
                <Plus className="w-3.5 h-3.5" />
                Add to Plan
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
