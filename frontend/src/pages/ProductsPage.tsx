import React, { useEffect, useState } from "react"
import PageHeader from "../components/page-header"
import CategoryFilter from "../components/category-filter"
import ProductsGrid from "../components/products-grid"
import CartModal from "../components/cart-modal"
import type { Product } from "../components/ProductCard"
import { useNavigate } from "react-router-dom"

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
  const [isCartModalOpen, setIsCartModalOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch("http://localhost:3000/api/products"),
          fetch("http://localhost:3000/api/categories"),
        ])
        
        if (productsRes.ok) {
          const productsData = await productsRes.json()
          setProducts(Array.isArray(productsData) ? productsData : [])
        } else {
          setProducts([])
        }
        
        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json()
          setCategories(Array.isArray(categoriesData) ? categoriesData : [])
        } else {
          setCategories([])
        }
      } catch (err) {
        console.error("Error fetching data:", err)
        setProducts([])
        setCategories([])
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
      selectedCategories.length === 0 || (product.category && selectedCategories.includes(product.category.id))
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const handleSignIn = () => {
    navigate("/login")
  }

  const handleCartClick = () => {
    setIsCartModalOpen(true)
  }

  const handleCloseCartModal = () => {
    setIsCartModalOpen(false)
  }

  const handleGoToWishlist = () => {
    navigate("/wishlist")
  }

  return (
    <div>
      <PageHeader
        onSignIn={handleSignIn}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onCartClick={handleCartClick}
        onGoToWishlist={handleGoToWishlist}
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
      <CartModal isOpen={isCartModalOpen} onClose={handleCloseCartModal} />
    </div>
  )
} 