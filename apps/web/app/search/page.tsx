"use client"

import type React from "react"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { searchProducts } from "@/lib/api"
import type { Product } from "@/lib/api"
import ProductCard from "@/components/product/ProductCard"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

function SearchContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""

  const [query, setQuery] = useState(initialQuery)
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery)
    }
  }, [initialQuery])

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return

    setIsLoading(true)
    setHasSearched(true)

    try {
      const results = await searchProducts(searchQuery)
      setProducts(results)
    } catch (error) {
      console.error("Search error:", error)
      setProducts([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch(query)

    // Update URL
    const url = new URL(window.location.href)
    url.searchParams.set("q", query)
    window.history.pushState({}, "", url.toString())
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Tìm kiếm</h1>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex gap-4 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-12 h-12"
              />
            </div>
            <Button type="submit" className="h-12 px-8">
              Tìm kiếm
            </Button>
          </form>
        </div>

        {/* Search Results */}
        {hasSearched && (
          <div>
            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                <p className="mt-4 text-gray-600">Đang tìm kiếm...</p>
              </div>
            ) : (
              <>
                {/* Results Header */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold">
                    {products.length > 0
                      ? `Tìm thấy ${products.length} sản phẩm cho "${initialQuery || query}"`
                      : `Không tìm thấy sản phẩm nào cho "${initialQuery || query}"`}
                  </h2>
                </div>

                {/* Products Grid */}
                {products.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold mb-2">Không tìm thấy sản phẩm</h3>
                    <p className="text-gray-600 mb-6">Hãy thử tìm kiếm với từ khóa khác hoặc kiểm tra chính tả</p>

                    {/* Search Suggestions */}
                    <div className="max-w-md mx-auto">
                      <h4 className="font-medium mb-3">Gợi ý tìm kiếm:</h4>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {["Ultraboost", "Stan Smith", "NMD", "Superstar", "Giày chạy bộ"].map((suggestion) => (
                          <Button
                            key={suggestion}
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setQuery(suggestion)
                              performSearch(suggestion)
                            }}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Initial State */}
        {!hasSearched && !initialQuery && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👟</div>
            <h2 className="text-2xl font-semibold mb-2">Tìm kiếm sản phẩm yêu thích</h2>
            <p className="text-gray-600 mb-6">Nhập từ khóa để tìm kiếm trong hàng nghìn sản phẩm adidas</p>

            {/* Popular Searches */}
            <div className="max-w-md mx-auto">
              <h3 className="font-medium mb-3">Tìm kiếm phổ biến:</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {["Ultraboost", "Stan Smith", "NMD", "Superstar", "Giày chạy bộ", "Áo thun"].map((popular) => (
                  <Button
                    key={popular}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setQuery(popular)
                      performSearch(popular)
                    }}
                  >
                    {popular}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  )
}
