import React, { useState, useEffect } from "react";
import "./App.css";
import ProductsPage from "./pages/ProductsPage";
import WishlistPage from "./components/wishlist-page";
import LoginPage from "./components/login-page";
import AdminProductsPage from "./components/admin-products";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

type Page = 'products' | 'wishlist' | 'login' | 'admin';

function AppContent() {
  const { isAuthenticated, loading } = useAuth();
  const [page, setPage] = useState<Page>('products');

  useEffect(() => {
    // Set initial page based on authentication status
    if (!loading) {
      if (isAuthenticated) {
        setPage('admin');
      } else {
        setPage('products');
      }
    }
  }, [isAuthenticated, loading]);

  // Only redirect to admin if user is authenticated and explicitly on login page
  useEffect(() => {
    if (isAuthenticated && page === 'login') {
      setPage('admin');
    }
  }, [isAuthenticated, page]);

  // Handle logout redirect
  useEffect(() => {
    if (!loading && !isAuthenticated && page === 'admin') {
      setPage('products');
    }
  }, [isAuthenticated, loading, page]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="App">
      {page === 'products' ? (
        <ProductsPage onGoToWishlist={() => setPage('wishlist')} onGoToLogin={() => setPage('login')} />
      ) : page === 'wishlist' ? (
        <WishlistPage onGoToProducts={() => setPage('products')} />
      ) : page === 'login' ? (
        <LoginPage onLoginSuccess={() => setPage('admin')} onGoBack={() => setPage('products')} />
      ) : page === 'admin' ? (
        <AdminProductsPage />
      ) : (
        <ProductsPage onGoToWishlist={() => setPage('wishlist')} onGoToLogin={() => setPage('login')} />
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <AppContent />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
