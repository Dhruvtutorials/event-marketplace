'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
  Menu,
  X,
  ArrowRight,
} from 'lucide-react';
import { formatINR } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
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

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalPlanAmount = clientEvent.plan_items.reduce((sum, item) => sum + item.price, 0);
  const itemsCount = clientEvent.plan_items.length;

  const handleRoleSelect = (role: 'CLIENT' | 'VENDOR' | 'ADMIN') => {
    setCurrentRole(role);
    setMobileMenuOpen(false);
    if (role === 'CLIENT') {
      router.push('/dashboard/client');
    } else if (role === 'VENDOR') {
      router.push('/dashboard/vendor');
    } else if (role === 'ADMIN') {
      router.push('/dashboard/admin');
    }
  };

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* Top Banner with Pan-India Coverage */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-red-600 text-white text-[11px] font-semibold py-1.5 px-4 shadow-xs animate-gradient-shift">
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
      <div className="glass-panel border-b border-gray-200/80 dark:border-zinc-800/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3">
            {/* Left: Brand Logo & City Selector */}
            <div className="flex items-center gap-3 lg:gap-4 shrink-0">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 via-amber-500 to-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <span className="text-xl font-black tracking-tight bg-gradient-to-r from-orange-600 via-amber-600 to-red-600 bg-clip-text text-transparent">
                    Utsav
                  </span>
                  <span className="block text-[9px] font-extrabold text-gray-500 dark:text-zinc-400 uppercase tracking-widest -mt-1">
                    Marketplace
                  </span>
                </div>
              </Link>

              {/* Global City Selector Pill */}
              <div className="relative flex items-center bg-gray-100/90 dark:bg-zinc-800/90 rounded-2xl px-2.5 py-1.5 border border-gray-200 dark:border-zinc-700/80 text-xs shadow-inner">
                <MapPin className="w-3.5 h-3.5 text-orange-600 mr-1 shrink-0" />
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
            </div>

            {/* Center Navigation Links (Desktop) */}
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
                Plan Event
              </Link>
              <Link
                href="/pricing"
                className={`px-3 py-2 rounded-xl transition-all duration-200 ${
                  pathname === '/pricing'
                    ? 'text-orange-600 bg-orange-50 dark:bg-orange-950/40 shadow-xs'
                    : 'text-gray-700 dark:text-zinc-300 hover:text-orange-600 hover:bg-gray-100/80 dark:hover:bg-zinc-800/60'
                }`}
              >
                Pricing
              </Link>
              {invoices.length > 0 && (
                <Link
                  href={`/invoices/${invoices[0].id}`}
                  className={`px-3 py-2 rounded-xl transition-all duration-200 flex items-center gap-1 ${
                    pathname.startsWith('/invoices')
                      ? 'text-orange-600 bg-orange-50 dark:bg-orange-950/40 shadow-xs'
                      : 'text-gray-700 dark:text-zinc-300 hover:text-orange-600 hover:bg-gray-100/80 dark:hover:bg-zinc-800/60'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-orange-600" />
                  <span>Bills</span>
                </Link>
              )}
            </nav>

            {/* Right: Role Switcher Tabs (Client / Vendor / Admin) + Cart + Theme */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Role Switcher Segmented Control */}
              <div className="flex items-center bg-gray-100/90 dark:bg-zinc-800/90 p-1 rounded-2xl border border-gray-200 dark:border-zinc-700/80 text-xs shadow-inner">
                {/* Client Button */}
                <button
                  onClick={() => handleRoleSelect('CLIENT')}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                    currentRole === 'CLIENT'
                      ? 'bg-white dark:bg-zinc-900 text-orange-600 shadow-md shadow-orange-500/10'
                      : 'text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                  title="Open Client Portal & Bookings"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Client</span>
                </button>

                {/* Vendor Button */}
                <button
                  onClick={() => handleRoleSelect('VENDOR')}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                    currentRole === 'VENDOR'
                      ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-500/20'
                      : 'text-gray-600 dark:text-zinc-400 hover:text-orange-600 dark:hover:text-white'
                  }`}
                  title="Open Vendor Operations Hub"
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>Vendor</span>
                </button>

                {/* Admin Button */}
                <button
                  onClick={() => handleRoleSelect('ADMIN')}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                    currentRole === 'ADMIN'
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                      : 'text-gray-600 dark:text-zinc-400 hover:text-purple-600 dark:hover:text-white'
                  }`}
                  title="Open Admin Operations & KYC Hub"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin</span>
                </button>
              </div>

              {/* Cart / Event Plan Pill */}
              <Link
                href={`/events/${clientEvent.id}`}
                className="relative flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300 hover:bg-orange-100 dark:hover:bg-orange-900/60 transition-all duration-200 shadow-xs"
                title="View Active Event Plan & Cart"
              >
                <div className="relative">
                  <ShoppingBag className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                  {itemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-orange-600 animate-ping" />
                  )}
                </div>
                <div className="hidden sm:block text-left text-xs leading-tight">
                  <span className="font-bold block text-[11px]">{itemsCount} Services</span>
                  <span className="text-[10px] font-extrabold text-orange-900 dark:text-orange-200">
                    {formatINR(totalPlanAmount)}
                  </span>
                </div>
              </Link>

              {/* White / Dark Mode Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 sm:p-2.5 rounded-2xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-200 hover:border-orange-400 dark:hover:border-orange-500 shadow-xs transition-all duration-200 hover:scale-105 flex items-center"
                title={theme === 'dark' ? 'Switch to White (Light) Mode' : 'Switch to Dark Mode'}
                aria-label="Toggle White or Dark theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
                ) : (
                  <Moon className="w-4 h-4 text-gray-800" />
                )}
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-2xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-200"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl px-4 py-5 space-y-4 animate-fadeIn">
            {/* Quick Links */}
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <Link
                href="/vendors"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-xl bg-gray-50 dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 hover:bg-orange-50 text-center"
              >
                Find Vendors
              </Link>
              <Link
                href="/events/new"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-xl bg-gray-50 dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 hover:bg-orange-50 text-center"
              >
                Plan Event
              </Link>
              <Link
                href="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-xl bg-gray-50 dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 hover:bg-orange-50 text-center"
              >
                Vendor Pricing
              </Link>
              {invoices.length > 0 && (
                <Link
                  href={`/invoices/${invoices[0].id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 text-center flex items-center justify-center gap-1"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Bills / Invoice</span>
                </Link>
              )}
            </div>

            {/* Direct Portal Switcher on Mobile */}
            <div className="space-y-1.5 pt-2 border-t border-gray-100 dark:border-zinc-800">
              <span className="text-[10px] font-bold text-gray-400 dark:text-zinc-400 uppercase tracking-wider block">
                Select Operations Portal:
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleRoleSelect('CLIENT')}
                  className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 ${
                    currentRole === 'CLIENT'
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Client</span>
                </button>
                <button
                  onClick={() => handleRoleSelect('VENDOR')}
                  className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 ${
                    currentRole === 'VENDOR'
                      ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white'
                      : 'bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300'
                  }`}
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>Vendor</span>
                </button>
                <button
                  onClick={() => handleRoleSelect('ADMIN')}
                  className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 ${
                    currentRole === 'ADMIN'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
