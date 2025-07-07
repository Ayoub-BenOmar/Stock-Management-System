"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Switch } from "./ui/switch"
import type { Product } from "./ProductCard"

interface Category {
  id: number
  name: string
}

interface Supplier {
  id: number
  name: string
}

interface AddProductModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (product: Omit<Product, "id" | "createdAt" | "updatedAt">) => void
  categories: Category[]
  suppliers: Supplier[]
  editingProduct?: Product | null
}

export default function AddProductModal({
  open,
  onOpenChange,
  onSubmit,
  categories: initialCategories,
  suppliers: initialSuppliers,
  editingProduct,
}: AddProductModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    active: true,
    categoryId: "",
    supplierId: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([])
  const [suppliers, setSuppliers] = useState<{ id: number; name: string }[]>([])

  // Update form data when editingProduct changes
  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || "",
        description: editingProduct.description || "",
        price: editingProduct.price?.toString() || "",
        quantity: editingProduct.quantity?.toString() || "",
        active: editingProduct.active ?? true,
        categoryId: editingProduct.category?.id?.toString() || "",
        supplierId: editingProduct.supplier?.id?.toString() || "",
      })
    } else {
      // Reset form when not editing
      setFormData({
        name: "",
        description: "",
        price: "",
        quantity: "",
        active: true,
        categoryId: "",
        supplierId: "",
      })
    }
  }, [editingProduct, open])

  useEffect(() => {
    // Use provided categories first, then fetch if needed
    if (initialCategories && initialCategories.length > 0) {
      setCategories(initialCategories)
    } else {
      // Fetch categories
      const fetchCategories = async () => {
        try {
          const res = await fetch("http://localhost:3000/api/categories");
          if (res.ok) {
            const data = await res.json();
            setCategories(data);
          } else {
            setCategories([]);
          }
        } catch (err) {
          console.error("Error fetching categories:", err);
          setCategories([]);
        }
      };
      fetchCategories();
    }
  }, [initialCategories]);

  useEffect(() => {
    // Use provided suppliers first, then fetch if needed
    if (initialSuppliers && initialSuppliers.length > 0) {
      setSuppliers(initialSuppliers)
    } else {
      // Fetch suppliers
      const fetchSuppliers = async () => {
        try {
          const res = await fetch("http://localhost:3000/api/suppliers");
          if (res.ok) {
            const data = await res.json();
            setSuppliers(data);
          } else {
            setSuppliers([]);
          }
        } catch (err) {
          console.error("Error fetching suppliers:", err);
          setSuppliers([]);
        }
      };
      fetchSuppliers();
    }
  }, [initialSuppliers]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    console.log("formData.categoryId:", formData.categoryId, "formData.supplierId:", formData.supplierId);
    console.log("Available categories:", categories);
    console.log("Available suppliers:", suppliers);
    
    if (!formData.categoryId || !formData.supplierId || formData.categoryId === "" || formData.supplierId === "") {
      alert("Please select both category and supplier");
      setIsLoading(false)
      return
    }

    const selectedCategory = categories.find((c) => c.id.toString() === formData.categoryId.toString())
    const selectedSupplier = suppliers.find((s) => s.id.toString() === formData.supplierId.toString())

    console.log("Selected category:", selectedCategory);
    console.log("Selected supplier:", selectedSupplier);

    if (!selectedCategory || !selectedSupplier) {
      alert("Please select both category and supplier")
      setIsLoading(false)
      return
    }

    const payload = {
      name: formData.name,
      description: formData.description || null,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
      active: Boolean(formData.active),
      categoryId: Number(formData.categoryId),
      supplierId: Number(formData.supplierId),
    };

    if (editingProduct) {
      await fetch(`http://localhost:3000/api/products/${editingProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("http://localhost:3000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onOpenChange(false)
    }, 1000)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
          <DialogDescription>
            {editingProduct ? "Update the product information below." : "Fill in the product information below."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("name", e.target.value)}
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("price", e.target.value)}
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange("description", e.target.value)}
              placeholder="Enter product description"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Stock Quantity *</Label>
              <Input
                id="quantity"
                type="number"
                min="0"
                value={formData.quantity}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("quantity", e.target.value)}
                placeholder="0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <select
                id="category"
                className="block w-full border rounded px-3 py-2 text-sm"
                value={formData.categoryId}
                onChange={e => handleInputChange("categoryId", e.target.value)}
                required
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id.toString()}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="supplier">Supplier *</Label>
              <select
                id="supplier"
                className="block w-full border rounded px-3 py-2 text-sm"
                value={formData.supplierId}
                onChange={e => handleInputChange("supplierId", e.target.value)}
                required
              >
                <option value="">Select supplier</option>
                {suppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.id.toString()}>
                    {supplier.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  id="active"
                  checked={formData.active}
                  onCheckedChange={(checked: boolean) => handleInputChange("active", checked)}
                />
                <Label htmlFor="active" className="text-sm font-normal">Active</Label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : editingProduct ? "Update Product" : "Add Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}