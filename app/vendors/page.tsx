'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useMarketplace } from '@/lib/store';
import { VendorCard } from '@/components/VendorCard';
import {
  Filter,
  Search,
  MapPin,
  ShieldCheck,
  Star,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react';

function VendorsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'ALL';

  const { vendors, categories, selectedCity, setSelectedCity, cities } = useMarketplace();

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [filterCity, setFilterCity] = useState<string>(selectedCity);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [maxBudget, setMaxBudget] = useState<number>(500000);

  // Filtered Vendors
  const filteredVendors = useMemo(() => {
    return vendors.filter((v) => {
      // Must be ACTIVE or UNDER_REVIEW for testing
      if (v.status === 'BANNED' || v.status === 'SUSPENDED') return false;

      // City filter
      if (filterCity !== 'All Cities' && v.city.toLowerCase() !== filterCity.toLowerCase()) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'ALL' && !v.category_ids.includes(selectedCategory)) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = v.business_name.toLowerCase().includes(q);
        const matchesDesc = v.description.toLowerCase().includes(q);
        const matchesLoc = v.locality.toLowerCase().includes(q);
        const matchesCity = v.city.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesLoc && !matchesCity) return false;
      }

      // Verified Badge
      if (verifiedOnly && !v.verified_badge) {
        return false;
      }

      // Rating
      if (v.rating < minRating) {
        return false;
      }

      // Budget (min_price)
      if (v.min_price > maxBudget) {
        return false;
      }

      return true;
    });
  }, [vendors, selectedCategory, filterCity, searchQuery, verifiedOnly, minRating, maxBudget]);

  const resetFilters = () => {
    setSelectedCategory('ALL');
    setFilterCity('All Cities');
    setSelectedCity('All Cities');
    setSearchQuery('');
    setVerifiedOnly(false);
    setMinRating(0);
    setMaxBudget(500000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-gray-900 dark:text-gray-100">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-gray-200 dark:border-gray-800">
        <div>
          <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
            Multi-City Vendor Directory
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 dark:text-white mt-1">
            Browse Verified Event Specialists
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Compare packages, inspect real client portfolios, and reserve dates with 30% advance escrow protection.
          </p>
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
          Showing <span className="font-bold text-gray-900 dark:text-white">{filteredVendors.length}</span> verified suppliers
        </div>
      </div>

      {/* Main Grid: Filters Sidebar + Vendor Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="space-y-6 bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm h-fit">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2 font-bold text-sm text-gray-900 dark:text-white">
              <SlidersHorizontal className="w-4 h-4 text-orange-600" />
              <span>Filters</span>
            </div>
            <button
              onClick={resetFilters}
              className="text-xs text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>

          {/* Search Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
              Search by Keyword
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Caterer, lawn, cinema..."
                className="w-full text-xs pl-9 pr-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* City Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-orange-600" />
              City Selection
            </label>
            <select
              value={filterCity}
              onChange={(e) => {
                setFilterCity(e.target.value);
                setSelectedCity(e.target.value);
              }}
              className="w-full text-xs font-semibold px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city === 'All Cities' ? '📍 All Cities' : city}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
              Service Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full text-xs font-medium px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="ALL">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Verified Badge Checkbox */}
          <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="w-4 h-4 text-orange-600 rounded border-gray-300 dark:border-gray-700 focus:ring-orange-500"
              />
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Verified Badge Only
              </span>
            </label>
          </div>

          {/* Minimum Rating */}
          <div className="space-y-1.5 pt-2 border-t border-gray-100 dark:border-gray-800">
            <label className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
              Minimum Rating
            </label>
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              {[0, 4.5, 4.8].map((rate) => (
                <button
                  type="button"
                  key={rate}
                  onClick={() => setMinRating(rate)}
                  className={`py-1.5 rounded-lg font-semibold flex items-center justify-center gap-1 transition-colors ${
                    minRating === rate
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  <Star className="w-3 h-3 fill-current" />
                  <span>{rate === 0 ? 'Any' : `${rate}+`}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Vendors Grid */}
        <div className="lg:col-span-3 space-y-6">
          {filteredVendors.length === 0 ? (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-12 text-center space-y-3">
              <p className="text-gray-400 font-bold text-base">No vendors found for the selected city and criteria.</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                Try selecting "All Cities" or broadening your category filter.
              </p>
              <button
                onClick={resetFilters}
                className="mt-2 px-4 py-2 bg-orange-600 text-white font-bold text-xs rounded-xl shadow-sm hover:bg-orange-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVendors.map((vendor) => (
                <VendorCard
                  key={vendor.id}
                  vendor={vendor}
                  highlightCategory={selectedCategory !== 'ALL' ? selectedCategory : undefined}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VendorsPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto p-12 text-center text-xs text-gray-400">Loading directory...</div>}>
      <VendorsContent />
    </Suspense>
  );
}
