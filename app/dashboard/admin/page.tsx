'use client';

import React, { useState } from 'react';
import { useMarketplace } from '@/lib/store';
import { formatINR } from '@/lib/utils';
import {
  ShieldCheck,
  Users,
  Store,
  DollarSign,
  TrendingUp,
  FileCheck,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Settings,
  Scale,
  Lock,
  Layers,
  Sparkles,
  FileText,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const {
    vendors,
    bookings,
    settings,
    updateSettings,
    updateVendorKyc,
    disputes,
    resolveDispute,
    categories,
    eventTypes,
    invoices,
  } = useMarketplace();

  // Settings form state
  const [commissionRate, setCommissionRate] = useState<number>(settings.commission_percent);
  const [advanceRate, setAdvanceRate] = useState<number>(settings.advance_percent);
  const [payoutDelay, setPayoutDelay] = useState<number>(settings.payout_delay_days);
  const [settingsSaved, setSettingsSaved] = useState<boolean>(false);

  // KYC Review Modal State
  const [selectedVendorForReview, setSelectedVendorForReview] = useState<any | null>(null);
  const [kycRemarks, setKycRemarks] = useState<string>('');

  // Calculations
  const totalVendors = vendors.length;
  const activeVendors = vendors.filter((v) => v.status === 'ACTIVE').length;
  const pendingKycCount = vendors.filter((v) => v.kyc_status === 'UNDER_REVIEW' || v.kyc_status === 'PENDING').length;

  const totalGmv = bookings.reduce((sum, b) => sum + b.amount, 0);
  const totalPlatformRevenue = Math.round(totalGmv * (settings.commission_percent / 100));

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      commission_percent: commissionRate,
      advance_percent: advanceRate,
      payout_delay_days: payoutDelay,
    });
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  const handleApproveVendor = (vendorId: string) => {
    updateVendorKyc(vendorId, 'APPROVED', kycRemarks || 'Physical & document inspection completed.');
    setSelectedVendorForReview(null);
    setKycRemarks('');
  };

  const handleRejectVendor = (vendorId: string) => {
    updateVendorKyc(vendorId, 'REJECTED', kycRemarks || 'Missing mandatory licenses.');
    setSelectedVendorForReview(null);
    setKycRemarks('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-200 dark:border-zinc-800 gap-4">
        <div>
          <span className="text-xs font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" />
            <span>Admin Operations Portal (Section 6)</span>
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 dark:text-white mt-1">
            Platform Master Operations Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400 mt-1">
            Manage 4-layer KYC compliance, commission rates, escrow payouts, and multi-city marketplace ecosystem.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40">
            Multi-City Hub Live
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm">
          <span className="text-xs font-semibold text-gray-500 dark:text-zinc-400">Gross Marketplace GMV</span>
          <p className="text-2xl font-black text-gray-950 dark:text-white mt-1">{formatINR(totalGmv)}</p>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">Across all event bookings</span>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm">
          <span className="text-xs font-semibold text-gray-500 dark:text-zinc-400">Commission Earned</span>
          <p className="text-2xl font-black text-purple-700 dark:text-purple-400 mt-1">{formatINR(totalPlatformRevenue)}</p>
          <span className="text-[11px] text-gray-400 dark:text-zinc-500">At {settings.commission_percent}% platform rate</span>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm">
          <span className="text-xs font-semibold text-gray-500 dark:text-zinc-400">Onboarded Vendors</span>
          <p className="text-2xl font-black text-gray-900 dark:text-white mt-1">{activeVendors} / {totalVendors}</p>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">{activeVendors} verified live</span>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm">
          <span className="text-xs font-semibold text-gray-500 dark:text-zinc-400">Pending KYC Review</span>
          <p className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">{pendingKycCount}</p>
          <span className="text-[11px] text-amber-700 dark:text-amber-300 font-semibold">Requires admin action</span>
        </div>
      </div>

      {/* 2-Column Section: KYC Queue & Platform Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: KYC Verification Manager (Section 8) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-zinc-800">
              <div>
                <h3 className="text-base font-bold text-gray-950 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span>Vendor KYC Approvals &amp; Document Audits</span>
                </h3>
                <p className="text-xs text-gray-500 dark:text-zinc-400 mt-0.5">
                  Section 8: Verify FSSAI licenses, land ownership, and identity proofs before granting Verified Badge.
                </p>
              </div>
            </div>

            <div className="divide-y divide-gray-100 dark:divide-zinc-800">
              {vendors.map((v) => {
                const isApproved = v.kyc_status === 'APPROVED';
                const isUnderReview = v.kyc_status === 'UNDER_REVIEW';

                return (
                  <div key={v.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-gray-900 dark:text-white">{v.business_name}</h4>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            isApproved
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400'
                              : isUnderReview
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400'
                              : 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-400'
                          }`}
                        >
                          {v.kyc_status}
                        </span>
                      </div>
                      <p className="text-gray-500 dark:text-zinc-400">
                        Owner: <strong className="text-gray-700 dark:text-zinc-300">{v.owner_name}</strong> • City: <strong>{v.city}</strong> • Locality: {v.locality} • Documents: {v.documents.length} attached
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedVendorForReview(v)}
                        className="px-3 py-1.5 rounded-xl border border-gray-300 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800 text-xs font-semibold text-gray-700 dark:text-zinc-200 shadow-2xs"
                      >
                        Inspect Docs &amp; Decide
                      </button>

                      {!isApproved ? (
                        <button
                          onClick={() => handleApproveVendor(v.id)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs"
                        >
                          Approve
                        </button>
                      ) : (
                        <button
                          onClick={() => updateVendorKyc(v.id, 'SUSPENDED', 'Admin audit action')}
                          className="px-3 py-1.5 rounded-xl text-gray-500 dark:text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 text-xs font-medium"
                        >
                          Suspend
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 6: Disputes Resolution Module */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-gray-950 dark:text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-purple-700 dark:text-purple-400" />
              <span>Disputes &amp; Escrow Mediation</span>
            </h3>
            <p className="text-xs text-gray-500 dark:text-zinc-400">
              Disputes raised by clients or vendors pause automatic escrow release until resolved.
            </p>

            {disputes.length === 0 ? (
              <p className="text-xs text-gray-400 dark:text-zinc-500 py-3 text-center">
                No active disputes on the platform. All bookings healthy.
              </p>
            ) : (
              <div className="space-y-3">
                {disputes.map((d) => (
                  <div key={d.id} className="p-4 rounded-xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/30 dark:bg-purple-950/30 text-xs space-y-2">
                    <div className="flex justify-between font-bold">
                      <span>Booking: #{d.booking_id}</span>
                      <span className="text-purple-800 dark:text-purple-400">{d.status}</span>
                    </div>
                    <p className="text-gray-700 dark:text-zinc-300">Reason: {d.reason}</p>
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => resolveDispute(d.id, 'RESOLVED_CLIENT', 'Refund issued to client')}
                        className="px-3 py-1 bg-blue-600 text-white rounded-lg font-bold"
                      >
                        Refund Client
                      </button>
                      <button
                        onClick={() => resolveDispute(d.id, 'RESOLVED_VENDOR', 'Release payout to vendor')}
                        className="px-3 py-1 bg-emerald-600 text-white rounded-lg font-bold"
                      >
                        Release to Vendor
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Platform Configuration Settings (Section 11 Table settings) */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-zinc-800">
              <Settings className="w-4 h-4 text-purple-700 dark:text-purple-400" />
              <h3 className="font-bold text-sm text-gray-950 dark:text-white uppercase tracking-wider">
                Platform Rules &amp; Financials
              </h3>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-gray-700 dark:text-zinc-300">
                  Platform Commission (%) on Payouts
                </label>
                <input
                  type="number"
                  min="0"
                  max="25"
                  value={commissionRate}
                  onChange={(e) => setCommissionRate(Number(e.target.value))}
                  className="w-full p-2.5 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl font-bold text-gray-900 dark:text-white"
                />
                <span className="text-[10px] text-gray-400 dark:text-zinc-500">Default: 7% (Configurable in settings table)</span>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700 dark:text-zinc-300">
                  Client Booking Advance Percentage (%)
                </label>
                <input
                  type="number"
                  min="10"
                  max="100"
                  value={advanceRate}
                  onChange={(e) => setAdvanceRate(Number(e.target.value))}
                  className="w-full p-2.5 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl font-bold text-gray-900 dark:text-white"
                />
                <span className="text-[10px] text-gray-400 dark:text-zinc-500">Default: 30% required at checkout</span>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700 dark:text-zinc-300">
                  Post-Event Payout Settlement Delay (Days)
                </label>
                <input
                  type="number"
                  min="1"
                  max="14"
                  value={payoutDelay}
                  onChange={(e) => setPayoutDelay(Number(e.target.value))}
                  className="w-full p-2.5 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl font-bold text-gray-900 dark:text-white"
                />
                <span className="text-[10px] text-gray-400 dark:text-zinc-500">Default: 3 days after event date</span>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold transition-colors shadow-xs"
              >
                Save Settings
              </button>

              {settingsSaved && (
                <div className="p-2 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 rounded-lg text-center font-bold">
                  Settings saved and applied!
                </div>
              )}
            </form>
          </div>

          {/* Event Types & Categories Mapping Overview */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 p-6 shadow-sm space-y-3 text-xs">
            <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-purple-700 dark:text-purple-400" />
              <span>Event Checklist Mappings</span>
            </h4>
            <div className="space-y-2">
              {eventTypes.map((et) => (
                <div key={et.id} className="p-2.5 bg-gray-50 dark:bg-zinc-800/80 rounded-xl border border-gray-100 dark:border-zinc-700">
                  <span className="font-bold text-gray-900 dark:text-white block">{et.name}</span>
                  <span className="text-gray-500 dark:text-zinc-400 text-[11px]">
                    {et.required_category_ids.length} mandatory categories mapped
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* KYC Inspection Modal */}
      {selectedVendorForReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-gray-200 dark:border-zinc-800">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-zinc-800">
              <div>
                <h3 className="font-bold text-base text-gray-950 dark:text-white">
                  Audit KYC: {selectedVendorForReview.business_name}
                </h3>
                <p className="text-xs text-gray-400 dark:text-zinc-400">Vendor Onboarding Audit</p>
              </div>
              <button
                onClick={() => setSelectedVendorForReview(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-gray-50 dark:bg-zinc-800 rounded-xl">
                <span className="text-gray-400 dark:text-zinc-400 block font-semibold">Business Info</span>
                <p className="font-bold text-gray-800 dark:text-zinc-200">{selectedVendorForReview.owner_name} • {selectedVendorForReview.address}</p>
                <p className="text-gray-600 dark:text-zinc-400">GST: {selectedVendorForReview.gst_no || 'Not Registered / Composition'}</p>
              </div>

              <div>
                <span className="font-bold text-gray-700 dark:text-zinc-300 block mb-1">Attached Verification Documents:</span>
                {selectedVendorForReview.documents.length === 0 ? (
                  <p className="text-amber-600 italic">No proof uploaded yet.</p>
                ) : (
                  <div className="space-y-1.5">
                    {selectedVendorForReview.documents.map((d: any) => (
                      <div key={d.id} className="p-2 border border-gray-200 dark:border-zinc-700 rounded-lg flex justify-between items-center bg-white dark:bg-zinc-800">
                        <span className="font-semibold text-gray-900 dark:text-white">{d.title}</span>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                          {d.doc_type}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700 dark:text-zinc-300">Admin Remarks</label>
                <textarea
                  rows={2}
                  value={kycRemarks}
                  onChange={(e) => setKycRemarks(e.target.value)}
                  placeholder="e.g. FSSAI registration verified on central portal. Approved."
                  className="w-full p-2 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleRejectVendor(selectedVendorForReview.id)}
                className="w-1/2 py-2 rounded-xl text-xs font-bold bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-400 hover:bg-red-100"
              >
                Reject KYC
              </button>
              <button
                type="button"
                onClick={() => handleApproveVendor(selectedVendorForReview.id)}
                className="w-1/2 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
              >
                Approve &amp; Issue Verified Badge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
