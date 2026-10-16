// Utility helpers for Ahmedabad Event Marketplace

/**
 * Format number as Indian Rupee (INR)
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format date nicely e.g. "18 Nov 2026"
 */
export function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}

/**
 * Section 13 Rule 8: Anti-disintermediation Chat Masking
 * Masks 10-digit phone numbers, emails, and UPI IDs (e.g. name@okaxis, @okhdfcbank, @paytm, @upi)
 */
export function maskSensitiveContacts(text: string): { maskedText: string; wasMasked: boolean } {
  let maskedText = text;
  let wasMasked = false;

  // 1. Phone numbers: 10-digit Indian numbers with optional spaces, dashes, or +91
  const phoneRegex = /(\+?91[\-\s]?)?[6-9]\d{9}|(\d{5}[\s\-]\d{5})|(\d{3}[\s\-]\d{3}[\s\-]\d{4})/g;
  if (phoneRegex.test(maskedText)) {
    wasMasked = true;
    maskedText = maskedText.replace(phoneRegex, '🔒 [Contact Number Protected]');
  }

  // 2. Email addresses
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  if (emailRegex.test(maskedText)) {
    wasMasked = true;
    maskedText = maskedText.replace(emailRegex, '🔒 [Email Protected]');
  }

  // 3. UPI IDs (e.g., user@paytm, user@okicici, user@apl)
  const upiRegex = /[a-zA-Z0-9.\-_]{2,256}@(okhdfcbank|okaxis|okicici|oksbi|paytm|upi|ybl|ibl|axl)/gi;
  if (upiRegex.test(maskedText)) {
    wasMasked = true;
    maskedText = maskedText.replace(upiRegex, '🔒 [UPI ID Protected]');
  }

  return { maskedText, wasMasked };
}

/**
 * Calculate trust score based on verified documents, rating, response rate
 */
export function calculateTrustScore(hasVerifiedKyc: boolean, rating: number, responseRate: number): number {
  let score = 50;
  if (hasVerifiedKyc) score += 30;
  score += Math.round((rating / 5) * 15);
  score += Math.round((responseRate / 100) * 5);
  return Math.min(100, Math.max(0, score));
}
