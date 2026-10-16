'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMarketplace } from '@/lib/store';
import { VendorCard } from '@/components/VendorCard';
import {
  Sparkles,
  Search,
  Calendar,
  Users,
  MapPin,
  ShieldCheck,
  CreditCard,
  CalendarCheck,
  ArrowRight,
  HeartHandshake,
  CheckCircle,
  Building2,
  Utensils,
  Camera,
  Music,
  Award,
  ChevronRight,
  Flame,
  Cake,
  Briefcase,
} from 'lucide-react';
import { formatINR } from '@/lib/utils';

export default function HomePage() {
  const router = useRouter();
  const {
    eventTypes,
    categories,
    vendors,
    createOrUpdateEvent,
    clientEvent,
    selectedCity,
    setSelectedCity,
    cities,
  } = useMarketplace();

  // Search state
  const [selectedEventType, setSelectedEventType] = useState(eventTypes[0]?.id || 'evt-wedding');
  const [eventDate, setEventDate] = useState('2026-11-28');
  const [guestCount, setGuestCount] = useState(400);

  const handleStartPlanning = (e: React.FormEvent) => {
    e.preventDefault();
    const eventTypeObj = eventTypes.find((e) => e.id === selectedEventType) || eventTypes[0];

    createOrUpdateEvent({
      event_type_id: eventTypeObj.id,
      event_type_name: eventTypeObj.name,
      event_date: eventDate,
      city: selectedCity === 'All Cities' ? 'Ahmedabad' : selectedCity,
      guest_count: guestCount,
      title: `${eventTypeObj.name} in ${selectedCity === 'All Cities' ? 'Gujarat & Pan-India' : selectedCity}`,
    });

    router.push(`/events/${clientEvent.id}`);
  };

  // Filter featured vendors by city if specific city selected
  const featuredVendors = vendors
    .filter((v) => {
      if (v.status !== 'ACTIVE') return false;
      if (selectedCity !== 'All Cities' && v.city.toLowerCase() !== selectedCity.toLowerCase()) {
        return false;
      }
      return true;
    })
    .slice(0, 6);

  return (
    <div className="space-y-16 pb-20 bg-transparent text-gray-900 dark:text-gray-100 transition-colors">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-50/80 via-white to-gray-50 dark:from-gray-900/80 dark:via-gray-950 dark:to-gray-900 pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto">
          {/* Tagline */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950/50 text-orange-800 dark:text-orange-300 text-xs font-bold uppercase tracking-wider shadow-xs border border-orange-200 dark:border-orange-800/40">
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span>Multi-City Verified Event Network • {selectedCity}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-950 dark:text-white tracking-tight leading-tight">
              Ek Jagah Par Pura Utsav Plan &amp; Book Karein
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Ahmedabad, Surat, Vadodara, Rajkot, Mumbai, Udaipur, Jaipur aur All Cities me verified venues, authentic caterers, decorators, aur photographers ko compare karein aur ek hi single checkout me book karein.
            </p>
          </div>

          {/* Smart Search & Filter Box */}
          <div className="mt-10 max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-200/80 dark:border-gray-800 p-4 sm:p-6 backdrop-blur-md">
            <form onSubmit={handleStartPlanning} className="space-y-4">
              {/* Event Type Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {eventTypes.map((et) => {
                  const isSelected = selectedEventType === et.id;
                  return (
                    <button
                      type="button"
                      key={et.id}
                      onClick={() => setSelectedEventType(et.id)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                        isSelected
                          ? 'bg-orange-600 text-white shadow-md shadow-orange-500/20'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {et.slug === 'wedding' && <HeartHandshake className="w-4 h-4" />}
                      {et.slug === 'garba' && <Flame className="w-4 h-4" />}
                      {et.slug === 'birthday' && <Cake className="w-4 h-4" />}
                      {et.slug === 'corporate' && <Briefcase className="w-4 h-4" />}
                      <span>{et.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Input Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                {/* City Selector */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-orange-600" />
                    City Selection
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  >
                    {cities.map((c) => (
                      <option key={c} value={c}>
                        {c === 'All Cities' ? '📍 All Cities (India & Gujarat)' : c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Event Date */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-orange-600" />
                    Event Date
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>

                {/* Guest Count */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-orange-600" />
                    Estimated Guests
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full text-xs font-semibold px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  >
                    <option value="150">100 - 200 Guests (Intimate)</option>
                    <option value="400">300 - 500 Guests (Standard)</option>
                    <option value="800">600 - 1,000 Guests (Grand)</option>
                    <option value="1500">1,200+ Guests (Royal / Garba)</option>
                  </select>
                </div>

                {/* Submit Action */}
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-md shadow-orange-500/30 flex items-center justify-center gap-2 transition-transform active:scale-95"
                  >
                    <span>Generate Checklist</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Key Value Props Pill Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-600 dark:text-gray-400 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              Verified Vendors across All Cities
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              100% Anti-Double-Booking Date Lock
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              30% Advance Escrow Payment Protection
            </span>
          </div>
        </div>
      </section>

      {/* How it works: 4-Step Client Journey */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
            Simple 4-Step Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
            Kaise Kaam Karta Hai Utsav Marketplace?
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-2">
            No endless phone calls or bargaining confusion. Transparent pricing with instant multi-vendor booking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 relative group hover:border-orange-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400 font-extrabold flex items-center justify-center mb-4">
              1
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">Select Event &amp; City</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Wedding, Garba, Birthday ya Corporate. Sheher chunein aur required categories auto-map ho jayengi.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 relative group hover:border-orange-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400 font-extrabold flex items-center justify-center mb-4">
              2
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">Smart Checklist</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Har required service (Venue, Caterer, Decor, DJ) ke verified vendors ko compare karein.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 relative group hover:border-orange-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400 font-extrabold flex items-center justify-center mb-4">
              3
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">Build Multi-Vendor Plan</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Selected packages ko "My Plan" me add karein aur live budget tracker se cost monitor karein.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 relative group hover:border-orange-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400 font-extrabold flex items-center justify-center mb-4">
              4
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">Single 30% Checkout</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Ek hi checkout me sabhi vendors book. Paisa escrow me surakshit, dates turant locked.
            </p>
          </div>
        </div>
      </section>

      {/* Verified Vendors Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
              Curated Supply
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
              Top Verified Vendors {selectedCity !== 'All Cities' ? `in ${selectedCity}` : 'Across Cities'}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              FSSAI-licensed caterers, sanctioned party plots, luxury banquets, and vetted wedding artists.
            </p>
          </div>
          <Link
            href="/vendors"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700"
          >
            <span>View All Vendors ({vendors.length})</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredVendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      </section>

      {/* Section 8: 4-Layer Fraud Prevention */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-950 dark:from-black dark:to-gray-950 text-white py-16 px-4 sm:px-6 lg:px-8 rounded-3xl max-w-7xl mx-auto shadow-2xl border border-gray-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-3 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Section 8: 3+1 Layers Fraud Control Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Aapka Event Hamari Zimmedari: Zero Fake Vendors
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 max-w-2xl mx-auto">
              Har sheher me platform par listing live hone se pehle vendor ko 4-tier verification clear karna hota hai.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800/60 border border-gray-700 p-5 rounded-2xl">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                  L1
                </span>
                <h4 className="font-bold text-white text-sm">Strict Entry Onboarding</h4>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                OTP verification, PAN / Aadhaar KYC, GST/Udyam check, and Penny-drop bank verification match. Caterers require mandatory FSSAI, venues require property sanad.
              </p>
            </div>

            <div className="bg-gray-800/60 border border-gray-700 p-5 rounded-2xl">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                  L2
                </span>
                <h4 className="font-bold text-white text-sm">Category Lock Control</h4>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Free-text category banned. Vendors only listed in admin-approved categories after physical proof review. Prevents misleading service claims.
              </p>
            </div>

            <div className="bg-gray-800/60 border border-gray-700 p-5 rounded-2xl">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                  L3
                </span>
                <h4 className="font-bold text-white text-sm">Live Monitoring & Trust Score</h4>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Automated Trust Score (0–100) based on response speed, cancellations, verified reviews (sirf paid booking ke baad allowed), and duplicate image detection.
              </p>
            </div>

            <div className="bg-gray-800/60 border border-gray-700 p-5 rounded-2xl">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-7 h-7 rounded-lg bg-red-600 text-white font-bold flex items-center justify-center text-xs">
                  L4
                </span>
                <h4 className="font-bold text-white text-sm">Anti-Leak & Action Policy</h4>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Rule 8 Chat masking protects against off-platform scams. Fraud vendors permanently banned and bank accounts blacklisted with zero subscription refund.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vendor CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-200">
              For Event Vendors Across All Cities
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold">
              Kya aap Party Plot, Banquet Hall, Caterer ya Photographer hain?
            </h3>
            <p className="text-xs sm:text-sm text-orange-100">
              Utsav Marketplace par apni business listing live karein. Pehli 3 bookings zero platform commission ke saath!
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/vendor/register"
              className="px-6 py-3 rounded-xl bg-white text-orange-700 font-bold text-xs hover:bg-orange-50 transition-colors shadow-md text-center"
            >
              Register Your Business
            </Link>
            <Link
              href="/pricing"
              className="px-6 py-3 rounded-xl bg-orange-700/80 border border-orange-400 text-white font-bold text-xs hover:bg-orange-800 transition-colors text-center"
            >
              View Subscription Plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
