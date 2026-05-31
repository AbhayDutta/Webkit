import { NextRequest, NextResponse } from 'next/server';

interface MonitoringData {
  url: string;
  status: 'online' | 'offline' | 'warning';
  responseTime: number;
  uptime: number;
  lastChecked: string;
  score?: number;
}

// Mock monitoring data - in production, this would come from a database
const mockMonitoringData: MonitoringData[] = [
  {
    url: 'https://shipguard-demo.vercel.app',
    status: 'online',
    responseTime: 245,
    uptime: 99.9,
    lastChecked: new Date().toISOString(),
    score: 95
  },
  {
    url: 'https://example.com',
    status: 'warning',
    responseTime: 1250,
    uptime: 98.5,
    lastChecked: new Date().toISOString(),
    score: 78
  }
];

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const url = searchParams.get('url');
    
    if (url) {
      const siteData = mockMonitoringData.find(site => site.url === url);
      
      if (!siteData) {
        return NextResponse.json(
          { error: 'Site not found in monitoring' },
          { status: 404 }
        );
      }
      
      return NextResponse.json({
        success: true,
        data: siteData
      });
    }
    
    return NextResponse.json({
      success: true,
      data: mockMonitoringData,
      count: mockMonitoringData.length
    });
    
  } catch (error) {
    console.error('Monitoring API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, status, responseTime, score } = body;
    
    // In production, this would update the database
    console.log('Monitoring update:', { url, status, responseTime, score });
    
    return NextResponse.json({
      success: true,
      message: 'Monitoring data updated successfully',
      data: {
        url,
        status,
        responseTime,
        score,
        lastChecked: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('Monitoring POST Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}
