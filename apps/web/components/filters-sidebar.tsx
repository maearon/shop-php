"use client"

import { useState, useEffect } from "react"
import { X, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import productApi from "@/api/endpoints/productApi"

interface FiltersSidebarProps {
  isOpen: boolean
  onClose: () => void
  category?: any
  onFiltersChange?: (filters: any) => void
}

interface FilterOptions {
  genders: string[]
  categories: string[]
  sports: string[]
  brands: string[]
  sizes: string[]
  price_ranges: Array<{ label: string; min: number; max: number | null }>
}

export default function FiltersSidebar({ isOpen, onClose, category, onFiltersChange }: FiltersSidebarProps) {
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null)
  const [selectedFilters, setSelectedFilters] = useState<any>({})
  const [priceRange, setPriceRange] = useState([0, 500])
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    category: true,
    size: true,
    color: true,
    price: true,
    brand: true,
  })

  // Fetch filter options
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const options = await productApi.getProductFilters()
        setFilterOptions(options)
      } catch (error) {
        console.error("Failed to fetch filter options:", error)
      }
    }

    if (isOpen) {
      fetchFilterOptions()
    }
  }, [isOpen])

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleFilterChange = (filterType: string, value: string, checked: boolean) => {
    setSelectedFilters((prev: any) => {
      const newFilters = { ...prev }

      if (!newFilters[filterType]) {
        newFilters[filterType] = []
      }

      if (checked) {
        newFilters[filterType] = [...newFilters[filterType], value]
      } else {
        newFilters[filterType] = newFilters[filterType].filter((item: string) => item !== value)
      }

      // Remove empty arrays
      if (newFilters[filterType].length === 0) {
        delete newFilters[filterType]
      }

      return newFilters
    })
  }

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values)
    setSelectedFilters((prev: any) => ({
      ...prev,
      min_price: values[0],
      max_price: values[1],
    }))
  }

  const applyFilters = () => {
    const filters = {
      ...selectedFilters,
      min_price: priceRange[0],
      max_price: priceRange[1],
    }

    onFiltersChange?.(filters)
    onClose()
  }

  const clearFilters = () => {
    setSelectedFilters({})
    setPriceRange([0, 500])
    onFiltersChange?.({})
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-96 bg-white z-50 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Filter & Sort</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X size={20} />
            </Button>
          </div>

          {/* Category Section */}
          <div className="mb-6">
            <button
              className="flex justify-between items-center w-full py-2 text-left font-medium"
              onClick={() => toggleSection("category")}
            >
              <span>Category</span>
              {expandedSections.category ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {expandedSections.category && filterOptions && (
              <div className="mt-3 space-y-2">
                {filterOptions.categories.map((cat) => (
                  <div key={cat} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${cat}`}
                      checked={selectedFilters.category?.includes(cat) || false}
                      onCheckedChange={(checked) => handleFilterChange("category", cat, checked as boolean)}
                    />
                    <label htmlFor={`category-${cat}`} className="text-sm">
                      {cat}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Size Section */}
          <div className="mb-6">
            <button
              className="flex justify-between items-center w-full py-2 text-left font-medium"
              onClick={() => toggleSection("size")}
            >
              <span>Size</span>
              {expandedSections.size ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {expandedSections.size && filterOptions && (
              <div className="mt-3 grid grid-cols-4 gap-2">
                {filterOptions.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedFilters.size?.includes(size) ? "default" : "outline"}
                    size="sm"
                    className="h-8"
                    onClick={() => handleFilterChange("size", size, !selectedFilters.size?.includes(size))}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Brand Section */}
          <div className="mb-6">
            <button
              className="flex justify-between items-center w-full py-2 text-left font-medium"
              onClick={() => toggleSection("brand")}
            >
              <span>Brand</span>
              {expandedSections.brand ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {expandedSections.brand && filterOptions && (
              <div className="mt-3 space-y-2">
                {filterOptions.brands.map((brand) => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox
                      id={`brand-${brand}`}
                      checked={selectedFilters.brand?.includes(brand) || false}
                      onCheckedChange={(checked) => handleFilterChange("brand", brand, checked as boolean)}
                    />
                    <label htmlFor={`brand-${brand}`} className="text-sm">
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Price Section */}
          <div className="mb-6">
            <button
              className="flex justify-between items-center w-full py-2 text-left font-medium"
              onClick={() => toggleSection("price")}
            >
              <span>Price</span>
              {expandedSections.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {expandedSections.price && (
              <div className="mt-3">
                <div className="mb-4">
                  <Slider
                    value={priceRange}
                    onValueChange={handlePriceChange}
                    max={500}
                    min={0}
                    step={10}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-6 border-t">
            <Button onClick={applyFilters} className="w-full">
              Apply Filters
            </Button>
            <Button variant="outline" onClick={clearFilters} className="w-full">
              Clear All
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
