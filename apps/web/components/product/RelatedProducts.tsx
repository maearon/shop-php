"use client"

import { useState, useEffect } from "react"
import ProductCard from "@/components/product/ProductCard"
import { ProductCardSkeleton } from "@/components/ui/skeletons"
import { getRelatedProducts } from "@/lib/api"

interface RelatedProductsProps {
  categorySlug: string
  currentProductId: string
}

export default function RelatedProducts({ categorySlug, currentProductId }: RelatedProductsProps) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getRelatedProducts(categorySlug, currentProductId)
        setProducts(data)
      } catch (error) {
        console.error("Failed to load related products:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [categorySlug, currentProductId])

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
