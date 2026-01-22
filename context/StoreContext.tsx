
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Order, CartItem, StoreState } from '../types';
import * as api from '../services/api';

interface StoreContextType {
  products: Product[];
  orders: Order[];
  cart: CartItem[];
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  refreshProducts: () => void;
  refreshOrders: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<StoreState>(api.getStore());

  useEffect(() => {
    api.saveStore(state);
  }, [state]);

  const addToCart = (productId: string) => {
    setState(prev => {
      const existing = prev.cart.find(item => item.productId === productId);
      if (existing) {
        return {
          ...prev,
          cart: prev.cart.map(item =>
            item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
          )
        };
      }
      return { ...prev, cart: [...prev.cart, { productId, quantity: 1 }] };
    });
  };

  const removeFromCart = (productId: string) => {
    setState(prev => ({
      ...prev,
      cart: prev.cart.filter(item => item.productId !== productId)
    }));
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    setState(prev => ({
      ...prev,
      cart: prev.cart.map(item => {
        if (item.productId === productId) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    }));
  };

  const clearCart = () => setState(prev => ({ ...prev, cart: [] }));
  
  const refreshProducts = () => setState(prev => ({ ...prev, products: api.getStore().products }));
  const refreshOrders = () => setState(prev => ({ ...prev, orders: api.getStore().orders }));

  return (
    <StoreContext.Provider value={{
      ...state,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      refreshProducts,
      refreshOrders
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
