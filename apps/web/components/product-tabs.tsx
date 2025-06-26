"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import ProductCarousel from "@/components/product-carousel"
import { useProducts } from "@/hooks/useProducts"
import { Product } from "@/types/product"

type ProductTabsProps = {
  initialProductsByTab?: {
    [key: string]: Product[]
  }
}

const tabs = [
  { id: "new-arrivals", label: "New Arrivals", endpoint: "new-arrivals" },
  { id: "best-sellers", label: "Best Sellers", endpoint: "best-sellers" },
  { id: "new-to-sale", label: "New to Sale", endpoint: "sale" },
]

export default function ProductTabs({ initialProductsByTab }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("new-arrivals")

  const { data, loading, error } = useProducts({
    category: activeTab,
    limit: 4,
  })

  const products =
    !data?.products || error
      ? initialProductsByTab?.[activeTab] ?? []
      : data.products

  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label

  return (
    <section className="container mx-auto px-4 py-12">
      {/* Tabs Navigation */}
      <div className="flex flex-wrap justify-between items-start gap-4 mb-8 sm:flex-nowrap sm:items-center">
        {/* Tabs */}
        <div className="flex flex-wrap gap-1">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-none ${
                activeTab === tab.id
                  ? "bg-black text-white"
                  : "bg-transparent text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* VIEW ALL */}
        <Button
          variant="link"
          className="text-sm font-bold underline whitespace-nowrap px-0"
          onClick={() => {
            const activeTabData = tabs.find((tab) => tab.id === activeTab)
            window.location.href = `/${activeTabData?.endpoint}`
          }}
        >
          VIEW ALL
        </Button>
      </div>

      {/* Products Carousel */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-64 mb-4"></div>
              <div className="bg-gray-200 h-4 mb-2"></div>
              <div className="bg-gray-200 h-4 w-1/2"></div>
            </div>
          ))}
        </div>
      ) : products.length > 0 ? (
        <ProductCarousel products={products} carouselModeInMobile={false} />
      ) : error ? (
        <div className="text-center py-8 text-gray-500">
          Failed to load products. Please try again.
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No products available.
        </div>
      )}
    </section>
  )
}
