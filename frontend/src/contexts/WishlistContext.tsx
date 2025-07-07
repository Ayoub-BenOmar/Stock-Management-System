import React, { createContext, useContext, useEffect, useState } from "react"
import type { Product } from "../components/ProductCard"

interface WishlistItem {
  product: Product
  addedAt: string
}

interface WishlistContextType {
  wishlistItems: WishlistItem[]
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: number) => void
  isInWishlist: (productId: number) => boolean
  clearWishlist: () => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)
const WISHLIST_STORAGE_KEY = "wishlist_items"

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          setWishlistItems(parsed)
        } else {
          setWishlistItems([])
        }
      }
    } catch (e) {
      setWishlistItems([])
    } finally {
      setIsInitialized(true)
    }
  }, [])

  useEffect(() => {
    if (!isInitialized) return
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems))
    } catch {}
  }, [wishlistItems, isInitialized])

  const addToWishlist = (product: Product) => {
    setWishlistItems((prev) => {
      if (prev.some((item) => item.product.id === product.id)) return prev
      return [...prev, { product, addedAt: new Date().toISOString() }]
    })
  }

  const removeFromWishlist = (productId: number) => {
    setWishlistItems((prev) => prev.filter((item) => item.product.id !== productId))
  }

  const isInWishlist = (productId: number) => {
    return wishlistItems.some((item) => item.product.id === productId)
  }

  const clearWishlist = () => setWishlistItems([])

  const value: WishlistContextType = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
  }

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) throw new Error("useWishlist must be used within a WishlistProvider")
  return context
} 