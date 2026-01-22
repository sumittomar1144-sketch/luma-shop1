
import React from 'react';
import { ArrowRight, Star, ShieldCheck, Zap } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const Home: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const { products } = useStore();
  const featured = products.slice(0, 3);

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden rounded-3xl mt-6 mx-4 sm:mx-8">
        <img 
          src="https://picsum.photos/seed/hero/1600/900" 
          className="absolute inset-0 w-full h-full object-cover brightness-[0.7]" 
          alt="Hero"
        />
        <div className="relative z-10 max-w-2xl px-8 sm:px-16 space-y-8">
          <div className="inline-flex items-center gap-2 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            <Zap className="w-3 h-3 fill-white" /> New Season Just Arrived
          </div>
          <h1 className="text-5xl sm:text-7xl font-extrabold text-white leading-[1.1]">
            Elevate Your Everyday Essentials
          </h1>
          <p className="text-xl text-slate-100/90 max-w-lg leading-relaxed">
            Discover a curated collection of premium electronics and lifestyle accessories designed for the modern world.
          </p>
          <button 
            onClick={() => onNavigate('shop')}
            className="group flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-slate-100 transition shadow-2xl"
          >
            Explore Collection <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
          </button>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
          <div className="bg-green-100 p-4 rounded-full mb-4">
            <ShieldCheck className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
          <p className="text-slate-500">Your transactions are protected by industry-leading encryption.</p>
        </div>
        <div className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
          <div className="bg-indigo-100 p-4 rounded-full mb-4">
            <Zap className="w-8 h-8 text-indigo-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
          <p className="text-slate-500">Free 2-day shipping on all orders over $100.</p>
        </div>
        <div className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
          <div className="bg-amber-100 p-4 rounded-full mb-4">
            <Star className="w-8 h-8 text-amber-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">Top Quality</h3>
          <p className="text-slate-500">Only the finest materials and components used in our products.</p>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Our Best Sellers</h2>
            <p className="text-slate-500">Discover the products our customers love the most.</p>
          </div>
          <button onClick={() => onNavigate('shop')} className="text-indigo-600 font-bold hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map(product => (
            <div key={product.id} className="group cursor-pointer" onClick={() => onNavigate('shop')}>
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 bg-slate-100">
                <img src={product.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" alt={product.name} />
                {product.discountPrice && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    Sale
                  </div>
                )}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">{product.name}</h3>
              <p className="text-slate-500 text-sm mb-3 line-clamp-1">{product.description}</p>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-slate-900">${product.discountPrice || product.price}</span>
                {product.discountPrice && <span className="text-slate-400 line-through text-sm">${product.price}</span>}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
