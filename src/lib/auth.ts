import { NextRequest, NextResponse } from 'next/server';

// Authentication middleware
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Public paths that don't require authentication
  const publicPaths = [
    '/',
    '/signup',
    '/login',
    '/auth/verify',
    '/auth/error',
    '/api/auth/magic-link',
    '/api/auth/verify',
    '/api/audit'
  ];

  // Check if the path is public
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

  if (!isPublicPath) {
    // Check for session token or localStorage (for demo)
    const sessionToken = request.cookies.get('session_token');
    const userEmail = request.cookies.get('user_email');

    if (!sessionToken || !userEmail) {
      // Redirect to login if not authenticated
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

// Helper functions for client-side authentication
export function getAuthCookies(): { sessionToken: string | null; userEmail: string | null; userName: string | null } {
  if (typeof document === 'undefined') {
    return { sessionToken: null, userEmail: null, userName: null };
  }

  const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null;
    }
    return null;
  };

  // Check localStorage first for demo purposes
  const userEmail = localStorage.getItem('userEmail') || getCookie('user_email');
  const userName = localStorage.getItem('userName') || getCookie('user_name');
  const sessionToken = localStorage.getItem('isLoggedIn') === 'true' ? 'demo-token' : getCookie('session_token');

  return {
    sessionToken,
    userEmail,
    userName
  };
}

export function isLoggedIn(): boolean {
  const { sessionToken, userEmail } = getAuthCookies();
  return !!(sessionToken && userEmail);
}

export function getUserEmail(): string | null {
  const { userEmail } = getAuthCookies();
  return userEmail;
}

export function getUserName(): string | null {
  const { userName } = getAuthCookies();
  return userName;
}

export function logout(): void {
  if (typeof document !== 'undefined') {
    // Clear cookies
    document.cookie = 'session_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'user_email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'user_name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
    // Clear localStorage
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('isLoggedIn');
    
    window.location.href = '/';
  }
}
