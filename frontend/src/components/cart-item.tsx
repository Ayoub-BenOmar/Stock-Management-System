"use client"

import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Minus, Plus, Trash2 } from "lucide-react"
import type { CartItem } from "../types/Cart"

interface CartItemProps {
  item: CartItem
  onQuantityChange: (productId: number, newQuantity: number) => void
  onRemove: (productId: number) => void
}

export default function CartItemComponent({ item, onQuantityChange, onRemove }: CartItemProps) {
  const { product, quantity } = item
  const itemTotal = product.price * quantity

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(product.id, quantity - 1)
    }
  }

  const handleQuantityIncrease = () => {
    if (quantity < product.quantity) {
      onQuantityChange(product.id, quantity + 1)
    }
  }

  const isMaxQuantity = quantity >= product.quantity
  const isMinQuantity = quantity <= 1

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Product Image */}
          <div className="flex-shrink-0 w-full sm:w-[70%]">
            <img
              src={product.pic ? `http://localhost:3000${product.pic}` : "/placeholder.svg"}
              alt={product.name}
              className="w-full h-48 sm:h-full rounded-lg object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
                <Badge variant="outline" className="mt-1">
                  {product.category.name}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemove(product.id)}
                className="text-muted-foreground hover:text-destructive flex-shrink-0"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove item</span>
              </Button>
            </div>

            {product.description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{product.description}</p>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="text-sm font-medium">Qty:</span>
              <div className="flex items-center border rounded-lg w-fit">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleQuantityDecrease}
                  disabled={isMinQuantity}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleQuantityIncrease}
                  disabled={isMaxQuantity}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              {isMaxQuantity && <span className="text-xs text-orange-600">Max available: {product.quantity}</span>}
            </div>
            {/* Price below quantity controls */}
            <div className="mt-2">
              <div className="text-sm text-muted-foreground">{formatPrice(product.price)} each</div>
              <div className="text-lg font-bold">{formatPrice(itemTotal)}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
