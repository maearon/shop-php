"use client"

import { useState } from "react"
import { useCart } from "@/hooks/useCart"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import { Heart } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface ProductInfoProps {
  product: {
    id: string
    name: string
    price: number
    originalPrice?: number
    description: string
    sizes: string[]
    colors: { name: string; value: string }[]
  }
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const { addItem } = useCart()
  const { toast } = useToast()
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Vui lòng chọn kích cỡ",
        variant: "destructive",
      })
      return
    }

    if (!selectedColor) {
      toast({
        title: "Vui lòng chọn màu sắc",
        variant: "destructive",
      })
      return
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      quantity,
      image: "/placeholder.svg?height=100&width=100", // In a real app, this would be the product image
    })

    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `${product.name} - ${selectedSize} - ${selectedColor}`,
    })
  }

  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0

  return (
    <div>
      <h1 className="text-3xl font-bold">{product.name}</h1>

      <div className="mt-4 flex items-center gap-2">
        <span className={`text-2xl font-bold ${discount > 0 ? "text-red-600" : ""}`}>{formatPrice(product.price)}</span>

        {discount > 0 && (
          <>
            <span className="text-gray-500 line-through">{formatPrice(product.originalPrice!)}</span>
            <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">-{discount}%</span>
          </>
        )}
      </div>

      <p className="mt-6 text-gray-600">{product.description}</p>

      <div className="mt-8">
        <h3 className="font-bold mb-2">Kích cỡ</h3>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <Button
              key={size}
              variant={selectedSize === size ? "default" : "outline"}
              className="h-10 w-14"
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-bold mb-2">Màu sắc</h3>
        <div className="flex flex-wrap gap-3">
          {product.colors.map((color) => (
            <button
              key={color.name}
              className={`h-8 w-8 rounded-full border-2 ${
                selectedColor === color.name ? "border-black" : "border-gray-300"
              }`}
              style={{ backgroundColor: color.value }}
              onClick={() => setSelectedColor(color.name)}
              title={color.name}
              aria-label={`Color: ${color.name}`}
            />
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-bold mb-2">Số lượng</h3>
        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            -
          </Button>
          <span className="w-12 text-center">{quantity}</span>
          <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
            +
          </Button>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <Button className="flex-1" size="lg" onClick={handleAddToCart}>
          Thêm vào giỏ hàng
        </Button>

        <Button variant="outline" size="icon" className="h-12 w-12">
          <Heart className="h-5 w-5" />
        </Button>
      </div>

      <div className="mt-6 text-sm text-gray-600">
        <p>Mã sản phẩm: {product.id}</p>
        <p className="mt-1">Giao hàng miễn phí cho đơn hàng từ 1.000.000₫</p>
        <p className="mt-1">Đổi trả miễn phí trong vòng 30 ngày</p>
      </div>
    </div>
  )
}
