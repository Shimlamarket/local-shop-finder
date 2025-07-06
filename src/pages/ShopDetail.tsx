
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Star, MapPin, Phone, Mail, Clock } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import ProductDetailModal from '@/components/ProductDetailModal';
import ShopReviews from '@/components/ShopReviews';
import { getShopById, getShopProducts, getProductById, getShopReviews, addShopReview } from '@/services/shopService';

const ShopDetail = () => {
  const { shopId } = useParams();
  const navigate = useNavigate();
  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);

  useEffect(() => {
    if (shopId) {
      const shopData = getShopById(shopId);
      const productData = getShopProducts(shopId);
      const reviewData = getShopReviews(shopId);
      setShop(shopData);
      setProducts(productData);
      setReviews(reviewData);
    }
  }, [shopId]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const handleAddReview = (reviewData) => {
    const newReview = addShopReview(shopId, reviewData);
    setReviews(prev => [...prev, newReview]);
  };

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
          <CardContent className="p-0">
            <img 
              src={shop.image} 
              alt={shop.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-6">
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
              
              <p className="text-gray-600 mb-4">{shop.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{shop.rating}</span>
                  <span>({shop.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{shop.workingHours}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{shop.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{shop.email}</span>
                </div>
              </div>
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
      <div className="px-4 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">
          Available Products ({filteredProducts.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              shopId={shopId}
              onProductClick={handleProductClick}
            />
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="px-4">
        <ShopReviews 
          shopId={shopId}
          reviews={reviews}
          onAddReview={handleAddReview}
        />
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        shopId={shopId}
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
      />
    </div>
  );
};

export default ShopDetail;
