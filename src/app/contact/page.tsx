"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Send,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface ContactForm {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
  type: 'support' | 'sales' | 'partnership' | 'other';
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    type: 'support'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validate form
      if (!formData.name || !formData.email || !formData.message) {
        setSubmitStatus('error');
        return;
      }

      // Success
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
        type: 'support'
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'support@webkit.pro',
      href: 'mailto:support@webkit.pro'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      label: 'Office',
      value: 'San Francisco, CA',
      href: '#'
    }
  ];

  const faqs = [
    {
      question: 'What kind of support do you offer?',
      answer: 'We offer email support for all users, with priority support for Pro and Enterprise customers. Enterprise customers also get phone support and a dedicated account manager.'
    },
    {
      question: 'How quickly will I hear back?',
      answer: 'Free tier users typically hear back within 24-48 hours. Pro users get responses within 12 hours, and Enterprise users get priority support with responses within 4 hours during business hours.'
    },
    {
      question: 'Do you offer custom solutions?',
      answer: 'Yes! We work with Enterprise customers to create custom solutions, including on-premise deployments, custom integrations, and specialized audit requirements.'
    },
    {
      question: 'Can I schedule a demo?',
      answer: 'Absolutely! We offer personalized demos for teams interested in our Pro and Enterprise plans. Just select "Sales" as your inquiry type and mention you\'d like a demo.'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Have questions about WebKit? Need support or want to discuss a custom solution? 
            We're here to help.
          </p>
          <div className="flex justify-center gap-8 flex-wrap">
            {contactInfo.map((info) => (
              <a
                key={info.label}
                href={info.href}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
              >
                <info.icon className="w-5 h-5" />
                <span>{info.value}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-medium mb-6">Send us a message</h2>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <p className="text-green-400">Message sent successfully! We'll get back to you soon.</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    <p className="text-red-400">Please fill in all required fields.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-foreground">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-foreground">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Acme Corp"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground">Inquiry Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="support">Technical Support</option>
                    <option value="sales">Sales Inquiry</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-foreground">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                  size="lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Send Message
                    </div>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info & FAQs */}
            <div className="space-y-12">
              {/* Contact Info Cards */}
              <div>
                <h3 className="text-lg font-semibold mb-6 text-foreground">Other ways to reach us</h3>
                <div className="space-y-4">
                  {contactInfo.map((info) => (
                    <a
                      key={info.label}
                      href={info.href}
                      className="block card border-border p-4 hover:border-primary transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center">
                          <info.icon className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{info.label}</h4>
                          <p className="text-muted-foreground">{info.value}</p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Office Hours */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-foreground">Office Hours</h3>
                <div className="card border-border p-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monday - Friday</span>
                      <span className="font-semibold text-foreground">9:00 AM - 6:00 PM PST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Saturday</span>
                      <span className="font-semibold text-foreground">10:00 AM - 2:00 PM PST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sunday</span>
                      <span className="font-semibold text-foreground">Closed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-foreground">Follow Us</h3>
                <div className="flex gap-4">
                  <a
                    href="https://twitter.com/webkit"
                    className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all duration-300"
                  >
                    <span className="text-sm font-semibold">X</span>
                  </a>
                  <a
                    href="https://linkedin.com/company/webkit"
                    className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all duration-300"
                  >
                    <span className="text-sm font-semibold">in</span>
                  </a>
                  <a
                    href="https://github.com/webkit"
                    className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all duration-300"
                  >
                    <span className="text-sm font-semibold">GH</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-card">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="card border-border p-6">
                <h3 className="font-semibold mb-3 text-lg">{faq.question}</h3>
                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
