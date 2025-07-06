
// Mock data and services - In real app, this would connect to your backend

const mockShops = [
  {
    id: '1',
    name: 'Golden Jewellers',
    category: 'Jewellery',
    rating: 4.5,
    reviews: 128,
    distance: 0.8,
    address: 'Main Market, Sector 15',
    lat: 28.6129,
    lng: 77.2095
  },
  {
    id: '2',
    name: 'Fresh Kirana Store',
    category: 'Kirana',
    rating: 4.2,
    reviews: 95,
    distance: 1.2,
    address: 'Community Center, Sector 12',
    lat: 28.6135,
    lng: 77.2088
  },
  {
    id: '3',
    name: 'Sweet Dreams Bakery',
    category: 'Bakery',
    rating: 4.7,
    reviews: 203,
    distance: 0.5,
    address: 'Park Street, Sector 18',
    lat: 28.6145,
    lng: 77.2102
  },
  {
    id: '4',
    name: 'Auto Care Center',
    category: 'Automobile',
    rating: 4.3,
    reviews: 67,
    distance: 2.1,
    address: 'Industrial Area, Sector 20',
    lat: 28.6120,
    lng: 77.2110
  },
  {
    id: '5',
    name: 'Tech Electronics',
    category: 'Electronics',
    rating: 4.4,
    reviews: 156,
    distance: 1.5,
    address: 'Shopping Complex, Sector 14',
    lat: 28.6142,
    lng: 77.2085
  }
];

const mockProducts = {
  '1': [
    { id: 'p1', name: 'Gold Ring', category: 'Rings', price: 15000, description: 'Beautiful 18k gold ring', shopName: 'Golden Jewellers' },
    { id: 'p2', name: 'Silver Necklace', category: 'Necklaces', price: 2500, description: 'Elegant silver necklace', shopName: 'Golden Jewellers' },
    { id: 'p3', name: 'Diamond Earrings', category: 'Earrings', price: 8000, description: 'Sparkling diamond earrings', shopName: 'Golden Jewellers' }
  ],
  '2': [
    { id: 'p4', name: 'Basmati Rice', category: 'Grains', price: 120, description: '1kg premium basmati rice', shopName: 'Fresh Kirana Store' },
    { id: 'p5', name: 'Cooking Oil', category: 'Oil', price: 180, description: '1L sunflower oil', shopName: 'Fresh Kirana Store' },
    { id: 'p6', name: 'Fresh Milk', category: 'Dairy', price: 60, description: '1L fresh milk', shopName: 'Fresh Kirana Store' },
    { id: 'p7', name: 'Bread', category: 'Bakery', price: 25, description: 'Fresh white bread', shopName: 'Fresh Kirana Store' }
  ],
  '3': [
    { id: 'p8', name: 'Chocolate Cake', category: 'Cakes', price: 450, description: 'Rich chocolate cake', shopName: 'Sweet Dreams Bakery' },
    { id: 'p9', name: 'Croissants', category: 'Pastries', price: 80, description: 'Buttery croissants (2 pieces)', shopName: 'Sweet Dreams Bakery' },
    { id: 'p10', name: 'Fresh Donuts', category: 'Donuts', price: 120, description: 'Assorted donuts (6 pieces)', shopName: 'Sweet Dreams Bakery' }
  ],
  '4': [
    { id: 'p11', name: 'Engine Oil', category: 'Oils', price: 850, description: '1L synthetic engine oil', shopName: 'Auto Care Center' },
    { id: 'p12', name: 'Car Battery', category: 'Parts', price: 3500, description: '12V car battery', shopName: 'Auto Care Center' },
    { id: 'p13', name: 'Brake Pads', category: 'Parts', price: 1200, description: 'Front brake pads set', shopName: 'Auto Care Center' }
  ],
  '5': [
    { id: 'p14', name: 'Smartphone', category: 'Mobile', price: 15000, description: 'Latest Android smartphone', shopName: 'Tech Electronics' },
    { id: 'p15', name: 'Bluetooth Headphones', category: 'Audio', price: 2500, description: 'Wireless bluetooth headphones', shopName: 'Tech Electronics' },
    { id: 'p16', name: 'Phone Charger', category: 'Accessories', price: 450, description: 'Fast charging cable', shopName: 'Tech Electronics' }
  ]
};

export const getShopsNearby = (lat, lng, radius = 10) => {
  // In real app, this would make an API call to get shops near the location
  // For now, return mock data with calculated distances
  return mockShops.map(shop => ({
    ...shop,
    distance: parseFloat((Math.random() * 5 + 0.5).toFixed(1)) // Mock distance calculation
  }));
};

export const getShopById = (shopId) => {
  return mockShops.find(shop => shop.id === shopId);
};

export const getShopProducts = (shopId) => {
  return mockProducts[shopId] || [];
};

export const searchShops = (query, shops) => {
  return shops.filter(shop =>
    shop.name.toLowerCase().includes(query.toLowerCase()) ||
    shop.category.toLowerCase().includes(query.toLowerCase())
  );
};
