import Link from "next/link"
import Image from "next/image"
import { formatCurrency } from "@/lib/utils"

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  isNew?: boolean
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group">
      <Link href={`/product/${product.id}`} className="block relative">
        <div className="aspect-square relative overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.isNew && (
            <div className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 uppercase font-bold">Mới</div>
          )}
        </div>
        <div className="mt-3">
          <p className="text-sm text-gray-500">{product.category}</p>
          <h3 className="font-medium">{product.name}</h3>
          <p className="font-bold mt-1">{formatCurrency(product.price)}</p>
        </div>
      </Link>
    </div>
  )
}
