
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useToast } from '@/hooks/use-toast';

const Cart = () => {
  const { items, updateQuantity, removeItem, clearCart, getTotalAmount, getOrderHistory } = useCartStore();
  const { toast } = useToast();
  const orderHistory = getOrderHistory();

  const handlePlaceOrder = () => {
    if (items.length === 0) return;

    const order = {
      id: Date.now().toString(),
      items: [...items],
      total: getTotalAmount(),
      timestamp: new Date(),
      shopName: items[0]?.shopName || 'Unknown Shop',
      status: 'placed'
    };

    // Add to order history (in real app, this would go to backend)
    localStorage.setItem('orderHistory', JSON.stringify([...orderHistory, order]));
    
    clearCart();
    toast({
      title: "Order Placed Successfully!",
      description: "Your order has been placed. You'll receive a confirmation shortly.",
    });
  };

  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold mb-2">My Cart</h1>
        <p className="text-purple-100">Review your items and place order</p>
      </div>

      <div className="p-4 space-y-6">
        {/* Current Cart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Current Order ({items.length} items)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {items.length > 0 ? (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.shopId}`} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-600">from {item.shopName}</p>
                      <p className="text-sm font-medium text-green-600">₹{item.price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.productId, item.shopId, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.productId, item.shopId, item.quantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeItem(item.productId, item.shopId)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total Amount:</span>
                    <span className="text-green-600">₹{getTotalAmount()}</span>
                  </div>
                  <p className="text-sm text-gray-600">Payment: Cash on Delivery or UPI on Delivery</p>
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={handlePlaceOrder} className="flex-1">
                    Place Order
                  </Button>
                  <Button variant="outline" onClick={clearCart}>
                    Clear Cart
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Order History */}
        <Card>
          <CardHeader>
            <CardTitle>Previous Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {orderHistory.length > 0 ? (
              <div className="space-y-4">
                {orderHistory.map((order) => (
                  <div key={order.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{order.shopName}</h4>
                        <p className="text-sm text-gray-600">
                          {new Date(order.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600">₹{order.total}</p>
                        <Badge variant="secondary">{order.status}</Badge>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {order.items.length} items ordered
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No previous orders</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Cart;
