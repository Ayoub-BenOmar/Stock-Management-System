"use client"

import { Button } from "./ui/button"
import { Heart, ArrowLeft, Sparkles } from "lucide-react"

interface EmptyWishlistProps {
  onContinueShopping: () => void
}

export default function EmptyWishlist({ onContinueShopping }: EmptyWishlistProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-6 relative">
        <Heart className="h-24 w-24 text-muted-foreground/30" />
        <Sparkles className="h-8 w-8 text-muted-foreground/50 absolute -top-2 -right-2" />
      </div>
      <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        Save items you love by clicking the heart icon. We'll keep them safe here for you!
      </p>
      <Button onClick={onContinueShopping} size="lg">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Start Shopping
      </Button>
    </div>
  )
}
