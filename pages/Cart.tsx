
import React from 'react';
import { Trash2, Plus, Minus, ArrowLeft, CreditCard } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const Cart: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const { cart, products, updateCartQuantity, removeFromCart } = useStore();

  const cartItems = cart.map(item => ({
    ...item,
    product: products.find(p => p.id === item.productId)!
  })).filter(item => item.product);

  const subtotal = cartItems.reduce((acc, item) => 
    acc + (item.product.discountPrice || item.product.price) * item.quantity, 0
  );
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="bg-indigo-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
          <Trash2 className="w-10 h-10 text-indigo-400" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4">Your cart is empty</h1>
        <p className="text-slate-500 mb-12 text-lg">Looks like you haven't added anything to your cart yet.</p>
        <button 
          onClick={() => onNavigate('shop')}
          className="bg-indigo-600 text-white px-8 py-4 rounded-full font-bold hover:bg-indigo-700 transition shadow-xl shadow-indigo-100"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-12">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map(item => (
            <div key={item.productId} className="flex gap-6 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-slate-50 flex-shrink-0">
                <img src={item.product.imageUrl} className="w-full h-full object-cover" alt={item.product.name} />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{item.product.name}</h3>
                    <p className="text-slate-500 text-sm">{item.product.category}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.productId)} className="text-slate-400 hover:text-red-500 transition">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex items-end justify-between mt-6">
                  <div className="flex items-center gap-4 bg-slate-50 rounded-xl p-1 px-2 border border-slate-200">
                    <button onClick={() => updateCartQuantity(item.productId, -1)} className="p-2 hover:bg-white rounded-lg transition"><Minus className="w-4 h-4" /></button>
                    <span className="font-bold w-6 text-center">{item.quantity}</span>
                    <button onClick={() => updateCartQuantity(item.productId, 1)} className="p-2 hover:bg-white rounded-lg transition"><Plus className="w-4 h-4" /></button>
                  </div>
                  <div className="text-xl font-bold text-slate-900">
                    ${((item.product.discountPrice || item.product.price) * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button 
            onClick={() => onNavigate('shop')}
            className="flex items-center gap-2 text-indigo-600 font-bold hover:underline pt-4"
          >
            <ArrowLeft className="w-5 h-5" /> Continue Shopping
          </button>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm sticky top-24">
            <h2 className="text-2xl font-bold mb-8">Order Summary</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span className="font-medium text-slate-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Shipping</span>
                <span className="font-medium text-slate-900">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-indigo-500">Free shipping on orders over $100!</p>
              )}
              <div className="pt-4 border-t border-slate-100 flex justify-between">
                <span className="text-xl font-bold">Total</span>
                <span className="text-2xl font-black text-indigo-600">${total.toFixed(2)}</span>
              </div>
            </div>
            
            <button 
              onClick={() => onNavigate('checkout')}
              className="w-full flex items-center justify-center gap-3 bg-indigo-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition shadow-xl shadow-indigo-100"
            >
              Checkout <CreditCard className="w-6 h-6" />
            </button>
            <p className="text-center text-slate-400 text-xs mt-6">Taxes calculated at next step</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
