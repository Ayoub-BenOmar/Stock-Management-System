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
  onSubmit: (product: any) => void
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
  const [errors, setErrors] = useState({
    name: "",
    price: "",
    quantity: "",
    categoryId: "",
    supplierId: ""
  });
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")

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
      if (editingProduct.pic) {
        setImagePreview(`http://localhost:3000${editingProduct.pic}`)
      }
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        quantity: "",
        active: true,
        categoryId: "",
        supplierId: "",
      })
      setSelectedFile(null)
      setImagePreview("")
    }
  }, [editingProduct, open])

  useEffect(() => {
    if (initialCategories && initialCategories.length > 0) {
      setCategories(initialCategories)
    } else {
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
    if (initialSuppliers && initialSuppliers.length > 0) {
      setSuppliers(initialSuppliers)
    } else {
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

    const newErrors = {
      name: "",
      price: "",
      quantity: "",
      categoryId: "",
      supplierId: ""
    };

    if (!formData.name || formData.name.trim() === "") {
      newErrors.name = "You have to fill this field";
    }
    if (!formData.price || isNaN(Number(formData.price))) {
      newErrors.price = "You have to fill this field";
    }
    if (!formData.quantity || isNaN(Number(formData.quantity))) {
      newErrors.quantity = "You have to fill this field";
    }
    if (!formData.categoryId) {
      newErrors.categoryId = "You have to fill this field";
    }
    if (!formData.supplierId) {
      newErrors.supplierId = "You have to fill this field";
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      setIsLoading(false);
      return;
    }

    if (!formData.name || formData.name.trim() === "") {
      setIsLoading(false)
      return;
    }
    if (!formData.price || isNaN(Number(formData.price))) {
      setIsLoading(false)
      return;
    }
    if (!formData.quantity || isNaN(Number(formData.quantity))) {
      setIsLoading(false)
      return;
    }

    if (!formData.categoryId || !formData.supplierId || formData.categoryId === "" || formData.supplierId === "") {
      setIsLoading(false)
      return
    }

    const selectedCategory = categories.find((c) => c.id.toString() === formData.categoryId.toString())
    const selectedSupplier = suppliers.find((s) => s.id.toString() === formData.supplierId.toString())

    if (!selectedCategory || !selectedSupplier) {
      alert("Please select both category and supplier")
      setIsLoading(false)
      return
    }

    const formDataToSend = new FormData()
    formDataToSend.append("name", formData.name)
    formDataToSend.append("description", formData.description || "")
    formDataToSend.append("price", formData.price)
    formDataToSend.append("quantity", formData.quantity)
    formDataToSend.append("categoryId", formData.categoryId)
    formDataToSend.append("supplierId", formData.supplierId)
    formDataToSend.append("active", formData.active.toString())
    
    if (selectedFile) {
      formDataToSend.append("pic", selectedFile)
    }

    await onSubmit(formDataToSend as any)

    setTimeout(() => {
      setIsLoading(false)
      onOpenChange(false)
    }, 1000)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setUploadError("")
      
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
          <DialogDescription>
            {editingProduct ? "Update the product information below." : "Fill in the product information below."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("name", e.target.value)}
                placeholder="Enter product name"
              />
              {errors.name && <div className="text-xs text-red-500 mt-1">{errors.name}</div>}
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
              />
              {errors.price && <div className="text-xs text-red-500 mt-1">{errors.price}</div>}
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

          <div className="space-y-2">
            <Label htmlFor="image">Product Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="cursor-pointer"
            />
            {uploadError && <div className="text-xs text-red-500 mt-1">{uploadError}</div>}
            {imagePreview && (
              <div className="mt-2">
                <img src={imagePreview} alt="Preview" className="h-20 w-20 object-cover rounded border" />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Stock Quantity *</Label>
              <Input
                id="quantity"
                type="number"
                min="0"
                value={formData.quantity}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("quantity", e.target.value)}
                placeholder="0"
              />
              {errors.quantity && <div className="text-xs text-red-500 mt-1">{errors.quantity}</div>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <select
                id="category"
                className="block w-full border rounded px-3 py-2 text-sm"
                value={formData.categoryId}
                onChange={e => handleInputChange("categoryId", e.target.value)}
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id.toString()}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && <div className="text-xs text-red-500 mt-1">{errors.categoryId}</div>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="supplier">Supplier *</Label>
              <select
                id="supplier"
                className="block w-full border rounded px-3 py-2 text-sm"
                value={formData.supplierId}
                onChange={e => handleInputChange("supplierId", e.target.value)}
              >
                <option value="">Select supplier</option>
                {suppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.id.toString()}>
                    {supplier.name}
                  </option>
                ))}
              </select>
              {errors.supplierId && <div className="text-xs text-red-500 mt-1">{errors.supplierId}</div>}
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

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
              {isLoading ? "Saving..." : editingProduct ? "Update Product" : "Add Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}