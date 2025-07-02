"use client"

import { useState, useMemo } from "react"
import { Button } from "./ui/button"
import { ArrowLeft, Package } from "lucide-react"
import CartItemComponent from "./cart-item"
import CartSummaryComponent from "./cart-summary"
import EmptyCart from "./empty-cart"
import type { CartItem, CartSummary } from "../types/Cart"

export default function ShoppingBagPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const cartSummary: CartSummary = useMemo(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    const shipping = subtotal >= 50 ? 0 : 9.99
    const tax = subtotal * 0.08
    const total = subtotal + shipping + tax

    return {
      subtotal,
      tax,
      shipping,
      total,
      itemCount,
    }
  }, [cartItems])

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity: newQuantity } : item)),
    )
  }

  const handleRemoveItem = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId))
  }

  const handleContinueShopping = () => {
    alert("Navigate to products page")
  }

  const handleCheckout = () => {
    alert("Proceed to checkout")
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={handleContinueShopping}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-2xl font-bold">Shopping Bag</h1>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4">
          <EmptyCart onContinueShopping={handleContinueShopping} />
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={handleContinueShopping}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Shopping Bag</h1>
                <p className="text-sm text-muted-foreground">
                  {cartSummary.itemCount} {cartSummary.itemCount === 1 ? "item" : "items"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Package className="h-4 w-4" />
              <span>Free shipping on orders over $50</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <CartItemComponent
                key={item.product.id}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummaryComponent
              summary={cartSummary}
              onCheckout={handleCheckout}
              isCheckoutDisabled={cartItems.length === 0}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
