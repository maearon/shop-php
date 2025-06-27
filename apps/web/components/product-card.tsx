"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAppDispatch } from "@/store/hooks"
import { addToCart } from "@/store/cartSlice"
import WishButton from "./wish-button"
import type { LastVisitedProduct, PriceInfo, ProductAsset, ProductVariation } from "@/types/product/product-adidas"
import { mapProductToWishItem } from "@/lib/mappers/product-to-wishlist"
import { Breadcrumb } from "@/types/bread-crumb/bread-crumb"

interface ProductCardProps {
  product: {
    id: number
    name: string
    price: string
    image: string
    category?: string
    model_number?: string
    base_model_number?: string
    product_type?: string
    price_information?: PriceInfo[]
    pricing_information?: {
      currentPrice: number
      standard_price: number
      standard_price_no_vat: number
    }
    image_url?: string
    description?: string
    attribute_list?: {
      brand?: string
      color?: string
      gender?: string
      sale?: boolean
    }
    breadcrumb_list?: Breadcrumb[]
    product_description?: {
      title?: string
      text?: string
      subtitle?: string
    }
    links?: {
      self: {
        href: string
      }
    }
    variation_list?: ProductVariation[]
    view_list?: ProductAsset[]
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
      })
    )
  }

  return (
    <Link href={`/product/${product.id}`}>
      <Card className="flex flex-col justify-between border border-transparent hover:border-black transition-all shadow-none cursor-pointer rounded-none">
        <CardContent className="p-0 flex flex-col h-full">
          <div className="relative aspect-square overflow-hidden mb-4">
            <Image
              src={product.image || "/placeholder.png"}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            />
            <div className="absolute top-4 right-4" onClick={(e) => e.preventDefault()}>
              <WishButton item={product} />
            </div>
          </div>

          <div className="space-y-2 px-2 pb-2 mt-auto">
            {product.category && <p className="text-sm text-gray-600">{product.category}</p>}
            <p className="font-bold">${product.pricing_information?.currentPrice ?? product.price}</p>
            <h3 className="font-medium">{product.name}</h3>
            {product.attribute_list?.brand && (
              <p className="text-sm text-gray-600">{product.attribute_list.brand}</p>
            )}
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
