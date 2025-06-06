"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ChevronDown, ChevronUp, X } from "lucide-react"

interface FilterSidebarProps {
  onFilterChange: (filters: Record<string, any>) => void
  appliedFilters: Record<string, any>
  onClearAll: () => void
}

export default function FilterSidebar({ onFilterChange, appliedFilters, onClearAll }: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    sort: true,
    price: true,
  })
  const [priceRange, setPriceRange] = useState([750000, 6000000])
  const [sortBy, setSortBy] = useState("newest")

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleFilterUpdate = (key: string, value: any) => {
    const newFilters = { ...appliedFilters, [key]: value }
    if (!value || (Array.isArray(value) && value.length === 0)) {
      delete newFilters[key]
    }
    onFilterChange(newFilters)
  }

  const removeFilter = (key: string) => {
    const newFilters = { ...appliedFilters }
    delete newFilters[key]
    onFilterChange(newFilters)
  }

  const getAppliedFiltersCount = () => {
    return Object.keys(appliedFilters).length
  }

  const filterSections = [
    {
      id: "closure",
      title: "CLOSURE",
      options: ["Lace", "Slip-on", "Velcro", "Zipper"],
    },
    {
      id: "gender",
      title: "GENDER",
      options: ["Men", "Women", "Kids", "Unisex"],
    },
    {
      id: "division",
      title: "DIVISION",
      options: ["Shoes", "Clothing", "Accessories"],
    },
    {
      id: "productType",
      title: "PRODUCT TYPE",
      options: ["Sneakers", "Running Shoes", "Football Boots", "Slides"],
    },
    {
      id: "brand",
      title: "BRAND",
      options: ["adidas Originals", "adidas Performance", "Y-3", "Stella McCartney"],
    },
    {
      id: "colour",
      title: "COLOUR",
      options: ["Black", "White", "Blue", "Red", "Green", "Grey"],
    },
    {
      id: "sport",
      title: "SPORT",
      options: ["Running", "Football", "Basketball", "Tennis", "Training"],
    },
    {
      id: "collection",
      title: "COLLECTION",
      options: ["Ultraboost", "Stan Smith", "Superstar", "NMD", "Gazelle"],
    },
    {
      id: "size",
      title: "SIZE",
      options: ["38", "39", "40", "41", "42", "43", "44", "45"],
    },
  ]

  return (
    <div className="bg-white border-r border-gray-200 h-full">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Filter & Sort</h2>
          <Button variant="ghost" size="sm" onClick={onClearAll}>
            Clear All
          </Button>
        </div>

        {/* Applied Filters */}
        {Object.keys(appliedFilters).length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">APPLIED FILTERS</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(appliedFilters).map(([key, value]) => (
                <div key={key} className="flex items-center bg-gray-100 rounded px-2 py-1 text-sm">
                  <span className="mr-1">{Array.isArray(value) ? value.join(", ") : value}</span>
                  <button onClick={() => removeFilter(key)}>
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="overflow-y-auto flex-1">
        {/* Sort By */}
        <div className="border-b">
          <button
            onClick={() => toggleSection("sort")}
            className="w-full flex items-center justify-between p-4 text-left font-medium"
          >
            SORT BY
            {expandedSections.sort ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {expandedSections.sort && (
            <div className="px-4 pb-4 space-y-2">
              {[
                { value: "price-low", label: "PRICE (LOW - HIGH)" },
                { value: "newest", label: "NEWEST" },
                { value: "top-sellers", label: "TOP SELLERS" },
                { value: "price-high", label: "PRICE (HIGH - LOW)" },
              ].map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id={option.value}
                    name="sort"
                    value={option.value}
                    checked={sortBy === option.value}
                    onChange={(e) => {
                      setSortBy(e.target.value)
                      handleFilterUpdate("sort", e.target.value)
                    }}
                    className="w-4 h-4"
                  />
                  <Label htmlFor={option.value} className="text-sm cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Filter Sections */}
        {filterSections.map((section) => (
          <div key={section.id} className="border-b">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-4 text-left font-medium"
            >
              {section.title}
              {expandedSections[section.id] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {expandedSections[section.id] && (
              <div className="px-4 pb-4 space-y-2">
                {section.options.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${section.id}-${option}`}
                      checked={appliedFilters[section.id]?.includes(option) || false}
                      onCheckedChange={(checked) => {
                        const currentValues = appliedFilters[section.id] || []
                        const newValues = checked
                          ? [...currentValues, option]
                          : currentValues.filter((v: string) => v !== option)
                        handleFilterUpdate(section.id, newValues)
                      }}
                    />
                    <Label htmlFor={`${section.id}-${option}`} className="text-sm cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* New Arrivals */}
        <div className="border-b">
          <button
            onClick={() => toggleSection("newArrivals")}
            className="w-full flex items-center justify-between p-4 text-left font-medium"
          >
            NEW ARRIVALS [109]
            {expandedSections.newArrivals ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Price Range */}
        <div className="border-b">
          <button
            onClick={() => toggleSection("price")}
            className="w-full flex items-center justify-between p-4 text-left font-medium"
          >
            PRICE
            {expandedSections.price ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {expandedSections.price && (
            <div className="px-4 pb-4">
              <div className="mb-4">
                <Slider
                  value={priceRange}
                  onValueChange={(value) => {
                    setPriceRange(value)
                    handleFilterUpdate("priceRange", value)
                  }}
                  max={6000000}
                  min={750000}
                  step={50000}
                  className="w-full"
                />
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>{priceRange[0].toLocaleString()}₫</span>
                <span>{priceRange[1].toLocaleString()}₫</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Apply Button */}
      <div className="p-4 border-t">
        <Button className="w-full bg-black text-white hover:bg-gray-800">APPLY ({getAppliedFiltersCount()})</Button>
      </div>
    </div>
  )
}
