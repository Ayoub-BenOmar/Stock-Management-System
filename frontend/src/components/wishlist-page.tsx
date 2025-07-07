"use client"

import { useState } from "react"
import WishlistProductCard from "./wishlist-product-card"
import WishlistHeader from "./wishlist-header"
import EmptyWishlist from "./empty-wishlist"
import CartModal from "./cart-modal"
import { useWishlist } from "../contexts/WishlistContext"
import { useCart } from "../contexts/CartContext"


interface WishlistPageProps {
  onGoToProducts?: () => void;
}

export default function WishlistPage({ onGoToProducts }: WishlistPageProps) {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist()
  const { getCartItemCount, addToCart } = useCart()
  const [isCartModalOpen, setIsCartModalOpen] = useState(false)

  const handleRemoveFromWishlist = (productId: number) => {
    removeFromWishlist(productId)
  }

  const handleAddToCart = (productId: number) => {
    const product = wishlistItems.find(item => item.product.id === productId)?.product
    if (product) {
      addToCart(product, 1)
      // Optional: Show a brief success message
      // You could replace this with a toast notification in a real app
      console.log(`Added ${product.name} to cart!`)
    }
  }

  const handleBack = () => {
    if (onGoToProducts) {
      onGoToProducts()
    }
  }

  const handleShare = () => {
    // In a real app, this would open share dialog
    alert("Share wishlist functionality")
  }

  const handleCartClick = () => {
    setIsCartModalOpen(true)
  }

  const handleCloseCartModal = () => {
    setIsCartModalOpen(false)
  }

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear your entire wishlist?")) {
      clearWishlist()
    }
  }

  const cartItemCount = getCartItemCount()

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <WishlistHeader
          itemCount={0}
          onBack={handleBack}
          onShare={handleShare}
          onCartClick={handleCartClick}
          cartItemCount={cartItemCount}
        />
        <main className="container mx-auto px-4 py-8">
          <EmptyWishlist onContinueShopping={handleBack} />
        </main>
        <CartModal isOpen={isCartModalOpen} onClose={handleCloseCartModal} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <WishlistHeader
        itemCount={wishlistItems.length}
        onBack={handleBack}
        onShare={handleShare}
        onCartClick={handleCartClick}
        cartItemCount={cartItemCount}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-end mb-6">
          <button
            onClick={handleClearAll}
            className="px-4 py-2 text-red-600 hover:text-red-700 bg-transparent border border-red-600 hover:border-red-700 rounded-md text-sm transition-colors"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.filter(item => item && item.product && item.product.id !== undefined).map((item) => (
            <WishlistProductCard
              key={item.product.id}
              product={item.product}
              addedToWishlistAt={item.addedAt}
              onRemoveFromWishlist={handleRemoveFromWishlist}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </main>
      <CartModal isOpen={isCartModalOpen} onClose={handleCloseCartModal} />
    </div>
  )
}

