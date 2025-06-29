import React, { useState, useEffect } from "react"
import ProductCard, { Product } from "./ProductCard"

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        console.log("Fetching products from: http://localhost:3000/api/products")
        
        const response = await fetch("http://localhost:3000/api/products")
        
        console.log("Response status:", response.status)
        console.log("Response headers:", response.headers)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const contentType = response.headers.get("content-type")
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text()
          console.error("Non-JSON response received:", text.substring(0, 200))
          throw new Error(`Expected JSON but received ${contentType}. Server might not be running or endpoint doesn't exist.`)
        }
        
        const data = await response.json()
        console.log("Products data:", data)
        setProducts(data)
      } catch (err) {
        console.error("Fetch error:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch products")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg">Loading products...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-red-500 text-lg max-w-md text-center">
          <div className="font-bold mb-2">Error loading products:</div>
          <div className="text-sm">{error}</div>
          <div className="text-xs mt-4 text-gray-600">
            Make sure your backend server is running on http://localhost:3000
          </div>
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-lg text-gray-500">No products found</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
} 