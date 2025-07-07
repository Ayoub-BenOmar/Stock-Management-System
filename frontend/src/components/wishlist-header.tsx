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
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Go back</span>
            </Button>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Heart className="h-6 w-6 fill-current text-red-500" />
                <h1 className="text-2xl font-bold">My Wishlist</h1>
              </div>
              <Badge variant="secondary" className="text-sm">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={onShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
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
          </div>
        </div>
      </div>
    </header>
  )
}
