// ProductDetailPageClient.tsx
"use client"

import { Product } from "@/types/product"

type Props = {
  product: Product
}

export default function ProductDetailPageClient({ product }: Props) {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <img src={product.image_url} alt={product.name} className="w-full max-w-md mb-4" />
      <p className="text-gray-600">{product.price}</p>
      <p className="mt-2 text-sm">Model: {product.model_number}</p>
    </div>
  )
}
