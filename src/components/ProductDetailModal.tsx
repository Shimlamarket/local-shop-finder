
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useToast } from '@/hooks/use-toast';

const ProductDetailModal = ({ product, shopId, isOpen, onClose }) => {
  const { items, addItem, updateQuantity } = useCartStore();
  const { toast } = useToast();
  
  const cartItem = items.find(item => 
    item.productId === product?.id && item.shopId === shopId
  );
  
  const quantity = cartItem?.quantity || 0;

  if (!product) return null;

  const handleAddToCart = () => {
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            <Badge variant="outline" className="absolute top-2 right-2">
              {product.category}
            </Badge>
          </div>
          
          <div>
            <p className="text-2xl font-bold text-green-600">₹{product.price}</p>
            <p className="text-gray-600 mt-2">{product.description}</p>
          </div>
          
          {product.specifications && (
            <div>
              <h4 className="font-semibold mb-2">Specifications</h4>
              <div className="space-y-1">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-gray-600 capitalize">{key.replace('_', ' ')}:</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="pt-4 border-t">
            {quantity === 0 ? (
              <Button onClick={handleAddToCart} className="w-full" size="lg">
                <Plus className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            ) : (
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUpdateQuantity(quantity - 1)}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="font-medium text-lg">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUpdateQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
