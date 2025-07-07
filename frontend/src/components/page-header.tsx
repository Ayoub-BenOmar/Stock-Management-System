"use client"

import { Button } from "./ui/button"
import { User, Search, ShoppingCart, Heart } from "lucide-react"
import { Input } from "./ui/input"
import { useCart } from "../contexts/CartContext"

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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">ProductStore</h1>
          </div>

          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={onGoToWishlist} variant="outline" className="relative">
              <Heart className="h-4 w-4 mr-2" />
              Wishlist
            </Button>
            <Button onClick={onCartClick} variant="outline" className="relative">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Cart
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>
            <Button onClick={onSignIn} className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
