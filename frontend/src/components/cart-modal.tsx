import React from "react"
import { X } from "lucide-react"
import { Button } from "./ui/button"
import CartItemComponent from "./cart-item"
import CartSummaryComponent from "./cart-summary"
import EmptyCart from "./empty-cart"
import { useCart } from "../contexts/CartContext"
import type { CartSummary } from "../types/Cart"

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { cartItems, removeFromCart, updateQuantity } = useCart()

  const cartSummary: CartSummary = React.useMemo(() => {
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
    updateQuantity(productId, newQuantity)
  }

  const handleRemoveItem = (productId: number) => {
    removeFromCart(productId)
  }

  const handleCheckout = () => {
    alert("Proceed to checkout")
  }

  const handleContinueShopping = () => {
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b">
          <h2 className="text-xl sm:text-2xl font-bold">Shopping Cart</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row h-[calc(90vh-120px)]">
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {cartItems.length === 0 ? (
              <EmptyCart onContinueShopping={handleContinueShopping} />
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <CartItemComponent
                    key={item.product.id}
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Cart Summary */}
          {cartItems.length > 0 && (
            <div className="lg:w-80 border-t lg:border-l lg:border-t-0 p-4 sm:p-6">
              <CartSummaryComponent
                summary={cartSummary}
                onCheckout={handleCheckout}
                isCheckoutDisabled={cartItems.length === 0}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 