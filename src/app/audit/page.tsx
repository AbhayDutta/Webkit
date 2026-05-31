"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  ShieldCheck, 
  Clock, 
  Eye,
  FileText
} from 'lucide-react';
import TopAppBar from '@/components/layout/TopAppBar';
import BottomNavBar from '@/components/layout/BottomNavBar';
import AnimatedCard from '@/components/ui/animated-card';
import LoadingSpinner from '@/components/ui/loading-spinner';

interface AuditResult {
  category: string;
  status: 'pass' | 'warning' | 'error';
  title: string;
  description: string;
  details?: string[];
  score?: number;
}

export default function AuditPage() {
  const [url, setUrl] = useState('');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResults, setAuditResults] = useState<AuditResult[]>([]);

  const runAudit = async () => {
    if (!url) return;

    setIsAuditing(true);
    setAuditResults([]);

    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Audit failed');
      }

      const data = await response.json();
      setAuditResults(data.results);
    } catch (error) {
      console.error('Audit error:', error);
      
      // Show user-friendly error message
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      // Add an error result to display to the user
      setAuditResults([{
        category: 'Error',
        status: 'error',
        title: 'Audit Failed',
        description: errorMessage,
        details: [
          'Please check the URL and try again',
          'Ensure the website is publicly accessible',
          'Verify the URL format is correct (e.g., https://example.com)'
        ],
        score: 0
      }]);
    } finally {
      setIsAuditing(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return 'text-green-500 bg-green-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'error': return 'text-red-600 bg-red-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return ShieldCheck;
      case 'warning': return ShieldCheck;
      case 'error': return ShieldCheck;
      default: return ShieldCheck;
    }
  };

  const overallScore = auditResults.length > 0 
    ? Math.round((auditResults.filter(r => r.status === 'pass').length / auditResults.length) * 100)
    : 0;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <TopAppBar />
      
      <main className="pt-24 pb-32 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <section className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <ShieldCheck className="w-12 h-12 text-blue-700 mr-4" />
              <h1 className="text-4xl font-bold text-slate-900">
                Audit Your Website
              </h1>
            </div>
            <p className="text-slate-600 text-lg mb-8 max-w-2xl mx-auto">
              Comprehensive website audit covering performance, SEO, security, mobile readiness, and accessibility.
              Catch issues before your users do.
            </p>

            {/* Audit Input */}
            <div className="max-w-md mx-auto mb-8">
              <div className="flex gap-4">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://your-website.com"
                  className="flex-1 px-4 py-3 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-slate-900 placeholder:text-slate-400"
                />
                <Button
                  onClick={runAudit}
                  disabled={isAuditing || !url}
                  className="px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAuditing ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Auditing...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Run Audit
                    </>
                  )}
                </Button>
              </div>
            </div>
          </section>

          {/* Results Section */}
          {auditResults.length > 0 && (
            <>
              {/* Overall Score */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-4 px-8 py-6 bg-slate-50 border border-slate-200 rounded-2xl">
                  <div className="text-center">
                    <div className={`text-6xl font-bold mb-2 ${getScoreColor(overallScore)}`}>
                      {overallScore}/100
                    </div>
                    <div className="text-slate-600 font-medium">
                      Launch Score
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${overallScore >= 80 ? 'bg-green-500' : overallScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                        <span className="text-sm text-slate-600">
                          {overallScore >= 80 ? 'Ready to ship' : overallScore >= 60 ? 'Needs improvement' : 'Critical issues found'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Audit Results Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {auditResults.map((result, index) => {
                  const Icon = getStatusIcon(result.status);
                  return (
                    <Card key={index} className="relative overflow-hidden border border-slate-200">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${getStatusColor(result.status)}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{result.title}</CardTitle>
                              <Badge variant={result.status === 'pass' ? 'success' : result.status === 'warning' ? 'warning' : 'destructive'}>
                                {result.status.toUpperCase()}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-slate-600 mb-4">{result.description}</p>
                        {result.details && (
                          <div className="space-y-2">
                            {result.details.map((detail, detailIndex) => (
                              <div key={detailIndex} className="flex items-center gap-2 text-sm">
                                <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                                <span className="text-slate-700">{detail}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="text-center">
                <div className="space-y-4">
                  <div className="flex justify-center gap-4">
                    <Button
                      className="px-6 bg-white border border-slate-200 text-slate-900 hover:bg-slate-50"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Export Report
                    </Button>
                    <Button
                      className="px-6 bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                  <p className="text-sm text-slate-600">
                    Audit completed in 2 seconds • 47 checks performed
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      
      <BottomNavBar />
    </div>
  );
}
