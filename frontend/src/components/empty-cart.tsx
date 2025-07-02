"use client"

import { Button } from "./ui/button"
import { ShoppingBag, ArrowLeft } from "lucide-react"

interface EmptyCartProps {
  onContinueShopping: () => void
}

export default function EmptyCart({ onContinueShopping }: EmptyCartProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-6">
        <ShoppingBag className="h-24 w-24 text-muted-foreground/50" />
      </div>
      <h2 className="text-2xl font-semibold mb-2">Your shopping bag is empty</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        Looks like you haven't added any items to your bag yet. Start shopping to fill it up!
      </p>
      <Button onClick={onContinueShopping} size="lg">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Continue Shopping
      </Button>
    </div>
  )
}
