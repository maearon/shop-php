"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface ProductFiltersProps {
  selectedCategory?: string
  selectedBrand?: string
}

export default function ProductFilters({ selectedCategory, selectedBrand }: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const categories = [
    { id: "running", name: "Giày chạy bộ" },
    { id: "lifestyle", name: "Giày lifestyle" },
    { id: "football", name: "Giày bóng đá" },
    { id: "basketball", name: "Giày bóng rổ" },
  ]

  const brands = [
    { id: "ultraboost", name: "Ultraboost" },
    { id: "stan-smith", name: "Stan Smith" },
    { id: "superstar", name: "Superstar" },
    { id: "nmd", name: "NMD" },
  ]

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.delete("page") // Reset to first page when filtering
    router.push(`/products?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push("/products")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Bộ lọc</h2>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Xóa tất cả
        </Button>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-medium mb-3">Danh mục</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={selectedCategory === category.id}
                onCheckedChange={(checked) => {
                  updateFilter("category", checked ? category.id : "")
                }}
              />
              <Label htmlFor={category.id} className="text-sm cursor-pointer">
                {category.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-medium mb-3">Thương hiệu</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand.id} className="flex items-center space-x-2">
              <Checkbox
                id={brand.id}
                checked={selectedBrand === brand.id}
                onCheckedChange={(checked) => {
                  updateFilter("brand", checked ? brand.id : "")
                }}
              />
              <Label htmlFor={brand.id} className="text-sm cursor-pointer">
                {brand.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-medium mb-3">Khoảng giá</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="under-2m" />
            <Label htmlFor="under-2m" className="text-sm cursor-pointer">
              Dưới 2.000.000₫
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="2m-4m" />
            <Label htmlFor="2m-4m" className="text-sm cursor-pointer">
              2.000.000₫ - 4.000.000₫
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="over-4m" />
            <Label htmlFor="over-4m" className="text-sm cursor-pointer">
              Trên 4.000.000₫
            </Label>
          </div>
        </div>
      </div>
    </div>
  )
}
