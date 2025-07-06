
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Star, MapPin } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { getShopById, getShopProducts } from '@/services/shopService';

const ShopDetail = () => {
  const { shopId } = useParams();
  const navigate = useNavigate();
  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    if (shopId) {
      const shopData = getShopById(shopId);
      const productData = getShopProducts(shopId);
      setShop(shopData);
      setProducts(productData);
    }
  }, [shopId]);

  if (!shop) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading shop details...</p>
      </div>
    );
  }

  const categories = ['All', ...new Set(products.map(product => product.category))];
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4">
        <div className="flex items-center gap-3 mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-xl font-bold">Shop Details</h1>
        </div>
      </div>

      {/* Shop Info */}
      <div className="p-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{shop.name}</h2>
                <p className="text-gray-600 flex items-center gap-1 mt-1">
                  <MapPin className="w-4 h-4" />
                  {shop.distance}km away
                </p>
              </div>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                {shop.category}
              </Badge>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{shop.rating}</span>
                <span>({shop.reviews} reviews)</span>
              </div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <span>{shop.address}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <div className="px-4 mb-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="px-4">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">
          Available Products ({filteredProducts.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} shopId={shopId} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopDetail;
