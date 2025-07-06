
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SearchBar from '@/components/SearchBar';
import ShopCard from '@/components/ShopCard';
import CategoryFilter from '@/components/CategoryFilter';
import LocationSelector from '@/components/LocationSelector';
import CartSummary from '@/components/CartSummary';
import { useCartStore } from '@/store/cartStore';
import { getShopsNearby } from '@/services/shopService';

const Index = () => {
  const [shops, setShops] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('distance');
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const { items } = useCartStore();

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          loadShops(latitude, longitude);
        },
        () => {
          // Default location (e.g., city center)
          setLocation({ lat: 28.6139, lng: 77.2090 }); // Delhi
          loadShops(28.6139, 77.2090);
        }
      );
    } else {
      setLocation({ lat: 28.6139, lng: 77.2090 });
      loadShops(28.6139, 77.2090);
    }
  }, []);

  useEffect(() => {
    filterAndSortShops();
  }, [shops, searchQuery, selectedCategory, sortBy]);

  const loadShops = (lat, lng) => {
    const nearbyShops = getShopsNearby(lat, lng);
    setShops(nearbyShops);
  };

  const filterAndSortShops = () => {
    let filtered = shops;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(shop =>
        shop.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(shop => shop.category === selectedCategory);
    }

    // Sort shops
    filtered.sort((a, b) => {
      if (sortBy === 'distance') {
        return a.distance - b.distance;
      } else if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return 0;
    });

    setFilteredShops(filtered);
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold mb-2">ShopNear</h1>
        <p className="text-purple-100">Discover local shops around you</p>
      </div>

      {/* Location Selector */}
      <div className="p-4">
        <LocationSelector 
          location={location} 
          onLocationChange={setLocation}
          onLocationUpdate={loadShops}
        />
      </div>

      {/* Search Bar */}
      <div className="px-4 mb-4">
        <SearchBar 
          value={searchQuery} 
          onChange={setSearchQuery} 
          placeholder="Search shops by name..."
        />
      </div>

      {/* Category Filter */}
      <div className="px-4 mb-4">
        <CategoryFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* Sort Options */}
      <div className="px-4 mb-4 flex gap-2">
        <Button
          variant={sortBy === 'distance' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSortBy('distance')}
        >
          Nearest First
        </Button>
        <Button
          variant={sortBy === 'rating' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSortBy('rating')}
        >
          Highest Rated
        </Button>
      </div>

      {/* Cart Summary */}
      {items.length > 0 && (
        <div className="px-4 mb-4">
          <CartSummary />
        </div>
      )}

      {/* Shops Grid */}
      <div className="px-4 space-y-4">
        {filteredShops.length > 0 ? (
          filteredShops.map((shop) => (
            <ShopCard key={shop.id} shop={shop} />
          ))
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-500">No shops found matching your criteria</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
