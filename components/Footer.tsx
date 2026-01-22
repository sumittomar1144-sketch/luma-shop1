
import React from 'react';
import { ShoppingBag, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-indigo-600 p-1.5 rounded-lg">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">LUMINA</span>
            </div>
            <p className="text-slate-500 leading-relaxed mb-6">
              Quality curated products for the modern home and lifestyle. We believe in aesthetics and utility.
            </p>
            <div className="flex space-x-4">
              <Instagram className="w-5 h-5 text-slate-400 cursor-pointer hover:text-indigo-600 transition" />
              <Twitter className="w-5 h-5 text-slate-400 cursor-pointer hover:text-indigo-600 transition" />
              <Facebook className="w-5 h-5 text-slate-400 cursor-pointer hover:text-indigo-600 transition" />
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Shop</h4>
            <ul className="space-y-4 text-slate-500">
              <li><a href="#" className="hover:text-indigo-600 transition">All Products</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition">New Arrivals</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition">Best Sellers</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition">Discounted</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Support</h4>
            <ul className="space-y-4 text-slate-500">
              <li><a href="#" className="hover:text-indigo-600 transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition">Shipping Info</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6">Newsletter</h4>
            <p className="text-slate-500 mb-4">Join our list for exclusive offers and news.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email address" className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 flex-grow focus:ring-2 focus:ring-indigo-500 outline-none" />
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition">Join</button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <p>© 2024 Lumina Shop Inc. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-slate-600">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600">Terms of Service</a>
            <a href="#" className="hover:text-slate-600">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
