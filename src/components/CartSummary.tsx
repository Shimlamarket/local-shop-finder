
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

const CartSummary = () => {
  const navigate = useNavigate();
  const { items, getTotalAmount } = useCartStore();

  if (items.length === 0) return null;

  return (
    <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-5 h-5" />
            <div>
              <p className="font-medium">{items.length} items in cart</p>
              <p className="text-sm text-purple-100">₹{getTotalAmount()}</p>
            </div>
          </div>
          <Button 
            variant="secondary" 
            onClick={() => navigate('/cart')}
            className="bg-white text-purple-600 hover:bg-gray-100"
          >
            View Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartSummary;
