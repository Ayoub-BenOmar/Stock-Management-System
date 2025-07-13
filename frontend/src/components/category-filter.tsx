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
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = parseInt(event.target.value)
    if (categoryId) {
      onCategoryToggle(categoryId)
      // Reset select to placeholder
      event.target.value = ""
    }
  }

  const getSelectedCategoryNames = () => {
    return categories
      .filter(category => selectedCategories.includes(category.id))
      .map(category => category.name)
  }

  return (
    <div className="bg-muted/50 border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h2 className="text-lg font-semibold">Filter by Category</h2>
            {selectedCategories.length > 0 && (
              <Button variant="ghost" size="sm" onClick={onClearFilters} className="text-muted-foreground w-full sm:w-auto">
                <X className="h-4 w-4 mr-1" />
                Clear filters
              </Button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="w-full sm:w-auto">
              <select
                onChange={handleSelectChange}
                className="w-full sm:min-w-[200px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white text-gray-900"
                defaultValue=""
              >
                <option value="" disabled>
                  Select categories...
                </option>
                {categories.filter(category => category && category.id !== undefined).map((category) => {
                  const isSelected = selectedCategories.includes(category.id)
                  return (
                    <option
                      key={category.id}
                      value={category.id}
                      className={isSelected ? 'bg-red-50 text-red-700' : ''}
                    >
                      {category.name}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <Badge variant="secondary" className="text-sm w-fit">
                {productCount} {productCount === 1 ? "product" : "products"} found
              </Badge>
              {selectedCategories.length > 0 && (
                <span className="text-sm text-muted-foreground">
                  in {selectedCategories.length} {selectedCategories.length === 1 ? "category" : "categories"}
                </span>
              )}
            </div>
          </div>

          {/* Selected Categories Display */}
          {selectedCategories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {getSelectedCategoryNames().map((name, index) => (
                <Badge key={index} variant="secondary" className="bg-red-100 text-red-800">
                  {name}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 ml-1 hover:bg-red-200"
                    onClick={() => {
                      const category = categories.find(c => c.name === name)
                      if (category) onCategoryToggle(category.id)
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
