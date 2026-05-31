"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  Server,
  Zap
} from 'lucide-react';
import TopAppBar from '@/components/layout/TopAppBar';
import BottomNavBar from '@/components/layout/BottomNavBar';

interface MonitoringSite {
  url: string;
  status: 'online' | 'offline' | 'warning';
  responseTime: number;
  uptime: number;
  lastChecked: string;
  score?: number;
}

export default function MonitoringPage() {
  const [sites, setSites] = useState<MonitoringSite[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSite, setSelectedSite] = useState<string | null>(null);

  useEffect(() => {
    fetchMonitoringData();
    
    // Set up real-time updates
    const interval = setInterval(fetchMonitoringData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchMonitoringData = async () => {
    try {
      const response = await fetch('/api/monitoring');
      const data = await response.json();
      
      if (data.success) {
        setSites(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch monitoring data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return CheckCircle;
      case 'offline': return AlertTriangle;
      case 'warning': return AlertTriangle;
      default: return Activity;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'Online';
      case 'offline': return 'Offline';
      case 'warning': return 'Warning';
      default: return 'Unknown';
    }
  };

  const getResponseTimeColor = (time: number) => {
    if (time < 300) return 'text-green-500';
    if (time < 1000) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreColor = (score?: number) => {
    if (!score) return 'text-slate-500';
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-slate-900">
        <TopAppBar />
        <main className="pt-24 pb-32 px-6">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
          </div>
        </main>
        <BottomNavBar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <TopAppBar />
      
      <main className="pt-24 pb-32 px-6">
        {/* Header */}
        <section className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Real-time Monitoring</h1>
          <p className="text-slate-600">
            Monitor your websites 24/7 with instant alerts and detailed analytics
          </p>
        </section>

        {/* Stats Overview */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white border border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Server className="w-8 h-8 text-blue-700" />
                <div>
                  <div className="text-2xl font-bold text-slate-900">{sites.length}</div>
                  <div className="text-sm text-slate-600">Sites Monitored</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-500" />
                <div>
                  <div className="text-2xl font-bold text-slate-900">
                    {sites.filter(s => s.status === 'online').length}
                  </div>
                  <div className="text-sm text-slate-600">Online</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-blue-700" />
                <div>
                  <div className="text-2xl font-bold text-slate-900">99.9%</div>
                  <div className="text-sm text-slate-600">Avg Uptime</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Zap className="w-8 h-8 text-blue-700" />
                <div>
                  <div className="text-2xl font-bold text-slate-900">245ms</div>
                  <div className="text-sm text-slate-600">Avg Response</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Sites List */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Monitored Sites</h2>
          
          {sites.map((site) => {
            const StatusIcon = getStatusIcon(site.status);
            return (
              <Card 
                key={site.url}
                className="bg-white border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
                onClick={() => setSelectedSite(selectedSite === site.url ? null : site.url)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(site.status)}`}></div>
                      <h3 className="font-semibold text-slate-900">{site.url}</h3>
                    </div>
                    <Badge variant={site.status === 'online' ? 'success' : site.status === 'offline' ? 'destructive' : 'warning'}>
                      {getStatusText(site.status)}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm text-slate-600">Response Time</div>
                      <div className={`font-semibold ${getResponseTimeColor(site.responseTime)}`}>
                        {site.responseTime}ms
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-slate-600">Uptime</div>
                      <div className="font-semibold text-slate-900">{site.uptime}%</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-slate-600">Score</div>
                      <div className={`font-semibold ${getScoreColor(site.score)}`}>
                        {site.score || 'N/A'}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-slate-600">Last Checked</div>
                      <div className="font-semibold text-slate-900">
                        {new Date(site.lastChecked).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                  
                  {selectedSite === site.url && (
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <div className="flex items-center gap-2 mb-3">
                        <Activity className="w-4 h-4 text-blue-700" />
                        <span className="font-medium text-slate-900">Live Activity</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Status:</span>
                          <span className="flex items-center gap-2">
                            <StatusIcon className="w-4 h-4" />
                            {getStatusText(site.status)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Monitoring:</span>
                          <span>Active</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Alerts:</span>
                          <span>Enabled</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </section>

        {/* Add Site Button */}
        <section className="mt-8 text-center">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-8 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed">
            <Server className="w-5 h-5 mr-2" />
            Add New Site
          </Button>
        </section>
      </main>
      
      <BottomNavBar />
    </div>
  );
}
