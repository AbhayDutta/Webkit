"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, ArrowRight, CheckCircle, Shield, Zap, BarChart3 } from 'lucide-react';
import Link2 from 'next/link';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/magic-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name }),
      });

      if (!response.ok) {
        throw new Error('Failed to send magic link');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      // Show more detailed error message
      alert(`Failed to send magic link: ${errorMessage}\n\nPlease check:\n- Email address is valid\n- Network connection is stable\n- Try again in a moment`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Benefits */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-medium mb-6">
                  Start auditing websites like a pro
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Join thousands of developers and businesses who trust WebKit 
                  to keep their websites running perfectly.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">40+ Automated Checks</h3>
                    <p className="text-muted-foreground text-sm">
                      Comprehensive audits covering SEO, performance, security, accessibility, and more.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Lightning Fast</h3>
                    <p className="text-muted-foreground text-sm">
                      Get detailed audit results in seconds, not minutes. No waiting around.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Actionable Insights</h3>
                    <p className="text-muted-foreground text-sm">
                      Get specific recommendations with priority levels to fix issues efficiently.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>5 free audits per month</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="max-w-md mx-auto w-full">
              {!isSubmitted ? (
                <Card className="border-border shadow-lg bg-card">
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-medium mb-2">Create your account</h2>
                      <p className="text-muted-foreground text-sm">
                        Enter your email to get started with WebKit
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                          Your Name
                        </label>
                        <div className="relative">
                          <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:border-primary text-foreground placeholder:text-muted-foreground"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                          Email address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                          <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-lg focus:outline-none focus:border-primary text-foreground placeholder:text-muted-foreground"
                            required
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={isLoading || !email || !name}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        size="lg"
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Sending magic link...
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            Send magic link
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        )}
                      </Button>
                    </form>

                    <div className="mt-6 text-center">
                      <p className="text-sm text-muted-foreground">
                        Already have an account?{' '}
                        <Link2 href="/login" className="text-primary hover:underline">
                          Sign in
                        </Link2>
                      </p>
                    </div>

                    <div className="mt-6 text-center">
                      <p className="text-xs text-muted-foreground">
                        No password needed. We'll create your account automatically.
                      </p>
                    </div>

                    <div className="mt-6 pt-6 border-t border-border">
                      <p className="text-xs text-muted-foreground text-center">
                        By signing up, you agree to our{' '}
                        <Link2 href="/terms" className="text-primary hover:underline">
                          Terms of Service
                        </Link2>{' '}
                        and{' '}
                        <Link2 href="/privacy" className="text-primary hover:underline">
                          Privacy Policy
                        </Link2>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-border shadow-lg bg-card">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h2 className="text-2xl font-medium mb-4">Check your email</h2>
                    <p className="text-muted-foreground mb-8">
                      We've sent a magic link to{' '}
                      <span className="font-semibold text-foreground">{email}</span>
                    </p>
                    <p className="text-muted-foreground mb-8">
                      Click the link in the email to sign in instantly. The link expires in 15 minutes.
                    </p>

                    <div className="space-y-4">
                      <Button
                        onClick={() => setIsSubmitted(false)}
                        variant="outline"
                        className="w-full border-border text-foreground hover:bg-secondary"
                      >
                        Send another link
                      </Button>
                      
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">
                          Didn't receive the email? Check your spam folder or{' '}
                          <button
                            onClick={() => setIsSubmitted(false)}
                            className="text-primary hover:underline"
                          >
                            try again
                          </button>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
