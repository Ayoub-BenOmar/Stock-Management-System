import React from "react";
import "./App.css";
import ProductsPage from "./pages/ProductsPage";
import { CartProvider } from "./contexts/CartContext";

function App() {
  return (
    <CartProvider>
      <div className="App">
        <ProductsPage />
      </div>
    </CartProvider>
  );
}

export default App;
