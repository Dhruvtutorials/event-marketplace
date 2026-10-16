import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { event_id, total_amount, payment_type, items } = await req.json();

    const advanceRate = 0.3; // 30% advance
    const payableAmount = payment_type === 'ADVANCE' ? Math.round(total_amount * advanceRate) : total_amount;

    // Simulate Razorpay Order generation
    const mockRazorpayOrderId = `order_${Math.random().toString(36).substring(2, 12).toUpperCase()}`;

    return NextResponse.json({
      success: true,
      data: {
        razorpay_order_id: mockRazorpayOrderId,
        amount_in_paise: payableAmount * 100,
        currency: 'INR',
        payment_type,
        payable_amount: payableAmount,
        advance_percentage: payment_type === 'ADVANCE' ? 30 : 100,
        event_id,
        escrow_mode: 'HELD_ON_PLATFORM',
        message: 'Razorpay order created successfully. Date lock initiated in transaction.',
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: { code: 'CHECKOUT_FAILED', message: err.message } },
      { status: 500 }
    );
  }
}
