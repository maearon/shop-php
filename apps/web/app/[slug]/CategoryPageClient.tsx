"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, SlidersHorizontal } from "lucide-react"
import { BaseButton } from "@/components/ui/base-button"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ProductGrid from "@/components/product-grid"
import FiltersSidebar from "@/components/filters-sidebar"
import { getCategoryConfig } from "@/utils/category-config"

interface Product {
  id: string
  name: string
  price: number
  original_price?: number
  brand: string
  category: string
  gender: string
  sport: string
  jan_code: string
  model_number: string
  description: string
  badge?: string
  image_url: string
  variants: any[]
  slug: string
  reviews_count: number
  average_rating: number
  url?: string
}

interface CategoryPageClientProps {
  params: {
    slug: string
  }
  searchParams?: {
    page?: string
    sort?: string
    gender?: string
    category?: string
    activity?: string
    product_type?: string
    size?: string
    color?: string
    material?: string
    brand?: string
    model?: string
    collection?: string
    min_price?: string
    max_price?: string
    shipping?: string
  }
}

export default function CategoryPageClient({ params, searchParams }: CategoryPageClientProps) {
  const router = useRouter()
  const urlSearchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [meta, setMeta] = useState({
    current_page: 1,
    total_pages: 1,
    total_count: 0,
    per_page: 24,
    filters_applied: {},
  })

  const config = getCategoryConfig(params.slug)

  // Get current tab from URL or default to first tab
  const currentTab = searchParams?.category || config.tabs[0]?.slug || params.slug

  useEffect(() => {
    fetchProducts()
  }, [params.slug, searchParams])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const queryParams = new URLSearchParams()
      queryParams.set("slug", params.slug)

      // Add search params to query
      if (searchParams) {
        Object.entries(searchParams).forEach(([key, value]) => {
          if (value) queryParams.set(key, value)
        })
      }

      const response = await fetch(`/api/products?${queryParams.toString()}`)
      const data = await response.json()

      setProducts(data.products || [])
      setMeta(data.meta || {})
    } catch (error) {
      console.error("Error fetching products:", error)
      // Mock data for development
      setProducts([
        {
          id: "1",
          name: "F50 Elite Firm Ground Cleats",
          price: 270,
          brand: "adidas",
          category: "soccer",
          gender: "men",
          sport: "soccer",
          jan_code: "JP5593",
          model_number: "F50123",
          description: "Lightweight soccer cleats for speed",
          badge: "Best Seller",
          image_url: "/placeholder.svg?height=300&width=250",
          variants: [],
          slug: "f50-elite-firm-ground-cleats",
          reviews_count: 45,
          average_rating: 4.5,
          url: "/f50-messi-elite-firm-ground-cleats/JP5593.html"
        },
        {
          id: "2",
          name: "Predator Elite Firm Ground Cleats",
          price: 280,
          brand: "adidas",
          category: "soccer",
          gender: "men",
          sport: "soccer",
          jan_code: "JP5594",
          model_number: "PRD456",
          description: "Control-focused soccer cleats",
          badge: "New",
          image_url: "/placeholder.svg?height=300&width=250",
          variants: [],
          slug: "predator-elite-firm-ground-cleats",
          reviews_count: 32,
          average_rating: 4.7,
          url: "/f50-messi-elite-firm-ground-cleats/JP5593.html"
        },
      ])
      setMeta({ current_page: 1, total_pages: 1, total_count: 2, per_page: 24, filters_applied: {} })
    } finally {
      setLoading(false)
    }
  }

  const handleTabChange = (tabSlug: string) => {
    router.push(`/${tabSlug}`)
  }

  const handleFilterChange = (filters: any) => {
    const queryParams = new URLSearchParams()

    // Add filters to query params
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "" && !(Array.isArray(value) && value.length === 0)) {
        if (Array.isArray(value)) {
          queryParams.set(key, value.join(","))
        } else {
          queryParams.set(key, value.toString())
        }
      }
    })

    // Navigate with new filters
    const newUrl = `/${params.slug}?${queryParams.toString()}`
    router.push(newUrl)
    setShowFilters(false)
  }

  const handlePageChange = (page: number) => {
    const queryParams = new URLSearchParams(urlSearchParams.toString())
    queryParams.set("page", page.toString())
    router.push(`/${params.slug}?${queryParams.toString()}`)
  }

  const removeFilter = (filterKey: string, filterValue?: string) => {
    const params = new URLSearchParams(urlSearchParams.toString())

    if (filterValue && params.get(filterKey)?.includes(",")) {
      // Remove specific value from array
      const values = params.get(filterKey)?.split(",") || []
      const newValues = values.filter((v) => v !== filterValue)
      if (newValues.length > 0) {
        params.set(filterKey, newValues.join(","))
      } else {
        params.delete(filterKey)
      }
    } else {
      params.delete(filterKey)
    }

    router.push(`/${params.slug}?${params.toString()}`)
  }

  const clearAllFilters = () => {
    router.push(`/${params.slug}`)
  }

  // Generate applied filters title
  const generateAppliedFiltersTitle = () => {
    const filterParts: string[] = []

    if (searchParams?.gender) {
      const genders = searchParams.gender.split(",").map((g) => g.toUpperCase())
      filterParts.push(genders.join(" + "))
    }

    if (searchParams?.sport || searchParams?.activity) {
      const sport = searchParams.sport || searchParams.activity
      filterParts.push(sport.toUpperCase())
    }

    if (searchParams?.product_type || searchParams?.category) {
      const type = searchParams.product_type || searchParams.category
      filterParts.push(type.toUpperCase())
    }

    if (searchParams?.material) {
      filterParts.push(searchParams.material.toUpperCase())
    }

    if (searchParams?.collection) {
      filterParts.push(searchParams.collection.toUpperCase())
    }

    return filterParts.length > 0 ? filterParts.join(" · ") : config.title
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Men", href: "/men" },
    { label: config.breadcrumb, href: `/${params.slug}` },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <BaseButton variant="ghost" size="sm" onClick={() => router.back()} className="p-0 h-auto font-normal">
              <ArrowLeft className="w-4 h-4 mr-1" />
              BACK
            </BaseButton>
            {breadcrumbs.map((crumb, index) => (
              <span key={index} className="flex items-center">
                {index > 0 && <span className="mx-2">/</span>}
                <button onClick={() => router.push(crumb.href)} className="hover:underline">
                  {crumb.label}
                </button>
              </span>
            ))}
          </div>

          {/* Title with Applied Filters */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {generateAppliedFiltersTitle()}
                <span className="text-gray-500 ml-2 text-lg font-normal">({meta.total_count})</span>
              </h1>
              {/* Description only shown when no filters applied */}
              {Object.keys(searchParams || {}).length === 0 && (
                <p className="text-gray-600 max-w-4xl">{config.description}</p>
              )}
            </div>

            <BaseButton variant="outline" onClick={() => setShowFilters(true)} className="flex items-center gap-2 ml-4">
              FILTER & SORT
              <SlidersHorizontal className="w-4 h-4" />
            </BaseButton>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-8 overflow-x-auto">
            {config.tabs.map((tab) => (
              <button
                key={tab.slug}
                onClick={() => handleTabChange(tab.slug)}
                className={`whitespace-nowrap pb-2 border-b-2 transition-colors ${
                  currentTab === tab.slug || params.slug === tab.slug
                    ? "border-black text-black font-medium"
                    : "border-transparent text-gray-600 hover:text-black"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Applied Filters Pills */}
      {Object.keys(searchParams || {}).length > 0 && (
        <div className="border-b bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium">Applied Filters:</span>
              {Object.entries(searchParams || {}).map(([key, value]) => {
                if (key === "page") return null

                if (typeof value === "string" && value.includes(",")) {
                  return value.split(",").map((val) => (
                    <Badge key={`${key}-${val}`} variant="secondary" className="flex items-center gap-1">
                      {val}
                      <button
                        onClick={() => removeFilter(key, val)}
                        className="ml-1 hover:bg-gray-300 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                      >
                        ×
                      </button>
                    </Badge>
                  ))
                } else {
                  return (
                    <Badge key={key} variant="secondary" className="flex items-center gap-1">
                      {value}
                      <button
                        onClick={() => removeFilter(key)}
                        className="ml-1 hover:bg-gray-300 rounded-full w-4 h-4 flex items-center justify-center text-xs"
                      >
                        ×
                      </button>
                    </Badge>
                  )
                }
              })}
              <button onClick={clearAllFilters} className="text-sm text-gray-500 hover:text-black underline ml-2">
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ProductGrid
          products={products}
          loading={loading}
          pagination={meta}
          onPageChange={handlePageChange}
          slug={params.slug}
        />
      </div>

      {/* Filters Sidebar */}
      <FiltersSidebar
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        onApplyFilters={handleFilterChange}
        slug={params.slug}
        currentFilters={searchParams || {}}
      />
    </div>
  )
}
