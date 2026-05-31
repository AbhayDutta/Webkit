"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface AuditFormProps {
  onAudit: (url: string) => void;
  isScanning: boolean;
  placeholder?: string;
  buttonText?: string;
}

export default function AuditForm({ 
  onAudit, 
  isScanning, 
  placeholder = "https://your-site.com",
  buttonText = "Audit"
}: AuditFormProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAudit(url.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <input 
          className="flex-1 px-4 py-3 border border-input rounded-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-background text-foreground"
          placeholder={placeholder}
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={isScanning}
          required
        />
        <Button 
          type="submit"
          disabled={!url.trim() || isScanning}
          className="px-6 sm:px-8 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 transition-colors w-full sm:w-auto"
        >
          {isScanning ? 'Scanning...' : buttonText}
        </Button>
      </div>
    </form>
  );
}
