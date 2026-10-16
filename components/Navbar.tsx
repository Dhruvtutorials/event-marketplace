'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMarketplace } from '@/lib/store';
import {
  Sparkles,
  ShoppingBag,
  ShieldCheck,
  Store,
  UserCheck,
  MapPin,
  Sun,
  Moon,
  ChevronDown,
  Crown,
  FileText,
} from 'lucide-react';
import { formatINR } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const {
    currentRole,
    setCurrentRole,
    clientEvent,
    theme,
    toggleTheme,
    selectedCity,
    setSelectedCity,
    cities,
    invoices,
  } = useMarketplace();

  const totalPlanAmount = clientEvent.plan_items.reduce((sum, item) => sum + item.price, 0);
  const itemsCount = clientEvent.plan_items.length;

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* Top Banner with Pan-India Coverage */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-red-600 text-white text-[11px] font-semibold py-1 px-4 shadow-sm animate-gradient-shift">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider">
              <Crown className="w-3 h-3 text-amber-200" />
              <span>Pan-India Luxury Network</span>
            </span>
            <span className="hidden md:inline text-white/90">
              Verified Event Artisans in Ahmedabad, Surat, Vadodara, Rajkot, Mumbai, Jaipur, Udaipur &amp; more!
            </span>
          </div>

          <div className="flex items-center gap-3 text-white/90 text-[10px] sm:text-[11px]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>100% Escrow Protected</span>
            </span>
            <span>•</span>
            <span className="hidden sm:inline">Guaranteed Date-Lock</span>
          </div>
        </div>
      </div>

      {/* Main Glass Navbar */}
      <div className="glass-panel border-b border-gray-200/80 dark:border-zinc-800/80 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3">
            {/* Left: Brand Logo & City Selector */}
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2.5 group shrink-0">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 via-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/25 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <span className="text-xl font-black tracking-tight bg-gradient-to-r from-orange-600 via-amber-600 to-red-600 bg-clip-text text-transparent group-hover:opacity-95">
                    Utsav
                  </span>
                  <span className="block text-[9px] font-extrabold text-gray-500 dark:text-zinc-400 uppercase tracking-widest -mt-1">
                    Luxury Marketplace
                  </span>
                </div>
              </Link>

              {/* Global City Selector */}
              <div className="relative flex items-center bg-gray-100/90 dark:bg-zinc-800/90 rounded-2xl px-3 py-1.5 border border-gray-200 dark:border-zinc-700/80 text-xs shadow-inner">
                <MapPin className="w-3.5 h-3.5 text-orange-600 mr-1.5 shrink-0" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="bg-transparent text-gray-800 dark:text-zinc-100 font-bold focus:outline-none cursor-pointer pr-1 text-xs"
                  title="Select City"
                >
                  {cities.map((city) => (
                    <option key={city} value={city} className="dark:bg-zinc-900 text-gray-900 dark:text-zinc-100">
                      {city === 'All Cities' ? '📍 All Cities' : city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Navigation links */}
              <nav className="hidden lg:flex items-center gap-1 text-xs font-bold">
                <Link
                  href="/vendors"
                  className={`px-3 py-2 rounded-xl transition-all duration-200 ${
                    pathname === '/vendors'
                      ? 'text-orange-600 bg-orange-50 dark:bg-orange-950/40 shadow-xs'
                      : 'text-gray-700 dark:text-zinc-300 hover:text-orange-600 hover:bg-gray-100/80 dark:hover:bg-zinc-800/60'
                  }`}
                >
                  Find Vendors
                </Link>
                <Link
                  href="/events/new"
                  className={`px-3 py-2 rounded-xl transition-all duration-200 ${
                    pathname.startsWith('/events')
                      ? 'text-orange-600 bg-orange-50 dark:bg-orange-950/40 shadow-xs'
                      : 'text-gray-700 dark:text-zinc-300 hover:text-orange-600 hover:bg-gray-100/80 dark:hover:bg-zinc-800/60'
                  }`}
                >
                  Plan My Event
                </Link>
                <Link
                  href="/pricing"
                  className={`px-3 py-2 rounded-xl transition-all duration-200 ${
                    pathname === '/pricing'
                      ? 'text-orange-600 bg-orange-50 dark:bg-orange-950/40 shadow-xs'
                      : 'text-gray-700 dark:text-zinc-300 hover:text-orange-600 hover:bg-gray-100/80 dark:hover:bg-zinc-800/60'
                  }`}
                >
                  Vendor Pricing
                </Link>
              </nav>
            </div>

            {/* Right actions: White/Dark Button + Cart + Persona + Dashboard */}
            <div className="flex items-center gap-2.5">
              {/* White / Dark Mode Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-2xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-200 hover:border-orange-400 dark:hover:border-orange-500 shadow-sm transition-all duration-300 hover:scale-105 flex items-center gap-1.5"
                title={theme === 'dark' ? 'Switch to White (Light) Mode' : 'Switch to Dark Mode'}
                aria-label="Toggle White or Dark theme"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
                    <span className="hidden sm:inline text-xs font-bold text-amber-400">White</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-gray-800" />
                    <span className="hidden sm:inline text-xs font-bold text-gray-800">Dark</span>
                  </>
                )}
              </button>

              {/* Event Plan Cart Pill */}
              <Link
                href={`/events/${clientEvent.id}`}
                className="relative flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-900/60 transition-all duration-300 shadow-sm hover:scale-105"
              >
                <div className="relative">
                  <ShoppingBag className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                  {itemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-orange-600 animate-ping" />
                  )}
                </div>
                <div className="text-left text-xs leading-tight">
                  <span className="font-bold block text-[11px]">{itemsCount} Services</span>
                  <span className="text-[10px] font-extrabold text-orange-900 dark:text-orange-200">
                    {formatINR(totalPlanAmount)}
                  </span>
                </div>
              </Link>

              {/* Live Interactive Persona Switcher */}
              <div className="hidden sm:flex items-center bg-gray-100 dark:bg-zinc-800/90 p-1 rounded-2xl border border-gray-200 dark:border-zinc-700/80 text-xs">
                <button
                  onClick={() => setCurrentRole('CLIENT')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs transition-all ${
                    currentRole === 'CLIENT'
                      ? 'bg-white dark:bg-zinc-900 text-orange-600 font-bold shadow-xs'
                      : 'text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                  title="Client mode"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Client</span>
                </button>

                <button
                  onClick={() => setCurrentRole('VENDOR')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs transition-all ${
                    currentRole === 'VENDOR'
                      ? 'bg-white dark:bg-zinc-900 text-orange-600 font-bold shadow-xs'
                      : 'text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                  title="Vendor mode"
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>Vendor</span>
                </button>

                <button
                  onClick={() => setCurrentRole('ADMIN')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs transition-all ${
                    currentRole === 'ADMIN'
                      ? 'bg-white dark:bg-zinc-900 text-purple-600 dark:text-purple-400 font-bold shadow-xs'
                      : 'text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                  title="Admin mode"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin</span>
                </button>
              </div>

              {/* Direct Dashboard Link */}
              <Link
                href={
                  currentRole === 'CLIENT'
                    ? '/dashboard/client'
                    : currentRole === 'VENDOR'
                    ? '/dashboard/vendor'
                    : '/dashboard/admin'
                }
                className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 dark:from-orange-600 dark:to-amber-600 text-white shadow-md hover:shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all"
              >
                <span>Dashboard</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
