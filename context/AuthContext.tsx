
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<void>;
  signup: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('lumina_user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const login = async (email: string, pass: string) => {
    // Simulated auth
    const mockUser: User = {
      id: 'usr_1',
      name: email === 'admin@shop.com' ? 'Admin User' : 'Standard User',
      email,
      role: email === 'admin@shop.com' ? 'ADMIN' : 'USER'
    };
    setUser(mockUser);
    localStorage.setItem('lumina_user', JSON.stringify(mockUser));
  };

  const signup = async (name: string, email: string, pass: string) => {
    const mockUser: User = { id: Math.random().toString(), name, email, role: 'USER' };
    setUser(mockUser);
    localStorage.setItem('lumina_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lumina_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAdmin: user?.role === 'ADMIN' }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
