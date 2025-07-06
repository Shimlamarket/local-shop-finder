
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Phone } from 'lucide-react';

const OrderTimer = ({ order, onContactShop }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!order.timestamp) return;

    const calculateTimeLeft = () => {
      const orderTime = new Date(order.timestamp).getTime();
      const now = Date.now();
      const elapsed = now - orderTime;
      const thirtyMinutes = 30 * 60 * 1000; // 30 minutes in milliseconds
      const remaining = thirtyMinutes - elapsed;
      
      return Math.max(0, Math.floor(remaining / 1000)); // return seconds
    };

    const updateTimer = () => {
      setTimeLeft(calculateTimeLeft());
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [order.timestamp]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isLowTime = timeLeft > 0 && timeLeft <= 600; // 10 minutes or less
  const isExpired = timeLeft === 0;

  if (order.status !== 'placed') return null;

  return (
    <Card className={`${isLowTime || isExpired ? 'border-red-300 bg-red-50' : 'border-orange-300 bg-orange-50'}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className={`w-5 h-5 ${isLowTime || isExpired ? 'text-red-600' : 'text-orange-600'}`} />
            <div>
              <p className="font-medium">
                {isExpired ? 'Order Expired' : 'Time Remaining'}
              </p>
              <p className={`text-lg font-bold ${isLowTime || isExpired ? 'text-red-600' : 'text-orange-600'}`}>
                {isExpired ? '00:00' : formatTime(timeLeft)}
              </p>
            </div>
          </div>
          
          {(isLowTime || isExpired) && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onContactShop(order)}
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              <Phone className="w-4 h-4 mr-1" />
              Contact Shop
            </Button>
          )}
        </div>
        
        {isLowTime && !isExpired && (
          <p className="text-sm text-red-600 mt-2">
            Order expires soon! Contact shop if needed.
          </p>
        )}
        
        {isExpired && (
          <p className="text-sm text-red-600 mt-2">
            Your order has expired. Please contact the shop.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderTimer;
