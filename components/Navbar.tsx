
import React, { useState } from 'react';
import { ShoppingBag, ShoppingCart, User as UserIcon, LogOut, Menu, X, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';

const Navbar: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const { user, logout, isAdmin } = useAuth();
  const { cart } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="glass-effect sticky top-0 z-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="bg-indigo-600 p-2 rounded-lg">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">LUMINA</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => onNavigate('home')} className="text-slate-600 hover:text-indigo-600 font-medium transition">Home</button>
            <button onClick={() => onNavigate('shop')} className="text-slate-600 hover:text-indigo-600 font-medium transition">Shop</button>
            {user && (
              <button onClick={() => onNavigate('orders')} className="text-slate-600 hover:text-indigo-600 font-medium transition">My Orders</button>
            )}
            {isAdmin && (
              <button onClick={() => onNavigate('admin-dashboard')} className="flex items-center gap-1 text-indigo-600 font-bold hover:text-indigo-700 transition">
                <LayoutDashboard className="w-4 h-4" /> Admin
              </button>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button onClick={() => onNavigate('cart')} className="relative p-2 text-slate-600 hover:text-indigo-600 transition">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-700">Hey, {user.name.split(' ')[0]}</span>
                <button onClick={logout} className="p-2 text-slate-400 hover:text-red-500 transition">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button onClick={() => onNavigate('auth')} className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-slate-800 transition">
                Sign In
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => onNavigate('cart')} className="relative p-2 text-slate-600">
               <ShoppingCart className="w-6 h-6" />
               {cartCount > 0 && <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">{cartCount}</span>}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-600">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 p-4 space-y-3">
          <button onClick={() => { onNavigate('home'); setIsMenuOpen(false); }} className="block w-full text-left p-2 hover:bg-slate-50 rounded">Home</button>
          <button onClick={() => { onNavigate('shop'); setIsMenuOpen(false); }} className="block w-full text-left p-2 hover:bg-slate-50 rounded">Shop</button>
          {user && <button onClick={() => { onNavigate('orders'); setIsMenuOpen(false); }} className="block w-full text-left p-2 hover:bg-slate-50 rounded">Orders</button>}
          {isAdmin && <button onClick={() => { onNavigate('admin-dashboard'); setIsMenuOpen(false); }} className="block w-full text-left p-2 text-indigo-600 font-bold">Admin Panel</button>}
          <div className="pt-4 border-t border-slate-100">
            {user ? (
              <button onClick={() => { logout(); setIsMenuOpen(false); }} className="flex items-center gap-2 text-red-500 font-medium">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            ) : (
              <button onClick={() => { onNavigate('auth'); setIsMenuOpen(false); }} className="bg-slate-900 text-white w-full py-2 rounded">Sign In</button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
