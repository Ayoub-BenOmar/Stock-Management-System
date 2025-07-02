import React, { createContext, useContext, useEffect, useState } from "react"
import type { CartItem } from "../types/Cart"
import type { Product } from "../components/ProductCard"

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  getCartItemCount: () => number
  getCartTotal: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = "shopping_cart"

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY)
      
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart)
        
        if (Array.isArray(parsedCart)) {
          setCartItems(parsedCart)
        } else {
          setCartItems([])
        }
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error)
      setCartItems([])
    } finally {
      setIsInitialized(true)
    }
  }, [])

  useEffect(() => {
    if (!isInitialized) return
    
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
    } catch (error) {
      console.error("Error saving cart to localStorage:", error)
    }
  }, [cartItems, isInitialized])

  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id)
      
      if (existingItem) {
        const newQuantity = Math.min(existingItem.quantity + quantity, product.quantity)
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: newQuantity }
            : item
        )
      } else {
        const newItem: CartItem = {
          product,
          quantity: Math.min(quantity, product.quantity),
          addedAt: new Date().toISOString(),
        }
        return [...prev, newItem]
      }
    })
  }

  const removeFromCart = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId))
  }

  const updateQuantity = (productId: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.min(quantity, item.product.quantity) }
          : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0)
  }

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItemCount,
    getCartTotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
} 