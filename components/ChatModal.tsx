'use client';

import React, { useState } from 'react';
import { useMarketplace } from '@/lib/store';
import { Send, ShieldAlert, Lock, User, Store } from 'lucide-react';

interface ChatModalProps {
  bookingId: string;
  vendorName: string;
  clientName: string;
  onClose?: () => void;
}

export function ChatModal({ bookingId, vendorName, clientName, onClose }: ChatModalProps) {
  const { currentRole, messages, sendMessage } = useMarketplace();
  const [inputText, setInputText] = useState('');
  const [lastWarning, setLastWarning] = useState<string | null>(null);

  const bookingMessages = messages.filter((m) => m.booking_id === bookingId);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    sendMessage(bookingId, inputText);

    // Check if what they typed had sensitive info to give educational feedback
    const phoneOrUpiRegex = /(\+?91[\-\s]?)?[6-9]\d{9}|@[a-zA-Z]{3,}/i;
    if (phoneOrUpiRegex.test(inputText)) {
      setLastWarning('Security Rule 8: Direct phone number or UPI ID was detected and masked for platform safety & escrow warranty protection.');
      setTimeout(() => setLastWarning(null), 6000);
    }

    setInputText('');
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xl flex flex-col h-[520px] max-w-lg w-full">
      {/* Header */}
      <div className="p-4 bg-gray-900 text-white flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h4 className="text-sm font-bold">
              {currentRole === 'VENDOR' ? clientName : vendorName}
            </h4>
          </div>
          <p className="text-[11px] text-gray-400 mt-0.5">Booking Reference: #{bookingId}</p>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-800 text-[11px] text-amber-300 font-medium">
          <Lock className="w-3 h-3 text-amber-400" />
          <span>Anti-Fraud Shield Active</span>
        </div>
      </div>

      {/* Safety Notice Banner */}
      <div className="bg-amber-50 border-b border-amber-200 px-3.5 py-2 text-[11px] text-amber-800 flex items-start gap-2">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <span>
          <strong>Platform Policy (Rule 8):</strong> Sharing personal phone numbers, emails, or direct UPI payments is restricted to protect your 100% advance refund guarantee.
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50">
        {bookingMessages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 text-xs p-6">
            <p className="font-semibold text-gray-600 mb-1">Start your conversation</p>
            <p>Clarify event timings, decoration preferences, menu tasting, or special requests.</p>
          </div>
        ) : (
          bookingMessages.map((msg) => {
            const isMe = msg.sender_role === currentRole;
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-1.5 text-[10px] text-gray-400 mb-1 px-1">
                  <span>{msg.sender_name}</span>
                  <span>•</span>
                  <span>{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>

                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-sm ${
                    isMe
                      ? 'bg-orange-600 text-white rounded-br-sm'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm'
                  }`}
                >
                  <p>{msg.body}</p>

                  {msg.was_masked && (
                    <span className="block mt-1 text-[10px] text-amber-200 italic font-medium">
                      ⚠️ Contact details automatically shielded by platform security
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Feedback Toast if masked */}
      {lastWarning && (
        <div className="bg-red-50 border-t border-red-200 px-3.5 py-1.5 text-[11px] text-red-700 animate-fadeIn">
          {lastWarning}
        </div>
      )}

      {/* Message Input Box */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-200 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Message as ${currentRole === 'VENDOR' ? 'Vendor' : 'Client'} (Try typing phone or UPI)...`}
          className="flex-1 px-3.5 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-gray-50 focus:bg-white"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-2.5 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
