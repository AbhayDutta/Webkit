"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, XCircle, Loader2, AlertTriangle } from 'lucide-react';

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      setStatus('error');
      setMessage('No verification token found');
      return;
    }

    // Call the verification API
    verifyToken(token);
  }, [searchParams, router]);

  const verifyToken = async (token: string) => {
    try {
      console.log('🔍 Verifying token:', token.substring(0, 10) + '...');
      
      const response = await fetch(`/api/auth/verify?token=${token}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('📡 Verification response status:', response.status);
      
      if (response.ok) {
        setStatus('success');
        setMessage('Authentication successful! Redirecting to dashboard...');
        
        // Redirect to dashboard after a short delay
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      } else {
        const errorData = await response.json().catch(() => ({}));
        setStatus('error');
        setMessage(errorData.error || 'Invalid or expired magic link');
        console.log('❌ Verification failed:', errorData);
      }
    } catch (error) {
      console.error('🚨 Verification error:', error);
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <Card className="max-w-md w-full border-gray-200 shadow-lg">
        <CardContent className="p-8 text-center">
          {status === 'loading' && (
            <>
              <Loader2 className="w-12 h-12 text-foreground animate-spin mx-auto mb-4" />
              <h1 className="text-2xl font-medium mb-2">Verifying...</h1>
              <p className="text-muted-foreground">
                Please wait while we verify your magic link.
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h1 className="text-2xl font-medium mb-2">Welcome Back!</h1>
              <p className="text-muted-foreground">
                {message}
              </p>
              <div className="mt-4">
                <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            </>
          )}

          {status === 'error' && (
            <>
              <XCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h1 className="text-2xl font-medium mb-2">Authentication Failed</h1>
              <p className="text-muted-foreground mb-6">
                {message}
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={() => router.push('/signup')}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg px-4 py-3 transition-colors"
                >
                  Request New Magic Link
                </button>
                <button
                  onClick={() => router.push('/login')}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium rounded-lg px-4 py-3 transition-colors"
                >
                  Try Instant Login
                </button>
              </div>

              <div className="mt-6 text-left">
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-2"
                >
                  <AlertTriangle className="w-4 h-4" />
                  {showDetails ? 'Hide' : 'Show'} troubleshooting
                </button>
                
                {showDetails && (
                  <div className="mt-3 p-3 bg-gray-50 rounded text-sm text-gray-600">
                    <p className="font-medium mb-2">Chrome Users - Quick Fix:</p>
                    <ol className="space-y-1 text-xs ml-4">
                      <li>1. Copy the token below</li>
                      <li>2. Go to: <code className="bg-gray-200 px-1 rounded">http://localhost:3000/auth/verify</code></li>
                      <li>3. Add <code>?token=YOUR_TOKEN</code> to the URL</li>
                    </ol>
                    
                    <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded">
                      <p className="text-xs font-mono break-all">
                        <strong>Your Token:</strong> {token?.substring(0, 20)}...
                      </p>
                      <button
                        onClick={() => {
                          if (token) {
                            navigator.clipboard.writeText(token);
                            alert('Token copied to clipboard!');
                          }
                        }}
                        className="mt-2 w-full bg-yellow-500 hover:bg-yellow-600 text-white text-xs px-2 py-1 rounded"
                      >
                        📋 Copy Full Token
                      </button>
                    </div>
                    
                    <p className="font-medium mb-2 mt-4">Common issues:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Link may have expired (15-minute timeout)</li>
                      <li>• Link may have already been used</li>
                      <li>• Chrome may block email links - use copy/paste method</li>
                      <li>• Try the instant login option</li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
