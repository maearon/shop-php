"use client"

import { useState } from "react"
import ProductGrid from "@/components/product/ProductGrid"
import FilterSidebar from "@/components/product/FilterSidebar"
import { Button } from "@/components/ui/button"
import Breadcrumbs from "@/components/ui/Breadcrumbs"
import { Filter, X } from "lucide-react"

export default function ProductsPage() {
  const [showFilters, setShowFilters] = useState(false)
  const [appliedFilters, setAppliedFilters] = useState<Record<string, any>>({})

  const breadcrumbs = [
    { label: "Trang chủ", href: "/" },
    { label: "Sản phẩm", href: "/products" },
  ]

  const handleFilterChange = (filters: Record<string, any>) => {
    setAppliedFilters(filters)
  }

  const clearAllFilters = () => {
    setAppliedFilters({})
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={breadcrumbs} />

      <div className="flex justify-between items-center mt-8 mb-6">
        <h1 className="text-3xl font-bold">TẤT CẢ SẢN PHẨM</h1>
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
          <Filter className="w-4 h-4 mr-2" />
          Lọc & Sắp xếp
        </Button>
      </div>

      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <FilterSidebar
            onFilterChange={handleFilterChange}
            appliedFilters={appliedFilters}
            onClearAll={clearAllFilters}
          />
        </div>

        {/* Mobile Sidebar Overlay */}
        {showFilters && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
            <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-bold">Filter & Sort</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="overflow-y-auto h-full pb-20">
                <FilterSidebar
                  onFilterChange={handleFilterChange}
                  appliedFilters={appliedFilters}
                  onClearAll={clearAllFilters}
                />
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="flex-1">
          <ProductGrid filters={appliedFilters} />
        </div>
      </div>
    </div>
  )
}
