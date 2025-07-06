
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, User } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { items } = useCartStore();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
      <div className="flex justify-around items-center">
        <Button
          variant={isActive('/') ? 'default' : 'ghost'}
          onClick={() => navigate('/')}
          className="flex flex-col items-center gap-1 h-auto py-2"
        >
          <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded"></div>
          <span className="text-xs">Home</span>
        </Button>
        
        <Button
          variant={isActive('/cart') ? 'default' : 'ghost'}
          onClick={() => navigate('/cart')}
          className="flex flex-col items-center gap-1 h-auto py-2 relative"
        >
          <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            {items.length > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-2 w-5 h-5 text-xs flex items-center justify-center p-0">
                {items.length}
              </Badge>
            )}
          </div>
          <span className="text-xs">Cart</span>
        </Button>
        
        <Button
          variant={isActive('/profile') ? 'default' : 'ghost'}
          onClick={() => navigate('/profile')}
          className="flex flex-col items-center gap-1 h-auto py-2"
        >
          <User className="w-6 h-6" />
          <span className="text-xs">Profile</span>
        </Button>
      </div>
    </div>
  );
};

export default BottomNavigation;
