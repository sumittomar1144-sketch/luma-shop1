
import { Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Wireless Noise Cancelling Headphones',
    description: 'Experience pure sound with our flagship wireless headphones. Features hybrid active noise cancellation and 30-hour battery life.',
    price: 299.99,
    discountPrice: 249.99,
    imageUrl: 'https://picsum.photos/seed/headphone/600/600',
    category: 'Electronics',
    stock: 'In Stock',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Minimalist Quartz Watch',
    description: 'A timeless design for the modern individual. Stainless steel casing with a premium leather strap.',
    price: 150.00,
    imageUrl: 'https://picsum.photos/seed/watch/600/600',
    category: 'Accessories',
    stock: 'In Stock',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Ergonomic Mechanical Keyboard',
    description: 'Tactile, fast, and incredibly durable. Custom RGB lighting and hot-swappable switches.',
    price: 129.99,
    discountPrice: 110.00,
    imageUrl: 'https://picsum.photos/seed/keyboard/600/600',
    category: 'Electronics',
    stock: 'In Stock',
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Smart Water Bottle',
    description: 'Tracks your hydration and glows to remind you to drink. Syncs with all major health apps.',
    price: 45.00,
    imageUrl: 'https://picsum.photos/seed/bottle/600/600',
    category: 'Health',
    stock: 'Out of Stock',
    createdAt: new Date().toISOString()
  }
];

export const CATEGORIES = ['Electronics', 'Accessories', 'Health', 'Home', 'Fashion'];
