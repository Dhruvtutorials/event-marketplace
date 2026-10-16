// Central state management with browser localStorage persistence & React state
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Vendor,
  ClientEvent,
  Booking,
  ServiceCategory,
  EventType,
  SubscriptionPlan,
  PlatformSettings,
  ChatMessage,
  Dispute,
  UserRole,
} from '@/types';
import {
  INITIAL_CATEGORIES,
  INITIAL_EVENT_TYPES,
  INITIAL_PLANS,
  INITIAL_SETTINGS,
  INITIAL_VENDORS,
  INITIAL_CLIENT_EVENT,
  INITIAL_BOOKINGS,
} from './db-seed';
import { maskSensitiveContacts } from './utils';

interface MarketplaceContextType {
  // Current user persona
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  currentVendorId: string;
  setCurrentVendorId: (id: string) => void;

  // Master Data
  settings: PlatformSettings;
  updateSettings: (newSettings: Partial<PlatformSettings>) => void;
  categories: ServiceCategory[];
  eventTypes: EventType[];
  plans: SubscriptionPlan[];
  vendors: Vendor[];

  // Client Event & Plan
  clientEvent: ClientEvent;
  createOrUpdateEvent: (eventData: Partial<ClientEvent>) => void;
  addVendorToPlan: (
    categoryId: string,
    vendor: Vendor,
    packageId: string,
    addons?: { id: string; name: string; price: number }[]
  ) => void;
  removePlanItem: (itemId: string) => void;
  checkoutEventPlan: (paymentType: 'ADVANCE' | 'FULL') => Booking[];

  // Bookings
  bookings: Booking[];
  updateBookingStatus: (
    bookingId: string,
    newStatus: Booking['status'],
    details?: { counterAmount?: number; counterNote?: string; reason?: string }
  ) => void;

  // Vendor Management
  getVendorById: (id: string) => Vendor | undefined;
  updateVendorKyc: (vendorId: string, status: 'APPROVED' | 'REJECTED' | 'SUSPENDED' | 'BANNED', remarks?: string) => void;
  registerVendor: (vendorData: Partial<Vendor>) => Vendor;
  updateVendorSubscription: (vendorId: string, planId: string) => void;
  updateVendorServices: (vendorId: string, services: Vendor['services']) => void;

  // Chat
  messages: ChatMessage[];
  sendMessage: (bookingId: string, body: string) => void;

  // Disputes
  disputes: Dispute[];
  raiseDispute: (bookingId: string, reason: string) => void;
  resolveDispute: (disputeId: string, resolution: Dispute['status'], notes: string) => void;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export function MarketplaceProvider({ children }: { children: React.ReactNode }) {
  const [currentRole, setCurrentRole] = useState<UserRole>('CLIENT');
  const [currentVendorId, setCurrentVendorId] = useState<string>('vnd-1');

  const [settings, setSettings] = useState<PlatformSettings>(INITIAL_SETTINGS);
  const [categories, setCategories] = useState<ServiceCategory[]>(INITIAL_CATEGORIES);
  const [eventTypes, setEventTypes] = useState<EventType[]>(INITIAL_EVENT_TYPES);
  const [plans, setPlans] = useState<SubscriptionPlan[]>(INITIAL_PLANS);
  const [vendors, setVendors] = useState<Vendor[]>(INITIAL_VENDORS);
  const [clientEvent, setClientEvent] = useState<ClientEvent>(INITIAL_CLIENT_EVENT);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      booking_id: 'bk-101',
      sender_id: 'usr-client-1',
      sender_name: 'Aarav Patel',
      sender_role: 'CLIENT',
      receiver_id: 'vnd-1',
      body: 'Namaste Parth bhai, kya hum 20 November ko sham ko 4 baje decoration setup start kar sakte hain?',
      was_masked: false,
      created_at: '2026-03-02T15:00:00Z',
    },
    {
      id: 'msg-2',
      booking_id: 'bk-101',
      sender_id: 'vnd-1',
      sender_name: 'Shubh Mangal Party Plot',
      sender_role: 'VENDOR',
      receiver_id: 'usr-client-1',
      body: 'Haanji Aarav bhai, lawn 3 baje se available ho jayega. Hamari team wahan ready rahegi.',
      was_masked: false,
      created_at: '2026-03-02T15:30:00Z',
    },
  ]);
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedSettings = localStorage.getItem('utsav_settings');
      if (storedSettings) setSettings(JSON.parse(storedSettings));

      const storedVendors = localStorage.getItem('utsav_vendors');
      if (storedVendors) setVendors(JSON.parse(storedVendors));

      const storedEvent = localStorage.getItem('utsav_client_event');
      if (storedEvent) setClientEvent(JSON.parse(storedEvent));

      const storedBookings = localStorage.getItem('utsav_bookings');
      if (storedBookings) setBookings(JSON.parse(storedBookings));

      const storedMessages = localStorage.getItem('utsav_messages');
      if (storedMessages) setMessages(JSON.parse(storedMessages));
    } catch {
      // fallback to initial
    }
    setIsLoaded(true);
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('utsav_settings', JSON.stringify(settings));
      localStorage.setItem('utsav_vendors', JSON.stringify(vendors));
      localStorage.setItem('utsav_client_event', JSON.stringify(clientEvent));
      localStorage.setItem('utsav_bookings', JSON.stringify(bookings));
      localStorage.setItem('utsav_messages', JSON.stringify(messages));
    } catch {
      // handle error
    }
  }, [settings, vendors, clientEvent, bookings, messages, isLoaded]);

  const updateSettings = (newSettings: Partial<PlatformSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const createOrUpdateEvent = (eventData: Partial<ClientEvent>) => {
    setClientEvent((prev) => {
      const updated = { ...prev, ...eventData };
      return updated;
    });
  };

  const addVendorToPlan = (
    categoryId: string,
    vendor: Vendor,
    packageId: string,
    addons: { id: string; name: string; price: number }[] = []
  ) => {
    const service = vendor.services.find((s) => s.category_id === categoryId) || vendor.services[0];
    const pkg = service?.packages.find((p) => p.id === packageId) || service?.packages[0];

    const packagePrice = pkg?.price || vendor.min_price;
    const addonsTotal = addons.reduce((sum, a) => sum + a.price, 0);
    const totalPrice = packagePrice + addonsTotal;

    const newItem = {
      id: `item-${Date.now()}`,
      event_id: clientEvent.id,
      category_id: categoryId,
      vendor_id: vendor.id,
      vendor_name: vendor.business_name,
      package_id: pkg?.id,
      package_name: pkg?.name,
      addons,
      price: totalPrice,
      status: 'SELECTED' as const,
    };

    setClientEvent((prev) => {
      // Replace existing category item if present, else append
      const filtered = prev.plan_items.filter((item) => item.category_id !== categoryId);
      return {
        ...prev,
        plan_items: [...filtered, newItem],
      };
    });
  };

  const removePlanItem = (itemId: string) => {
    setClientEvent((prev) => ({
      ...prev,
      plan_items: prev.plan_items.filter((item) => item.id !== itemId),
    }));
  };

  const checkoutEventPlan = (paymentType: 'ADVANCE' | 'FULL') => {
    const newBookings: Booking[] = clientEvent.plan_items
      .filter((item) => item.vendor_id)
      .map((item) => {
        const advanceAmount = Math.round(item.price * (settings.advance_percent / 100));
        return {
          id: `bk-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          event_plan_item_id: item.id,
          event_id: clientEvent.id,
          event_title: clientEvent.title,
          client_id: clientEvent.client_id,
          client_name: 'Parth Patel (Client)',
          client_phone: '+91 98250 99999',
          vendor_id: item.vendor_id!,
          vendor_name: item.vendor_name || 'Vendor',
          category_name: categories.find((c) => c.id === item.category_id)?.name || 'Service',
          event_date: clientEvent.event_date,
          amount: item.price,
          advance_amount: advanceAmount,
          remaining_amount: item.price - advanceAmount,
          status: 'CONFIRMED' as const,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
      });

    setBookings((prev) => [...newBookings, ...prev]);

    // Mark plan items as confirmed
    setClientEvent((prev) => ({
      ...prev,
      status: 'BOOKED',
      plan_items: prev.plan_items.map((i) => ({ ...i, status: 'CONFIRMED' })),
    }));

    return newBookings;
  };

  const updateBookingStatus = (
    bookingId: string,
    newStatus: Booking['status'],
    details?: { counterAmount?: number; counterNote?: string; reason?: string }
  ) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          status: newStatus,
          counter_amount: details?.counterAmount ?? b.counter_amount,
          counter_note: details?.counterNote ?? b.counter_note,
          cancellation_reason: details?.reason ?? b.cancellation_reason,
          updated_at: new Date().toISOString(),
        };
      })
    );
  };

  const getVendorById = (id: string) => vendors.find((v) => v.id === id);

  const updateVendorKyc = (
    vendorId: string,
    status: 'APPROVED' | 'REJECTED' | 'SUSPENDED' | 'BANNED',
    remarks?: string
  ) => {
    setVendors((prev) =>
      prev.map((v) => {
        if (v.id !== vendorId) return v;
        const isApproved = status === 'APPROVED';
        return {
          ...v,
          kyc_status: isApproved ? 'APPROVED' : 'REJECTED',
          verified_badge: isApproved,
          trust_score: isApproved ? Math.max(90, v.trust_score) : 40,
          status: status === 'APPROVED' ? 'ACTIVE' : (status as any),
          documents: v.documents.map((d) => ({
            ...d,
            status: isApproved ? 'APPROVED' : 'REJECTED',
            remarks: remarks || d.remarks,
          })),
        };
      })
    );
  };

  const registerVendor = (vendorData: Partial<Vendor>): Vendor => {
    const newVendor: Vendor = {
      id: `vnd-${Date.now()}`,
      user_id: `usr-vnd-${Date.now()}`,
      business_name: vendorData.business_name || 'New Ahmedabad Business',
      owner_name: vendorData.owner_name || 'Business Owner',
      category_ids: vendorData.category_ids || ['cat-venue'],
      city: 'Ahmedabad',
      locality: vendorData.locality || 'SG Highway',
      address: vendorData.address || 'Ahmedabad, Gujarat',
      gst_no: vendorData.gst_no,
      pan_no: vendorData.pan_no,
      description: vendorData.description || 'Verified wedding & event vendor in Ahmedabad.',
      cover_image:
        vendorData.cover_image ||
        'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
      gallery: [],
      kyc_status: 'UNDER_REVIEW',
      verified_badge: false,
      trust_score: 70,
      status: 'UNDER_REVIEW',
      response_rate: 100,
      profile_completion: 80,
      rating: 5.0,
      review_count: 0,
      min_price: vendorData.min_price || 25000,
      services: vendorData.services || [],
      documents: vendorData.documents || [],
      bank_account: vendorData.bank_account,
      current_subscription: {
        id: `sub-${Date.now()}`,
        vendor_id: `vnd-${Date.now()}`,
        plan_id: 'plan-basic',
        start_date: new Date().toISOString().split('T')[0],
        end_date: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
        status: 'ACTIVE',
        auto_renew: true,
      },
      created_at: new Date().toISOString(),
    };

    setVendors((prev) => [newVendor, ...prev]);
    return newVendor;
  };

  const updateVendorSubscription = (vendorId: string, planId: string) => {
    setVendors((prev) =>
      prev.map((v) => {
        if (v.id !== vendorId) return v;
        return {
          ...v,
          current_subscription: {
            id: `sub-${Date.now()}`,
            vendor_id: vendorId,
            plan_id: planId,
            start_date: new Date().toISOString().split('T')[0],
            end_date: new Date(Date.now() + 365 * 86400000).toISOString().split('T')[0],
            status: 'ACTIVE',
            auto_renew: true,
          },
        };
      })
    );
  };

  const updateVendorServices = (vendorId: string, services: Vendor['services']) => {
    setVendors((prev) =>
      prev.map((v) => (v.id === vendorId ? { ...v, services } : v))
    );
  };

  const sendMessage = (bookingId: string, body: string) => {
    const { maskedText, wasMasked } = maskSensitiveContacts(body);
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      booking_id: bookingId,
      sender_id: currentRole === 'VENDOR' ? currentVendorId : 'usr-client-1',
      sender_name: currentRole === 'VENDOR' ? 'Vendor Representative' : 'Parth Patel (Client)',
      sender_role: currentRole,
      receiver_id: currentRole === 'VENDOR' ? 'usr-client-1' : currentVendorId,
      body: maskedText,
      original_body: wasMasked ? body : undefined,
      was_masked: wasMasked,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  const raiseDispute = (bookingId: string, reason: string) => {
    const newDispute: Dispute = {
      id: `dsp-${Date.now()}`,
      booking_id: bookingId,
      raised_by_role: currentRole === 'VENDOR' ? 'VENDOR' : 'CLIENT',
      raised_by_name: currentRole === 'VENDOR' ? 'Vendor' : 'Client',
      reason,
      status: 'OPEN',
      created_at: new Date().toISOString(),
    };
    setDisputes((prev) => [newDispute, ...prev]);
    updateBookingStatus(bookingId, 'DISPUTED');
  };

  const resolveDispute = (disputeId: string, resolution: Dispute['status'], notes: string) => {
    setDisputes((prev) =>
      prev.map((d) => (d.id === disputeId ? { ...d, status: resolution, resolution_notes: notes } : d))
    );
  };

  return (
    <MarketplaceContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        currentVendorId,
        setCurrentVendorId,
        settings,
        updateSettings,
        categories,
        eventTypes,
        plans,
        vendors,
        clientEvent,
        createOrUpdateEvent,
        addVendorToPlan,
        removePlanItem,
        checkoutEventPlan,
        bookings,
        updateBookingStatus,
        getVendorById,
        updateVendorKyc,
        registerVendor,
        updateVendorSubscription,
        updateVendorServices,
        messages,
        sendMessage,
        disputes,
        raiseDispute,
        resolveDispute,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
}
