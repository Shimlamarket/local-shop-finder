
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useToast } from '@/hooks/use-toast';

const ProductCard = ({ product, shopId }) => {
  const { items, addItem, updateQuantity } = useCartStore();
  const { toast } = useToast();
  
  const cartItem = items.find(item => 
    item.productId === product.id && item.shopId === shopId
  );
  
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    // Check if there are items from a different shop
    const differentShopItems = items.filter(item => item.shopId !== shopId);
    
    if (differentShopItems.length > 0) {
      toast({
        title: "Cannot add items from different shops",
        description: "Please complete your current order or clear cart to add items from another shop.",
        variant: "destructive"
      });
      return;
    }

    addItem({
      productId: product.id,
      shopId: shopId,
      name: product.name,
      price: product.price,
      shopName: product.shopName || 'Shop',
      quantity: 1
    });

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleUpdateQuantity = (newQuantity) => {
    if (newQuantity === 0) {
      updateQuantity(product.id, shopId, 0);
      return;
    }
    updateQuantity(product.id, shopId, newQuantity);
  };

  return (
    <Card className="bg-white border-gray-200 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 mb-1">{product.name}</h4>
            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
            <p className="text-lg font-semibold text-green-600">₹{product.price}</p>
          </div>
          <Badge variant="outline" className="ml-2">
            {product.category}
          </Badge>
        </div>
        
        {quantity === 0 ? (
          <Button onClick={handleAddToCart} className="w-full" size="sm">
            <Plus className="w-4 h-4 mr-1" />
            Add to Cart
          </Button>
        ) : (
          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleUpdateQuantity(quantity - 1)}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="font-medium">{quantity}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleUpdateQuantity(quantity + 1)}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
