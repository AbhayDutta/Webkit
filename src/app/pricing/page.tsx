import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Check, X, Star, Zap, Shield, Users } from 'lucide-react';
import Link2 from 'next/link';

export const metadata: Metadata = {
  title: 'Pricing - WebKit | Affordable Website Audit Plans',
  description: 'Choose the perfect plan for your website auditing needs. Free tier available with premium features for teams.',
};

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for personal projects and small websites',
    icon: Star,
    features: [
      '5 audits per month',
      'Basic SEO checks',
      'Performance analysis',
      'Mobile readiness test',
      'Email reports',
      'Basic support'
    ],
    limitations: [
      'No historical data',
      'No team collaboration',
      'No API access',
      'No custom branding'
    ],
    highlighted: false,
    cta: 'Get Started Free',
    ctaLink: '/signup'
  },
  {
    name: 'Pro',
    price: '$29',
    description: 'For professionals and growing businesses',
    icon: Zap,
    features: [
      'Unlimited audits',
      'All 40+ checks included',
      'Historical trend tracking',
      'Competitor analysis',
      'Priority email support',
      'Custom reports',
      'API access (1000 calls/month)',
      'Team collaboration (3 users)'
    ],
    limitations: [
      'Limited API calls',
      'Small team size'
    ],
    highlighted: true,
    cta: 'Start Free Trial',
    ctaLink: '/signup?plan=pro'
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large teams and organizations',
    icon: Users,
    features: [
      'Everything in Pro',
      'Unlimited API calls',
      'Unlimited team members',
      'White-label reports',
      'Dedicated account manager',
      'SLA guarantee',
      'Custom integrations',
      'Advanced analytics',
      'Phone support',
      'On-premise deployment option'
    ],
    limitations: [],
    highlighted: false,
    cta: 'Contact Sales',
    ctaLink: '/contact?plan=enterprise'
  }
];

const faqs = [
  {
    question: 'Can I change plans anytime?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any differences.'
  },
  {
    question: 'What counts as an audit?',
    answer: 'An audit is a complete analysis of a single URL, including all 40+ checks. You can audit the same URL multiple times if needed.'
  },
  {
    question: 'Do you offer refunds?',
    answer: 'We offer a 14-day money-back guarantee for all paid plans. If you\'re not satisfied, contact us for a full refund.'
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Absolutely. There are no long-term contracts. You can cancel your subscription at any time, and your access will continue until the end of your billing period.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and wire transfers for Enterprise plans.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes, we use industry-standard encryption and security practices. Your data is never shared with third parties without your consent.'
  }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Choose the perfect plan for your website auditing needs. 
            Start free and upgrade as you grow.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <div className="bg-background text-foreground px-4 py-2 rounded-full text-sm font-medium border border-border">
              No credit card required
            </div>
            <div className="bg-background text-foreground px-4 py-2 rounded-full text-sm font-medium border border-border">
              14-day money-back guarantee
            </div>
            <div className="bg-background text-foreground px-4 py-2 rounded-full text-sm font-medium border border-border">
              Cancel anytime
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`relative card border-2 p-8 transition-all duration-300 hover:scale-105 ${
                  plan.highlighted 
                    ? 'border-primary shadow-2xl scale-105' 
                    : 'border-border hover:border-primary'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <plan.icon className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-5xl font-bold mb-2">
                    {plan.price}
                    {plan.price !== 'Custom' && (
                      <span className="text-lg text-muted-foreground font-normal">/month</span>
                    )}
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>

                <div className="space-y-4 mb-8">
                  <h4 className="font-semibold text-foreground">Features:</h4>
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.limitations.length > 0 && (
                    <>
                      <h4 className="font-semibold text-foreground mt-6">Limitations:</h4>
                      {plan.limitations.map((limitation, limitIndex) => (
                        <div key={limitIndex} className="flex items-center gap-3">
                          <X className="w-5 h-5 text-muted-foreground/50 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground/70">{limitation}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>

                <Link2 href={plan.ctaLink}>
                  <Button 
                    className={`w-full font-semibold transition-all duration-300 hover:scale-105 ${
                      plan.highlighted 
                        ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl' 
                        : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
                    }`}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </Link2>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-6 bg-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Feature Comparison
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-6 font-semibold text-foreground">Feature</th>
                  <th className="text-center py-4 px-6 font-semibold text-foreground">Free</th>
                  <th className="text-center py-4 px-6 font-semibold text-foreground">Pro</th>
                  <th className="text-center py-4 px-6 font-semibold text-foreground">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-4 px-6 text-muted-foreground">Monthly Audits</td>
                  <td className="text-center py-4 px-6 text-foreground">5</td>
                  <td className="text-center py-4 px-6 text-foreground">Unlimited</td>
                  <td className="text-center py-4 px-6 text-foreground">Unlimited</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4 px-6 text-muted-foreground">Audit Checks</td>
                  <td className="text-center py-4 px-6 text-foreground">Basic (15)</td>
                  <td className="text-center py-4 px-6 text-foreground">All (40+)</td>
                  <td className="text-center py-4 px-6 text-foreground">All (40+)</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4 px-6 text-muted-foreground">Historical Data</td>
                  <td className="text-center py-4 px-6">
                    <X className="w-5 h-5 text-muted-foreground/50 mx-auto" />
                  </td>
                  <td className="text-center py-4 px-6">
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center py-4 px-6">
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4 px-6 text-muted-foreground">API Access</td>
                  <td className="text-center py-4 px-6">
                    <X className="w-5 h-5 text-muted-foreground/50 mx-auto" />
                  </td>
                  <td className="text-center py-4 px-6 text-foreground">1,000 calls/month</td>
                  <td className="text-center py-4 px-6 text-foreground">Unlimited</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4 px-6 text-muted-foreground">Team Members</td>
                  <td className="text-center py-4 px-6 text-foreground">1</td>
                  <td className="text-center py-4 px-6 text-foreground">3</td>
                  <td className="text-center py-4 px-6 text-foreground">Unlimited</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-4 px-6 text-muted-foreground">Support</td>
                  <td className="text-center py-4 px-6 text-foreground">Email</td>
                  <td className="text-center py-4 px-6 text-foreground">Priority Email</td>
                  <td className="text-center py-4 px-6 text-foreground">Phone + Dedicated</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="card border-border p-8">
                <h3 className="text-xl font-semibold mb-4">{faq.question}</h3>
                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to get started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of developers and businesses who trust WebKit 
            to keep their websites running perfectly.
          </p>
          <div className="flex justify-center gap-4">
            <Link2 href="/signup">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-300 hover:scale-105">
                Start Free Trial
              </Button>
            </Link2>
            <Link2 href="/contact">
              <Button size="lg" variant="outline" className="font-semibold transition-all duration-300 hover:scale-105">
                Contact Sales
              </Button>
            </Link2>
          </div>
        </div>
      </section>
    </div>
  );
}
