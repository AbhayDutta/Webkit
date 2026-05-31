import { NextRequest, NextResponse } from 'next/server';

// Mock data for development - replace with database calls when DB is connected
const mockOrders = [
  {
    id: 1,
    userId: 'user1',
    totalAmount: '299.99',
    protectionEnabled: true,
    protectionFee: '29.99',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    userId: 'user2',
    totalAmount: '199.99',
    protectionEnabled: false,
    protectionFee: '0.00',
    createdAt: new Date().toISOString()
  }
];

export async function GET() {
  try {
    // Using mock data instead of database
    return NextResponse.json(mockOrders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, totalAmount, protectionEnabled, protectionFee } = await request.json();

    if (!userId || !totalAmount || protectionEnabled === undefined) {
      return NextResponse.json(
        { error: 'userId, totalAmount, and protectionEnabled are required' },
        { status: 400 }
      );
    }

    // Mock response - in production, this would save to database
    const newOrder = {
      id: mockOrders.length + 1,
      userId,
      totalAmount,
      protectionEnabled,
      protectionFee,
      createdAt: new Date().toISOString()
    };

    mockOrders.push(newOrder);

    return NextResponse.json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
