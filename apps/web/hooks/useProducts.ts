"use client"

import javaService from "@/api/services/javaService"
import { useState, useEffect } from "react"
import { Nullable } from "@/types/common"
import { ProductFilters, ProductsResponse } from "@/types/product"

export function useProducts(initialFilters: ProductFilters = {}) {
  const [data, setData] = useState<ProductsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Nullable<string>>(null)
  const [filters, setFilters] = useState<ProductFilters>(initialFilters)

  const fetchProducts = async (newFilters: ProductFilters = {}) => {
    try {
      setLoading(true)
      setError(null)

      const mergedFilters = { ...filters, ...newFilters }
      const response = await javaService.test()

      setData(response)
      setFilters(mergedFilters)
    } catch (err) {
      console.error("Failed to fetch products:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch products")

      // Fallback to mock data if API fails
      const mergedFilters = { ...filters, ...newFilters }
      setData({
        products: generateFallbackProducts(filters.slug || "", 20),
        meta: {
          current_page: 1,
          total_pages: 3,
          total_count: 60,
          per_page: 20,
          filters_applied: mergedFilters,
          category_info: getFallbackCategoryInfo(filters.slug || ""),
        },
      })
    } finally {
      setLoading(false)
    }
  }

  const updateFilters = (newFilters: Partial<ProductFilters>) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    fetchProducts(updatedFilters)
  }

  const loadMore = () => {
    if (data && data.meta.current_page < data.meta.total_pages) {
      fetchProducts({ ...filters, page: data.meta.current_page + 1 })
    }
  }

  useEffect(() => {
    fetchProducts(initialFilters)
  }, []) // Only run on mount

  return {
    data,
    loading,
    error,
    filters,
    updateFilters,
    loadMore,
    refetch: () => fetchProducts(filters),
  }
}

// Fallback functions for when API fails
function generateFallbackProducts(slug: string, count: number) {
  const products = []

  for (let i = 1; i <= count; i++) {
    let name = ""
    let price = 0

    if (slug.includes("soccer") && slug.includes("shoes")) {
      const soccerShoes = [
        "Predator Elite Firm Ground Cleats",
        "X Crazyfast Elite Firm Ground Cleats",
        "Copa Pure Elite Firm Ground Cleats",
        "Nemeziz Messi Elite Firm Ground Cleats",
        "F50 Elite Firm Ground Cleats",
      ]
      name = soccerShoes[i % soccerShoes.length]
      price = Math.floor(Math.random() * 200) + 100
    } else if (slug.includes("tops")) {
      const tops = [
        "Essentials 3-Stripes T-Shirt",
        "Adicolor Classics Trefoil Tee",
        "Training Tech T-Shirt",
        "Run It 3-Stripes Tee",
        "Badge of Sport Tee",
      ]
      name = tops[i % tops.length]
      price = Math.floor(Math.random() * 80) + 20
    } else {
      name = `Product ${i}`
      price = Math.floor(Math.random() * 150) + 50
    }

    products.push({
      id: i,
      name,
      price,
      brand: "adidas",
      category: slug.includes("shoes") ? "Shoes" : "Apparel",
      gender: slug.includes("men") ? "Men" : slug.includes("women") ? "Women" : "Kids",
      sport: slug.includes("soccer") ? "Soccer" : slug.includes("running") ? "Running" : "Lifestyle",
      jan_code: `JAN${i.toString().padStart(6, "0")}`,
      description: `High-quality ${name.toLowerCase()} for your active lifestyle.`,
      image_url: "/placeholder.svg?height=400&width=400",
      variants: [
        {
          id: i * 10,
          color: ["Black", "White", "Blue", "Red"][i % 4],
          size: ["M"],
          images: ["/placeholder.svg?height=400&width=400"],
          product_id: i,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          sizes: [
            { id: i * 100, label: "S", system: "US", available: true },
            { id: i * 100 + 1, label: "M", system: "US", available: true },
            { id: i * 100 + 2, label: "L", system: "US", available: Math.random() > 0.3 },
          ],
        },
      ],
      slug: `${slug}-${i}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
  }

  return products
}

function getFallbackCategoryInfo(slug: string) {
  const categoryMap: Record<string, any> = {
    "men-soccer-shoes": {
      title: "MEN'S SOCCER SHOES",
      breadcrumb: "Men / Soccer / Shoes",
      description:
        "Find your perfect pair of men's soccer shoes. From firm ground to artificial turf, we have the right cleats for every playing surface.",
    },
    "men-tops": {
      title: "MEN'S TOPS",
      breadcrumb: "Men / Clothing / Tops",
      description:
        "Discover our collection of men's tops. From t-shirts to tank tops, find the perfect fit for your active lifestyle.",
    },
  }

  return (
    categoryMap[slug] || {
      title: slug.toUpperCase().replace(/-/g, " "),
      breadcrumb: slug
        .split("-")
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(" / "),
      description: `Discover our collection of ${slug.replace(/-/g, " ")}.`,
    }
  )
}
