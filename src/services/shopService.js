
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
    lng: 77.2095,
    image: '/placeholder.svg?height=200&width=300&text=Golden+Jewellers',
    phone: '+91 98765 43210',
    email: 'contact@goldenjewellers.com',
    description: 'Premium gold and silver jewelry with traditional and modern designs.',
    workingHours: '10:00 AM - 8:00 PM'
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
    lng: 77.2088,
    image: '/placeholder.svg?height=200&width=300&text=Fresh+Kirana',
    phone: '+91 98765 43211',
    email: 'freshkirana@gmail.com',
    description: 'Your neighborhood grocery store with fresh vegetables and daily essentials.',
    workingHours: '7:00 AM - 10:00 PM'
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
    lng: 77.2102,
    image: '/placeholder.svg?height=200&width=300&text=Sweet+Dreams+Bakery',
    phone: '+91 98765 43212',
    email: 'sweetdreams@bakery.com',
    description: 'Freshly baked cakes, pastries, and bread made daily with love.',
    workingHours: '6:00 AM - 9:00 PM'
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
    lng: 77.2110,
    image: '/placeholder.svg?height=200&width=300&text=Auto+Care+Center',
    phone: '+91 98765 43213',
    email: 'autocare@service.com',
    description: 'Complete automotive solutions including repairs, maintenance, and parts.',
    workingHours: '9:00 AM - 7:00 PM'
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
    lng: 77.2085,
    image: '/placeholder.svg?height=200&width=300&text=Tech+Electronics',
    phone: '+91 98765 43214',
    email: 'tech@electronics.com',
    description: 'Latest gadgets, smartphones, laptops, and electronic accessories.',
    workingHours: '10:00 AM - 9:00 PM'
  }
];

const mockProducts = {
  '1': [
    { 
      id: 'p1', 
      name: 'Gold Ring', 
      category: 'Rings', 
      price: 15000, 
      description: 'Beautiful 18k gold ring with intricate design',
      image: '/placeholder.svg?height=200&width=200&text=Gold+Ring',
      specifications: {
        material: '18k Gold',
        weight: '5.2g',
        size: 'Adjustable',
        warranty: '1 Year'
      },
      shopName: 'Golden Jewellers' 
    },
    { 
      id: 'p2', 
      name: 'Silver Necklace', 
      category: 'Necklaces', 
      price: 2500, 
      description: 'Elegant silver necklace perfect for special occasions',
      image: '/placeholder.svg?height=200&width=200&text=Silver+Necklace',
      specifications: {
        material: '925 Sterling Silver',
        length: '18 inches',
        weight: '12.5g',
        warranty: '6 Months'
      },
      shopName: 'Golden Jewellers' 
    },
    { 
      id: 'p3', 
      name: 'Diamond Earrings', 
      category: 'Earrings', 
      price: 8000, 
      description: 'Sparkling diamond earrings that add elegance to any outfit',
      image: '/placeholder.svg?height=200&width=200&text=Diamond+Earrings',
      specifications: {
        material: '14k Gold with Diamonds',
        diamond_quality: 'VS1',
        weight: '3.8g',
        warranty: '2 Years'
      },
      shopName: 'Golden Jewellers' 
    }
  ],
  '2': [
    { 
      id: 'p4', 
      name: 'Basmati Rice', 
      category: 'Grains', 
      price: 120, 
      description: '1kg premium basmati rice - aromatic and long grain',
      image: '/placeholder.svg?height=200&width=200&text=Basmati+Rice',
      specifications: {
        brand: 'Premium Choice',
        weight: '1kg',
        origin: 'Punjab, India',
        expiry: '12 months from manufacturing'
      },
      shopName: 'Fresh Kirana Store' 
    },
    { 
      id: 'p5', 
      name: 'Cooking Oil', 
      category: 'Oil', 
      price: 180, 
      description: '1L pure sunflower oil for healthy cooking',
      image: '/placeholder.svg?height=200&width=200&text=Cooking+Oil',
      specifications: {
        brand: 'Healthy Heart',
        volume: '1 Liter',
        type: 'Refined Sunflower Oil',
        expiry: '18 months from manufacturing'
      },
      shopName: 'Fresh Kirana Store' 
    }
  ],
  '3': [
    { 
      id: 'p8', 
      name: 'Chocolate Cake', 
      category: 'Cakes', 
      price: 450, 
      description: 'Rich chocolate cake made with premium cocoa',
      image: '/placeholder.svg?height=200&width=200&text=Chocolate+Cake',
      specifications: {
        size: '1 lb',
        serves: '6-8 people',
        ingredients: 'Chocolate, Flour, Eggs, Butter',
        shelf_life: '3 days refrigerated'
      },
      shopName: 'Sweet Dreams Bakery' 
    }
  ]
};

const mockReviews = {
  '1': [
    {
      id: 'r1',
      customerName: 'Priya Sharma',
      rating: 5,
      comment: 'Excellent quality jewelry and great customer service!',
      date: '2024-01-15'
    },
    {
      id: 'r2',
      customerName: 'Rahul Kumar',
      rating: 4,
      comment: 'Good collection but slightly expensive.',
      date: '2024-01-10'
    }
  ],
  '2': [
    {
      id: 'r3',
      customerName: 'Anita Singh',
      rating: 4,
      comment: 'Fresh vegetables and good prices.',
      date: '2024-01-12'
    }
  ]
};

export const getShopsNearby = (lat, lng, radius = 10) => {
  return mockShops.map(shop => ({
    ...shop,
    distance: parseFloat((Math.random() * 5 + 0.5).toFixed(1))
  }));
};

export const getShopById = (shopId) => {
  return mockShops.find(shop => shop.id === shopId);
};

export const getShopProducts = (shopId) => {
  return mockProducts[shopId] || [];
};

export const getProductById = (productId, shopId) => {
  const products = mockProducts[shopId] || [];
  return products.find(product => product.id === productId);
};

export const getShopReviews = (shopId) => {
  return mockReviews[shopId] || [];
};

export const addShopReview = (shopId, review) => {
  if (!mockReviews[shopId]) {
    mockReviews[shopId] = [];
  }
  const newReview = {
    ...review,
    id: `r${Date.now()}`,
    date: new Date().toISOString().split('T')[0]
  };
  mockReviews[shopId].push(newReview);
  return newReview;
};

export const searchShops = (query, shops) => {
  return shops.filter(shop =>
    shop.name.toLowerCase().includes(query.toLowerCase()) ||
    shop.category.toLowerCase().includes(query.toLowerCase())
  );
};
