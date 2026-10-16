'use client';

import React from 'react';
import Link from 'next/link';
import { useMarketplace } from '@/lib/store';
import { formatINR } from '@/lib/utils';
import {
  CheckCircle2,
  Circle,
  ChevronRight,
  Trash2,
  ExternalLink,
  PlusCircle,
  Building2,
  Utensils,
  Sparkles,
  Camera,
  Music,
  Palette,
  Flower2,
  Car,
  HelpCircle,
} from 'lucide-react';

const ICON_MAP: Record<string, any> = {
  Building2,
  Utensils,
  Sparkles,
  Camera,
  Music,
  Palette,
  Flower2,
  Car,
};

export function CategoryChecklist() {
  const { clientEvent, categories, eventTypes, removePlanItem } = useMarketplace();

  // Find the current event type configuration
  const currentEventType = eventTypes.find((e) => e.id === clientEvent.event_type_id) || eventTypes[0];
  const requiredCategoryIds = currentEventType?.required_category_ids || [];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
      <div className="p-5 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-xs font-semibold text-orange-600 uppercase tracking-wider">
            Step 3: Smart Checklist
          </span>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Required Services for {currentEventType?.name}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Mandatory categories are marked. Select a verified vendor for each item to complete your single-checkout plan.
          </p>
        </div>
        <div className="text-right">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300">
            {clientEvent.plan_items.length} of {requiredCategoryIds.length} Picked
          </span>
        </div>
      </div>

      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {requiredCategoryIds.map((catId, index) => {
          const category = categories.find((c) => c.id === catId);
          if (!category) return null;

          const planItem = clientEvent.plan_items.find((item) => item.category_id === catId);
          const isSelected = !!planItem;
          const IconComponent = ICON_MAP[category.icon] || Sparkles;

          return (
            <div
              key={catId}
              className={`p-4 transition-colors ${
                isSelected
                  ? 'bg-orange-50/30 dark:bg-orange-950/20'
                  : 'hover:bg-gray-50/80 dark:hover:bg-gray-800/40'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {/* Left info */}
                <div className="flex items-start sm:items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {isSelected ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <IconComponent className="w-5 h-5" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-400">#{index + 1}</span>
                      <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">{category.name}</h4>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 uppercase">
                        Required
                      </span>
                    </div>

                    {isSelected ? (
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                        <span className="font-semibold text-orange-700 dark:text-orange-400">
                          {planItem.vendor_name}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-600 dark:text-gray-300">{planItem.package_name}</span>
                        {planItem.addons && planItem.addons.length > 0 && (
                          <>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-500 dark:text-gray-400">
                              +{planItem.addons.length} add-ons
                            </span>
                          </>
                        )}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        Required proof: {category.required_proof_type}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right actions */}
                <div className="flex items-center justify-between sm:justify-end gap-3 sm:pl-0 pl-12">
                  {isSelected ? (
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-sm font-bold text-gray-900 dark:text-gray-100 block">
                          {formatINR(planItem.price)}
                        </span>
                        <span className="text-[10px] text-gray-500 dark:text-gray-400">
                          Adv: {formatINR(Math.round(planItem.price * 0.3))}
                        </span>
                      </div>

                      <Link
                        href={`/vendors?category=${catId}`}
                        className="px-2.5 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                        title="Change vendor"
                      >
                        Change
                      </Link>

                      <button
                        onClick={() => removePlanItem(planItem.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors"
                        title="Remove from plan"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <Link
                      href={`/vendors?category=${catId}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-orange-600 text-white hover:bg-orange-700 transition-colors shadow-xs"
                    >
                      <span>Choose Vendor</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
