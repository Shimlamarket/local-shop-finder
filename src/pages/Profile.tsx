
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { User, MapPin, Phone, Mail, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AuthModal from '@/components/AuthModal';

const Profile = () => {
  const { toast } = useToast();
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '+91 98765 43210',
    address: '123 Main Street, City',
    savedLocation: {
      lat: 28.6139,
      lng: 77.2090,
      address: 'New Delhi, India'
    }
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setProfile(prev => ({
        ...prev,
        name: userData.name,
        email: userData.email
      }));
    }
  }, []);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setProfile(prev => ({
      ...prev,
      name: userData.name,
      email: userData.email
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setProfile(prev => ({
      ...prev,
      name: '',
      email: ''
    }));
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleLocationSave = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setProfile(prev => ({
            ...prev,
            savedLocation: {
              lat: latitude,
              lng: longitude,
              address: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
            }
          }));
          toast({
            title: "Location Saved",
            description: "Your current location has been saved to your profile.",
          });
        },
        () => {
          toast({
            title: "Location Error",
            description: "Unable to get your current location. Please enable location services.",
            variant: "destructive"
          });
        }
      );
    }
  };

  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold mb-2">My Profile</h1>
        <p className="text-purple-100">Manage your account details</p>
      </div>

      <div className="p-4 space-y-6">
        {/* Authentication Section */}
        {!user ? (
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-gray-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Welcome to ShopNear</h2>
              <p className="text-gray-600 mb-4">Login to access your profile and track your orders</p>
              <Button onClick={() => setShowAuthModal(true)} className="w-full">
                Login / Sign Up
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Profile Picture */}
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="mt-3"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Personal Information</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={profile.address}
                    onChange={(e) => setProfile(prev => ({ ...prev, address: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                {isEditing && (
                  <Button onClick={handleSave} className="w-full">
                    Save Changes
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Saved Location */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Saved Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Save your location for better shop recommendations and faster checkout.
                </p>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <p className="text-sm font-medium">Current Saved Location:</p>
                  <p className="text-sm text-gray-600">{profile.savedLocation.address}</p>
                </div>
                <Button onClick={handleLocationSave} className="w-full">
                  Update to Current Location
                </Button>
              </CardContent>
            </Card>
          </>
        )}

        {/* App Settings */}
        <Card>
          <CardHeader>
            <CardTitle>App Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Push Notifications</span>
              <Button variant="outline" size="sm">Enable</Button>
            </div>
            <div className="flex items-center justify-between">
              <span>Location Services</span>
              <Button variant="outline" size="sm">Enable</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default Profile;
