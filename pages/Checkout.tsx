
import React, { useState } from 'react';
import { CreditCard, Truck, CheckCircle2, Loader2, Lock } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import * as api from '../services/api';

const Checkout: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const { cart, products, clearCart, refreshOrders } = useStore();
  const { user } = useAuth();
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [loading, setLoading] = useState(false);

  const cartItems = cart.map(item => ({
    ...item,
    product: products.find(p => p.id === item.productId)!
  })).filter(item => item.product);

  const subtotal = cartItems.reduce((acc, item) => 
    acc + (item.product.discountPrice || item.product.price) * item.quantity, 0
  );
  const total = subtotal + (subtotal > 100 ? 0 : 15);

  const handlePayment = async () => {
    setLoading(true);
    // Simulate API delay
    await new Promise(r => setTimeout(r, 2000));
    
    const orderData = {
      userId: user?.id || 'guest',
      items: cartItems.map(i => ({ 
        productId: i.productId, 
        quantity: i.quantity, 
        name: i.product.name,
        price: i.product.discountPrice || i.product.price
      })),
      totalAmount: total,
      shippingAddress: {
        address: '123 Innovation Drive',
        city: 'Silicon Valley',
        zipCode: '94025'
      }
    };

    api.createOrder(orderData);
    refreshOrders();
    clearCart();
    setStep('success');
    setLoading(false);
  };

  if (step === 'success') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Payment Successful!</h1>
        <p className="text-slate-500 mb-4 text-lg">Your order has been placed and is being prepared.</p>
        <p className="text-slate-400 mb-12">A confirmation email has been sent to {user?.email || 'your email'}.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => onNavigate('orders')}
            className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition"
          >
            Track My Order
          </button>
          <button 
            onClick={() => onNavigate('shop')}
            className="bg-white border border-slate-200 text-slate-600 px-8 py-4 rounded-full font-bold hover:bg-slate-50 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-12">
        <div className={`flex items-center gap-2 font-bold ${step === 'details' ? 'text-indigo-600' : 'text-slate-400'}`}>
          <span className="w-8 h-8 rounded-full border-2 flex items-center justify-center">1</span> Shipping
        </div>
        <div className="flex-grow h-[2px] bg-slate-200"></div>
        <div className={`flex items-center gap-2 font-bold ${step === 'payment' ? 'text-indigo-600' : 'text-slate-400'}`}>
          <span className="w-8 h-8 rounded-full border-2 flex items-center justify-center">2</span> Payment
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          {step === 'details' ? (
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Truck className="w-6 h-6" /> Shipping Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">First Name</label>
                  <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="John" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Last Name</label>
                  <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Doe" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Address</label>
                  <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="123 Street Name" />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">City</label>
                  <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="New York" />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Zip Code</label>
                  <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="10001" />
                </div>
              </div>
              <button 
                onClick={() => setStep('payment')}
                className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-slate-800 transition"
              >
                Continue to Payment
              </button>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><CreditCard className="w-6 h-6" /> Payment Method</h2>
              <div className="space-y-4">
                <div className="p-4 border-2 border-indigo-500 bg-indigo-50 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                       <CreditCard className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-bold">Credit / Debit Card</p>
                      <p className="text-xs text-indigo-600">Secure simulated transaction</p>
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                </div>
                
                <div className="p-6 border border-slate-200 rounded-2xl space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Card Number</label>
                    <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Expiry</label>
                      <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="MM/YY" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">CVV</label>
                      <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="123" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl flex items-start gap-3">
                 <Lock className="w-5 h-5 text-slate-400 mt-1" />
                 <p className="text-sm text-slate-500">Your connection is encrypted. We support VISA, Mastercard, Amex, and RuPay (via simulated Stripe/Razorpay integration).</p>
              </div>

              <button 
                disabled={loading}
                onClick={handlePayment}
                className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition flex items-center justify-center gap-3 shadow-xl shadow-indigo-100"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : `Pay $${total.toFixed(2)} Now`}
              </button>
              <button 
                onClick={() => setStep('details')}
                className="w-full text-slate-500 font-bold hover:text-slate-700"
              >
                Back to shipping
              </button>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="max-h-60 overflow-y-auto pr-2 space-y-4 mb-6 custom-scrollbar">
              {cartItems.map(item => (
                <div key={item.productId} className="flex gap-4">
                  <img src={item.product.imageUrl} className="w-16 h-16 rounded-xl object-cover bg-slate-50" />
                  <div className="flex-grow">
                    <p className="font-bold text-slate-900 text-sm line-clamp-1">{item.product.name}</p>
                    <p className="text-slate-500 text-xs">Qty: {item.quantity}</p>
                    <p className="text-indigo-600 font-bold text-sm mt-1">${((item.product.discountPrice || item.product.price) * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <div className="flex justify-between text-slate-500 text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500 text-sm">
                <span>Shipping</span>
                <span>{subtotal > 100 ? 'FREE' : '$15.00'}</span>
              </div>
              <div className="flex justify-between text-xl font-black pt-3">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
