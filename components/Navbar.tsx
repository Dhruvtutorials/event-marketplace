'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMarketplace } from '@/lib/store';
import {
  Sparkles,
  ShoppingBag,
  CalendarCheck,
  ShieldCheck,
  Store,
  UserCheck,
  MapPin,
  Sun,
  Moon,
  ChevronDown,
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
  } = useMarketplace();

  const totalPlanAmount = clientEvent.plan_items.reduce((sum, item) => sum + item.price, 0);
  const itemsCount = clientEvent.plan_items.length;

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-200">
      {/* Top Banner with Pan-India & Gujarat Coverage */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-red-600 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium">
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase">
              Multi-City Network 🪔
            </span>
            <span className="hidden sm:inline">
              Verified Event Marketplace across Ahmedabad, Surat, Vadodara, Rajkot, Mumbai, Jaipur, Udaipur &amp; more!
            </span>
            <span className="sm:hidden">
              Verified Event Marketplace across All Cities
            </span>
          </div>
          <div className="flex items-center gap-4 text-orange-100 text-[11px]">
            <span>100% Date-Lock Guarantee</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">Escrow Protected Advance</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Left: Logo & City Dropdown */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Utsav
                </span>
                <span className="block text-[10px] text-gray-500 dark:text-gray-400 font-semibold tracking-wider uppercase -mt-1">
                  Event Marketplace
                </span>
              </div>
            </Link>

            {/* Global City Selector */}
            <div className="relative flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl px-2.5 py-1.5 border border-gray-200 dark:border-gray-700 text-xs">
              <MapPin className="w-3.5 h-3.5 text-orange-600 mr-1.5 shrink-0" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-transparent text-gray-800 dark:text-gray-100 font-semibold focus:outline-none cursor-pointer pr-1"
                title="Select City"
              >
                {cities.map((city) => (
                  <option key={city} value={city} className="dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                    {city === 'All Cities' ? '📍 All Cities' : city}
                  </option>
                ))}
              </select>
            </div>

            {/* Navigation links */}
            <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
              <Link
                href="/vendors"
                className={`px-3 py-2 rounded-lg transition-colors ${
                  pathname === '/vendors'
                    ? 'text-orange-600 bg-orange-50 dark:bg-orange-950/40'
                    : 'text-gray-700 dark:text-gray-300 hover:text-orange-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                Find Vendors
              </Link>
              <Link
                href="/events/new"
                className={`px-3 py-2 rounded-lg transition-colors ${
                  pathname.startsWith('/events')
                    ? 'text-orange-600 bg-orange-50 dark:bg-orange-950/40'
                    : 'text-gray-700 dark:text-gray-300 hover:text-orange-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                Plan My Event
              </Link>
              <Link
                href="/pricing"
                className={`px-3 py-2 rounded-lg transition-colors ${
                  pathname === '/pricing'
                    ? 'text-orange-600 bg-orange-50 dark:bg-orange-950/40'
                    : 'text-gray-700 dark:text-gray-300 hover:text-orange-600 hover:bg-gray-50 dark:hover:bg-gray-800'
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
              className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-2xs flex items-center gap-1.5"
              title={theme === 'dark' ? 'Switch to White (Light) Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle White or Dark theme"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline text-xs font-semibold">White</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-gray-700" />
                  <span className="hidden sm:inline text-xs font-semibold">Dark</span>
                </>
              )}
            </button>

            {/* Event Plan Cart Pill */}
            <Link
              href={`/events/${clientEvent.id}`}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/50 text-orange-700 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-colors shadow-2xs"
            >
              <ShoppingBag className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <div className="text-left text-xs leading-tight">
                <span className="font-semibold block">{itemsCount} Services</span>
                <span className="text-[11px] font-bold text-orange-900 dark:text-orange-200">
                  {formatINR(totalPlanAmount)}
                </span>
              </div>
            </Link>

            {/* Live Interactive Persona / Role Switcher for Pair Testing */}
            <div className="hidden sm:flex items-center bg-gray-100 dark:bg-gray-800 p-1 rounded-xl border border-gray-200 dark:border-gray-700 text-xs">
              <button
                onClick={() => setCurrentRole('CLIENT')}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-medium transition-all ${
                  currentRole === 'CLIENT'
                    ? 'bg-white dark:bg-gray-900 text-orange-600 shadow-xs font-semibold'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
                title="Client mode"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Client</span>
              </button>

              <button
                onClick={() => setCurrentRole('VENDOR')}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-medium transition-all ${
                  currentRole === 'VENDOR'
                    ? 'bg-white dark:bg-gray-900 text-orange-600 shadow-xs font-semibold'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
                title="Vendor mode"
              >
                <Store className="w-3.5 h-3.5" />
                <span>Vendor</span>
              </button>

              <button
                onClick={() => setCurrentRole('ADMIN')}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-medium transition-all ${
                  currentRole === 'ADMIN'
                    ? 'bg-white dark:bg-gray-900 text-purple-600 dark:text-purple-400 shadow-xs font-semibold'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
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
              className="flex items-center gap-1 text-xs font-semibold px-3 py-2 rounded-lg bg-gray-900 dark:bg-orange-600 text-white hover:bg-black dark:hover:bg-orange-700 transition-colors"
            >
              <span>Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
