
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin } from 'lucide-react';

const ContactShopModal = ({ shop, isOpen, onClose }) => {
  if (!shop) return null;

  const handleCall = () => {
    window.open(`tel:${shop.phone}`);
  };

  const handleEmail = () => {
    window.open(`mailto:${shop.email}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Contact {shop.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-center">
            <img 
              src={shop.image} 
              alt={shop.name}
              className="w-20 h-20 object-cover rounded-full mx-auto mb-2"
            />
            <h3 className="font-semibold">{shop.name}</h3>
            <p className="text-sm text-gray-600">{shop.category}</p>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Phone className="w-5 h-5 text-green-600" />
              <div className="flex-1">
                <p className="font-medium">{shop.phone}</p>
                <p className="text-sm text-gray-600">Tap to call</p>
              </div>
              <Button size="sm" onClick={handleCall}>
                Call
              </Button>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="w-5 h-5 text-blue-600" />
              <div className="flex-1">
                <p className="font-medium">{shop.email}</p>
                <p className="text-sm text-gray-600">Send email</p>
              </div>
              <Button size="sm" variant="outline" onClick={handleEmail}>
                Email
              </Button>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <MapPin className="w-5 h-5 text-red-600" />
              <div>
                <p className="font-medium">Address</p>
                <p className="text-sm text-gray-600">{shop.address}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactShopModal;
