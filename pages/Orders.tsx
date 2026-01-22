
import React from 'react';
import { Package, Clock, CheckCircle, ChevronRight, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';

const Orders: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const { orders } = useStore();
  const { user } = useAuth();
  
  const userOrders = orders.filter(o => o.userId === user?.id);

  if (userOrders.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="bg-slate-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
          <Package className="w-10 h-10 text-slate-400" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4">No orders yet</h1>
        <p className="text-slate-500 mb-12">You haven't placed any orders with us. Let's change that!</p>
        <button 
          onClick={() => onNavigate('shop')}
          className="bg-indigo-600 text-white px-8 py-4 rounded-full font-bold hover:bg-indigo-700 transition"
        >
          Discover Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-12">Order History</h1>
      <div className="space-y-8">
        {userOrders.map(order => (
          <div key={order.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="bg-slate-50 px-8 py-6 flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Order Placed</p>
                  <p className="font-bold text-slate-900">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Total</p>
                  <p className="font-bold text-slate-900">${order.totalAmount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Order ID</p>
                  <p className="font-mono text-indigo-600 font-bold">{order.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200">
                {order.status === 'Paid' ? <Clock className="w-4 h-4 text-indigo-600" /> : <CheckCircle className="w-4 h-4 text-green-600" />}
                <span className={`text-sm font-bold ${order.status === 'Paid' ? 'text-indigo-600' : 'text-green-600'}`}>
                  {order.status}
                </span>
              </div>
            </div>
            
            <div className="p-8">
              <div className="space-y-6">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center">
                       <ShoppingBag className="w-8 h-8 text-slate-300" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-bold text-slate-900">{item.name}</h4>
                      <p className="text-slate-500 text-sm">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-lg font-bold text-slate-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-8 border-t border-slate-100 flex justify-end">
                <button className="flex items-center gap-2 text-indigo-600 font-bold hover:underline">
                  View Order Details <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
