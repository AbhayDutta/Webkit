import { Metadata } from 'next';
import Link2 from 'next/link';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog - WebKit | Website Optimization Insights',
  description: 'Expert tips, best practices, and insights on website optimization, SEO, performance, and development.',
};

const blogPosts = [
  {
    id: '10-website-audit-mistakes',
    title: '10 Common Website Audit Mistakes to Avoid',
    excerpt: 'Learn the most common mistakes developers make when auditing websites and how to avoid them for better results.',
    author: 'Sarah Chen',
    date: '2024-03-20',
    readTime: '8 min read',
    category: 'Best Practices',
    image: '/blog/audit-mistakes.jpg',
    featured: true
  },
  {
    id: 'seo-optimization-checklist',
    title: 'Complete SEO Optimization Checklist for 2024',
    excerpt: 'A comprehensive checklist covering all aspects of SEO optimization that you should implement this year.',
    author: 'Mike Johnson',
    date: '2024-03-18',
    readTime: '12 min read',
    category: 'SEO',
    image: '/blog/seo-checklist.jpg',
    featured: true
  },
  {
    id: 'website-performance-tips',
    title: '15 Website Performance Tips That Actually Work',
    excerpt: 'Practical, actionable tips to improve your website\'s loading speed and user experience.',
    author: 'Emily Rodriguez',
    date: '2024-03-15',
    readTime: '10 min read',
    category: 'Performance',
    image: '/blog/performance-tips.jpg',
    featured: false
  },
  {
    id: 'mobile-first-design',
    title: 'Mobile-First Design: Why It Matters in 2024',
    excerpt: 'Understanding the importance of mobile-first design and how to implement it effectively.',
    author: 'David Kim',
    date: '2024-03-12',
    readTime: '6 min read',
    category: 'Mobile',
    image: '/blog/mobile-first.jpg',
    featured: false
  },
  {
    id: 'accessibility-best-practices',
    title: 'Web Accessibility Best Practices for Developers',
    excerpt: 'Essential accessibility guidelines every developer should know and implement.',
    author: 'Lisa Thompson',
    date: '2024-03-10',
    readTime: '9 min read',
    category: 'Accessibility',
    image: '/blog/accessibility.jpg',
    featured: false
  },
  {
    id: 'security-headers-guide',
    title: 'Essential Security Headers for Modern Websites',
    excerpt: 'A guide to implementing critical security headers to protect your website and users.',
    author: 'Alex Martinez',
    date: '2024-03-08',
    readTime: '11 min read',
    category: 'Security',
    image: '/blog/security-headers.jpg',
    featured: false
  },
  {
    id: 'meta-tags-optimization',
    title: 'How to Optimize Meta Tags for Better CTR',
    excerpt: 'Learn the art of writing compelling meta tags that improve click-through rates.',
    author: 'Sarah Chen',
    date: '2024-03-05',
    readTime: '7 min read',
    category: 'SEO',
    image: '/blog/meta-tags.jpg',
    featured: false
  },
  {
    id: 'image-optimization',
    title: 'Image Optimization Techniques for Faster Loading',
    excerpt: 'Advanced techniques for optimizing images without sacrificing quality.',
    author: 'Mike Johnson',
    date: '2024-03-01',
    readTime: '8 min read',
    category: 'Performance',
    image: '/blog/image-optimization.jpg',
    featured: false
  }
];

const categories = [
  { name: 'All', count: blogPosts.length },
  { name: 'SEO', count: blogPosts.filter(post => post.category === 'SEO').length },
  { name: 'Performance', count: blogPosts.filter(post => post.category === 'Performance').length },
  { name: 'Security', count: blogPosts.filter(post => post.category === 'Security').length },
  { name: 'Mobile', count: blogPosts.filter(post => post.category === 'Mobile').length },
  { name: 'Accessibility', count: blogPosts.filter(post => post.category === 'Accessibility').length },
  { name: 'Best Practices', count: blogPosts.filter(post => post.category === 'Best Practices').length }
];

export default function BlogPage() {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-medium mb-6">
            WebKit Blog
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Expert insights, best practices, and actionable tips for 
            website optimization, development, and maintenance.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-muted-foreground">Weekly updates</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-green-500" />
              <span className="text-sm text-muted-foreground">Expert authors</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-500" />
              <span className="text-sm text-muted-foreground">Actionable content</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 px-6 border-b">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category.name === 'All'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-medium mb-8">Featured Posts</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <article key={post.id} className="group">
                  <Link2 href={`/blog/${post.id}`} className="block">
                    <div className="bg-secondary rounded-lg h-48 mb-4 flex items-center justify-center group-hover:bg-accent transition-colors">
                      <span className="text-muted-foreground">Featured Image</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium dark:bg-primary/20">
                          {post.category}
                        </span>
                        <span>{post.readTime}</span>
                        <span>{post.date}</span>
                      </div>
                      <h3 className="text-xl font-medium group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
                        <span className="font-medium">Read more</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link2>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-medium mb-8">Recent Posts</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <article key={post.id} className="group">
                <Link2 href={`/blog/${post.id}`} className="block">
                  <div className="bg-secondary rounded-lg h-32 mb-4 flex items-center justify-center group-hover:bg-accent transition-colors">
                    <span className="text-muted-foreground">Post Image</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="bg-secondary text-foreground px-2 py-1 rounded text-xs font-medium">
                        {post.category}
                      </span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-lg font-medium group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
                      <span className="font-medium text-sm">Read more</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link2>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-6 bg-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-medium mb-4">
            Stay Updated
          </h2>
          <p className="text-muted-foreground mb-8">
            Get the latest website optimization tips and best practices delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-input rounded-md focus:outline-none focus:border-primary bg-background text-foreground"
            />
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
              Subscribe
            </button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            No spam, unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  );
}
