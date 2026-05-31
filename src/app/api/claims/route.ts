import { NextRequest, NextResponse } from 'next/server';

// Mock data for development - replace with database calls when DB is connected
const mockClaims = [
  {
    id: 1,
    orderId: 1,
    reason: 'Package arrived damaged',
    imageUrl: 'https://example.com/damage1.jpg',
    status: 'pending' as const,
    createdAt: new Date().toISOString(),
    orderTotal: '299.99',
    userId: 'user1'
  },
  {
    id: 2,
    orderId: 2,
    reason: 'Item not as described',
    status: 'approved' as const,
    createdAt: new Date().toISOString(),
    orderTotal: '199.99',
    userId: 'user2'
  }
];

export async function GET() {
  try {
    // Using mock data instead of database
    return NextResponse.json(mockClaims);
  } catch (error) {
    console.error('Error fetching claims:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { orderId, reason, imageUrl } = await request.json();
    
    // Mock response - in production, this would save to database
    const newClaim = {
      id: mockClaims.length + 1,
      orderId,
      reason,
      imageUrl,
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
      orderTotal: '299.99', // Mock value
      userId: 'user1' // Mock value
    };
    
    mockClaims.push(newClaim);
    
    return NextResponse.json(newClaim);
  } catch (error) {
    console.error('Error creating claim:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
