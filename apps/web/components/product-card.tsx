"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAppDispatch } from "@/store/hooks"
import { addToCart } from "@/store/cartSlice"
import WishButton from "./wish-button"
import type {
  LastVisitedProduct,
  PriceInfo,
  ProductAsset,
  ProductVariation
} from "@/types/product/product-adidas"
import { Breadcrumb } from "@/types/bread-crumb/bread-crumb"
import { mapProductToWishlistItem } from "@/lib/mappers/product-to-wishlist"
import { slugify } from "@/utils/slugtify"
import { Variant } from "@/types/product"

interface ProductCardProps {
  slug?: string // 👈 Thêm dòng này vào
  product: {
    id: number
    name: string
    price: string
    original_price?: string
    image?: string
    image_url?: string
    category?: string
    model_number?: string
    base_model_number?: string
    product_type?: string
    url?: string
    price_information?: PriceInfo[]
    pricing_information?: {
      currentPrice: number
      standard_price: number
      standard_price_no_vat: number
    }
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
    variants: Variant[]
  }
  showAddToBag?: boolean
  minimalMobile?: boolean
}

export default function ProductCard({
  product,
  showAddToBag = false,
  minimalMobile = false
}: ProductCardProps) {
  const dispatch = useAppDispatch()
  const image = product.image ?? product.image_url ?? "/placeholder.png"

  const handleAddToBag = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: image,
        color: "Default",
        size: "M"
      })
    )
  }

  const fallbackUrl = `/${slugify(product.name)}/${product?.variants?.[0]?.variant_code}.html`

  return (
    <Link href={product.url ?? fallbackUrl}>
      <Card className="flex flex-col justify-between border border-transparent hover:border-black transition-all shadow-none cursor-pointer rounded-none">
        <CardContent className="p-0 flex flex-col h-full">
          {/* Image Section */}
          <div className={`relative aspect-square overflow-hidden ${!minimalMobile ? "mb-4" : ""}`}>
            <Image
              src={image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            />
            <div
              className="absolute top-4 right-4"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
            >
              <WishButton item={mapProductToWishlistItem(product)} />
            </div>
          </div>

          {/* Info Section */}
          <div
            className={`space-y-2 px-2 pb-2 mt-auto ${
              minimalMobile ? "hidden sm:block" : ""
            }`}
          >
            {product.category && (
              <p className="text-sm text-gray-600">{product.category}</p>
            )}
            <p className="font-bold">
              ${product.pricing_information?.currentPrice ?? product.price}
            </p>
            <h3 className="font-medium h-[3rem] overflow-hidden">{product.name}</h3>
            {product.attribute_list?.brand && (
              <p className="text-sm text-gray-600 min-h-[1.25rem]">{product.attribute_list.brand}</p>
            )}
            {showAddToBag && (
              <Button
                className="w-full bg-black text-white hover:bg-gray-800"
                onClick={handleAddToBag}
              >
                ADD TO BAG
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
