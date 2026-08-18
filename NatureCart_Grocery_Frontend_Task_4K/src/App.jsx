import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { FilterProvider } from './context/FilterContext';
import { NotificationProvider } from './context/NotificationContext';
import { OrderProvider } from './context/OrderContext';
import TopBar from './components/common/TopBar';
import Header from './components/common/Header';
import CategoryNavbar from './components/common/CategoryNavbar';
import Footer from './components/common/Footer';
import CartDrawer from './components/cart/CartDrawer';
import Toast from './components/common/Toast';
import AppRoutes from './routes/AppRoutes';
import './styles/global.css';
import './styles/typography.css';
import './styles/components.css';
import './styles/responsive.css';

export function App() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <OrderProvider>
                <FilterProvider>
                  <div className="nc-app-root">
                    <TopBar />
                    <Header />
                    <CategoryNavbar />
                    <main className="nc-main-content">
                      <AppRoutes />
                    </main>
                    <Footer />
                    <CartDrawer />
                    <Toast />
                  </div>
                </FilterProvider>
              </OrderProvider>
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </NotificationProvider>
    </BrowserRouter>
  );
}

export default App;
