import { NextResponse } from 'next/server';
import { INITIAL_EVENT_TYPES, INITIAL_CATEGORIES } from '@/lib/db-seed';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: INITIAL_EVENT_TYPES.map((et) => ({
      ...et,
      categories: INITIAL_CATEGORIES.filter((c) => et.required_category_ids.includes(c.id)),
    })),
  });
}
