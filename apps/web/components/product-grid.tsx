"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import WishButton from "./wish-button"

type Product = {
  id: number
  name: string
  price: string
  image: string
  colors?: number
  isNew?: boolean
  isSale?: boolean
  category?: string
}

type ProductGridProps = {
  products: Product[]
  columns?: number
}

export default function ProductGrid({ products, columns = 3 }: ProductGridProps) {
  const gridCols = {
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
  }

  return (
    <div className={`grid ${gridCols[columns as keyof typeof gridCols]} gap-6`}>
      {products.map((product) => (
        <Link key={product.id} href={`/product/${product.id}`}>
          <div className="group cursor-pointer">
            <div className="relative mb-3">
              <img
                src={product.image || "/placeholder.png"}
                alt={product.name}
                className="w-full h-64 object-cover group-hover:opacity-90 transition-opacity"
              />
              <div className="absolute top-3 right-3" onClick={(e) => e.preventDefault()}>
                <WishButton item={product} />
              </div>
              {product.isNew && <Badge className="absolute top-3 left-3 bg-black text-white">NEW</Badge>}
              {product.isSale && <Badge className="absolute top-3 left-3 bg-red-600 text-white">SALE</Badge>}
            </div>
            <div className="space-y-1">
              <h3 className="font-medium text-sm leading-tight group-hover:underline">{product.name}</h3>
              <p className="font-bold">{product.price}</p>
              {product.colors && <p className="text-xs text-gray-600">{product.colors} colors</p>}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
