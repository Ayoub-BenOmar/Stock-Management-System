import type { Product } from "../components/ProductCard"

export interface CartItem {
  product: Product
  quantity: number
  addedAt: string
}

export interface CartSummary {
  subtotal: number
  tax: number
  shipping: number
  total: number
  itemCount: number
}
