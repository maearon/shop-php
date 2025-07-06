"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, SlidersHorizontal } from "lucide-react"

import { BaseButton } from "@/components/ui/base-button"
import { Badge } from "@/components/ui/badge"
import ProductGrid from "@/components/product-grid"
import FiltersSidebar from "@/components/filters-sidebar"
import { getCategoryConfig } from "@/utils/category-config"
import { useProducts } from "@/hooks/useProducts"
import type { ProductQuery } from "@/api/services/rubyService"

interface CategoryPageClientProps {
  params: { slug: string }
  searchParams?: Partial<ProductQuery>
}

export default function CategoryPageClient({ params, searchParams = {} }: CategoryPageClientProps) {
  const router = useRouter()
  const urlSearchParams = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)

  const config = getCategoryConfig(params.slug)
  const currentTab = searchParams.category || config.tabs[0]?.slug || params.slug

  const allowedKeys: (keyof ProductQuery)[] = [
    "page", "sort", "gender", "category", "activity", "sport",
    "product_type", "size", "color", "material", "brand", "model",
    "collection", "min_price", "max_price", "shipping"
  ]

  const toNumber = (val: unknown): number | undefined => {
    const n = Number(val)
    return isNaN(n) ? undefined : n
  }

  const queryParams: ProductQuery = {
    slug: params.slug,
  }

  for (const [key, value] of Object.entries(searchParams)) {
    if (!value || !allowedKeys.includes(key as keyof ProductQuery)) continue

    if (key === "min_price" || key === "max_price" || key === "page") {
      (queryParams as any)[key] = toNumber(value)
    } else {
      (queryParams as any)[key] = value
    }
  }

  const { data, loading } = useProducts(queryParams)

  const products = data?.products || []
  const meta = data?.meta || {
    current_page: 1,
    total_pages: 1,
    total_count: 0,
    per_page: 24,
    filters_applied: {},
  }

  const handleTabChange = (tabSlug: string) => router.push(`/${tabSlug}`)

  const handleFilterChange = (filters: Record<string, any>) => {
    const queryParams = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value && !(Array.isArray(value) && value.length === 0)) {
        queryParams.set(key, Array.isArray(value) ? value.join(",") : value.toString())
      }
    })
    router.push(`/${params.slug}?${queryParams.toString()}`)
    setShowFilters(false)
  }

  const handlePageChange = (page: number) => {
    const queryParams = new URLSearchParams(urlSearchParams.toString())
    queryParams.set("page", page.toString())
    router.push(`/${params.slug}?${queryParams.toString()}`)
  }

  const removeFilter = (key: string, valueToRemove?: string) => {
    const params = new URLSearchParams(urlSearchParams.toString())

    if (valueToRemove && params.get(key)?.includes(",")) {
      const values = (params.get(key)?.split(",") || []).filter((v) => v !== valueToRemove)
      values.length ? params.set(key, values.join(",")) : params.delete(key)
    } else {
      params.delete(key)
    }

    router.push(`/${params.get("slug") || queryParams.slug}?${params.toString()}`)
  }

  const clearAllFilters = () => router.push(`/${params.slug}`)

  const generateAppliedFiltersTitle = () => {
    const parts: string[] = []

    if (searchParams.gender) parts.push(searchParams.gender.split(",").map(g => g.toUpperCase()).join(" + "))
    if (searchParams.sport || searchParams.activity) parts.push((searchParams.sport || searchParams.activity)!.toUpperCase())
    if (searchParams.product_type || searchParams.category) parts.push((searchParams.product_type || searchParams.category)!.toUpperCase())
    if (searchParams.material) parts.push(searchParams.material.toUpperCase())
    if (searchParams.collection) parts.push(searchParams.collection.toUpperCase())

    return parts.length ? parts.join(" · ") : config.title
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: config.breadcrumb, href: `/${params.slug}` },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
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

          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {generateAppliedFiltersTitle()}
                <span className="text-gray-500 ml-2 text-lg font-normal">({meta.total_count})</span>
              </h1>
              {Object.keys(searchParams).length === 0 && (
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

      {/* Applied Filters */}
      {Object.keys(searchParams).length > 0 && (
        <div className="border-b bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium">Applied Filters:</span>
              {Object.entries(searchParams).map(([key, value]) => {
                if (key === "page") return null
                if (typeof value === "string" && value.includes(",")) {
                  return value.split(",").map((val) => (
                    <Badge key={`${key}-${val}`} variant="secondary" className="flex items-center gap-1">
                      {val}
                      <button onClick={() => removeFilter(key, val)} className="ml-1 hover:bg-gray-300 rounded-full w-4 h-4 flex items-center justify-center text-xs">×</button>
                    </Badge>
                  ))
                }
                return (
                  <Badge key={key} variant="secondary" className="flex items-center gap-1">
                    {value}
                    <button onClick={() => removeFilter(key)} className="ml-1 hover:bg-gray-300 rounded-full w-4 h-4 flex items-center justify-center text-xs">×</button>
                  </Badge>
                )
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

      {/* Sidebar */}
      <FiltersSidebar
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        onApplyFilters={handleFilterChange}
        slug={params.slug}
        currentFilters={searchParams}
      />
    </div>
  )
}
