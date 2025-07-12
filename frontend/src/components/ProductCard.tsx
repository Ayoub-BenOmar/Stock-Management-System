import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { ShoppingCart, Eye, Package, Heart } from "lucide-react"
import { useCart } from "../contexts/CartContext"
import { useWishlist } from "../contexts/WishlistContext"

export interface Product {
  id: number
  name: string
  description?: string
  price: number
  quantity: number
  active: boolean
  createdAt: string
  updatedAt: string
  category: {
    id: number
    name: string
  }
  supplier: {
    id: number
    name: string
  }
  pic?: string
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist()
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const isOutOfStock = product.quantity === 0
  const isLowStock = product.quantity > 0 && product.quantity <= 5
  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = () => {
    addToCart(product, 1)
  }

  const handleWishlistClick = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <Card className="w-full max-w-sm overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative">
          <img
            src={product.pic ? `http://localhost:3000${product.pic}` : "/placeholder.svg"}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-2 left-2 flex gap-2">
            <Badge variant={product.active ? "default" : "secondary"}>{product.active ? "Active" : "Inactive"}</Badge>
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

        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-lg line-clamp-2 leading-tight flex-1">{product.name}</h3>
            <button
              onClick={handleWishlistClick}
              className={`flex-shrink-0 p-1 hover:scale-110 transition-transform ${
                inWishlist ? "text-red-500" : "text-gray-400 hover:text-red-500"
              }`}
            >
              <Heart className={`h-5 w-5 ${inWishlist ? "fill-current" : ""}`} />
              <span className="sr-only">{inWishlist ? "Remove from wishlist" : "Add to wishlist"}</span>
            </button>
          </div>

          {product.description && <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>}

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
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button className="flex-1" disabled={!product.active || isOutOfStock} onClick={handleAddToCart}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
        <Button variant="outline" size="icon">
          <Eye className="h-4 w-4" />
          <span className="sr-only">View details</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
