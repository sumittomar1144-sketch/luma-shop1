
import React, { useState } from 'react';
import { Search, Filter, ShoppingCart, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../constants';

const Shop: React.FC = () => {
  const { products, addToCart } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [justAdded, setJustAdded] = useState<string | null>(null);

  const filtered = products.filter(p => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleAddToCart = (id: string) => {
    addToCart(id);
    setJustAdded(id);
    setTimeout(() => setJustAdded(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Shop Our Collection</h1>
          <p className="text-slate-500">Premium items selected for your daily life.</p>
        </div>
        
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <select 
              className="pl-10 pr-8 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none appearance-none transition"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filtered.map(product => (
            <div key={product.id} className="bg-white rounded-3xl border border-slate-100 p-4 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-slate-50">
                <img 
                  src={product.imageUrl} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                  alt={product.name} 
                />
                {product.stock === 'Out of Stock' && (
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
                    <span className="bg-slate-900 text-white px-4 py-2 rounded-lg font-bold text-sm">Out of Stock</span>
                  </div>
                )}
                {product.discountPrice && (
                  <div className="absolute top-2 right-2 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    SALE
                  </div>
                )}
              </div>
              
              <div className="flex-grow">
                <div className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-1">{product.category}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-1 line-clamp-1">{product.name}</h3>
                <p className="text-slate-500 text-sm mb-4 line-clamp-2">{product.description}</p>
              </div>

              <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-black text-slate-900">${product.discountPrice || product.price}</div>
                  {product.discountPrice && <div className="text-slate-400 line-through text-xs">${product.price}</div>}
                </div>
                
                <button 
                  disabled={product.stock === 'Out of Stock'}
                  onClick={() => handleAddToCart(product.id)}
                  className={`p-3 rounded-2xl transition-all duration-200 ${
                    justAdded === product.id 
                    ? 'bg-green-500 text-white' 
                    : product.stock === 'Out of Stock' 
                      ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-110 shadow-lg shadow-indigo-200'
                  }`}
                >
                  {justAdded === product.id ? <Check className="w-6 h-6" /> : <ShoppingCart className="w-6 h-6" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-300">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-50 mb-6">
            <Search className="w-10 h-10 text-slate-300" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">No products found</h2>
          <p className="text-slate-500 mb-8">Try adjusting your search or category filters.</p>
          <button 
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="text-indigo-600 font-bold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Shop;
