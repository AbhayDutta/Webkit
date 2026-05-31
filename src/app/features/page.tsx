"use client";

import { Button } from '@/components/ui/button';
import { 
  Search,
  Globe,
  Mail,
  Zap,
  Lock,
  BarChart3,
  Smartphone,
  Eye,
  FileText,
  Shield,
  AlertTriangle,
  CheckCircle,
  Settings,
  Code,
  Database,
  GitPullRequest
} from 'lucide-react';
import AuditForm from '@/components/common/AuditForm';

const features = [
  {
    icon: Search,
    title: 'Broken Links',
    description: 'Every 404, redirect loop, and dead anchor — found before a user clicks it.',
    details: [
      'Internal link validation',
      'External link checking',
      'Redirect chain analysis',
      'Anchor link verification'
    ],
    category: 'Link Analysis'
  },
  {
    icon: Globe,
    title: 'SEO Health',
    description: 'Meta titles, descriptions, OG tags, and canonicals — validated and scored.',
    details: [
      'Title tag optimization',
      'Meta description analysis',
      'Open Graph validation',
      'Canonical URL checking',
      'Header structure analysis'
    ],
    category: 'SEO'
  },
  {
    icon: Mail,
    title: 'Email Deliverability',
    description: 'SPF, DKIM, and DMARC checked. Your welcome email should land in the inbox.',
    details: [
      'SPF record validation',
      'DKIM signature checking',
      'DMARC policy analysis',
      'MX record verification',
      'Blacklist monitoring'
    ],
    category: 'Email'
  },
  {
    icon: Zap,
    title: 'Performance',
    description: 'Load times, TTFB, and resource bloat flagged with specific fixes.',
    details: [
      'Page load speed analysis',
      'Time to First Byte (TTFB)',
      'Resource optimization',
      'Cache configuration',
      'Image optimization checks'
    ],
    category: 'Performance'
  },
  {
    icon: Lock,
    title: 'Security',
    description: 'SSL certificates, security headers, and HTTPS — the basics, done right.',
    details: [
      'SSL certificate validation',
      'Security headers analysis',
      'HTTPS enforcement',
      'Mixed content detection',
      'Vulnerability scanning'
    ],
    category: 'Security'
  },
  {
    icon: BarChart3,
    title: 'Launch Score',
    description: 'A single 0–100 score that tells you if the site is ready to ship.',
    details: [
      'Overall health scoring',
      'Category-based ratings',
      'Trend analysis',
      'Benchmarking',
      'Readiness assessment'
    ],
    category: 'Analytics'
  },
  {
    icon: Smartphone,
    title: 'Mobile Readiness',
    description: 'Viewport, tap targets, font sizes — checked on real mobile viewports.',
    details: [
      'Responsive design testing',
      'Touch target analysis',
      'Mobile viewport checking',
      'Font size validation',
      'Mobile performance testing'
    ],
    category: 'Mobile'
  },
  {
    icon: Eye,
    title: 'Accessibility',
    description: 'Missing alt text, poor contrast, and broken ARIA roles caught before auditors find them.',
    details: [
      'Alt text validation',
      'Color contrast checking',
      'ARIA role analysis',
      'Keyboard navigation testing',
      'Screen reader compatibility'
    ],
    category: 'Accessibility'
  },
  {
    icon: FileText,
    title: 'Open Graph Preview',
    description: 'See exactly how your pages look when shared on Twitter, LinkedIn, and Slack.',
    details: [
      'Twitter Card validation',
      'LinkedIn preview checking',
      'Slack sharing preview',
      'Social media optimization',
      'Image preview analysis'
    ],
    category: 'Social Media'
  },
  {
    icon: Database,
    title: 'Sitemap Validation',
    description: 'XML sitemap parsed and checked for missing pages and bad URLs.',
    details: [
      'XML sitemap parsing',
      'URL validation',
      'Missing page detection',
      'Sitemap accessibility',
      'Index coverage analysis'
    ],
    category: 'SEO'
  },
  {
    icon: Settings,
    title: 'Robots.txt',
    description: 'Misconfigured crawl rules that accidentally block Google — caught before they matter.',
    details: [
      'Robots.txt validation',
      'Crawl directive analysis',
      'Google bot accessibility',
      'Disallow rule checking',
      'Crawl budget optimization'
    ],
    category: 'SEO'
  },
  {
    icon: Code,
    title: 'Analytics Detection',
    description: 'GA4, Plausible, or Fathom tag firing confirmed.',
    details: [
      'Google Analytics 4 detection',
      'Plausible Analytics checking',
      'Fathom Analytics validation',
      'Tag implementation verification',
      'Tracking code analysis'
    ],
    category: 'Analytics'
  },
  {
    icon: AlertTriangle,
    title: 'Console Errors',
    description: 'JavaScript exceptions and failed network requests logged and surfaced.',
    details: [
      'JavaScript error detection',
      'Network request monitoring',
      'Console log analysis',
      'Exception tracking',
      'Performance bottleneck identification'
    ],
    category: 'Development'
  },
  {
    icon: Shield,
    title: 'Redirect Chains',
    description: '301 chains that add latency and bleed link equity — unwound and reported.',
    details: [
      'Redirect chain analysis',
      '301 redirect tracking',
      'Link equity preservation',
      'Latency impact assessment',
      'Redirect optimization'
    ],
    category: 'Performance'
  },
  {
    icon: FileText,
    title: 'Font Loading',
    description: 'FOUT, FOIT, and missing font files — all the invisible things that hurt first impressions.',
    details: [
      'Font loading strategy analysis',
      'FOUT/FOIT detection',
      'Web font format validation',
      'Font performance optimization',
      'Missing font file checking'
    ],
    category: 'Performance'
  }
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            40+ Automated Checks
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Comprehensive website auditing that catches issues before your users do. 
            From broken links to security vulnerabilities, we've got you covered.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <div className="bg-background text-foreground px-4 py-2 rounded-full text-sm font-medium border border-border">
              SEO Analysis
            </div>
            <div className="bg-background text-foreground px-4 py-2 rounded-full text-sm font-medium border border-border">
              Performance Testing
            </div>
            <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
              Security Scanning
            </div>
            <div className="bg-background text-foreground px-4 py-2 rounded-full text-sm font-medium border border-border">
              Accessibility Checks
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card border-border p-6 hover:border-primary transition-all duration-300 hover:shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{feature.description}</p>
                    <div className="mb-3">
                      <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                        {feature.category}
                      </span>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {feature.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to audit your website?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get started with a comprehensive audit in seconds. No credit card required.
          </p>
          <AuditForm 
            onAudit={(url) => window.location.href = `/audit-results?url=${encodeURIComponent(url)}`}
            isScanning={false}
            buttonText="Start Free Audit"
          />
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Also Included
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground">Technical Checks</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-muted-foreground">Cookie banner compliance</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-muted-foreground">GDPR notice validation</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-muted-foreground">Structured data analysis</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-muted-foreground">Hreflang implementation</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-muted-foreground">Page title uniqueness</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground">Advanced Features</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-muted-foreground">Real-time monitoring</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-muted-foreground">Historical trend tracking</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-muted-foreground">Competitor benchmarking</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-muted-foreground">Custom alert notifications</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-muted-foreground">API access for integrations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
