import { NextRequest, NextResponse } from 'next/server';
import { verifyMagicLink } from '../magic-link/route';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    console.log('=== MAGIC LINK VERIFICATION ===');
    console.log('Request URL:', request.url);
    console.log('Token:', token);

    if (!token) {
      console.log('❌ No token provided');
      return NextResponse.json(
        { error: 'No verification token provided' },
        { status: 400 }
      );
    }

    // Verify the magic link
    const result = verifyMagicLink(token);
    console.log('Verification result:', result);

    if (!result || !result.valid) {
      console.log('❌ Invalid or expired token');
      return NextResponse.json(
        { error: 'Invalid or expired magic link' },
        { status: 400 }
      );
    }

    console.log('✅ Token valid for email:', result.email, 'name:', result.name);

    // Create a session token (in a real app, you'd use a proper JWT or session store)
    const sessionToken = Buffer.from(`${result.email}:${Date.now()}`).toString('base64');
    
    // Set the session cookie
    const response = NextResponse.redirect(
      new URL('/dashboard', request.url)
    );

    response.cookies.set('session_token', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/'
    });

    response.cookies.set('user_email', result.email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/'
    });

    response.cookies.set('user_name', result.name, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/'
    });

    console.log('✅ Session created, redirecting to dashboard');
    console.log('============================');

    return response;

  } catch (error) {
    console.error('Magic link verification error:', error);
    return NextResponse.json(
      { error: 'Server error during verification' },
      { status: 500 }
    );
  }
}
