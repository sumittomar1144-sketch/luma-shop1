
import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Package, DollarSign, ShoppingCart, User as UserIcon, CheckCircle, Clock } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import * as api from '../services/api';
import { Product, OrderStatus } from '../types';
import { CATEGORIES } from '../constants';

const AdminDashboard: React.FC = () => {
  const { products, orders, refreshProducts, refreshOrders } = useStore();
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  const totalRevenue = orders.reduce((acc, o) => acc + o.totalAmount, 0);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      api.deleteProduct(id);
      refreshProducts();
    }
  };

  const handleStatusChange = (orderId: string, status: OrderStatus) => {
    api.updateOrderStatus(orderId, status);
    refreshOrders();
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    if (editingProduct.id) {
      api.updateProduct(editingProduct.id, editingProduct);
    } else {
      api.addProduct({
        name: editingProduct.name || 'New Product',
        description: editingProduct.description || '',
        price: editingProduct.price || 0,
        discountPrice: editingProduct.discountPrice,
        category: editingProduct.category || CATEGORIES[0],
        imageUrl: editingProduct.imageUrl || 'https://picsum.photos/600/600',
        stock: editingProduct.stock || 'In Stock'
      });
    }
    setEditingProduct(null);
    refreshProducts();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Admin Control Panel</h1>
          <p className="text-slate-500">Manage your shop inventory and customer orders.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase">Total Revenue</p>
            <p className="text-2xl font-black text-indigo-600">${totalRevenue.toFixed(2)}</p>
          </div>
          <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase">Total Orders</p>
            <p className="text-2xl font-black text-slate-900">{orders.length}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-8">
        <button 
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition ${activeTab === 'products' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
        >
          <Package className="w-5 h-5" /> Products
        </button>
        <button 
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition ${activeTab === 'orders' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
        >
          <ShoppingCart className="w-5 h-5" /> Orders
        </button>
      </div>

      {activeTab === 'products' ? (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-xl font-bold">Inventory Management</h2>
            <button 
              onClick={() => setEditingProduct({})}
              className="bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition"
            >
              <Plus className="w-5 h-5" /> Add Product
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-400 text-xs font-bold uppercase tracking-widest">
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img src={p.imageUrl} className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                          <p className="font-bold text-slate-900">{p.name}</p>
                          <p className="text-xs text-slate-400">ID: {p.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">{p.category}</td>
                    <td className="px-6 py-4 font-bold">${p.price}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${p.stock === 'In Stock' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {p.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => setEditingProduct(p)} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(p.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
             <h2 className="text-xl font-bold">Recent Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-400 text-xs font-bold uppercase tracking-widest">
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map(o => (
                  <tr key={o.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 font-mono font-bold text-indigo-600">{o.id}</td>
                    <td className="px-6 py-4 text-sm">{new Date(o.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                         <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center"><UserIcon className="w-4 h-4" /></div>
                         <span className="font-medium text-sm">Customer #{o.userId.slice(-4)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold">${o.totalAmount.toFixed(2)}</td>
                    <td className="px-6 py-4">
                       <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${o.status === 'Paid' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <select 
                         className="text-xs font-bold bg-white border border-slate-200 rounded-lg px-2 py-1 outline-none"
                         value={o.status}
                         onChange={(e) => handleStatusChange(o.id, e.target.value as OrderStatus)}
                       >
                         <option value="Paid">Mark as Paid</option>
                         <option value="Delivered">Mark as Delivered</option>
                         <option value="Cancelled">Cancel Order</option>
                       </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-3xl p-8 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-8">{editingProduct.id ? 'Edit Product' : 'Add New Product'}</h3>
            <form onSubmit={handleSaveProduct} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Product Name</label>
                  <input required type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" value={editingProduct.name || ''} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Price ($)</label>
                  <input required type="number" step="0.01" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" value={editingProduct.price || 0} onChange={e => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})} />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Discount Price ($)</label>
                  <input type="number" step="0.01" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" value={editingProduct.discountPrice || ''} onChange={e => setEditingProduct({...editingProduct, discountPrice: e.target.value ? parseFloat(e.target.value) : undefined})} />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" value={editingProduct.category || CATEGORIES[0]} onChange={e => setEditingProduct({...editingProduct, category: e.target.value})}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Availability</label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" value={editingProduct.stock || 'In Stock'} onChange={e => setEditingProduct({...editingProduct, stock: e.target.value as any})}>
                    <option value="In Stock">In Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Image URL</label>
                  <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" value={editingProduct.imageUrl || ''} onChange={e => setEditingProduct({...editingProduct, imageUrl: e.target.value})} />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                  <textarea rows={4} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" value={editingProduct.description || ''} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})}></textarea>
                </div>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="submit" className="flex-grow bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition">Save Product</button>
                <button type="button" onClick={() => setEditingProduct(null)} className="px-8 py-4 border border-slate-200 text-slate-500 font-bold rounded-2xl hover:bg-slate-50 transition">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
