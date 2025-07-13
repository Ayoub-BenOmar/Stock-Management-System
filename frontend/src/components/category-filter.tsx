"use client"

import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Check, Filter, Tag, X } from "lucide-react"

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
    <div className="bg-gradient-to-r from-red-50 to-orange-50 border-b border-red-200 shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg border border-red-200 shadow-md p-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-8 bg-red-500 rounded-full"></div>
                <h2 className="text-xl font-bold text-gray-800">Filter by Category</h2>
                <Badge variant="secondary" className="text-sm bg-red-100 text-red-800 border border-red-200">
                  {productCount} {productCount === 1 ? "product" : "products"} found
                </Badge>
              </div>
              {selectedCategories.length > 0 && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onClearFilters} 
                  className="text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400 w-full sm:w-auto"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear all filters
                </Button>
              )}
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              <div className="w-full lg:w-auto space-y-3">
                <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-red-600" />
                  Select Categories
                </Label>

                <Select onValueChange={(value: string) => {
                  const categoryId = parseInt(value)
                  if (categoryId) {
                    onCategoryToggle(categoryId)
                  }
                }} defaultValue="">
                  <SelectTrigger className="w-full lg:w-64 h-11 bg-white border-2 border-slate-200 hover:border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-100 rounded-xl shadow-sm transition-all duration-200">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-slate-400" />
                      <SelectValue placeholder="Choose categories to filter..." />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="w-full lg:w-64 rounded-xl border-2 border-slate-100 shadow-lg">
                    {categories
                      .filter((category) => category && category.id !== undefined)
                      .map((category) => {
                        const isSelected = selectedCategories.includes(category.id)
                        return (
                          <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                            className={`
                            flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-150
                            ${isSelected ? "bg-red-50 text-red-700 font-medium" : "text-slate-700 hover:bg-slate-50"}
                          `}
                          >
                            <div className="flex items-center gap-2 w-full">
                              {isSelected && <Check className="w-4 h-4 text-red-600" />}
                              <span className={isSelected ? "font-medium" : ""}>{category.name}</span>
                            </div>
                          </SelectItem>
                        )
                      })}
                  </SelectContent>
                </Select>
              </div>

              {selectedCategories.length > 0 && (
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <Badge
                    variant="secondary"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 text-red-800 rounded-full shadow-sm"
                  >
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">
                      {selectedCategories.length} {selectedCategories.length === 1 ? "category" : "categories"} selected
                    </span>
                  </Badge>
                </div>
              )}
            </div>

            {/* Selected Categories Display */}
            {selectedCategories.length > 0 && (
              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-medium text-gray-700">Selected Categories:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {getSelectedCategoryNames().map((name, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="bg-red-100 text-red-800 border border-red-200 hover:bg-red-200 transition-colors duration-200"
                    >
                      {name}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 ml-2 hover:bg-red-300 rounded-full"
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
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export {}
