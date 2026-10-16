'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMarketplace } from '@/lib/store';
import {
  Store,
  ShieldCheck,
  Building,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  CreditCard,
  ArrowRight,
} from 'lucide-react';

export default function VendorRegisterPage() {
  const router = useRouter();
  const { categories, registerVendor, setCurrentRole, setCurrentVendorId } = useMarketplace();

  // Form states
  const [businessName, setBusinessName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(categories[0]?.id || 'cat-venue');
  const [locality, setLocality] = useState('SG Highway');
  const [address, setAddress] = useState('');
  const [gstNo, setGstNo] = useState('');
  const [panNo, setPanNo] = useState('');
  const [description, setDescription] = useState('');
  const [bankName, setBankName] = useState('HDFC Bank, Ahmedabad');
  const [accountNo, setAccountNo] = useState('XXXX-XXXX-9912');
  const [ifsc, setIfsc] = useState('HDFC0001234');
  const [minPrice, setMinPrice] = useState<number>(50000);
  const [documentTitle, setDocumentTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successVendorId, setSuccessVendorId] = useState<string | null>(null);

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId) || categories[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newVendor = registerVendor({
      business_name: businessName,
      owner_name: ownerName,
      category_ids: [selectedCategoryId],
      locality,
      address,
      gst_no: gstNo || undefined,
      pan_no: panNo || undefined,
      description,
      min_price: minPrice,
      documents: [
        {
          id: `doc-${Date.now()}`,
          vendor_id: '',
          doc_type: selectedCategoryId === 'cat-catering' ? 'FSSAI_LICENSE' : 'PORTFOLIO_PROOF',
          file_url: 'https://example.com/uploaded-kyc-doc.pdf',
          title: documentTitle || `${selectedCategory.name} Official License Proof`,
          status: 'PENDING',
          remarks: 'Awaiting admin review',
          uploaded_at: new Date().toISOString(),
        },
      ],
      bank_account: {
        id: `bnk-${Date.now()}`,
        vendor_id: '',
        account_holder_name: businessName,
        bank_name: bankName,
        account_no_masked: accountNo,
        ifsc,
        penny_drop_status: 'VERIFIED',
      },
      services: [
        {
          id: `srv-${Date.now()}`,
          vendor_id: '',
          category_id: selectedCategoryId,
          title: `Full ${selectedCategory.name} Service`,
          description: description,
          base_price: minPrice,
          service_area_cities: ['Ahmedabad'],
          packages: [
            {
              id: `pkg-${Date.now()}-silver`,
              name: 'Silver Standard Package',
              price: minPrice,
              inclusions: ['Complete base setup', 'Professional staff', 'Standard equipment'],
            },
          ],
          addons: [],
          status: 'ACTIVE',
        },
      ],
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessVendorId(newVendor.id);
      setCurrentRole('VENDOR');
      setCurrentVendorId(newVendor.id);
      setTimeout(() => {
        router.push('/dashboard/vendor');
      }, 1500);
    }, 1200);
  };

  const localities = ['SG Highway', 'Sindhu Bhavan Road', 'Bodakdev', 'Satellite', 'Bopal', 'Vastrapur', 'Maninagar'];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Title */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
          Section 5 &amp; Section 8: 4-Layer Onboarding
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950">
          Register Your Ahmedabad Business
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Strict verification ensures only genuine caterers, party plots, and event artisans join our ecosystem.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Business Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b pb-2 flex items-center gap-2">
              <Store className="w-4 h-4 text-orange-600" />
              1. Business &amp; Entity Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Business / Firm Name</label>
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Royal Gujarati Banquets"
                  className="w-full text-xs p-2.5 bg-gray-50 border rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Owner / Authorized Name</label>
                <input
                  type="text"
                  required
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  placeholder="e.g. Parthbhai Patel"
                  className="w-full text-xs p-2.5 bg-gray-50 border rounded-xl"
                />
              </div>
            </div>

            {/* Category selection (Dropdown only as required by Layer 2) */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">
                Service Category (Dropdown only • Free-text restricted)
              </label>
              <select
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
                className="w-full text-xs p-2.5 bg-gray-50 border rounded-xl font-semibold"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} (Mandatory Proof: {c.required_proof_type})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Ahmedabad Locality</label>
                <select
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  className="w-full text-xs p-2.5 bg-gray-50 border rounded-xl font-medium"
                >
                  {localities.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Base Starting Price (INR)</label>
                <input
                  type="number"
                  min="5000"
                  step="5000"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  className="w-full text-xs p-2.5 bg-gray-50 border rounded-xl font-bold"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">Detailed Address in Ahmedabad</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Shop/Plot number, road, landmark, Ahmedabad"
                className="w-full text-xs p-2.5 bg-gray-50 border rounded-xl"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">Service Description</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Highlight your experience, awards, guest capacity, or cuisine specialties..."
                className="w-full text-xs p-2.5 bg-gray-50 border rounded-xl"
              />
            </div>
          </div>

          {/* Layer 1 Verification Proofs */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b pb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              2. Layer 1 Verification &amp; Mandatory Licenses
            </h3>

            <div className="p-3 bg-orange-50 border border-orange-200 rounded-xl text-xs text-orange-900">
              <strong>Category Requirement:</strong> For <strong>{selectedCategory.name}</strong>, you must upload: <span className="underline">{selectedCategory.required_proof_type}</span>.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">GST Registration No (Optional)</label>
                <input
                  type="text"
                  value={gstNo}
                  onChange={(e) => setGstNo(e.target.value)}
                  placeholder="24AAAAA0000A1Z5"
                  className="w-full text-xs p-2.5 bg-gray-50 border rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Document / Certificate Name</label>
                <input
                  type="text"
                  value={documentTitle}
                  onChange={(e) => setDocumentTitle(e.target.value)}
                  placeholder={`e.g. ${selectedCategory.required_proof_type}`}
                  className="w-full text-xs p-2.5 bg-gray-50 border rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Bank Account Details */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b pb-2 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-gray-600" />
              3. Payout Settlement Account (Penny-Drop Verified)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Bank Name</label>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full text-xs p-2.5 bg-gray-50 border rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">Account Number</label>
                <input
                  type="text"
                  value={accountNo}
                  onChange={(e) => setAccountNo(e.target.value)}
                  className="w-full text-xs p-2.5 bg-gray-50 border rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700">IFSC Code</label>
                <input
                  type="text"
                  value={ifsc}
                  onChange={(e) => setIfsc(e.target.value)}
                  className="w-full text-xs p-2.5 bg-gray-50 border rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="py-3 px-6 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2"
            >
              {isSubmitting ? (
                <span>Submitting for KYC Inspection...</span>
              ) : successVendorId ? (
                <span>Registered! Redirecting to Vendor Dashboard...</span>
              ) : (
                <>
                  <span>Submit for Admin KYC Approval</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
