"use client"

import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAppDispatch } from "@/store/hooks"
import { addToCart } from "@/store/cartSlice"
import WishButton from "./wish-button"
import type { LastVisitedProduct } from "@/types/product/product-adidas"
import { mapProductToWishItem } from "@/lib/mappers/product-to-wishlist"

interface ProductCardProps {
  product: LastVisitedProduct
  showAddToBag?: boolean
}

export default function ProductCard({ product, showAddToBag = false }: ProductCardProps) {
  const dispatch = useAppDispatch()
  const p = product.product // 🟡 shortcut cho dễ đọc

  const handleAddToBag = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(
      addToCart({
        id: Number(p.id),
        name: p.name,
        price: String(p.pricing_information.currentPrice),
        image: p.image_url,
        color: "Default",
        size: "M",
      }),
    )
  }

  return (
    <Link href={product.url}>
      <Card className="border-none shadow-none cursor-pointer hover:shadow-lg transition-shadow">
        <CardContent className="p-0">
          <div className="relative mb-4">
            <img
              src={p.image_url || "/placeholder.png?height=600&width=600"}
              alt={p.name}
              className="w-full h-64 object-cover"
            />
            {/* <div className="absolute top-4 right-4" onClick={(e) => e.preventDefault()}>
              <WishButton item={mapProductToWishItem(p)} />
            </div> */}
            <div className="absolute top-4 right-4" onClick={(e) => e.preventDefault()}>
              <WishButton item={mapProductToWishItem(p)} />
            </div>
          </div>
          <div className="space-y-2">
            <p className="font-bold">${p.pricing_information.currentPrice}</p>
            <h3 className="font-medium">{p.name}</h3>
            {p.attribute_list?.brand && <p className="text-sm text-gray-600">{p.attribute_list.brand}</p>}
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
