"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Shield, 
  AlertCircle,
  CheckCircle,
  XCircle,
  Plus
} from 'lucide-react';

interface Order {
  id: number;
  totalAmount: string;
  protectionEnabled: boolean;
  createdAt: string;
}

interface Claim {
  id: number;
  orderId: number;
  reason: string;
  imageUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export default function ClaimsPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [showNewClaimForm, setShowNewClaimForm] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [reason, setReason] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchClaimsData();
  }, []);

  const fetchClaimsData = async () => {
    try {
      const [ordersResponse, claimsResponse] = await Promise.all([
        fetch('/api/orders'),
        fetch('/api/claims'),
      ]);

      const ordersData = await ordersResponse.json();
      const claimsData = await claimsResponse.json();

      // Filter orders that have protection enabled
      const protectedOrders = ordersData.filter((order: Order) => order.protectionEnabled);
      setOrders(protectedOrders);
      setClaims(claimsData);
    } catch (error) {
      console.error('Error fetching claims data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedOrderId || !reason) {
      alert('Please select an order and provide a reason');
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch('/api/claims', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: parseInt(selectedOrderId),
          reason,
          imageUrl: imageUrl || undefined,
        }),
      });

      if (response.ok) {
        alert('Claim submitted successfully!');
        setSelectedOrderId('');
        setReason('');
        setImageUrl('');
        setShowNewClaimForm(false);
        fetchClaimsData();
      } else {
        alert('Failed to submit claim');
      }
    } catch (error) {
      console.error('Error submitting claim:', error);
      alert('Failed to submit claim');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading claims...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <FileText className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Claims</h1>
        </div>
        <Button 
          onClick={() => setShowNewClaimForm(true)}
          disabled={orders.length === 0}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Claim
        </Button>
      </div>

      {/* New Claim Form */}
      {showNewClaimForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Submit New Claim
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitClaim} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Select Order *
                </label>
                <select
                  value={selectedOrderId}
                  onChange={(e) => setSelectedOrderId(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="">Choose an order...</option>
                  {orders.map((order) => (
                    <option key={order.id} value={order.id}>
                      Order #{order.id} - ₹{parseFloat(order.totalAmount).toLocaleString()} 
                      ({new Date(order.createdAt).toLocaleDateString()})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Reason for Claim *
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Describe the issue with your order..."
                  className="w-full p-2 border rounded-md h-32"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Image URL (optional)
                </label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit Claim'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowNewClaimForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Claims List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Claims</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {claims.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">No claims found</p>
                <p className="text-sm text-gray-400 mt-2">
                  Submit a claim for any protected order that has issues
                </p>
              </div>
            ) : (
              claims.map((claim) => (
                <div key={claim.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium">Claim #{claim.id}</span>
                        <Badge variant={
                          claim.status === 'pending' ? 'warning' :
                          claim.status === 'approved' ? 'success' : 'destructive'
                        }>
                          {claim.status}
                        </Badge>
                      </div>
                      <p className="text-gray-700 mb-2">{claim.reason}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Order #{claim.orderId}</span>
                        <span>•</span>
                        <span>{new Date(claim.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {claim.status === 'pending' && (
                        <AlertCircle className="w-5 h-5 text-yellow-500" />
                      )}
                      {claim.status === 'approved' && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                      {claim.status === 'rejected' && (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                  </div>
                  
                  {claim.imageUrl && (
                    <div className="mt-3">
                      <p className="text-sm font-medium mb-2">Evidence Image:</p>
                      <Image 
                        src={claim.imageUrl} 
                        alt="Claim evidence" 
                        width={300}
                        height={200}
                        className="rounded border"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {orders.length === 0 && !loading && (
        <Card className="mt-8">
          <CardContent className="text-center py-8">
            <Shield className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="font-semibold mb-2">No Protected Orders</h3>
            <p className="text-gray-500">
              You need to have orders with protection enabled to submit claims.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
