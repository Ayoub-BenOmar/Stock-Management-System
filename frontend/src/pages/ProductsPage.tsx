import React, { useEffect, useState } from "react"
import PageHeader from "../components/page-header"
import CategoryFilter from "../components/category-filter"
import ProductsGrid from "../components/products-grid"
import type { Product } from "../components/ProductCard"

interface Category {
  id: number
  name: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch("http://localhost:3000/api/products"),
          fetch("http://localhost:3000/api/categories"),
        ])
        const productsData = await productsRes.json()
        const categoriesData = await categoriesRes.json()
        setProducts(productsData)
        setCategories(categoriesData)
      } catch (err) {
        // handle error
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleCategoryToggle = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handleClearFilters = () => setSelectedCategories([])

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(product.category.id)
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const handleSignIn = () => {
    alert("Sign in clicked!")
  }

  return (
    <div>
      <PageHeader
        onSignIn={handleSignIn}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <CategoryFilter
        categories={categories}
        selectedCategories={selectedCategories}
        onCategoryToggle={handleCategoryToggle}
        onClearFilters={handleClearFilters}
        productCount={filteredProducts.length}
      />
      <main className="container mx-auto px-4 py-8">
        <ProductsGrid products={filteredProducts} isLoading={loading} />
      </main>
    </div>
  )
} 