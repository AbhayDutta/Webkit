import Link2 from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border text-foreground py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-medium mb-4">WebKit</h3>
            <p className="text-muted-foreground text-sm">
              Audit your website before launch. Catch issues before your users do.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link2 href="/features" className="hover:text-foreground">
                  Features
                </Link2>
              </li>
              <li>
                <Link2 href="/pricing" className="hover:text-foreground">
                  Pricing
                </Link2>
              </li>
              <li>
                <Link2 href="/tools" className="hover:text-foreground">
                  Free Tools
                </Link2>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link2 href="/blog" className="hover:text-foreground">
                  Blog
                </Link2>
              </li>
              <li>
                <Link2 href="/contact" className="hover:text-foreground">
                  Contact
                </Link2>
              </li>
              <li>
                <Link2 href="/docs" className="hover:text-foreground">
                  Documentation
                </Link2>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link2 href="/about" className="hover:text-foreground">
                  About
                </Link2>
              </li>
              <li>
                <Link2 href="/privacy" className="hover:text-foreground">
                  Privacy Policy
                </Link2>
              </li>
              <li>
                <Link2 href="/terms" className="hover:text-foreground">
                  Terms of Service
                </Link2>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 text-center text-muted-foreground text-sm">
          <p>© 2026 WebKit. Audit before you ship.</p>
        </div>
      </div>
    </footer>
  );
}
