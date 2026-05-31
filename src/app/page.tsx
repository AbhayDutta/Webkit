"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Shield,
  Zap,
  Globe,
  Smartphone,
  Eye,
  Mail,
  BarChart3,
  Lock,
  FileText,
  Search,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import AuditForm from '@/components/common/AuditForm';
import AuditResults from '@/components/common/AuditResults';
import Link2 from 'next/link';

export default function HomePage() {
  const [isScanning, setIsScanning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [auditResults, setAuditResults] = useState<any[]>([]);
  const [overallScore, setOverallScore] = useState<number>();

  const handleScan = async (url: string) => {
    setIsScanning(true);
    console.log('Starting audit for URL:', url);
    
    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
        body: JSON.stringify({ url, timestamp: Date.now() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Audit failed');
      }

      const data = await response.json();
      console.log('Audit API response:', data);
      console.log('Setting audit results:', data.results);
      console.log('Setting overall score:', data.overallScore);
      
      setAuditResults(data.results);
      setOverallScore(data.overallScore);
      setShowResults(true);
    } catch (error) {
      console.error('Audit error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Audit failed: ${errorMessage}\n\nPlease check the URL and try again.`);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section - WebKit.com style */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/20"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="mb-10">
            <h1 className="text-6xl md:text-7xl font-light mb-8 tracking-tight leading-tight">
              Your site looks fine.<br/>
              <span className="text-primary font-medium">WebKit makes sure it is.</span>
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl font-light text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed px-4">
            Catch issues before your users do. Most launch failures aren't in your code — they're in the config.
          </p>

          <div className="flex flex-col items-center space-y-6">
            <div className="w-full max-w-2xl">
              <AuditForm 
                onAudit={handleScan}
                isScanning={isScanning}
                buttonText="Check your site"
                placeholder="https://your-site.com"
              />
            </div>
            
            <div className="flex items-center gap-8 text-sm text-muted-foreground flex-wrap justify-center">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>No signup required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>40+ automated checks</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Results in seconds</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            <div className="p-4">
              <div className="text-3xl md:text-4xl font-light text-primary mb-2">50K+</div>
              <div className="text-sm text-muted-foreground">Sites audited</div>
            </div>
            <div className="p-4">
              <div className="text-3xl md:text-4xl font-light text-primary mb-2">2M+</div>
              <div className="text-sm text-muted-foreground">Issues found</div>
            </div>
            <div className="p-4">
              <div className="text-3xl md:text-4xl font-light text-primary mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
            <div className="p-4">
              <div className="text-3xl md:text-4xl font-light text-primary mb-2">&lt;3s</div>
              <div className="text-sm text-muted-foreground">Avg scan time</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-light mb-20 text-center">
            Audit in minutes. Ship with confidence.
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 text-lg font-light transition-all duration-300 group-hover:scale-105">
                1
              </div>
              <h3 className="font-light mb-3 text-lg md:text-xl">Drop your URL</h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">Paste your production site. Takes three seconds.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 text-lg font-light transition-all duration-300 group-hover:scale-105">
                2
              </div>
              <h3 className="font-light mb-3 text-lg md:text-xl">The crawler digs in</h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">40+ checks run in parallel. Security, SEO, speed, broken links — all of it.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 text-lg font-light transition-all duration-300 group-hover:scale-105">
                3
              </div>
              <h3 className="font-light mb-3 text-lg md:text-xl">See the damage</h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">What's broken, why it hurts, and exactly how to fix it.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 text-lg font-light transition-all duration-300 group-hover:scale-105">
                4
              </div>
              <h3 className="font-light mb-3 text-lg md:text-xl">Ship clean</h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">Fix, re-scan, done. No surprises on launch day.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 bg-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-light mb-20 text-center">
            40+ automated checks. Zero manual work.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="card border-border p-6 md:p-8 hover:border-primary transition-all duration-300 bg-background">
              <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-6">
                <Search className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="font-light mb-4 text-lg md:text-xl">Broken links</h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">Every 404, redirect loop, and dead anchor — found before a user clicks it.</p>
            </div>
            
            <div className="card border-border p-6 md:p-8 hover:border-primary transition-all duration-300 bg-background">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6">
                <Globe className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="font-light mb-4 text-lg md:text-xl">SEO health</h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">Meta titles, descriptions, OG tags, and canonicals — validated and scored.</p>
            </div>
            
            <div className="card border-border p-6 md:p-8 hover:border-primary transition-all duration-300 bg-background">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-6">
                <Mail className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="font-light mb-4 text-lg md:text-xl">Email deliverability</h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">SPF, DKIM, and DMARC checked. Your welcome email should land in inbox.</p>
            </div>
            
            <div className="card border-border p-6 md:p-8 hover:border-primary transition-all duration-300 bg-background">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-yellow-500" />
              </div>
              <h3 className="font-light mb-4 text-lg md:text-xl">Performance</h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">Load times, TTFB, and resource bloat flagged with specific fixes.</p>
            </div>
            
            <div className="card border-border p-6 md:p-8 hover:border-primary transition-all duration-300 bg-background">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-6">
                <Lock className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="font-light mb-4 text-lg md:text-xl">Security</h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">SSL certificates, security headers, and HTTPS — the basics, done right.</p>
            </div>
            
            <div className="card border-border p-6 md:p-8 hover:border-primary transition-all duration-300 bg-background">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-indigo-500" />
              </div>
              <h3 className="font-light mb-4 text-lg md:text-xl">Launch score</h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">A single 0–100 score that tells you if the site is ready to ship.</p>
            </div>
            
            <div className="card border-border p-6 md:p-8 hover:border-primary transition-all duration-300 bg-background">
              <div className="w-12 h-12 bg-pink-500/10 rounded-lg flex items-center justify-center mb-6">
                <Smartphone className="w-6 h-6 text-pink-500" />
              </div>
              <h3 className="font-light mb-4 text-lg md:text-xl">Mobile readiness</h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">Viewport, tap targets, font sizes — checked on real mobile viewports.</p>
            </div>
            
            <div className="card border-border p-6 md:p-8 hover:border-primary transition-all duration-300 bg-background">
              <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-6">
                <Eye className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="font-light mb-4 text-lg md:text-xl">Accessibility</h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">Missing alt text, poor contrast, and broken ARIA roles caught before auditors find them.</p>
            </div>
            
            <div className="card border-border p-6 md:p-8 hover:border-primary transition-all duration-300 bg-background">
              <div className="w-12 h-12 bg-teal-500/10 rounded-lg flex items-center justify-center mb-6">
                <FileText className="w-6 h-6 text-teal-500" />
              </div>
              <h3 className="font-light mb-4 text-lg md:text-xl">Open Graph preview</h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">See exactly how your pages look when shared on Twitter, LinkedIn, and Slack.</p>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <p className="text-muted-foreground text-lg mb-8">Also: cookie banners, GDPR notices, structured data, hreflang, page title uniqueness, and more.</p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-light">
                Start free audit
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="font-light">
                View all checks
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-light mb-6">
            Ready to ship with confidence?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of developers who audit before they ship.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link2 href="/login">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-light">
                Sign in to get started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link2>
            <Link2 href="/tools">
              <Button variant="outline" size="lg" className="font-light">
                Try free tools
              </Button>
            </Link2>
          </div>
        </div>
      </section>

      {/* Scanning Results */}
      {showResults && (
        <section className="py-20 px-6 bg-background">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-light mb-12 text-center">Audit Results</h2>
            <AuditResults results={auditResults} overallScore={overallScore} />
            
            <div className="text-center mt-12 space-y-4">
              <Button className="px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md font-light transition-all duration-300 hover:scale-105">
                Get Detailed Report
              </Button>
              <div className="text-center">
                <Link2 href="/login">
                  <Button variant="outline" className="font-light">
                    Save this audit and track your sites
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link2>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
