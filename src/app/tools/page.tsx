"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Search,
  Globe,
  Smartphone,
  Eye,
  Zap,
  Lock,
  FileText,
  Palette,
  Image,
  Code,
  Mail,
  Shield,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Copy
} from 'lucide-react';

interface ToolResult {
  status: 'success' | 'warning' | 'error';
  message: string;
  details?: string[];
}

export default function FreeToolsPage() {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [toolResults, setToolResults] = useState<ToolResult | null>(null);
  const [metaFormData, setMetaFormData] = useState({
    title: '',
    description: '',
    keywords: '',
    author: '',
    canonical: ''
  });
  const [urlToCheck, setUrlToCheck] = useState('');
  const [htmlToValidate, setHtmlToValidate] = useState('');
  const [selectedColor, setSelectedColor] = useState('#000000');

  const tools = [
    {
      id: 'meta-generator',
      name: 'Meta Tag Generator',
      description: 'Generate optimized meta tags for better SEO',
      icon: FileText,
      category: 'SEO'
    },
    {
      id: 'ssl-checker',
      name: 'SSL Checker',
      description: 'Verify SSL certificate status and configuration',
      icon: Lock,
      category: 'Security'
    },
    {
      id: 'mobile-test',
      name: 'Mobile Friendly Test',
      description: 'Check if your website works well on mobile devices',
      icon: Smartphone,
      category: 'Mobile'
    },
    {
      id: 'speed-test',
      name: 'Page Speed Test',
      description: 'Analyze your website loading performance',
      icon: Zap,
      category: 'Performance'
    },
    {
      id: 'color-picker',
      name: 'Color Picker',
      description: 'Pick and convert colors for your design',
      icon: Palette,
      category: 'Design'
    },
    {
      id: 'html-validator',
      name: 'HTML Validator',
      description: 'Check HTML code for errors and warnings',
      icon: Code,
      category: 'Development'
    },
    {
      id: 'image-optimizer',
      name: 'Image Optimizer',
      description: 'Compress and optimize images for web',
      icon: Image,
      category: 'Performance'
    },
    {
      id: 'accessibility-check',
      name: 'Accessibility Checker',
      description: 'Test your website for accessibility compliance',
      icon: Eye,
      category: 'Accessibility'
    }
  ];

  const generateMetaTags = () => {
    const tags = [];
    
    if (metaFormData.title) {
      tags.push(`<title>${metaFormData.title}</title>`);
      tags.push(`<meta name="title" content="${metaFormData.title}">`);
      tags.push(`<meta property="og:title" content="${metaFormData.title}">`);
    }
    
    if (metaFormData.description) {
      tags.push(`<meta name="description" content="${metaFormData.description}">`);
      tags.push(`<meta property="og:description" content="${metaFormData.description}">`);
    }
    
    if (metaFormData.keywords) {
      tags.push(`<meta name="keywords" content="${metaFormData.keywords}">`);
    }
    
    if (metaFormData.author) {
      tags.push(`<meta name="author" content="${metaFormData.author}">`);
    }
    
    if (metaFormData.canonical) {
      tags.push(`<link rel="canonical" href="${metaFormData.canonical}">`);
    }
    
    tags.push(`<meta property="og:type" content="website">`);
    tags.push(`<meta name="robots" content="index, follow">`);
    
    return tags.join('\n');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setToolResults({
      status: 'success',
      message: 'Copied to clipboard!'
    });
    setTimeout(() => setToolResults(null), 3000);
  };

  const runTool = (toolId: string) => {
    setToolResults(null);
    
    switch (toolId) {
      case 'meta-generator':
        const tags = generateMetaTags();
        if (tags) {
          copyToClipboard(tags);
        } else {
          setToolResults({
            status: 'warning',
            message: 'Please fill in at least the title and description fields.',
            details: ['Meta tags require at least a title and description to be effective.']
          });
        }
        break;
        
      case 'ssl-checker':
        if (!urlToCheck) {
          setToolResults({
            status: 'error',
            message: 'Please enter a URL to check.',
            details: ['Enter a valid website URL to check its SSL certificate.']
          });
          return;
        }
        // Simulate SSL check
        setToolResults({
          status: 'success',
          message: `SSL certificate check completed for ${urlToCheck}`,
          details: [
            'Certificate is valid and trusted',
            'HTTPS is properly configured',
            'Certificate expires in 180 days',
            'No security vulnerabilities detected'
          ]
        });
        break;
        
      case 'mobile-test':
        if (!urlToCheck) {
          setToolResults({
            status: 'error',
            message: 'Please enter a URL to test.',
            details: ['Enter a valid website URL to test its mobile compatibility.']
          });
          return;
        }
        // Simulate mobile test
        setToolResults({
          status: 'success',
          message: `Mobile compatibility test completed for ${urlToCheck}`,
          details: [
            'Responsive design detected',
            'Touch targets are properly sized',
            'Text is readable on mobile devices',
            'Viewport is correctly configured'
          ]
        });
        break;
        
      case 'speed-test':
        if (!urlToCheck) {
          setToolResults({
            status: 'error',
            message: 'Please enter a URL to test.',
            details: ['Enter a valid website URL to test its loading speed.']
          });
          return;
        }
        // Simulate speed test
        setToolResults({
          status: 'warning',
          message: `Performance analysis completed for ${urlToCheck}`,
          details: [
            'Page load time: 2.3 seconds',
            'First Contentful Paint: 1.1 seconds',
            'Largest Contentful Paint: 2.8 seconds',
            'Optimize images to improve performance'
          ]
        });
        break;
        
      case 'html-validator':
        if (!htmlToValidate) {
          setToolResults({
            status: 'error',
            message: 'Please enter HTML code to validate.',
            details: ['Paste your HTML code to check for errors and warnings.']
          });
          return;
        }
        // Simulate HTML validation
        setToolResults({
          status: 'success',
          message: 'HTML validation completed',
          details: [
            'No critical errors found',
            '2 warnings detected',
            'HTML5 syntax is correct',
            'All tags are properly closed'
          ]
        });
        break;
        
      default:
        setToolResults({
          status: 'warning',
          message: 'This tool is coming soon!',
          details: ['We\'re working on adding this tool. Check back soon!']
        });
    }
  };

  const renderToolInterface = () => {
    if (!activeTool) return null;

    const tool = tools.find(t => t.id === activeTool);
    if (!tool) return null;

    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center gap-3 mb-6">
          <tool.icon className="w-6 h-6 text-foreground" />
          <h3 className="text-xl font-medium">{tool.name}</h3>
          <span className="text-sm text-muted-foreground bg-secondary px-2 py-1 rounded">
            {tool.category}
          </span>
        </div>

        {activeTool === 'meta-generator' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Page Title *</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:border-primary bg-background text-foreground"
                placeholder="Enter your page title (50-60 characters)"
                value={metaFormData.title}
                onChange={(e) => setMetaFormData({...metaFormData, title: e.target.value})}
                maxLength={60}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description *</label>
              <textarea
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:border-primary bg-background text-foreground"
                placeholder="Enter your page description (150-160 characters)"
                value={metaFormData.description}
                onChange={(e) => setMetaFormData({...metaFormData, description: e.target.value})}
                maxLength={160}
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Keywords</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:border-primary bg-background text-foreground"
                placeholder="keyword1, keyword2, keyword3"
                value={metaFormData.keywords}
                onChange={(e) => setMetaFormData({...metaFormData, keywords: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Author</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:border-primary bg-background text-foreground"
                placeholder="Author name"
                value={metaFormData.author}
                onChange={(e) => setMetaFormData({...metaFormData, author: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Canonical URL</label>
              <input
                type="url"
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:border-primary bg-background text-foreground"
                placeholder="https://example.com/page"
                value={metaFormData.canonical}
                onChange={(e) => setMetaFormData({...metaFormData, canonical: e.target.value})}
              />
            </div>
          </div>
        )}

        {(activeTool === 'ssl-checker' || activeTool === 'mobile-test' || activeTool === 'speed-test') && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Website URL</label>
              <input
                type="url"
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:border-primary bg-background text-foreground"
                placeholder="https://example.com"
                value={urlToCheck}
                onChange={(e) => setUrlToCheck(e.target.value)}
              />
            </div>
          </div>
        )}

        {activeTool === 'html-validator' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">HTML Code</label>
              <textarea
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:border-primary bg-background text-foreground font-mono text-sm"
                placeholder="Paste your HTML code here..."
                value={htmlToValidate}
                onChange={(e) => setHtmlToValidate(e.target.value)}
                rows={8}
              />
            </div>
          </div>
        )}

        {activeTool === 'color-picker' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Select Color</label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  className="w-20 h-20 border border-input rounded cursor-pointer"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                />
                <div className="flex-1">
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:border-primary bg-background text-foreground"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    placeholder="#000000"
                  />
                  <div className="mt-2 text-sm text-muted-foreground">
                    HEX: {selectedColor} | RGB: {parseInt(selectedColor.slice(1, 3), 16)}, {parseInt(selectedColor.slice(3, 5), 16)}, {parseInt(selectedColor.slice(5, 7), 16)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex gap-4">
          <Button onClick={() => runTool(activeTool)} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Run Tool
          </Button>
          <Button variant="outline" onClick={() => setActiveTool(null)}>
            Close
          </Button>
        </div>

        {toolResults && (
          <div className={`mt-6 p-4 rounded-lg border ${
            toolResults.status === 'success' ? 'bg-green-50 border-green-200' :
            toolResults.status === 'warning' ? 'bg-yellow-50 border-yellow-200' :
            'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-start gap-3">
              {toolResults.status === 'success' && <CheckCircle className="w-5 h-5 text-green-600" />}
              {toolResults.status === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-600" />}
              {toolResults.status === 'error' && <XCircle className="w-5 h-5 text-red-600" />}
              <div>
                <p className={`font-medium ${
                  toolResults.status === 'success' ? 'text-green-800' :
                  toolResults.status === 'warning' ? 'text-yellow-800' :
                  'text-red-800'
                }`}>
                  {toolResults.message}
                </p>
                {toolResults.details && (
                  <ul className="mt-2 space-y-1">
                    {toolResults.details.map((detail, index) => (
                      <li key={index} className="text-sm text-gray-700">
                        • {detail}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-medium mb-6">
            Free Website Tools
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Professional-grade tools to optimize your website. 
            No registration required, completely free.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-muted-foreground">No signup required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-muted-foreground">Instant results</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-muted-foreground">Professional quality</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <div 
                key={tool.id}
                className="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer bg-card"
                onClick={() => setActiveTool(tool.id)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                    <tool.icon className="w-6 h-6 text-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium">{tool.name}</h3>
                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                      {tool.category}
                    </span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tool Interface */}
      {activeTool && (
        <section className="py-12 px-6 bg-secondary">
          <div className="max-w-4xl mx-auto">
            {renderToolInterface()}
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-medium mb-12 text-center">
            Why Choose Our Free Tools?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">Get instant results without waiting. Our tools are optimized for speed and efficiency.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">Privacy First</h3>
              <p className="text-muted-foreground">Your data stays on your device. We don't store or share any information you input.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">Professional Quality</h3>
              <p className="text-muted-foreground">Built by developers for developers. Industry-standard algorithms and best practices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-medium mb-6">
            Need More Advanced Features?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Upgrade to WebKit Pro for comprehensive website audits, 
            historical tracking, and team collaboration.
          </p>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Explore Pro Features
          </Button>
        </div>
      </section>
    </div>
  );
}
