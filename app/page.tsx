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
  Crown,
  FileText,
  Star,
  Lock,
  PhoneCall,
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
      title: `${eventTypeObj.name} Celebration in ${selectedCity === 'All Cities' ? 'Gujarat & Pan-India' : selectedCity}`,
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

  // Category imagery map
  const categoryImages: Record<string, string> = {
    'cat-venue': 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
    'cat-caterer': 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
    'cat-decor': 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    'cat-photo': 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80',
    'cat-dj': 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    'cat-makeup': 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
  };

  return (
    <div className="space-y-20 pb-24 bg-transparent text-gray-900 dark:text-gray-100 transition-colors">
      {/* Hero Section with Ambient Glowing Orbs */}
      <section className="relative overflow-hidden pt-12 pb-24 px-4 sm:px-6 lg:px-8 border-b border-gray-200/80 dark:border-zinc-800/80">
        {/* Ambient Glowing Orbs */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-orange-500/20 via-amber-500/15 to-red-500/20 blur-3xl pointer-events-none rounded-full animate-pulse-glow" />
        <div className="absolute top-40 right-10 w-[300px] h-[300px] bg-gradient-to-br from-amber-400/15 to-orange-600/10 blur-2xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto relative z-10 space-y-10">
          {/* Tagline & Headline */}
          <div className="text-center max-w-4xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100/80 dark:bg-orange-950/60 text-orange-900 dark:text-orange-300 text-xs font-black uppercase tracking-wider shadow-sm border border-orange-200 dark:border-orange-800/50 backdrop-blur-md animate-float-slow">
              <Crown className="w-4 h-4 text-amber-500" />
              <span>India&apos;s Premier Event &amp; Wedding Network • {selectedCity}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-gray-950 dark:text-white tracking-tight leading-[1.1]">
              Curate Royal Celebrations with{' '}
              <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-red-600 bg-clip-text text-transparent">
                India&apos;s Finest Artisans
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 dark:text-zinc-300 leading-relaxed max-w-2xl mx-auto">
              Compare verified venues, royal decorators, gourmet caterers, and cinematic photographers across Ahmedabad, Mumbai, Jaipur, Udaipur &amp; more. Book all in a single 100% escrow checkout with instant GST tax bills.
            </p>

            {/* Live Trust Badges Pill Bar */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-2 text-xs font-bold text-gray-700 dark:text-zinc-300">
              <span className="flex items-center gap-1.5 bg-white/80 dark:bg-zinc-800/80 px-3 py-1.5 rounded-full shadow-xs border border-gray-200/80 dark:border-zinc-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Escrow Protected</span>
              </span>
              <span className="flex items-center gap-1.5 bg-white/80 dark:bg-zinc-800/80 px-3 py-1.5 rounded-full shadow-xs border border-gray-200/80 dark:border-zinc-700">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>4.95+ Verified Rating</span>
              </span>
              <span className="flex items-center gap-1.5 bg-white/80 dark:bg-zinc-800/80 px-3 py-1.5 rounded-full shadow-xs border border-gray-200/80 dark:border-zinc-700">
                <CalendarCheck className="w-4 h-4 text-orange-600" />
                <span>Guaranteed Date-Lock</span>
              </span>
              <span className="flex items-center gap-1.5 bg-white/80 dark:bg-zinc-800/80 px-3 py-1.5 rounded-full shadow-xs border border-gray-200/80 dark:border-zinc-700">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>Instant GST Tax Invoices</span>
              </span>
            </div>
          </div>

          {/* Interactive Smart Search & Booking Box */}
          <div className="max-w-4xl mx-auto glass-panel rounded-3xl shadow-2xl p-5 sm:p-8 relative border border-white/20 dark:border-white/10">
            <form onSubmit={handleStartPlanning} className="space-y-6">
              {/* Event Type Tabs */}
              <div>
                <span className="text-[11px] font-bold text-gray-400 dark:text-zinc-400 uppercase tracking-wider block mb-2">
                  1. Select Event Type:
                </span>
                <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
                  {eventTypes.map((et) => {
                    const isSelected = selectedEventType === et.id;
                    return (
                      <button
                        type="button"
                        key={et.id}
                        onClick={() => setSelectedEventType(et.id)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                          isSelected
                            ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg shadow-orange-500/30 scale-105'
                            : 'bg-white/80 dark:bg-zinc-800/80 text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-700 border border-gray-200/80 dark:border-zinc-700'
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
              </div>

              {/* Event Parameters Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                {/* Date Picker */}
                <div className="bg-white/80 dark:bg-zinc-800/80 p-3.5 rounded-2xl border border-gray-200 dark:border-zinc-700">
                  <label className="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-orange-600" />
                    <span>Event Date</span>
                  </label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full text-xs font-bold bg-transparent text-gray-900 dark:text-white focus:outline-none"
                  />
                </div>

                {/* City Selector */}
                <div className="bg-white/80 dark:bg-zinc-800/80 p-3.5 rounded-2xl border border-gray-200 dark:border-zinc-700">
                  <label className="text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-orange-600" />
                    <span>Destination City</span>
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full text-xs font-bold bg-transparent text-gray-900 dark:text-white focus:outline-none cursor-pointer"
                  >
                    {cities.map((city) => (
                      <option key={city} value={city} className="dark:bg-zinc-900 text-gray-900 dark:text-white">
                        {city === 'All Cities' ? '📍 All Cities (Pan-India)' : city}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Guest Count */}
                <div className="bg-white/80 dark:bg-zinc-800/80 p-3.5 rounded-2xl border border-gray-200 dark:border-zinc-700">
                  <div className="flex justify-between items-center text-[10px] font-bold text-gray-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-orange-600" />
                      <span>Estimated Guests</span>
                    </span>
                    <span className="text-orange-600 dark:text-orange-400 font-extrabold text-xs">
                      {guestCount}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={50}
                    max={2500}
                    step={50}
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full accent-orange-600 cursor-pointer h-1.5 bg-gray-200 dark:bg-zinc-700 rounded-lg"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="text-xs text-gray-500 dark:text-zinc-400 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Only pay 30% advance to lock verified vendor dates.</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 hover:from-orange-700 hover:to-amber-700 text-white font-extrabold text-sm shadow-xl shadow-orange-500/25 flex items-center justify-center gap-2 active:scale-95 transition-all duration-300"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Build My Event Plan &amp; View Pricing</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Curated Luxury Categories Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-black text-orange-600 uppercase tracking-wider block">
              Curated Artisans
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-950 dark:text-white mt-1">
              Explore Event Categories
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400 mt-1">
              Handpicked, verified specialists with proven track records across {selectedCity}.
            </p>
          </div>

          <Link
            href="/vendors"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors group"
          >
            <span>Browse Full Directory</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/vendors?category=${category.id}`}
              className="luxury-card group relative rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border border-gray-200/90 dark:border-zinc-800 shadow-sm flex flex-col justify-end p-4 h-56 transition-all"
            >
              <img
                src={categoryImages[category.id] || 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=80'}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-115 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-black/95 transition-all duration-300" />

              <div className="relative z-10 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded-md inline-block">
                  Verified
                </span>
                <h3 className="font-extrabold text-sm text-white leading-tight group-hover:text-orange-300 transition-colors">
                  {category.name}
                </h3>
                <p className="text-[10px] text-gray-300 font-medium">
                  {vendors.filter((v) => v.category_ids.includes(category.id)).length || 12}+ Verified Artisans
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4-Step Milestone Journey (How it Works) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-orange-50/70 via-white to-amber-50/50 dark:from-zinc-900/90 dark:via-zinc-950 dark:to-zinc-900/80 rounded-3xl border border-orange-200/80 dark:border-zinc-800 p-8 sm:p-12 shadow-xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black text-orange-600 uppercase tracking-wider">
              Seamless Experience
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-950 dark:text-white">
              How Utsav Marketplace Works
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400">
              No multiple negotiations. No fear of vendor date conflicts or advance loss.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Step 1 */}
            <div className="bg-white dark:bg-zinc-800/80 p-6 rounded-2xl border border-gray-200/80 dark:border-zinc-700/80 shadow-sm space-y-3 relative group hover:-translate-y-1 transition-all">
              <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/70 text-orange-600 font-black text-sm flex items-center justify-center">
                01
              </div>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">Choose City &amp; Date</h3>
              <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed">
                Specify your event type, guest count, and city from Ahmedabad to Pan-India.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white dark:bg-zinc-800/80 p-6 rounded-2xl border border-gray-200/80 dark:border-zinc-700/80 shadow-sm space-y-3 relative group hover:-translate-y-1 transition-all">
              <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/70 text-orange-600 font-black text-sm flex items-center justify-center">
                02
              </div>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">Curate Multi-Vendor Cart</h3>
              <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed">
                Compare verified party plots, decorators, caterers &amp; DJs side-by-side with transparent rates.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white dark:bg-zinc-800/80 p-6 rounded-2xl border border-gray-200/80 dark:border-zinc-700/80 shadow-sm space-y-3 relative group hover:-translate-y-1 transition-all">
              <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/70 text-orange-600 font-black text-sm flex items-center justify-center">
                03
              </div>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">30% Escrow Single Checkout</h3>
              <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed">
                Pay only 30% advance held safely in platform escrow. Calendars lock immediately.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white dark:bg-zinc-800/80 p-6 rounded-2xl border border-gray-200/80 dark:border-zinc-700/80 shadow-sm space-y-3 relative group hover:-translate-y-1 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 font-black text-sm flex items-center justify-center">
                04
              </div>
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">Celebrate &amp; Get Tax Bill</h3>
              <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed">
                Enjoy your seamless event and download your official GST Tax Invoice Bill instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Verified Artisans Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-black text-orange-600 uppercase tracking-wider block">
              Handpicked Profiles
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-950 dark:text-white mt-1">
              Top Verified Vendors in {selectedCity}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400 mt-1">
              Each vendor has completed 4-layer KYC with Aadhaar, PAN, and verified location audits.
            </p>
          </div>

          <Link
            href="/vendors"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-200 font-bold text-xs border border-gray-200 dark:border-zinc-700 hover:border-orange-500 shadow-sm transition-all"
          >
            <span>View All {vendors.length} Vendors</span>
            <ArrowRight className="w-3.5 h-3.5 text-orange-600" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredVendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      </section>

      {/* Royal Weddings & Client Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 shadow-xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="flex justify-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400" />
              ))}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-950 dark:text-white">
              Trusted by 5,000+ Families Across India
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400">
              Verified stories of seamless wedding and corporate celebrations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/80 dark:bg-zinc-800/80 p-6 rounded-2xl border border-gray-200 dark:border-zinc-700 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-gray-900 dark:text-white">Parth &amp; Ananya</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full">
                  Verified Booking
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-zinc-300 leading-relaxed italic">
                &ldquo;Booking our wedding party plot on SG Highway, caterer, and cinema team in a single checkout gave us 100% peace of mind. The escrow protection and automatic invoice bill were fantastic.&rdquo;
              </p>
              <div className="text-[11px] text-gray-400 font-medium">Ahmedabad • Grand Wedding (800 Guests)</div>
            </div>

            <div className="bg-white/80 dark:bg-zinc-800/80 p-6 rounded-2xl border border-gray-200 dark:border-zinc-700 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-gray-900 dark:text-white">Kavita Singhal</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full">
                  Verified Booking
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-zinc-300 leading-relaxed italic">
                &ldquo;Our corporate annual gala in Mumbai needed verified sound, lights, and banquet arrangements. The platform delivered flawless coordination with official GST tax bills.&rdquo;
              </p>
              <div className="text-[11px] text-gray-400 font-medium">Mumbai • Corporate Gala (450 Guests)</div>
            </div>

            <div className="bg-white/80 dark:bg-zinc-800/80 p-6 rounded-2xl border border-gray-200 dark:border-zinc-700 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-gray-900 dark:text-white">Rohan &amp; Meera</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full">
                  Verified Booking
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-zinc-300 leading-relaxed italic">
                &ldquo;Destination wedding in Udaipur made super easy. The 30% advance escrow meant zero risk of vendor cancellation. Truly world-class platform!&rdquo;
              </p>
              <div className="text-[11px] text-gray-400 font-medium">Udaipur • Destination Wedding (350 Guests)</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Layer Fraud Prevention Shield (Section 8) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-gray-950 via-zinc-900 to-black text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden space-y-8">
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Section 8: 4-Layer Trust &amp; Fraud Shield</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              Zero Vendor Scams. Guaranteed Escrow Safety.
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Every vendor on Utsav Marketplace is physically and legally verified before receiving a single booking.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-2">
              <span className="text-xs font-black text-amber-400 uppercase tracking-wider block">Layer 1</span>
              <h3 className="font-bold text-sm text-white">Govt KYC Verified</h3>
              <p className="text-xs text-gray-400">Aadhaar, PAN &amp; GSTIN cross-verified against official registries.</p>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-2">
              <span className="text-xs font-black text-amber-400 uppercase tracking-wider block">Layer 2</span>
              <h3 className="font-bold text-sm text-white">Physical Location Audit</h3>
              <p className="text-xs text-gray-400">Ground verification of party plots, studios, and commercial kitchens.</p>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-2">
              <span className="text-xs font-black text-amber-400 uppercase tracking-wider block">Layer 3</span>
              <h3 className="font-bold text-sm text-white">Escrow Hold Protection</h3>
              <p className="text-xs text-gray-400">Client advance held safely in escrow until 3 days post-event completion.</p>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-2">
              <span className="text-xs font-black text-amber-400 uppercase tracking-wider block">Layer 4</span>
              <h3 className="font-bold text-sm text-white">Anti-Circumvention Shield</h3>
              <p className="text-xs text-gray-400">Real-time regex filters guard against offline unverified cash transactions.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
