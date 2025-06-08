"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProductSortProps {
  selectedSort?: string
}

export default function ProductSort({ selectedSort }: ProductSortProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const sortOptions = [
    { value: "newest", label: "Mới nhất" },
    { value: "price-low", label: "Giá thấp đến cao" },
    { value: "price-high", label: "Giá cao đến thấp" },
    { value: "popular", label: "Phổ biến nhất" },
  ]

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set("sort", value)
    } else {
      params.delete("sort")
    }
    params.delete("page") // Reset to first page when sorting
    router.push(`/products?${params.toString()}`)
  }

  return (
    <Select value={selectedSort || "newest"} onValueChange={handleSortChange}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Sắp xếp theo" />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
