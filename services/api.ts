
import { Product, Order, StoreState, CartItem } from '../types';
import { INITIAL_PRODUCTS } from '../constants';

const STORE_KEY = 'lumina_store_v1';

export const getStore = (): StoreState => {
  const data = localStorage.getItem(STORE_KEY);
  if (!data) {
    const initialState: StoreState = {
      products: INITIAL_PRODUCTS,
      orders: [],
      cart: []
    };
    saveStore(initialState);
    return initialState;
  }
  return JSON.parse(data);
};

export const saveStore = (state: StoreState) => {
  localStorage.setItem(STORE_KEY, JSON.stringify(state));
};

export const generateId = () => Math.random().toString(36).substr(2, 9).toUpperCase();

// Product CRUD
export const addProduct = (product: Omit<Product, 'id' | 'createdAt'>) => {
  const store = getStore();
  const newProduct: Product = {
    ...product,
    id: generateId(),
    createdAt: new Date().toISOString()
  };
  store.products.push(newProduct);
  saveStore(store);
  return newProduct;
};

export const updateProduct = (id: string, updates: Partial<Product>) => {
  const store = getStore();
  const index = store.products.findIndex(p => p.id === id);
  if (index !== -1) {
    store.products[index] = { ...store.products[index], ...updates };
    saveStore(store);
  }
};

export const deleteProduct = (id: string) => {
  const store = getStore();
  store.products = store.products.filter(p => p.id !== id);
  saveStore(store);
};

// Order CRUD
export const createOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>) => {
  const store = getStore();
  const newOrder: Order = {
    ...orderData,
    id: `ORD-${generateId()}`,
    createdAt: new Date().toISOString(),
    status: 'Paid' // Simulated success
  };
  store.orders.unshift(newOrder); // Newest first
  saveStore(store);
  return newOrder;
};

export const updateOrderStatus = (id: string, status: Order['status']) => {
  const store = getStore();
  const index = store.orders.findIndex(o => o.id === id);
  if (index !== -1) {
    store.orders[index].status = status;
    saveStore(store);
  }
};
