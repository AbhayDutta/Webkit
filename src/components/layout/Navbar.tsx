"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Sun, Moon } from 'lucide-react';
import Link2 from 'next/link';
import { isLoggedIn, logout } from '@/lib/auth';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const isAuthenticated = isLoggedIn();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'light') {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      // Use system preference as default
      setIsDarkMode(prefersDark);
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    
    // Force a re-render to ensure theme changes apply
    document.documentElement.style.colorScheme = newTheme ? 'dark' : 'light';
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-xl border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link2 href="/" className="text-2xl font-bold text-foreground hover:text-primary transition-colors duration-200">
            WebKit
          </Link2>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link2 href="/features" className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium">
              Features
            </Link2>
            <Link2 href="/pricing" className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium">
              Pricing
            </Link2>
            <Link2 href="/tools" className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium">
              Free Tools
            </Link2>
            <Link2 href="/blog" className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium">
              Blog
            </Link2>
            <Link2 href="/contact" className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium">
              Contact
            </Link2>
            
            {/* Theme Toggle */}
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-accent transition-colors duration-200"
              title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>
            
            {isAuthenticated ? (
              <>
                <Link2 href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium">
                  Dashboard
                </Link2>
                <Button onClick={handleLogout} variant="outline" size="sm" className="border-border hover:border-primary hover:bg-primary/10">
                  Logout
                </Button>
              </>
            ) : (
              <Button onClick={() => (window.location.href = '/login')} size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
                Sign In →
              </Button>
            )}
          </nav>
          
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-border animate-in slide-in-from-top duration-200">
            <div className="flex flex-col gap-4">
              <Link2 href="/features" className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium py-2">
                Features
              </Link2>
              <Link2 href="/pricing" className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium py-2">
                Pricing
              </Link2>
              <Link2 href="/tools" className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium py-2">
                Free Tools
              </Link2>
              <Link2 href="/blog" className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium py-2">
                Blog
              </Link2>
              <Link2 href="/contact" className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium py-2">
                Contact
              </Link2>
              
              {/* Mobile Theme Toggle */}
              <div className="flex justify-center py-2">
                <Button
                  onClick={toggleTheme}
                  variant="ghost"
                  size="sm"
                  className="p-2 hover:bg-accent transition-colors duration-200"
                  title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {isDarkMode ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </Button>
              </div>
              
              {isAuthenticated ? (
                <>
                  <Link2 href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium py-2">
                    Dashboard
                  </Link2>
                  <Button onClick={handleLogout} variant="outline" size="sm" className="border-border hover:border-primary hover:bg-primary/10 w-full">
                    Logout
                  </Button>
                </>
              ) : (
                <Button onClick={() => (window.location.href = '/login')} size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium w-full">
                  Sign In →
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
