"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BarChart3, Settings, ShieldCheck, Activity } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { href: '/audit', label: 'Audits', icon: ShieldCheck },
  { href: '/monitoring', label: 'Monitor', icon: Activity },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export default function BottomNavBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-white/95 backdrop-blur-sm border-t border-slate-200">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`
              flex flex-col items-center justify-center 
              ${isActive 
                ? 'bg-blue-50 text-blue-700 rounded-xl px-3 py-1' 
                : 'text-slate-600 px-3 py-1 hover:text-slate-900'
              } 
              transition-all active:scale-90 duration-200
            `}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] font-medium tracking-wide uppercase mt-1">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
