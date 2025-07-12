import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import ProductsPage from "./pages/ProductsPage";
import WishlistPage from "./components/wishlist-page";
import LoginPage from "./components/login-page";
import AdminProductsPage from "./components/admin-products";
import AdminCategoriesPage from "./components/admin-categories";
import AdminSuppliersPage from "./pages/admin/Suppliers";
import AdminDashboardPage from "./components/admin-dashboard-page";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

function AppContent() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin/dashboard" element={isAuthenticated ? <AdminDashboardPage /> : <Navigate to="/login" />} />
      <Route path="/admin/products" element={isAuthenticated ? <AdminProductsPage /> : <Navigate to="/login" />} />
      <Route path="/admin/categories" element={isAuthenticated ? <AdminCategoriesPage /> : <Navigate to="/login" />} />
      <Route path="/admin/suppliers" element={isAuthenticated ? <AdminSuppliersPage /> : <Navigate to="/login" />} />
      {/* Add more routes as needed */}
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <AppContent />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
