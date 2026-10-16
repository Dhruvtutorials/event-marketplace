'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMarketplace } from '@/lib/store';
import {
  Sparkles,
  Calendar,
  Users,
  MapPin,
  ArrowRight,
  HeartHandshake,
  Flame,
  Cake,
  Briefcase,
  IndianRupee,
} from 'lucide-react';

export default function NewEventPage() {
  const router = useRouter();
  const { eventTypes, createOrUpdateEvent, clientEvent, cities, selectedCity, setSelectedCity } = useMarketplace();

  const [selectedEventTypeId, setSelectedEventTypeId] = useState(eventTypes[0]?.id || 'evt-wedding');
  const [eventTitle, setEventTitle] = useState('Parth & Dhwani Grand Wedding');
  const [eventDate, setEventDate] = useState('2026-11-28');
  const [city, setCity] = useState(selectedCity === 'All Cities' ? 'Ahmedabad' : selectedCity);
  const [guestCount, setGuestCount] = useState(450);
  const [budgetMin, setBudgetMin] = useState(500000);
  const [budgetMax, setBudgetMax] = useState(900000);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const typeObj = eventTypes.find((t) => t.id === selectedEventTypeId) || eventTypes[0];

    createOrUpdateEvent({
      event_type_id: typeObj.id,
      event_type_name: typeObj.name,
      title: eventTitle,
      event_date: eventDate,
      city,
      locality: city,
      guest_count: guestCount,
      budget_min: budgetMin,
      budget_max: budgetMax,
      status: 'PLANNING',
    });

    router.push(`/events/${clientEvent.id}`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8 text-gray-900 dark:text-gray-100">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
          Step 1 &amp; 2: Event Initialization
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-950 dark:text-white">
          Plan Your Event in Any City
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          Enter event parameters to generate a custom service checklist, budget tracker, and verified vendor match.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step A: Event Type Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Choose Event Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {eventTypes.map((et) => {
                const isSelected = selectedEventTypeId === et.id;
                return (
                  <button
                    type="button"
                    key={et.id}
                    onClick={() => {
                      setSelectedEventTypeId(et.id);
                      if (eventTitle.includes('Wedding') && et.slug === 'garba') {
                        setEventTitle('Dandiya & Garba Raas Festival');
                      }
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'border-orange-600 bg-orange-50/50 dark:bg-orange-950/30 ring-2 ring-orange-500/20 shadow-xs'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
                    }`}
                  >
                    <div className="text-orange-600 mb-2">
                      {et.slug === 'wedding' && <HeartHandshake className="w-5 h-5" />}
                      {et.slug === 'garba' && <Flame className="w-5 h-5" />}
                      {et.slug === 'birthday' && <Cake className="w-5 h-5" />}
                      {et.slug === 'corporate' && <Briefcase className="w-5 h-5" />}
                    </div>
                    <h4 className="font-bold text-xs text-gray-900 dark:text-white leading-tight">{et.name}</h4>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Event Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Event Title / Occasion Name
            </label>
            <input
              type="text"
              required
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              placeholder="e.g. Royal Wedding Celebration"
              className="w-full text-xs font-medium px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Date & City Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-orange-600" />
                Target Date
              </label>
              <input
                type="date"
                required
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full text-xs font-semibold px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-orange-600" />
                City
              </label>
              <select
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setSelectedCity(e.target.value);
                }}
                className="w-full text-xs font-semibold px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {cities.filter(c => c !== 'All Cities').map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Guest Count & Budget Range */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-orange-600" />
                Estimated Guests
              </label>
              <input
                type="number"
                min="20"
                max="5000"
                step="50"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full text-xs font-semibold px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider flex items-center gap-1">
                <IndianRupee className="w-3.5 h-3.5 text-gray-500" />
                Min Target Budget
              </label>
              <input
                type="number"
                min="50000"
                step="25000"
                value={budgetMin}
                onChange={(e) => setBudgetMin(Number(e.target.value))}
                className="w-full text-xs font-semibold px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider flex items-center gap-1">
                <IndianRupee className="w-3.5 h-3.5 text-orange-600" />
                Max Target Budget
              </label>
              <input
                type="number"
                min="100000"
                step="50000"
                value={budgetMax}
                onChange={(e) => setBudgetMax(Number(e.target.value))}
                className="w-full text-xs font-semibold px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-end">
            <button
              type="submit"
              className="py-3 px-6 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-md shadow-orange-500/30 flex items-center gap-2 transition-transform active:scale-95"
            >
              <span>Build Event Plan &amp; Checklist</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
