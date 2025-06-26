"use client"

import ProductCard from "@/components/product-card"
import { Product } from "@/types/product"

type ProductGridProps = {
  products: Product[]
  columns?: number
  showAddToBag?: boolean
}

export default function ProductGrid({ products = [], columns = 3, showAddToBag = false }: ProductGridProps) {
  const gridCols = {
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5",
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">No products found</h3>
        <p className="text-gray-600">Try adjusting your filters or search terms.</p>
      </div>
    )
  }

  return (
    <div className={`grid ${gridCols[columns as keyof typeof gridCols] ?? gridCols[3]} gap-6`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} showAddToBag={showAddToBag} />
      ))}
    </div>
  )
}
