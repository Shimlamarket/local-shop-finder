
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

const LocationSelector = ({ location, onLocationChange, onLocationUpdate }) => {
  const handleLocationUpdate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onLocationChange({ lat: latitude, lng: longitude });
          onLocationUpdate(latitude, longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  return (
    <Card className="bg-white border-gray-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-purple-600" />
            <div>
              <p className="font-medium text-gray-900">Your Location</p>
              <p className="text-sm text-gray-600">
                {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleLocationUpdate}>
            Update
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationSelector;
