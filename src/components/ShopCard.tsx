
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin } from 'lucide-react';

const ShopCard = ({ shop }) => {
  const navigate = useNavigate();

  return (
    <Card 
      className="hover:shadow-lg transition-shadow cursor-pointer bg-white border-gray-200"
      onClick={() => navigate(`/shop/${shop.id}`)}
    >
      <CardContent className="p-0">
        <div className="relative">
          <img 
            src={shop.image} 
            alt={shop.name}
            className="w-full h-40 object-cover rounded-t-lg"
          />
          <Badge 
            variant="secondary" 
            className="absolute top-2 right-2 bg-purple-100 text-purple-800"
          >
            {shop.category}
          </Badge>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{shop.name}</h3>
              <p className="text-gray-600 text-sm flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {shop.distance}km away
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{shop.rating}</span>
              <span>({shop.reviews} reviews)</span>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm">{shop.address}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShopCard;
