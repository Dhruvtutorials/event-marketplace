// Types for Event Planning Marketplace (Ahmedabad Edition)
// Follows Section 11 & Section 12 conventions (snake_case data model, UPPER_CASE status enums)

export type UserRole = 'CLIENT' | 'VENDOR' | 'ADMIN';

export type VendorStatus = 'PENDING' | 'UNDER_REVIEW' | 'ACTIVE' | 'REJECTED' | 'SUSPENDED' | 'BANNED';
export type KycStatus = 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';
export type BookingStatus =
  | 'REQUESTED'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'COUNTER_OFFERED'
  | 'PAYMENT_PENDING'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'CANCELLED_BY_CLIENT'
  | 'CANCELLED_BY_VENDOR'
  | 'DISPUTED';

export type PaymentStatus = 'CREATED' | 'PAID' | 'HELD' | 'RELEASED' | 'FAILED' | 'REFUNDED' | 'PARTIALLY_REFUNDED';
export type PaymentType = 'ADVANCE' | 'FINAL' | 'FULL';
export type SubscriptionStatus = 'TRIAL' | 'ACTIVE' | 'EXPIRED' | 'CANCELLED';
export type AvailabilityStatus = 'FREE' | 'BOOKED' | 'BLOCKED';
export type PlanItemStatus = 'SELECTED' | 'REQUESTED' | 'CONFIRMED' | 'REMOVED';

export interface User {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  phone: string;
  is_phone_verified: boolean;
  is_email_verified: boolean;
  status: 'ACTIVE' | 'SUSPENDED' | 'BANNED';
  created_at: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  required_proof_type: string; // e.g. "FSSAI License" for Caterer, "Property Papers" for Venue
  is_active: boolean;
}

export interface EventType {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  is_active: boolean;
  required_category_ids: string[];
}

export interface VendorDocument {
  id: string;
  vendor_id: string;
  doc_type: 'OWNER_PAN' | 'OWNER_AADHAAR' | 'GST_CERTIFICATE' | 'UDYAM_MSME' | 'FSSAI_LICENSE' | 'VENUE_PROPERTY_AGREEMENT' | 'PORTFOLIO_PROOF';
  file_url: string;
  title: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  remarks?: string;
  uploaded_at: string;
}

export interface VendorBankAccount {
  id: string;
  vendor_id: string;
  account_holder_name: string;
  bank_name: string;
  account_no_masked: string;
  ifsc: string;
  penny_drop_status: 'VERIFIED' | 'PENDING' | 'FAILED';
  razorpay_account_id?: string;
}

export interface VendorPackage {
  id: string;
  name: string; // e.g. "Silver", "Gold", "Royal Gujarati Wedding Platinum"
  price: number; // in INR
  inclusions: string[];
  duration_hours?: number;
}

export interface VendorAddon {
  id: string;
  name: string;
  price: number;
}

export interface VendorService {
  id: string;
  vendor_id: string;
  category_id: string;
  title: string;
  description: string;
  base_price: number;
  service_area_cities: string[]; // e.g. ["Ahmedabad", "Gandhinagar"]
  packages: VendorPackage[];
  addons: VendorAddon[];
  status: 'ACTIVE' | 'INACTIVE';
}

export interface VendorAvailability {
  id: string;
  vendor_id: string;
  date: string; // YYYY-MM-DD
  status: AvailabilityStatus;
  booking_id?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: 'Basic' | 'Pro' | 'Premium';
  price_monthly: number;
  price_yearly: number;
  max_categories: number;
  max_services: number;
  priority_level: number;
  features: string[];
  is_active: boolean;
}

export interface VendorSubscription {
  id: string;
  vendor_id: string;
  plan_id: string;
  start_date: string;
  end_date: string;
  status: SubscriptionStatus;
  auto_renew: boolean;
}

export interface Review {
  id: string;
  booking_id: string;
  client_id: string;
  client_name: string;
  vendor_id: string;
  rating: number; // 1 to 5
  comment: string;
  vendor_reply?: string;
  created_at: string;
}

export interface Vendor {
  id: string;
  user_id: string;
  business_name: string;
  owner_name: string;
  category_ids: string[];
  city: string; // default "Ahmedabad"
  locality: string; // e.g. "SG Highway", "Sindhu Bhavan Road", "Satellite", "Prahlad Nagar"
  address: string;
  gst_no?: string;
  pan_no?: string;
  description: string;
  cover_image: string;
  gallery: string[];
  kyc_status: KycStatus;
  verified_badge: boolean;
  trust_score: number; // 0 - 100
  status: VendorStatus;
  response_rate: number; // e.g. 98%
  profile_completion: number; // e.g. 95%
  rating: number;
  review_count: number;
  min_price: number;
  services: VendorService[];
  documents: VendorDocument[];
  bank_account?: VendorBankAccount;
  current_subscription?: VendorSubscription;
  created_at: string;
}

export interface EventPlanItem {
  id: string;
  event_id: string;
  category_id: string;
  vendor_id?: string;
  vendor_name?: string;
  package_id?: string;
  package_name?: string;
  addons: VendorAddon[];
  price: number;
  status: PlanItemStatus;
  counter_price?: number;
  counter_note?: string;
}

export interface ClientEvent {
  id: string;
  client_id: string;
  event_type_id: string;
  event_type_name: string;
  title: string;
  event_date: string; // YYYY-MM-DD
  city: string;
  locality?: string;
  guest_count: number;
  budget_min: number;
  budget_max: number;
  status: 'PLANNING' | 'BOOKED' | 'COMPLETED' | 'CANCELLED';
  plan_items: EventPlanItem[];
  created_at: string;
}

export interface Booking {
  id: string;
  event_plan_item_id: string;
  event_id: string;
  event_title: string;
  client_id: string;
  client_name: string;
  client_phone: string;
  vendor_id: string;
  vendor_name: string;
  category_name: string;
  event_date: string;
  amount: number;
  advance_amount: number;
  remaining_amount: number;
  status: BookingStatus;
  cancellation_reason?: string;
  counter_amount?: number;
  counter_note?: string;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  booking_ids: string[];
  event_id: string;
  client_id: string;
  amount: number;
  type: PaymentType;
  status: PaymentStatus;
  razorpay_order_id: string;
  razorpay_payment_id?: string;
  paid_at?: string;
}

export interface Payout {
  id: string;
  vendor_id: string;
  booking_id: string;
  gross_amount: number;
  commission_amount: number;
  payout_amount: number;
  status: 'PENDING' | 'SCHEDULED' | 'PAID';
  scheduled_at: string;
  paid_at?: string;
}

export interface ChatMessage {
  id: string;
  booking_id: string;
  sender_id: string;
  sender_name: string;
  sender_role: UserRole;
  receiver_id: string;
  body: string;
  original_body?: string;
  was_masked: boolean;
  created_at: string;
}

export interface Dispute {
  id: string;
  booking_id: string;
  raised_by_role: 'CLIENT' | 'VENDOR';
  raised_by_name: string;
  reason: string;
  status: 'OPEN' | 'UNDER_REVIEW' | 'RESOLVED_CLIENT' | 'RESOLVED_VENDOR' | 'SPLIT';
  resolution_notes?: string;
  created_at: string;
}

export interface PlatformSettings {
  commission_percent: number; // default 7%
  advance_percent: number; // default 30%
  payout_delay_days: number; // default 3 days
  platform_name: string;
  launch_city: string;
  support_phone: string;
  support_email: string;
}
