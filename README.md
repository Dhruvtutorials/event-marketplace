# Amdavad Utsav – Event Planning Marketplace (Ahmedabad Launch)
### Version 1.0 | Complete Full-Stack Implementation

This marketplace is built strictly to the specification document provided for Ahmedabad launch, implementing the two-sided marketplace (Client + Vendor) with Admin operations.

---

## 🌟 Key Features Implemented

### 1. Client Journey (Section 4)
- **Home & Search Wizard**: Filter by Ahmedabad locality (SG Highway, Sindhu Bhavan Road, Bodakdev, Satellite, Bopal, Vastrapur, Maninagar), date, guest count, and event type.
- **Smart Service Checklist**: Auto-maps required services based on event type:
  - **Wedding (Lagna)**: Venue, Catering, Decor, Photography, DJ, Makeup, Mehndi, Transport.
  - **Navratri Garba**: Venue/Ground, DJ & Sound/Orchestra, Decor, Catering, Photography.
  - **Birthday & Corporate**: Mapped to respective required services.
- **My Event Plan & Cart**: Live budget health tracker, budget vs. allocated cost, and 30% advance escrow calculation.
- **Single Multi-Vendor Checkout (Section 14)**: Pay 30% advance or full payment across multiple vendors in a single simulated Razorpay transaction.
- **Client Portal**: Track confirmed bookings, raise disputes, submit verified reviews, and chat with vendors.

### 2. Anti-Disintermediation & Chat Shield (Section 13 Rule 8)
- Real-time chat system with automated regex masking for:
  - 10-digit Indian phone numbers (`🔒 [Contact Number Protected]`)
  - Personal email addresses (`🔒 [Email Protected]`)
  - UPI handles (`user@okhdfcbank`, `user@paytm`, `user@upi`)
- Ensures payments and date-lock guarantees remain protected on-platform.

### 3. Vendor Journey & 4-Layer Fraud Prevention (Section 5 & Section 8)
- **Layer 1 (Entry)**: GST/Udyam check, PAN/Aadhaar proof, and Penny-drop bank verification.
- **Layer 2 (Category Lock)**: Dropdown-only category selection (free text banned); category-specific proofs:
  - *Caterer*: Mandatory FSSAI license.
  - *Venue*: Property papers / AMC sanad & booking agreement.
  - *DJ & Sound*: Equipment photos & past performance video proof.
  - *Photographer*: Original portfolio & work samples.
- **Layer 3 (Trust Score)**: Internal algorithm calculating trust score (0–100) based on KYC status, customer ratings, response rate, and cancellation metrics.
- **Layer 4 (Action Policy)**: Fraud detection, blacklisting, and zero subscription refund.
- **Vendor Dashboard**:
  - Availability calendar with atomic date-locks.
  - Manage booking requests: **Accept**, **Reject**, or **Counter-Offer** (Section 13 Rule 11).
  - Financial dashboard: Gross bookings, 7% platform commission deduction, 30% advance escrow received, and scheduled net payouts.

### 4. Admin Operations Portal (Section 6)
- **KYC Review & Audits**: Inspect attached documents, approve and grant Verified Badge, or reject/suspend vendors.
- **Platform Financial Controls**: Configurable Commission % (default 7%), Advance % (default 30%), and Payout delay days (default 3 days).
- **Dispute Resolution**: Mediate issues, issue client refunds, or release escrow to vendors.
- **Service Mappings**: Manage category and event type dependencies.

### 5. Vendor Subscription Tiers (Section 7)
- **Basic**: ₹1,499/mo (₹14,990/yr) — 1 Category, 5 packages.
- **Pro**: ₹3,499/mo (₹34,990/yr) — 3 Categories, verified badge, priority listing.
- **Premium**: ₹6,999/mo (₹69,990/yr) — Homepage featured banner, top checklist ranking, 0% commission on first 3 bookings.

---

## 🚀 Running the Project

The server is currently running at:
```bash
http://localhost:3000
```

To run manually in PowerShell:
```powershell
npm.cmd run dev
```

To create a production build:
```powershell
npm.cmd run build
```

---

## 🧭 Live Persona Switcher
Use the top navigation bar to toggle between:
- **Client**: Plan events, compare vendors, test 30% advance checkout, and chat.
- **Vendor**: Manage bookings, send counter-offers, view earnings and calendar date-locks.
- **Admin**: Inspect KYC documents, change platform commission %, and resolve disputes.
