"use client";

import React, { useState, useEffect, forwardRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface AnimatedCardProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  status?: 'pending' | 'processing' | 'completed' | 'error';
  icon?: React.ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedCard = forwardRef<HTMLDivElement, AnimatedCardProps>(function AnimatedCard({ 
  children, 
  title, 
  description, 
  status = 'pending', 
  icon, 
  className = '', 
  delay = 0 
}, ref) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const getStatusColor = () => {
    switch (status) {
      case 'pending': return 'border-yellow-200 bg-yellow-50';
      case 'processing': return 'border-blue-200 bg-blue-50';
      case 'completed': return 'border-green-200 bg-green-50';
      case 'error': return 'border-red-200 bg-red-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'pending': return AlertTriangle;
      case 'processing': return AlertTriangle;
      case 'completed': return CheckCircle;
      case 'error': return XCircle;
      default: return CheckCircle;
    }
  };

  return (
    <Card 
      ref={ref}
      className={`
        transition-all duration-700 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        ${getStatusColor()}
        ${className}
      `}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {icon && <div className="w-8 h-8 text-primary">{icon}</div>}
            <div>
              {title && <h3 className="text-lg font-semibold text-on-surface">{title}</h3>}
              {description && <p className="text-sm text-on-surface-variant">{description}</p>}
            </div>
          </div>
          {status && (
            <Badge 
              variant={status === 'completed' ? 'success' : status === 'error' ? 'destructive' : 'warning'}
              className="flex items-center gap-1"
            >
              {getStatusIcon()}
              <span className="ml-1 text-xs uppercase tracking-wider">
                {status}
              </span>
            </Badge>
          )}
        </div>
        {children}
      </CardContent>
    </Card>
  );
});

AnimatedCard.displayName = 'AnimatedCard';

export default AnimatedCard;
