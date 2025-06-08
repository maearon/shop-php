"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAppDispatch } from "@/store/hooks"
import { addToCart } from "@/store/cartSlice"
import WishButton from "./wish-button"

interface ProductCardProps {
  product: {
    id: number
    name: string
    price: string
    image: string
    category?: string
  }
  showAddToBag?: boolean
}

export default function ProductCard({ product, showAddToBag = false }: ProductCardProps) {
  const dispatch = useAppDispatch()

  const handleAddToBag = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        color: "Default",
        size: "M",
      }),
    )
  }

  return (
    <Link href={`/product/${product.id}`}>
      <Card className="border-none shadow-none cursor-pointer hover:shadow-lg transition-shadow">
        <CardContent className="p-0">
          <div className="relative mb-4">
            <img src={product.image || "/placeholder.png"} alt={product.name} className="w-full h-64 object-cover" />
            <div className="absolute top-4 right-4" onClick={(e) => e.preventDefault()}>
              <WishButton item={product} />
            </div>
          </div>
          <div className="space-y-2">
            {product.category && <p className="text-sm text-gray-600">{product.category}</p>}
            <h3 className="font-medium">{product.name}</h3>
            <p className="font-bold">{product.price}</p>
            {showAddToBag && (
              <Button className="w-full bg-black text-white hover:bg-gray-800" onClick={handleAddToBag}>
                ADD TO BAG
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
