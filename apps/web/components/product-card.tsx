"use client"

import type React from "react"
import Link from "next/link"
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
    model_number?: string;
    base_model_number?: string;
    product_type?: string;
    price_information?: PriceInfo[];
    pricing_information?: {
      currentPrice: number;
      standard_price: number;
      standard_price_no_vat: number;
    };
    image_url?: string;
    description?: string;
    attribute_list?: {
      brand?: string;
      color?: string;
      gender?: string;
      sale?: boolean;
    };
    breadcrumb_list?: Breadcrumb[];
    product_description?: {
      title?: string;
      text?: string;
      subtitle?: string;
    };
    links?: {
      self: {
        href: string;
      };
    };
    variation_list?: ProductVariation[];
    view_list?: ProductAsset[];
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
      <Card className="w-full max-w-[420px] mx-auto sm:mx-0 border border-transparent hover:border-black transition-all shadow-none cursor-pointer rounded-none">
        <CardContent className="p-2 sm:p-0">
          {/* Ảnh vuông + overlay Wish */}
          <div className="relative aspect-[3/4] overflow-hidden mb-4">
            <img
              src={product.image || "/placeholder.png"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div
              className="absolute top-2 right-2 sm:top-4 sm:right-4"
              onClick={(e) => e.preventDefault()}
            >
              <WishButton item={product} />
            </div>
          </div>

          {/* Thông tin sản phẩm */}
          <div className="space-y-1 px-2 pb-2 text-sm sm:text-base">
            {product.category && (
              <p className="text-gray-600">{product.category}</p>
            )}
            <p className="font-bold">
              ${product.pricing_information?.currentPrice ?? product.price}
            </p>
            <h3 className="font-medium">{product.name}</h3>
            {product.attribute_list?.brand && (
              <p className="text-gray-600">{product.attribute_list.brand}</p>
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
