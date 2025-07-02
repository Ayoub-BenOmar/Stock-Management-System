"use client"

import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Separator } from "./ui/separator"
import { ShoppingCart, CreditCard } from "lucide-react"
import type { CartSummary } from "../types/Cart"

interface CartSummaryProps {
  summary: CartSummary
  onCheckout: () => void
  isCheckoutDisabled?: boolean
}

export default function CartSummaryComponent({ summary, onCheckout, isCheckoutDisabled = false }: CartSummaryProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal ({summary.itemCount} items)</span>
            <span>{formatPrice(summary.subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>{summary.shipping === 0 ? "Free" : formatPrice(summary.shipping)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>{formatPrice(summary.tax)}</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>{formatPrice(summary.total)}</span>
        </div>

        <Button className="w-full" size="lg" onClick={onCheckout} disabled={isCheckoutDisabled}>
          <CreditCard className="h-4 w-4 mr-2" />
          Proceed to Checkout
        </Button>

        <div className="text-xs text-muted-foreground text-center">Free shipping on orders over $50</div>
      </CardContent>
    </Card>
  )
}
