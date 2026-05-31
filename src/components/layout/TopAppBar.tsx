"use client";

import Image from 'next/image';
import { Bell } from 'lucide-react';

export default function TopAppBar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 flex justify-between items-center px-6 py-4">
      <div className="text-xl font-bold text-slate-900 tracking-tight">WebKit</div>
      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-600 hover:bg-slate-100 transition-colors rounded-xl active:scale-95 duration-200">
          <Bell className="w-5 h-5" />
        </button>
        <div className="w-8 h-8 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
          <Image 
            alt="User Profile" 
            className="w-full h-full object-cover" 
            width={32}
            height={32}
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXF8cYyX2NS_5N-GDLX40xuKHs0iRR4HB8GsU2nm0Yq99Vxey8--gOB9t9WVMVeBNPEykuRnYc51U_nELVzxem645N3xEC-Ux6ra5b87I3iPDXbBV2XUwaKpaI2hGQJHvNqrIXPHeyzYWxlDCNYJMfcKT9yzNwH6PyklXhnKhfg4ZbxWzP9OU1PNUkTxgRs0ap9zqzwok-woVuuIr6XLFiwDAqYBqduul7Bt7l0T7OL9_cKa2U9X4JweHpV0K9cOfT1SpfBsjIHQ"
          />
        </div>
      </div>
    </nav>
  );
}
