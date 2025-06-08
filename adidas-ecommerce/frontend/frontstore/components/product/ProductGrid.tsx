"use client"

import { useState, useEffect } from "react"
import ProductCard from "@/components/product/ProductCard"
import { getProducts } from "@/lib/api"
import type { Product } from "@/lib/api"

interface ProductGridProps {
  filters?: Record<string, any>
}

export default function ProductGrid({ filters = {} }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        const data = await getProducts()
        setProducts(data || [])
      } catch (error) {
        console.error("Failed to fetch products:", error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    let filtered = [...products]

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (!value || (Array.isArray(value) && value.length === 0)) return

      switch (key) {
        case "sort":
          switch (value) {
            case "price-low":
              filtered.sort((a, b) => a.price - b.price)
              break
            case "price-high":
              filtered.sort((a, b) => b.price - a.price)
              break
            case "newest":
              filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
              break
            default:
              break
          }
          break
        case "priceRange":
          if (Array.isArray(value) && value.length === 2) {
            filtered = filtered.filter((p) => p.price >= value[0] && p.price <= value[1])
          }
          break
        case "colour":
          if (Array.isArray(value)) {
            filtered = filtered.filter((p) => p.colors.some((color) => value.includes(color.name)))
          }
          break
        case "size":
          if (Array.isArray(value)) {
            filtered = filtered.filter((p) => p.sizes.some((size) => value.includes(size)))
          }
          break
        default:
          // Handle other filters generically
          if (Array.isArray(value)) {
            filtered = filtered.filter((p) =>
              value.some(
                (v) =>
                  p.name.toLowerCase().includes(v.toLowerCase()) || p.category.toLowerCase().includes(v.toLowerCase()),
              ),
            )
          }
          break
      }
    })

    setFilteredProducts(filtered)
  }, [products, filters])

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    )
  }

  const displayProducts = filteredProducts.length > 0 ? filteredProducts : products

  return (
    <div>
      <div className="mb-4 text-sm text-gray-600">Hiển thị {displayProducts.length} sản phẩm</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {displayProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Không tìm thấy sản phẩm nào phù hợp với bộ lọc.</p>
        </div>
      )}
    </div>
  )
}
