
import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { StoreProvider } from './context/StoreContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Auth from './pages/Auth';
import AdminDashboard from './pages/AdminDashboard';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const { user, isAdmin } = useAuth();

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <Home onNavigate={setCurrentPage} />;
      case 'shop': return <Shop />;
      case 'cart': return <Cart onNavigate={setCurrentPage} />;
      case 'checkout': return <Checkout onNavigate={setCurrentPage} />;
      case 'orders': return user ? <Orders onNavigate={setCurrentPage} /> : <Auth onNavigate={setCurrentPage} />;
      case 'auth': return <Auth onNavigate={setCurrentPage} />;
      case 'admin-dashboard': return isAdmin ? <AdminDashboard /> : <Auth onNavigate={setCurrentPage} />;
      default: return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar onNavigate={setCurrentPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <StoreProvider>
        <AppContent />
      </StoreProvider>
    </AuthProvider>
  );
};

export default App;
