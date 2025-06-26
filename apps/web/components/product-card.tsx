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
    // -----------------------------
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
      // mở rộng tùy vào project
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
            <p className="font-bold">
              ${product.pricing_information?.currentPrice ?? product.price}
            </p>
            <h3 className="font-medium">{product.name}</h3>
            {product.attribute_list?.brand && <p className="text-sm text-gray-600">{product.attribute_list.brand}</p>}
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


// "use client"

// import type React from "react"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { useAppDispatch } from "@/store/hooks"
// import { addToCart } from "@/store/cartSlice"
// import WishButton from "./wish-button"
// import type { LastVisitedProduct } from "@/types/product/product-adidas"
// import { mapProductToWishItem } from "@/lib/mappers/product-to-wishlist"

// interface ProductCardProps {
//   product: LastVisitedProduct
//   showAddToBag?: boolean
// }

// export default function ProductCard({ product, showAddToBag = false }: ProductCardProps) {
//   const dispatch = useAppDispatch()
//   const p = product.product // 🟡 shortcut cho dễ đọc

//   const handleAddToBag = (e: React.MouseEvent) => {
//     e.preventDefault()
//     e.stopPropagation()
//     dispatch(
//       addToCart({
//         id: Number(p.id),
//         name: p.name,
//         price: String(p.pricing_information.currentPrice),
//         image: p.image_url,
//         color: "Default",
//         size: "M",
//       }),
//     )
//   }

//   return (
//     <Link href={product.url}>
//       <Card className="border-none shadow-none cursor-pointer hover:shadow-lg transition-shadow">
//         <CardContent className="p-0">
//           <div className="relative mb-4">
//             <img
//               src={p.image_url || "/placeholder.png?height=600&width=600"}
//               alt={p.name}
//               className="w-full h-64 object-cover"
//             />
//             <div className="absolute top-4 right-4" onClick={(e) => e.preventDefault()}>
//               <WishButton item={mapProductToWishItem(p)} />
//             </div>
//           </div>
//           <div className="space-y-2">
//             <p className="font-bold">${p.pricing_information.currentPrice}</p>
//             <h3 className="font-medium">{p.name}</h3>
//             {p.attribute_list?.brand && <p className="text-sm text-gray-600">{p.attribute_list.brand}</p>}
//             {showAddToBag && (
//               <Button className="w-full bg-black text-white hover:bg-gray-800" onClick={handleAddToBag}>
//                 ADD TO BAG
//               </Button>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     </Link>
//   )
// }

