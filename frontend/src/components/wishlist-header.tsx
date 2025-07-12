"use client"

import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { ArrowLeft, Heart, Share2, ShoppingCart } from "lucide-react"

interface WishlistHeaderProps {
  itemCount: number
  onBack: () => void
  onShare: () => void
  onCartClick: () => void
  cartItemCount: number
}

export default function WishlistHeader({
  itemCount,
  onBack,
  onShare,
  onCartClick,
  cartItemCount,
}: WishlistHeaderProps) {
  return (
    <header className="border-b border-red-200 bg-red-600 text-white backdrop-blur supports-[backdrop-filter]:bg-red-600/95">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:bg-white/20">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Go back</span>
            </Button>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Heart className="h-6 w-6 fill-current text-white" />
                <h1 className="text-2xl font-bold text-white">My Wishlist</h1>
              </div>
              <Badge variant="secondary" className="text-sm bg-white/20 text-white border-white/30">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={onShare} className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Share2 className="h-4 w-4 mr-2" />
              Share
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
          </div>
        </div>
      </div>
    </header>
  )
}
