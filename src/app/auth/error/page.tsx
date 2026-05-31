"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { XCircle, AlertTriangle } from 'lucide-react';

export default function AuthErrorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const getErrorMessage = (errorCode: string | null) => {
    switch (errorCode) {
      case 'missing_token':
        return 'No verification token found. Please request a new magic link.';
      case 'invalid_token':
        return 'The magic link is invalid or has expired. Please request a new one.';
      case 'server_error':
        return 'A server error occurred. Please try again later.';
      default:
        return 'An unknown error occurred during authentication.';
    }
  };

  const getErrorIcon = (errorCode: string | null) => {
    switch (errorCode) {
      case 'server_error':
        return AlertTriangle;
      default:
        return XCircle;
    }
  };

  const ErrorIcon = getErrorIcon(error);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex items-center justify-center px-6">
      <Card className="max-w-md w-full border-slate-200">
        <CardContent className="p-8 text-center">
          <ErrorIcon className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Authentication Error</h1>
          <p className="text-slate-600 mb-6">
            {getErrorMessage(error)}
          </p>
          <div className="space-y-3">
            <button
              onClick={() => router.push('/signup')}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl px-4 py-3 transition-colors"
            >
              Request New Magic Link
            </button>
            <button
              onClick={() => router.push('/')}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold rounded-xl px-4 py-3 transition-colors"
            >
              Go to Homepage
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
