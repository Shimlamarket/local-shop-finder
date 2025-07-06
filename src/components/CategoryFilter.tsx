
import React from 'react';
import { Button } from '@/components/ui/button';

const categories = [
  'All',
  'Jewellery',
  'Kirana',
  'Bakery',
  'Automobile',
  'Electronics',
  'Clothing',
  'Pharmacy',
  'Restaurant'
];

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? 'default' : 'outline'}
          size="sm"
          onClick={() => onCategoryChange(category)}
          className="whitespace-nowrap"
        >
          {category}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
