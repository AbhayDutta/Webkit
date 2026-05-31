"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, ShoppingCart, Plus, Minus } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: 'Wireless Headphones', price: 2999, quantity: 1 },
    { id: 2, name: 'Smart Watch', price: 4999, quantity: 1 },
    { id: 3, name: 'Phone Case', price: 299, quantity: 2 },
  ]);
  const [protectionEnabled, setProtectionEnabled] = useState(false);
  const [protectionFee, setProtectionFee] = useState(0);
  const [loading, setLoading] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + protectionFee;

  useEffect(() => {
    const calculateProtectionFee = async () => {
      if (!protectionEnabled) {
        setProtectionFee(0);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch('/api/protect', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ totalAmount: subtotal }),
        });

        const data = await response.json();
        setProtectionFee(data.protectionFee);
      } catch (error) {
        console.error('Error calculating protection fee:', error);
      } finally {
        setLoading(false);
      }
    };

    calculateProtectionFee();
  }, [subtotal, protectionEnabled]);

  const updateQuantity = (id: number, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'user-123', // In a real app, this would come from authentication
          totalAmount: total,
          protectionEnabled,
          protectionFee: protectionEnabled ? protectionFee : 0,
        }),
      });

      if (response.ok) {
        alert('Order placed successfully!');
        setCartItems([]);
        setProtectionEnabled(false);
      } else {
        alert('Failed to place order');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to place order');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center gap-2 mb-8">
        <ShoppingCart className="w-8 h-8" />
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600">₹{item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="text-right min-w-25">
                      <p className="font-semibold">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>

                {/* Protection Toggle */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">Protect my order</span>
                    </div>
                    <Switch
                      checked={protectionEnabled}
                      onCheckedChange={setProtectionEnabled}
                      disabled={loading}
                    />
                  </div>
                  {protectionEnabled && (
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>• Coverage against damage, loss, and theft</p>
                      <p>• Quick claim processing</p>
                      <p>• Full refund guarantee</p>
                    </div>
                  )}
                </div>

                {protectionEnabled && (
                  <div className="flex justify-between">
                    <span>Protection Fee</span>
                    <span className="text-blue-600">
                      +₹{protectionFee.toLocaleString()}
                    </span>
                  </div>
                )}

                <div className="border-t pt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </Button>

              {protectionEnabled && (
                <Badge variant="secondary" className="w-full justify-center">
                  <Shield className="w-3 h-3 mr-1" />
                  Your order is protected
                </Badge>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
