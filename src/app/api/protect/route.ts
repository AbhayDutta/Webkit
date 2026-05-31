import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { totalAmount } = await request.json();

    if (!totalAmount || isNaN(totalAmount)) {
      return NextResponse.json(
        { error: 'Valid total amount is required' },
        { status: 400 }
      );
    }

    const total = parseFloat(totalAmount);
    let protectionFee = 0;

    if (total < 1000) {
      protectionFee = 20;
    } else if (total < 5000) {
      protectionFee = 50;
    } else {
      protectionFee = 100;
    }

    return NextResponse.json({
      protectionFee,
      totalWithProtection: total + protectionFee,
    });
  } catch (error) {
    console.error('Protection calculation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
