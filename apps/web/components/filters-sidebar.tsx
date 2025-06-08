"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { X, ChevronDown, ChevronUp } from "lucide-react"

type CategoryConfig = {
  title: string
  category: string
  subcategory: string
  productType: string
}

type FiltersSidebarProps = {
  isOpen: boolean
  onClose: () => void
  category: CategoryConfig
}

export default function FiltersSidebar({ isOpen, onClose, category }: FiltersSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    size: true,
    color: true,
    price: true,
    brand: true,
    sport: true,
    features: true,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev],
    }))
  }

  const sizeOptions =
    category.productType === "shoes"
      ? ["6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"]
      : ["XS", "S", "M", "L", "XL", "XXL"]

  const colorOptions = [
    { name: "Black", value: "black", color: "bg-black", count: 45 },
    { name: "White", value: "white", color: "bg-white border", count: 38 },
    { name: "Blue", value: "blue", color: "bg-blue-600", count: 22 },
    { name: "Red", value: "red", color: "bg-red-600", count: 18 },
    { name: "Green", value: "green", color: "bg-green-600", count: 15 },
    { name: "Yellow", value: "yellow", color: "bg-yellow-400", count: 12 },
    { name: "Gray", value: "gray", color: "bg-gray-500", count: 28 },
    { name: "Navy", value: "navy", color: "bg-blue-900", count: 16 },
  ]

  const priceRanges = [
    { label: "$25 - $50", count: 23 },
    { label: "$50 - $100", count: 34 },
    { label: "$100 - $150", count: 18 },
    { label: "$150 - $200", count: 12 },
    { label: "$200+", count: 8 },
  ]

  const brands = [
    { name: "Essentials", count: 25 },
    { name: "Adicolor", count: 18 },
    { name: "Originals", count: 22 },
    { name: "Performance", count: 15 },
    { name: "Training", count: 12 },
  ]

  const sports = [
    { name: "Running", count: 20 },
    { name: "Training", count: 18 },
    { name: "Lifestyle", count: 25 },
    { name: "Soccer", count: 12 },
    { name: "Basketball", count: 8 },
  ]

  const features = [
    { name: "Moisture-Wicking", count: 32 },
    { name: "Quick-Dry", count: 28 },
    { name: "UV Protection", count: 15 },
    { name: "Recycled Materials", count: 22 },
    { name: "Organic Cotton", count: 18 },
  ]

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-96 bg-white z-50 shadow-lg overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-lg font-bold">Filter & Sort</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X size={20} />
          </button>
        </div>

        {/* Sort Section */}
        <div className="p-6 border-b">
          <h3 className="font-bold mb-4">Sort By</h3>
          <div className="space-y-3">
            {[
              "Newest",
              "Price: Low to High",
              "Price: High to Low",
              "Most Popular",
              "Highest Rated",
              "Best Sellers",
            ].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <input type="radio" name="sort" id={option} className="w-4 h-4" />
                <label htmlFor={option} className="text-sm cursor-pointer">
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Size Filter */}
        <div className="p-6 border-b">
          <button onClick={() => toggleSection("size")} className="flex justify-between items-center w-full mb-4">
            <h3 className="font-bold">Size</h3>
            {expandedSections.size ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {expandedSections.size && (
            <div className="grid grid-cols-4 gap-2">
              {sizeOptions.map((size) => (
                <Button key={size} variant="outline" size="sm" className="h-10 text-sm hover:bg-black hover:text-white">
                  {size}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Color Filter */}
        <div className="p-6 border-b">
          <button onClick={() => toggleSection("color")} className="flex justify-between items-center w-full mb-4">
            <h3 className="font-bold">Color</h3>
            {expandedSections.color ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {expandedSections.color && (
            <div className="space-y-3">
              {colorOptions.map((color) => (
                <div key={color.value} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Checkbox id={color.value} />
                    <div className={`w-4 h-4 rounded-full ${color.color}`} />
                    <label htmlFor={color.value} className="text-sm cursor-pointer">
                      {color.name}
                    </label>
                  </div>
                  <span className="text-xs text-gray-500">({color.count})</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Price Filter */}
        <div className="p-6 border-b">
          <button onClick={() => toggleSection("price")} className="flex justify-between items-center w-full mb-4">
            <h3 className="font-bold">Price</h3>
            {expandedSections.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {expandedSections.price && (
            <div className="space-y-3">
              {priceRanges.map((range) => (
                <div key={range.label} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id={range.label} />
                    <label htmlFor={range.label} className="text-sm cursor-pointer">
                      {range.label}
                    </label>
                  </div>
                  <span className="text-xs text-gray-500">({range.count})</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Brand Filter */}
        <div className="p-6 border-b">
          <button onClick={() => toggleSection("brand")} className="flex justify-between items-center w-full mb-4">
            <h3 className="font-bold">Brand</h3>
            {expandedSections.brand ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {expandedSections.brand && (
            <div className="space-y-3">
              {brands.map((brand) => (
                <div key={brand.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id={brand.name} />
                    <label htmlFor={brand.name} className="text-sm cursor-pointer">
                      {brand.name}
                    </label>
                  </div>
                  <span className="text-xs text-gray-500">({brand.count})</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sport Filter */}
        <div className="p-6 border-b">
          <button onClick={() => toggleSection("sport")} className="flex justify-between items-center w-full mb-4">
            <h3 className="font-bold">Sport</h3>
            {expandedSections.sport ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {expandedSections.sport && (
            <div className="space-y-3">
              {sports.map((sport) => (
                <div key={sport.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id={sport.name} />
                    <label htmlFor={sport.name} className="text-sm cursor-pointer">
                      {sport.name}
                    </label>
                  </div>
                  <span className="text-xs text-gray-500">({sport.count})</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Features Filter */}
        <div className="p-6 border-b">
          <button onClick={() => toggleSection("features")} className="flex justify-between items-center w-full mb-4">
            <h3 className="font-bold">Features</h3>
            {expandedSections.features ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {expandedSections.features && (
            <div className="space-y-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id={feature.name} />
                    <label htmlFor={feature.name} className="text-sm cursor-pointer">
                      {feature.name}
                    </label>
                  </div>
                  <span className="text-xs text-gray-500">({feature.count})</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="p-6 space-y-3">
          <Button className="w-full bg-black text-white hover:bg-gray-800">Apply Filters</Button>
          <Button variant="outline" className="w-full">
            Clear All Filters
          </Button>
        </div>
      </div>
    </>
  )
}
