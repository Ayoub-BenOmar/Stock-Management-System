"use client"

import { useState, useMemo, useEffect } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Plus, MoreHorizontal, Edit, Trash2, Menu } from "lucide-react"
import AdminSidebar from "./admin-sidebar"
import AddProductModal from "./add-product-modal"
import type { Product } from "./ProductCard"
import { Label } from "./ui/label"

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([])
  const [suppliers, setSuppliers] = useState<{ id: number; name: string }[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes, suppliersRes] = await Promise.all([
          fetch("http://localhost:3000/api/products"),
          fetch("http://localhost:3000/api/categories"),
          fetch("http://localhost:3000/api/suppliers"),
        ])
        
        if (productsRes.ok) {
          const productsData = await productsRes.json()
          setProducts(productsData)
        }
        
        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json()
          setCategories(categoriesData)
        }
        
        if (suppliersRes.ok) {
          const suppliersData = await suppliersRes.json()
          setSuppliers(suppliersData)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    
    fetchData()
  }, [])

  const handleAddProduct = async (productData: Omit<Product, "id" | "createdAt" | "updatedAt">) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      })

      if (response.ok) {
        const newProduct = await response.json()
        setProducts((prev) => [...prev, newProduct])
        setIsAddModalOpen(false)
      } else {
        const error = await response.json()
        alert(`Error adding product: ${error.error}`)
      }
    } catch (error) {
      console.error("Error adding product:", error)
      alert("Error adding product")
    }
  }

  const handleEditProduct = async (productData: any) => {
    if (!editingProduct) return

    try {
      const token = localStorage.getItem('token')
      
      // Check if productData is FormData (for file uploads) or regular object
      const isFormData = productData instanceof FormData
      
      const response = await fetch(`http://localhost:3000/api/products/${editingProduct.id}`, {
        method: "PUT",
        headers: isFormData ? {
          "Authorization": `Bearer ${token}`,
        } : {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: isFormData ? productData : JSON.stringify(productData),
      })

      if (response.ok) {
        const updatedProduct = await response.json()
        setProducts((prev) => prev.map((p) => (p.id === editingProduct.id ? updatedProduct : p)))
        setEditingProduct(null)
        setIsAddModalOpen(false)
      } else {
        const error = await response.json()
        console.error("Update error response:", error)
        alert(`Error updating product: ${error.error}`)
      }
    } catch (error) {
      console.error("Error updating product:", error)
      alert("Error updating product")
    }
  }

  const handleDeleteProduct = async (productId: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:3000/api/products/${productId}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        })

        if (response.ok) {
          setProducts((prev) => prev.filter((p) => p.id !== productId))
        } else {
          const error = await response.json()
          alert(`Error deleting product: ${error.error}`)
        }
      } catch (error) {
        console.error("Error deleting product:", error)
        alert("Error deleting product")
      }
    }
  }

  const openEditModal = (product: Product) => {
    setEditingProduct(product)
    setIsAddModalOpen(true)
  }

  return (
    <div className="flex h-screen">
      <AdminSidebar activeItem="products" open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col md:ml-64">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <button className="md:hidden mr-2" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">Products Management</h1>
          </div>
        </header>

        <div className="flex-1 space-y-4 p-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Products</CardTitle>
                  <CardDescription>Manage your product inventory</CardDescription>
                </div>
                <Button onClick={() => setIsAddModalOpen(true)} className="w-full sm:w-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Products Table */}
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden sm:table-cell">Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="hidden md:table-cell">Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="hidden lg:table-cell">Stock</TableHead>
                      <TableHead className="hidden lg:table-cell">Status</TableHead>
                      <TableHead className="hidden xl:table-cell">Supplier</TableHead>
                      <TableHead className="hidden xl:table-cell">Updated</TableHead>
                      <TableHead className="w-[70px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.isArray(products) && products.filter(Boolean).map((product) => (
                      product && product.id !== undefined && product.category && product.supplier && (
                        <TableRow key={product.id}>
                          <TableCell className="hidden sm:table-cell">
                            <img
                              src={product.pic ? `http://localhost:3000${product.pic}` : "/placeholder.svg"}
                              alt={product.name}
                              className="w-14 h-14 object-cover rounded"
                            />
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{product.name}</div>
                              {product.description && (
                                <div className="text-sm text-muted-foreground line-clamp-1">{product.description}</div>
                              )}
                              <div className="sm:hidden mt-1">
                                <Badge variant="outline" className="text-xs">{product.category.name}</Badge>
                                <span className="text-sm text-muted-foreground ml-2">{formatPrice(product.price)}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Badge variant="outline">{product.category.name}</Badge>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell md:table-cell font-medium">{formatPrice(product.price)}</TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <div className="flex items-center gap-2">
                              <span
                                className={
                                  product.quantity === 0
                                    ? "text-destructive"
                                    : product.quantity <= 5
                                      ? "text-orange-600"
                                      : ""
                                }
                              >
                                {product.quantity}
                              </span>
                              {product.quantity === 0 && (
                                <Badge variant="destructive" className="text-xs">
                                  Out of Stock
                                </Badge>
                              )}
                              {product.quantity > 0 && product.quantity <= 5 && (
                                <Badge variant="outline" className="text-xs text-orange-600">
                                  Low Stock
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <Badge variant={product.active ? "default" : "secondary"}>
                              {product.active ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden xl:table-cell">{product.supplier.name}</TableCell>
                          <TableCell className="hidden xl:table-cell text-sm text-muted-foreground">{formatDate(product.updatedAt)}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" onClick={() => openEditModal(product)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleDeleteProduct(product.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    ))}
                  </TableBody>
                </Table>
              </div>

              {products.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No products found.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <AddProductModal
          open={isAddModalOpen}
          onOpenChange={(open) => {
            setIsAddModalOpen(open)
            if (!open) setEditingProduct(null)
          }}
          onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
          categories={categories}
          suppliers={suppliers}
          editingProduct={editingProduct}
        />
      </div>
    </div>
  )
}
