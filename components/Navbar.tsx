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
  Sliders,
  ChevronDown,
} from 'lucide-react';
import { formatINR } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const { currentRole, setCurrentRole, clientEvent } = useMarketplace();

  const totalPlanAmount = clientEvent.plan_items.reduce((sum, item) => sum + item.price, 0);
  const itemsCount = clientEvent.plan_items.length;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      {/* Top Banner for Ahmedabad Launch */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-red-600 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium">
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase">
              Ahmedabad Exclusive 🪔
            </span>
            <span>Verified Wedding & Event Marketplace | SG Highway • Bodakdev • Sindhu Bhavan • Satellite</span>
          </div>
          <div className="flex items-center gap-4 text-orange-100 text-[11px]">
            <span>100% Date-Lock Guarantee</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Escrow Protected Payments</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Amdavad Utsav
                </span>
                <span className="block text-[10px] text-gray-500 font-semibold tracking-wider uppercase -mt-1">
                  Event Marketplace
                </span>
              </div>
            </Link>

            {/* Navigation links */}
            <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
              <Link
                href="/vendors"
                className={`px-3 py-2 rounded-lg transition-colors ${
                  pathname === '/vendors'
                    ? 'text-orange-600 bg-orange-50'
                    : 'text-gray-700 hover:text-orange-600 hover:bg-gray-50'
                }`}
              >
                Find Vendors
              </Link>
              <Link
                href="/events/new"
                className={`px-3 py-2 rounded-lg transition-colors ${
                  pathname.startsWith('/events')
                    ? 'text-orange-600 bg-orange-50'
                    : 'text-gray-700 hover:text-orange-600 hover:bg-gray-50'
                }`}
              >
                Plan My Event
              </Link>
              <Link
                href="/pricing"
                className={`px-3 py-2 rounded-lg transition-colors ${
                  pathname === '/pricing'
                    ? 'text-orange-600 bg-orange-50'
                    : 'text-gray-700 hover:text-orange-600 hover:bg-gray-50'
                }`}
              >
                Vendor Pricing
              </Link>
            </nav>
          </div>

          {/* Right actions: Plan Cart + Role Switcher */}
          <div className="flex items-center gap-3">
            {/* Event Plan Cart Pill */}
            <Link
              href={`/events/${clientEvent.id}`}
              className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 hover:bg-orange-100 transition-colors shadow-sm"
            >
              <ShoppingBag className="w-4 h-4 text-orange-600" />
              <div className="text-left text-xs leading-tight">
                <span className="font-semibold block">{itemsCount} Services</span>
                <span className="text-[11px] text-orange-900">{formatINR(totalPlanAmount)}</span>
              </div>
            </Link>

            {/* Live Interactive Persona / Role Switcher for Pair Testing */}
            <div className="relative flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200 text-xs">
              <button
                onClick={() => setCurrentRole('CLIENT')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                  currentRole === 'CLIENT'
                    ? 'bg-white text-orange-600 shadow-sm font-semibold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                title="Client mode: Plan events, choose vendors, pay advance"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Client</span>
              </button>

              <button
                onClick={() => setCurrentRole('VENDOR')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                  currentRole === 'VENDOR'
                    ? 'bg-white text-orange-600 shadow-sm font-semibold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                title="Vendor mode: Manage calendar, bookings, KYC, packages"
              >
                <Store className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Vendor</span>
              </button>

              <button
                onClick={() => setCurrentRole('ADMIN')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
                  currentRole === 'ADMIN'
                    ? 'bg-white text-purple-700 shadow-sm font-semibold'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                title="Admin mode: Approve KYC, manage categories & commission"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Admin</span>
              </button>
            </div>

            {/* Direct Dashboard Link based on selected role */}
            <Link
              href={
                currentRole === 'CLIENT'
                  ? '/dashboard/client'
                  : currentRole === 'VENDOR'
                  ? '/dashboard/vendor'
                  : '/dashboard/admin'
              }
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-gray-900 text-white hover:bg-black transition-colors"
            >
              <span>Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
