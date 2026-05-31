"use client";

import { useState, useEffect } from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  animated?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

export default function ProgressBar({ 
  value, 
  max = 100, 
  className = '', 
  animated = true,
  color = 'primary' 
}: ProgressBarProps) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setAnimatedValue(value);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [value, animated]);

  // Update value immediately if not animated
  useEffect(() => {
    if (!animated) {
      setAnimatedValue(value);
    }
  }, [value, animated]);

  const percentage = Math.min((animatedValue / max) * 100, 100);
  
  const colorClasses = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500'
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-on-surface-variant">
          {Math.round(percentage)}%
        </span>
        <span className="text-xs text-on-surface">
          {animatedValue} / {max}
        </span>
      </div>
      <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
        <div 
          className={`h-full transition-all duration-500 ease-out ${colorClasses[color]} rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
