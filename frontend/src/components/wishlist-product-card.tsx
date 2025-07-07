"use client"

import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { Badge } from "./ui/badge"
import { Heart, ShoppingCart, Trash2, Package } from "lucide-react"
import type { Product } from "./ProductCard"

interface WishlistProductCardProps {
  product: Product
  addedToWishlistAt: string
  onRemoveFromWishlist: (productId: number) => void
  onAddToCart: (productId: number) => void
}

export default function WishlistProductCard({
  product,
  addedToWishlistAt,
  onRemoveFromWishlist,
  onAddToCart,
}: WishlistProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const isOutOfStock = product.quantity === 0
  const isLowStock = product.quantity > 0 && product.quantity <= 5

  return (
    <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative">
          <img
            src="/placeholder.svg"
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-2 left-2 flex gap-2">
            <Badge variant={product.active ? "default" : "secondary"}>
              {product.active ? "Active" : "Inactive"}
            </Badge>
            <Badge variant="outline" className="bg-white/90">
              {product.category.name}
            </Badge>
          </div>
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive" className="text-sm font-semibold">
                Out of Stock
              </Badge>
            </div>
          )}
          <div className="absolute top-2 right-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemoveFromWishlist(product.id)}
              className="bg-white/90 hover:bg-white text-red-500 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Remove from wishlist</span>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg line-clamp-2 leading-tight">{product.name}</h3>

          {product.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
          )}

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">{formatPrice(product.price)}</span>

            <div className="flex items-center gap-1 text-sm">
              <Package className="h-4 w-4" />
              <span
                className={`font-medium ${
                  isOutOfStock ? "text-destructive" : isLowStock ? "text-orange-600" : "text-muted-foreground"
                }`}
              >
                {product.quantity} in stock
              </span>
            </div>
          </div>

          {isLowStock && !isOutOfStock && (
            <Badge variant="outline" className="text-orange-600 border-orange-600">
              Low Stock
            </Badge>
          )}

          <div className="text-xs text-muted-foreground">
            Added to wishlist: {formatDate(addedToWishlistAt)}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button 
          className="flex-1" 
          disabled={!product.active || isOutOfStock}
          onClick={() => onAddToCart(product.id)}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
        <Button variant="outline" size="icon" className="text-red-500 hover:text-red-600">
          <Heart className="h-4 w-4 fill-current" />
          <span className="sr-only">In wishlist</span>
        </Button>
      </CardFooter>
    </Card>
  )
} 