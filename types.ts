
export type UserRole = 'USER' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  imageUrl: string;
  category: string;
  stock: 'In Stock' | 'Out of Stock';
  createdAt: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export type OrderStatus = 'Pending' | 'Paid' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  userId: string;
  items: (CartItem & { price: number; name: string })[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  shippingAddress: {
    address: string;
    city: string;
    zipCode: string;
  };
}

export interface StoreState {
  products: Product[];
  orders: Order[];
  cart: CartItem[];
}
