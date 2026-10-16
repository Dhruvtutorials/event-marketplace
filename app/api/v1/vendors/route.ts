import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_VENDORS } from '@/lib/db-seed';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const locality = searchParams.get('locality');
  const city = searchParams.get('city') || 'Ahmedabad';
  const minPrice = searchParams.get('min') ? Number(searchParams.get('min')) : undefined;
  const maxPrice = searchParams.get('max') ? Number(searchParams.get('max')) : undefined;
  const verifiedOnly = searchParams.get('verified') === 'true';

  let results = [...INITIAL_VENDORS];

  if (category) {
    results = results.filter((v) => v.category_ids.includes(category));
  }

  if (locality) {
    results = results.filter((v) => v.locality.toLowerCase().includes(locality.toLowerCase()));
  }

  if (city) {
    results = results.filter((v) => v.city.toLowerCase() === city.toLowerCase());
  }

  if (minPrice !== undefined) {
    results = results.filter((v) => v.min_price >= minPrice);
  }

  if (maxPrice !== undefined) {
    results = results.filter((v) => v.min_price <= maxPrice);
  }

  if (verifiedOnly) {
    results = results.filter((v) => v.verified_badge);
  }

  return NextResponse.json({
    success: true,
    total: results.length,
    data: results,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newVendor = {
      id: `vnd-${Date.now()}`,
      created_at: new Date().toISOString(),
      status: 'UNDER_REVIEW',
      kyc_status: 'UNDER_REVIEW',
      verified_badge: false,
      trust_score: 60,
      ...body,
    };

    return NextResponse.json({
      success: true,
      data: newVendor,
      message: 'Vendor submitted for Layer 1-3 KYC verification.',
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: { code: 'BAD_REQUEST', message: err.message } },
      { status: 400 }
    );
  }
}
