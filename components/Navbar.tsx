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
      {/* Top Banner with Royal Pan-India Network */}
      <div className="bg-gradient-to-r from-royal-700 via-royal-600 to-amber-700 text-white text-[11px] font-semibold py-1.5 px-4 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] uppercase font-black tracking-wider text-amber-200">
              <Crown className="w-3 h-3 text-amber-300" />
              <span>Royal Event Artisans</span>
            </span>
            <span className="hidden md:inline text-white/90">
              Verified Heritage Venues, Gourmet Caterers &amp; Cinema Artists across Ahmedabad, Mumbai, Jaipur, Udaipur &amp; Pan-India.
            </span>
          </div>

          <div className="flex items-center gap-3 text-amber-100 text-[10px] sm:text-[11px] font-medium">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>100% Escrow Protected (Sec 14)</span>
            </span>
            <span>•</span>
            <span className="hidden sm:inline">Guaranteed Date-Lock</span>
          </div>
        </div>
      </div>

      {/* Main Glass Navbar */}
      <div className="glass-panel border-b border-amber-900/10 dark:border-amber-400/15 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-3">
            {/* Left: Brand Logo & City Selector */}
            <div className="flex items-center gap-3 lg:gap-5 shrink-0">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-500 flex items-center justify-center text-white shadow-md shadow-amber-500/25 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
                  <Sparkles className="w-5 h-5 text-amber-100 animate-pulse" />
                </div>
                <div>
                  <span className="text-xl font-black tracking-tight bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-600 dark:from-amber-400 dark:via-yellow-300 dark:to-amber-500 bg-clip-text text-transparent">
                    Utsav
                  </span>
                  <span className="block text-[9px] font-black text-amber-800/70 dark:text-amber-400/80 uppercase tracking-widest -mt-1">
                    Luxury Marketplace
                  </span>
                </div>
              </Link>

              {/* Global City Selector Pill */}
              <div className="relative flex items-center bg-amber-50/70 dark:bg-midnight-850 rounded-2xl px-2.5 py-1.5 border border-amber-200/80 dark:border-amber-500/20 text-xs shadow-inner">
                <MapPin className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 mr-1 shrink-0" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="bg-transparent text-gray-900 dark:text-amber-100 font-bold focus:outline-none cursor-pointer pr-1 text-xs"
                  title="Select City"
                >
                  {cities.map((city) => (
                    <option key={city} value={city} className="dark:bg-midnight-900 text-gray-900 dark:text-white">
                      {city === 'All Cities' ? '📍 All Cities (Pan-India)' : city}
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
                    ? 'text-amber-700 dark:text-amber-300 bg-amber-100/60 dark:bg-amber-950/40 shadow-xs'
                    : 'text-gray-700 dark:text-zinc-300 hover:text-amber-700 hover:bg-amber-50/70 dark:hover:bg-midnight-800'
                }`}
              >
                Find Vendors
              </Link>
              <Link
                href="/events/new"
                className={`px-3 py-2 rounded-xl transition-all duration-200 ${
                  pathname.startsWith('/events')
                    ? 'text-amber-700 dark:text-amber-300 bg-amber-100/60 dark:bg-amber-950/40 shadow-xs'
                    : 'text-gray-700 dark:text-zinc-300 hover:text-amber-700 hover:bg-amber-50/70 dark:hover:bg-midnight-800'
                }`}
              >
                Plan Event
              </Link>
              <Link
                href="/pricing"
                className={`px-3 py-2 rounded-xl transition-all duration-200 ${
                  pathname === '/pricing'
                    ? 'text-amber-700 dark:text-amber-300 bg-amber-100/60 dark:bg-amber-950/40 shadow-xs'
                    : 'text-gray-700 dark:text-zinc-300 hover:text-amber-700 hover:bg-amber-50/70 dark:hover:bg-midnight-800'
                }`}
              >
                Pricing
              </Link>
              {invoices.length > 0 && (
                <Link
                  href={`/invoices/${invoices[0].id}`}
                  className={`px-3 py-2 rounded-xl transition-all duration-200 flex items-center gap-1 ${
                    pathname.startsWith('/invoices')
                      ? 'text-amber-700 dark:text-amber-300 bg-amber-100/60 dark:bg-amber-950/40 shadow-xs'
                      : 'text-gray-700 dark:text-zinc-300 hover:text-amber-700 hover:bg-amber-50/70 dark:hover:bg-midnight-800'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-amber-600" />
                  <span>Bills</span>
                </Link>
              )}
            </nav>

            {/* Right: Role Switcher Tabs (Client / Vendor / Admin) + Cart + Theme */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Role Switcher Segmented Control */}
              <div className="flex items-center bg-amber-50/80 dark:bg-midnight-850 p-1 rounded-2xl border border-amber-200/80 dark:border-amber-500/20 text-xs shadow-inner">
                {/* Client Button */}
                <button
                  onClick={() => handleRoleSelect('CLIENT')}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                    currentRole === 'CLIENT'
                      ? 'bg-white dark:bg-midnight-900 text-amber-800 dark:text-amber-300 shadow-md shadow-amber-500/10'
                      : 'text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                  title="Open Client Portal & Bookings"
                >
                  <UserCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>Client</span>
                </button>

                {/* Vendor Button */}
                <button
                  onClick={() => handleRoleSelect('VENDOR')}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                    currentRole === 'VENDOR'
                      ? 'bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 text-white shadow-md shadow-amber-500/20'
                      : 'text-gray-600 dark:text-zinc-400 hover:text-amber-700 dark:hover:text-amber-300'
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
                      ? 'bg-royal-600 text-white shadow-md shadow-royal-500/20'
                      : 'text-gray-600 dark:text-zinc-400 hover:text-royal-600 dark:hover:text-purple-300'
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
                className="relative flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/90 dark:border-amber-700/40 text-amber-900 dark:text-amber-200 hover:bg-amber-100/80 transition-all duration-200 shadow-xs"
                title="View Active Event Plan & Cart"
              >
                <div className="relative">
                  <ShoppingBag className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  {itemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  )}
                </div>
                <div className="hidden sm:block text-left text-xs leading-tight">
                  <span className="font-bold block text-[11px]">{itemsCount} Services</span>
                  <span className="text-[10px] font-black text-amber-800 dark:text-amber-300">
                    {formatINR(totalPlanAmount)}
                  </span>
                </div>
              </Link>

              {/* White / Dark Mode Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 sm:p-2.5 rounded-2xl border border-amber-200/80 dark:border-amber-500/20 bg-white dark:bg-midnight-850 text-gray-700 dark:text-amber-200 hover:border-amber-400 shadow-xs transition-all duration-200 hover:scale-105 flex items-center"
                title={theme === 'dark' ? 'Switch to White (Light) Mode' : 'Switch to Dark Mode'}
                aria-label="Toggle White or Dark theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
                ) : (
                  <Moon className="w-4 h-4 text-amber-800" />
                )}
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-2xl border border-amber-200 dark:border-amber-500/20 bg-white dark:bg-midnight-850 text-gray-700 dark:text-zinc-200"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-amber-200/60 dark:border-amber-500/20 bg-white/95 dark:bg-midnight-900/95 backdrop-blur-xl px-4 py-5 space-y-4 animate-fadeIn">
            {/* Quick Links */}
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <Link
                href="/vendors"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-xl bg-amber-50/70 dark:bg-midnight-800 text-gray-800 dark:text-zinc-100 hover:bg-amber-100 text-center"
              >
                Find Vendors
              </Link>
              <Link
                href="/events/new"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-xl bg-amber-50/70 dark:bg-midnight-800 text-gray-800 dark:text-zinc-100 hover:bg-amber-100 text-center"
              >
                Plan Event
              </Link>
              <Link
                href="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-xl bg-amber-50/70 dark:bg-midnight-800 text-gray-800 dark:text-zinc-100 hover:bg-amber-100 text-center"
              >
                Vendor Pricing
              </Link>
              {invoices.length > 0 && (
                <Link
                  href={`/invoices/${invoices[0].id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-xl bg-amber-100/70 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-center flex items-center justify-center gap-1"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Bills / Invoice</span>
                </Link>
              )}
            </div>

            {/* Direct Portal Switcher on Mobile */}
            <div className="space-y-1.5 pt-2 border-t border-amber-100 dark:border-amber-900/40">
              <span className="text-[10px] font-bold text-gray-400 dark:text-zinc-400 uppercase tracking-wider block">
                Select Operations Portal:
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handleRoleSelect('CLIENT')}
                  className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 ${
                    currentRole === 'CLIENT'
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-100 dark:bg-midnight-800 text-gray-700 dark:text-zinc-300'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Client</span>
                </button>
                <button
                  onClick={() => handleRoleSelect('VENDOR')}
                  className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 ${
                    currentRole === 'VENDOR'
                      ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-white'
                      : 'bg-gray-100 dark:bg-midnight-800 text-gray-700 dark:text-zinc-300'
                  }`}
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>Vendor</span>
                </button>
                <button
                  onClick={() => handleRoleSelect('ADMIN')}
                  className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 ${
                    currentRole === 'ADMIN'
                      ? 'bg-royal-600 text-white'
                      : 'bg-gray-100 dark:bg-midnight-800 text-gray-700 dark:text-zinc-300'
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
