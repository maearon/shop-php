"use client"

import { useState, useEffect } from "react"
import { notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductGrid from "@/components/product-grid"
import FiltersSidebar from "@/components/filters-sidebar"
import { Button } from "@/components/ui/button"
import { ChevronDown, SlidersHorizontal, Loader2 } from "lucide-react"
import { categoryConfig } from "@/utils/category-config"
import api from "@/api/client"
import productApi, { ProductsResponse, type Product as OriginalProduct } from "@/api/endpoints/productApi"

type Product = OriginalProduct & {
  price: number | string
}

type CategoryPageProps = {
  params: {
    slug: string
  }
}

export default function CategoryPageClient({ params }: CategoryPageProps) {
  const { slug } = params
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState("newest")
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [meta, setMeta] = useState<ProductsResponse["meta"] | null>(null)
  const [loadingMore, setLoadingMore] = useState(false)

  // Check if slug exists in config
  const config = categoryConfig[slug as keyof typeof categoryConfig]

  if (!config && !loading) {
    notFound()
  }

  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "popular", label: "Most Popular" },
    { value: "rating", label: "Highest Rated" },
  ]

  // Fetch products from API
  const fetchProducts = async (page = 1, append = false) => {
    try {
      if (!append) setLoading(true)
      else setLoadingMore(true)

      const filters = {
        slug,
        page,
        per_page: 20,
        sort: sortBy,
      }

      const response = await productApi.index(filters)

      if (append) {
        setProducts((prev) => [
          ...prev,
          ...((response.products ?? []).map((p) => ({
            ...p,
            price: (p as any).price ?? "",
          })) as Product[]),
        ])
      } else {
        setProducts(
          (response.products ?? []).map((p) => ({
            ...p,
            price: (p as any).price ?? "",
          })) as Product[]
        )
      }

      setMeta(response.meta)
      setError(null)
    } catch (err) {
      console.error("Failed to fetch products:", err)
      setError("Failed to load products. Please try again.")
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  // Initial load
  useEffect(() => {
    if (slug) {
      fetchProducts()
    }
  }, [slug, sortBy])

  // Handle load more
  const handleLoadMore = () => {
    if (meta && meta.current_page < meta.total_pages) {
      fetchProducts(meta.current_page + 1, true)
    }
  }

  // Handle sort change
  const handleSortChange = (newSort: string) => {
    setSortBy(newSort)
    // fetchProducts will be called by useEffect
  }

  // Loading state
  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        {/* <Header /> */}
        <main className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Loading products...</span>
          </div>
        </main>
        {/* <Footer /> */}
      </div>
    )
  }

  // Error state
  if (error && products.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        {/* <Header /> */}
        <main className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={() => fetchProducts()}>Try Again</Button>
          </div>
        </main>
        {/* <Footer /> */}
      </div>
    )
  }

  // Use API data or fallback to config
  const categoryInfo = meta?.category_info || {
    title: config?.title || slug.toUpperCase().replace("-", " "),
    breadcrumb: config?.breadcrumb || slug.replace("-", " / "),
    description: config?.description || `Discover our collection of ${slug.replace("-", " ")}.`,
  }

  const totalProducts = meta?.total_count || config?.totalProducts || 0

  return (
    <div className="min-h-screen bg-white">
      {/* <Header /> */}

      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-4">
          <span>{categoryInfo.breadcrumb}</span>
        </nav>

        {/* Page Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">{categoryInfo.title}</h1>
            <p className="text-gray-600 max-w-2xl">{categoryInfo.description}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">{totalProducts} items</p>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <div className="flex space-x-4">
            <Button variant="outline" className="flex items-center space-x-2" onClick={() => setIsFilterOpen(true)}>
              <SlidersHorizontal size={16} />
              <span>Filter & Sort</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <span>Size</span>
              <ChevronDown size={16} />
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <span>Color</span>
              <ChevronDown size={16} />
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <span>Price</span>
              <ChevronDown size={16} />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Product Grid - Full Width */}
        <div className="mb-8">
          {products.length > 0 ? (
            <>
              <ProductGrid
                products={products.map((p) => ({
                  ...p,
                  price: typeof p.price === "number" ? `$${p.price}` : p.price,
                }))}
                columns={4}
              />

              {/* Load More Button */}
              {meta && meta.current_page < meta.total_pages && (
                <div className="text-center mt-8">
                  <Button variant="outline" className="px-8" onClick={handleLoadMore} disabled={loadingMore}>
                    {loadingMore ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Loading...
                      </>
                    ) : (
                      "Load More Products"
                    )}
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No products found for this category.</p>
            </div>
          )}
        </div>

        {/* Recently Viewed - Keep existing mock for now */}
        <section className="mt-16">
          <h2 className="text-xl font-bold mb-6">RECENTLY VIEWED ITEMS</h2>
          <div className="grid grid-cols-4 gap-6">
            {generateMockProducts("mixed", "recent", 4).map((product) => (
              <div key={product.id} className="space-y-2">
                <img
                  src={product.image || "/placeholder.png?height=300&width=250"}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <h3 className="font-medium text-sm">{product.name}</h3>
                <p className="font-bold">{product.price}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Category Information */}
        <section className="mt-16 grid grid-cols-2 gap-12">
          <div>
            <h2 className="text-xl font-bold mb-4">OUR CLOTHING AND SHOE CATEGORIES</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <h3 className="font-bold mb-2">MEN'S SHOES</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>
                    <a href="/men-running-shoes" className="hover:underline">
                      Running Shoes
                    </a>
                  </li>
                  <li>
                    <a href="/men-soccer-shoes" className="hover:underline">
                      Soccer Shoes
                    </a>
                  </li>
                  <li>
                    <a href="/men-basketball-shoes" className="hover:underline">
                      Basketball Shoes
                    </a>
                  </li>
                  <li>
                    <a href="/men-lifestyle-shoes" className="hover:underline">
                      Lifestyle Shoes
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2">MEN'S CLOTHING</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>
                    <a href="/men-tops" className="hover:underline">
                      T-Shirts
                    </a>
                  </li>
                  <li>
                    <a href="/men-hoodies" className="hover:underline">
                      Hoodies
                    </a>
                  </li>
                  <li>
                    <a href="/men-pants" className="hover:underline">
                      Pants
                    </a>
                  </li>
                  <li>
                    <a href="/men-shorts" className="hover:underline">
                      Shorts
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">{categoryInfo.title} GUIDE</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {slug.includes("shoes")
                ? "Find the perfect fit with our comprehensive size guide. Our shoes are designed with the latest technology to provide comfort, performance, and style for every activity."
                : "Discover the perfect style and fit with our clothing collection. Made with premium materials and innovative designs for maximum comfort and performance."}
            </p>
          </div>
        </section>
      </main>

      {/* Filters Sidebar */}
      <FiltersSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        category={config}
        onFiltersChange={(filters) => {
          // Handle filter changes
          console.log("Filters changed:", filters)
          // You can implement filter logic here
        }}
      />

      {/* <Footer /> */}
    </div>
  )
}

// Keep existing mock function for recently viewed items
function generateMockProducts(type: string, subcategory: string, count: number) {
  const products = []

  for (let i = 1; i <= count; i++) {
    let name = ""
    let price = ""

    if (type === "mixed" && subcategory === "recent") {
      const recentItems = [
        "Ultraboost 22 Running Shoes",
        "Essentials 3-Stripes Hoodie",
        "Stan Smith Shoes",
        "Adicolor Classics Firebird Track Jacket",
      ]
      name = recentItems[i - 1] || `Product ${i}`
      price = `$${Math.floor(Math.random() * 150) + 50}`
    } else {
      name = `Product ${i}`
      price = `$${Math.floor(Math.random() * 150) + 50}`
    }

    products.push({
      id: i + 1000, // Different ID range to avoid conflicts
      name: name,
      price: price,
      image: "/placeholder.png?height=300&width=250",
      colors: Math.floor(Math.random() * 5) + 1,
      isNew: Math.random() > 0.8,
      isSale: Math.random() > 0.9,
    })
  }

  return products
}
