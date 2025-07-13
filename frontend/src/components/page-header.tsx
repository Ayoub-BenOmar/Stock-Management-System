"use client"

import { Button } from "./ui/button"
import { User, Search, ShoppingCart, Heart, Menu } from "lucide-react"
import { Input } from "./ui/input"
import { useCart } from "../contexts/CartContext"
import { useState } from "react"

interface PageHeaderProps {
  onSignIn: () => void
  searchQuery: string
  onSearchChange: (query: string) => void
  onCartClick: () => void
  onGoToWishlist?: () => void
}

export default function PageHeader({ onSignIn, searchQuery, onSearchChange, onCartClick, onGoToWishlist }: PageHeaderProps) {
  const { getCartItemCount } = useCart()
  const cartItemCount = getCartItemCount()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-red-200 bg-red-700 text-white backdrop-blur supports-[backdrop-filter]:bg-red-700/95">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src={require("../assets/logo.png")} alt="Logo" className="h-8 sm:h-12 w-auto mr-2" />
            <h1 className="text-lg sm:text-2xl font-bold text-white">ProductStore</h1>
          </div>

          <div className="hidden sm:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-400" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
                className="pl-10 bg-white/90 border-white/20 focus:border-white/40 focus:ring-red-300"
              />
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <Button onClick={onGoToWishlist} variant="outline" className="relative bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Heart className="h-4 w-4 mr-2" />
              Wishlist
            </Button>
            <Button onClick={onCartClick} variant="outline" className="relative bg-white/10 border-white/20 text-white hover:bg-white/20">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Cart
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-red-600 text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartItemCount}
                </span>
              )}
            </Button>
            <Button onClick={onSignIn} className="flex items-center gap-2 bg-white text-red-600 hover:bg-gray-100">
              <User className="h-4 w-4" />
              Sign In
            </Button>
          </div>

          {/* Mobile menu button */}
          <button 
            className="sm:hidden p-2" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile search bar */}
        <div className="sm:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-400" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
              className="pl-10 bg-white/90 border-white/20 focus:border-white/40 focus:ring-red-300"
            />
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-4 space-y-2">
            <Button onClick={onGoToWishlist} variant="outline" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Heart className="h-4 w-4 mr-2" />
              Wishlist
            </Button>
            <Button onClick={onCartClick} variant="outline" className="w-full relative bg-white/10 border-white/20 text-white hover:bg-white/20">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Cart
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-red-600 text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartItemCount}
                </span>
              )}
            </Button>
            <Button onClick={onSignIn} className="w-full flex items-center gap-2 bg-white text-red-600 hover:bg-gray-100">
              <User className="h-4 w-4" />
              Sign In
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
