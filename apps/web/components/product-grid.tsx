"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import WishButton from "./wish-button"
import { Product } from "@/api/endpoints/productApi"

type ProductGridProps = {
  products: Product[]
  columns?: number
}

export default function ProductGrid({ products = [], columns = 3 }: ProductGridProps) {
  const gridCols = {
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
  }

  // Early return if no products
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">No products found</h3>
        <p className="text-gray-600">Try adjusting your filters or search terms.</p>
      </div>
    )
  }

  return (
    <div className={`grid ${gridCols[columns as keyof typeof gridCols]} gap-6`}>
      {products.map((product) => (
        <Link key={product.id} href={`/product/${product.id}`}>
          <div className="group cursor-pointer">
            <div className="relative mb-3">
              <img
                src={product.image_url || "/placeholder.svg?height=400&width=400"}
                alt={product.name}
                className="w-full h-64 object-cover group-hover:opacity-90 transition-opacity"
              />
              <div className="absolute top-3 right-3" onClick={(e) => e.preventDefault()}>
                <WishButton
                  item={{
                    id: product.id,
                    name: product.name ?? "",
                    price: `$${product.variants[0]?.price ?? ""}`,
                    image: product.image_url,
                  }}
                />
              </div>
              {/* Show badges based on product data */}
              {product.jan_code?.includes("NEW") && (
                <Badge className="absolute top-3 left-3 bg-black text-white">NEW</Badge>
              )}
              {product.variants[0]?.price && product.variants[0].price < 50 && (
                <Badge className="absolute top-3 left-3 bg-red-600 text-white">SALE</Badge>
              )}
            </div>
            <div className="space-y-1">
              <h3 className="font-medium text-sm leading-tight group-hover:underline">{product.name}</h3>
              <p className="font-bold">${product.variants[0]?.price ?? ""}</p>
              {product.variants && product.variants.length > 0 && (
                <p className="text-xs text-gray-600">
                  {product.variants.length} color{product.variants.length > 1 ? "s" : ""}
                </p>
              )}
              {product.category && <p className="text-xs text-gray-500">{product.category}</p>}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
