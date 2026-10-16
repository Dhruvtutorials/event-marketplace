import React from 'react';
import Link from 'next/link';
import { Sparkles, Shield, HeartHandshake, Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 pt-16 pb-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-gray-800">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center text-white font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Amdavad Utsav</span>
            </div>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Ahmedabad’s premier two-sided event planning marketplace. Compare verified party plots, caterers, decorators, and photographers with single-checkout advance payment and 100% date-lock security.
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-400 pt-2">
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-green-400" />
                4-Layer KYC Verified
              </span>
              <span className="flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-orange-400" />
                Escrow Protected Advance
              </span>
            </div>
          </div>

          {/* For Clients */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">For Event Hosts</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/events/new" className="hover:text-orange-400 transition-colors">
                  Create Event Checklist
                </Link>
              </li>
              <li>
                <Link href="/vendors" className="hover:text-orange-400 transition-colors">
                  Browse Ahmedabad Vendors
                </Link>
              </li>
              <li>
                <Link href="/vendors?category=cat-venue" className="hover:text-orange-400 transition-colors">
                  SG Highway Party Plots
                </Link>
              </li>
              <li>
                <Link href="/vendors?category=cat-catering" className="hover:text-orange-400 transition-colors">
                  Gujarati Thal Caterers
                </Link>
              </li>
              <li>
                <Link href="/dashboard/client" className="hover:text-orange-400 transition-colors">
                  My Bookings & Chat
                </Link>
              </li>
            </ul>
          </div>

          {/* For Vendors */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">For Vendors</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/vendor/register" className="hover:text-orange-400 transition-colors">
                  List Your Business
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-orange-400 transition-colors">
                  Subscription Plans
                </Link>
              </li>
              <li>
                <Link href="/dashboard/vendor" className="hover:text-orange-400 transition-colors">
                  Vendor Dashboard
                </Link>
              </li>
              <li>
                <Link href="/policy/terms" className="hover:text-orange-400 transition-colors">
                  Vendor Code of Conduct
                </Link>
              </li>
              <li>
                <Link href="/policy/terms#kyc" className="hover:text-orange-400 transition-colors">
                  KYC Requirements Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Office & Ahmedabad Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Ahmedabad Office</h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>Titanium Square, Sindhu Bhavan Road, Bodakdev, Ahmedabad 380054</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <span>+91 79 4800 2345</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                <span>support@amdavadutsav.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Amdavad Utsav Marketplace. Built strictly to specification for Ahmedabad launch.</p>
          <div className="flex gap-6">
            <Link href="/policy/terms" className="hover:text-gray-400">Terms & Conditions</Link>
            <Link href="/policy/privacy" className="hover:text-gray-400">Privacy Policy (DPDP)</Link>
            <Link href="/policy/refund" className="hover:text-gray-400">Refund & Cancellation</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
