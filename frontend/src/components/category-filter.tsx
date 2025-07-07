"use client"

import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { X } from "lucide-react"

interface Category {
  id: number
  name: string
}

interface CategoryFilterProps {
  categories: Category[]
  selectedCategories: number[]
  onCategoryToggle: (categoryId: number) => void
  onClearFilters: () => void
  productCount: number
}

export default function CategoryFilter({
  categories,
  selectedCategories,
  onCategoryToggle,
  onClearFilters,
  productCount,
}: CategoryFilterProps) {
  return (
    <div className="bg-muted/50 border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Filter by Category</h2>
            {selectedCategories.length > 0 && (
              <Button variant="ghost" size="sm" onClick={onClearFilters} className="text-muted-foreground">
                <X className="h-4 w-4 mr-1" />
                Clear filters
              </Button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.filter(category => category && category.id !== undefined).map((category) => {
              const isSelected = selectedCategories.includes(category.id)
              return (
                <Button
                  key={category.id}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={() => onCategoryToggle(category.id)}
                  className="transition-all duration-200 h-8 px-3"
                >
                  {category.name}
                  {isSelected && <X className="h-3 w-3 ml-1" />}
                </Button>
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-sm">
              {productCount} {productCount === 1 ? "product" : "products"} found
            </Badge>
            {selectedCategories.length > 0 && (
              <span className="text-sm text-muted-foreground">
                in {selectedCategories.length} {selectedCategories.length === 1 ? "category" : "categories"}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
