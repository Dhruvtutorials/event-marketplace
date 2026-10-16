'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMarketplace } from '@/lib/store';
import { formatINR } from '@/lib/utils';
import {
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  CheckCircle2,
  Calendar,
  Sparkles,
  Phone,
  FileCheck,
  Plus,
  Check,
  Building,
  CreditCard,
  AlertCircle,
  ChevronLeft,
} from 'lucide-react';

export default function VendorDetailPage() {
  const params = useParams();
  const router = useRouter();
  const vendorId = params.id as string;

  const { getVendorById, categories, clientEvent, addVendorToPlan } = useMarketplace();
  const vendor = getVendorById(vendorId);

  // Active Service and Package selection state
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    vendor?.services[0]?.id || ''
  );
  const activeService = vendor?.services.find((s) => s.id === selectedServiceId) || vendor?.services[0];
  const [selectedPackageId, setSelectedPackageId] = useState<string>(
    activeService?.packages[0]?.id || ''
  );
  const activePackage = activeService?.packages.find((p) => p.id === selectedPackageId) || activeService?.packages[0];

  // Selected add-ons
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!vendor) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Vendor Not Found</h2>
        <p className="text-xs text-gray-500">The requested vendor profile does not exist or has been removed.</p>
        <Link href="/vendors" className="inline-block px-4 py-2 bg-orange-600 text-white rounded-xl text-xs font-bold">
          Back to Directory
        </Link>
      </div>
    );
  }

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const calculatedAddons = activeService?.addons.filter((a) => selectedAddons.includes(a.id)) || [];
  const addonsTotal = calculatedAddons.reduce((sum, a) => sum + a.price, 0);
  const basePackagePrice = activePackage?.price || vendor.min_price;
  const totalPrice = basePackagePrice + addonsTotal;
  const advancePayable = Math.round(totalPrice * 0.3); // 30% advance

  const handleAddToPlan = () => {
    if (!activeService || !activePackage) return;
    addVendorToPlan(activeService.category_id, vendor, activePackage.id, calculatedAddons);
    setAddedSuccess(true);
    setTimeout(() => {
      router.push(`/events/${clientEvent.id}`);
    }, 900);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/vendors"
          className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-orange-600 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Ahmedabad Vendors</span>
        </Link>
      </div>

      {/* Hero Header with Gallery & KYC Badges */}
      <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="relative h-72 sm:h-96 w-full">
          <img
            src={vendor.cover_image}
            alt={vendor.business_name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Badges on Cover */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {vendor.verified_badge && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-md">
                <ShieldCheck className="w-4 h-4" />
                Verified &amp; Inspected
              </span>
            )}
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-black/60 text-amber-300 backdrop-blur-md">
              Trust Score: {vendor.trust_score}/100
            </span>
          </div>

          {/* Business Info on Cover */}
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <div className="flex flex-wrap items-center gap-3 text-xs text-orange-200">
              <span className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-lg">
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                {vendor.locality}, {vendor.city}
              </span>
              <span className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-lg">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                {vendor.rating.toFixed(2)} ({vendor.review_count} Verified Bookings)
              </span>
              <span className="bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-lg">
                Response Speed: {vendor.response_rate}%
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {vendor.business_name}
            </h1>
            <p className="text-xs sm:text-sm text-gray-200 max-w-2xl">
              Owner: <strong>{vendor.owner_name}</strong> • Registered Vendor in Ahmedabad
            </p>
          </div>
        </div>

        {/* Gallery Thumbnails */}
        {vendor.gallery && vendor.gallery.length > 0 && (
          <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-3 overflow-x-auto">
            {vendor.gallery.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="Portfolio photo"
                className="w-24 h-16 object-cover rounded-xl border border-gray-200 shadow-xs shrink-0"
              />
            ))}
          </div>
        )}
      </div>

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Details & Packages */}
        <div className="lg:col-span-2 space-y-8">
          {/* About Section */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-gray-950 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-600" />
              About Business &amp; Infrastructure
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {vendor.description}
            </p>

            <div className="pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="flex items-start gap-2">
                <Building className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-gray-800 block">Address:</span>
                  <span className="text-gray-500">{vendor.address}</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <FileCheck className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold text-gray-800 block">KYC &amp; Compliance:</span>
                  <span className="text-gray-500">
                    GST: {vendor.gst_no ? 'Verified' : 'Exempt'} • Penny-Drop Bank Verified
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Packages Selector */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                  Transparent Pricing
                </span>
                <h3 className="text-lg font-bold text-gray-950">Select Package</h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-orange-50 text-orange-700 rounded-lg">
                No Hidden Charges
              </span>
            </div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeService?.packages.map((pkg) => {
                const isSelected = selectedPackageId === pkg.id;
                return (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPackageId(pkg.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-orange-600 bg-orange-50/40 ring-2 ring-orange-500/20 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-bold text-sm text-gray-900">{pkg.name}</h4>
                      {isSelected && (
                        <span className="w-5 h-5 rounded-full bg-orange-600 text-white flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3" />
                        </span>
                      )}
                    </div>

                    <div className="text-lg font-extrabold text-gray-950 mb-3">
                      {formatINR(pkg.price)}
                    </div>

                    <div className="space-y-1.5 text-xs text-gray-600">
                      <span className="text-[11px] font-bold text-gray-400 block uppercase">Inclusions:</span>
                      {pkg.inclusions.map((inc, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add-ons Selector */}
            {activeService?.addons && activeService.addons.length > 0 && (
              <div className="pt-6 border-t border-gray-100 space-y-3">
                <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Optional Add-Ons (Customise Your Order)
                </h4>
                <div className="space-y-2">
                  {activeService.addons.map((addon) => {
                    const isChecked = selectedAddons.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                          isChecked
                            ? 'border-orange-500 bg-orange-50/30'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="w-4 h-4 text-orange-600 rounded border-gray-300"
                          />
                          <span className="font-semibold text-gray-800">{addon.name}</span>
                        </div>
                        <span className="font-bold text-gray-900">+{formatINR(addon.price)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Sticky Column: Booking Summary & Date Lock Action */}
        <div className="space-y-6">
          <div className="sticky top-24 bg-white rounded-3xl border border-gray-200 p-6 shadow-lg space-y-6">
            <div>
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                Event Date Reservation
              </span>
              <h3 className="text-lg font-bold text-gray-950 mt-1">Book for Your Event</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Target Date: <strong>{clientEvent.event_date}</strong> in {clientEvent.locality || 'Ahmedabad'}
              </p>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2.5 py-4 border-y border-gray-100 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>{activePackage?.name || 'Selected Package'}</span>
                <span className="font-semibold text-gray-900">{formatINR(basePackagePrice)}</span>
              </div>

              {calculatedAddons.map((a) => (
                <div key={a.id} className="flex justify-between text-gray-600">
                  <span>+ {a.name}</span>
                  <span className="font-semibold text-gray-900">{formatINR(a.price)}</span>
                </div>
              ))}

              <div className="flex justify-between text-sm font-bold text-gray-950 pt-2 border-t border-gray-100">
                <span>Total Estimated Cost</span>
                <span className="text-orange-600">{formatINR(totalPrice)}</span>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 mt-2">
                <div className="flex justify-between text-xs font-bold text-orange-950">
                  <span>30% Advance (At Checkout):</span>
                  <span>{formatINR(advancePayable)}</span>
                </div>
                <p className="text-[11px] text-orange-800 mt-1">
                  Remaining {formatINR(totalPrice - advancePayable)} will be paid after event delivery.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={handleAddToPlan}
                disabled={addedSuccess}
                className={`w-full py-3 px-4 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 ${
                  addedSuccess
                    ? 'bg-emerald-600 text-white'
                    : 'bg-orange-600 hover:bg-orange-700 text-white shadow-orange-500/30'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Event Plan!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Add to My Event Plan</span>
                  </>
                )}
              </button>

              <Link
                href={`/events/${clientEvent.id}`}
                className="w-full block text-center py-2.5 px-4 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold text-xs transition-colors"
              >
                View Full Event Plan ({clientEvent.plan_items.length} items)
              </Link>
            </div>

            {/* Date Lock Guarantee */}
            <div className="pt-2 text-[11px] text-gray-500 space-y-2 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Date Lock: Prevents double booking</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Escrow Held: Payout released post-event</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
