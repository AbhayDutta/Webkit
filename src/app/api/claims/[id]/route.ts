import { NextRequest, NextResponse } from 'next/server';

// Mock data - same as in the main claims route
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

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json();
    const claimId = parseInt(params.id);

    if (!status || !['approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'Valid status (approved/rejected) is required' },
        { status: 400 }
      );
    }

    // Mock update - in production, this would update the database
    const claimIndex = mockClaims.findIndex(claim => claim.id === claimId);
    
    if (claimIndex === -1) {
      return NextResponse.json(
        { error: 'Claim not found' },
        { status: 404 }
      );
    }

    mockClaims[claimIndex].status = status;

    return NextResponse.json({
      success: true,
      message: `Claim ${claimId} ${status} successfully`,
      claim: mockClaims[claimIndex]
    });

  } catch (error) {
    console.error('Error updating claim:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
