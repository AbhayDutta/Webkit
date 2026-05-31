"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface FloatingCardProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function FloatingCard({ 
  children, 
  delay = 0, 
  className = '' 
}: FloatingCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <Card 
      className={`
        transition-all duration-1000 ease-out
        ${isVisible 
          ? 'opacity-100 scale-100 translate-y-0' 
          : 'opacity-0 scale-95 translate-y-4'
        }
        ${className}
      `}
    >
      <CardContent className="p-6">
        {children}
      </CardContent>
    </Card>
  );
}
