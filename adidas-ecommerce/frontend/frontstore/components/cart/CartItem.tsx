"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/Providers"
import { formatPrice } from "@/lib/utils"
import { Minus, Plus, Trash2 } from "lucide-react"

interface CartItemProps {
  item: {
    id: string
    name: string
    price: number
    size: string
    color: string
    quantity: number
    image: string
  }
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(item.id)
    } else {
      updateQuantity(item.id, newQuantity)
    }
  }

  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg">
      <div className="relative w-20 h-20">
        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover rounded" />
      </div>

      <div className="flex-1">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-sm text-gray-600">
          Size: {item.size} | Màu: {item.color}
        </p>
        <p className="font-bold">{formatPrice(item.price)}</p>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => handleQuantityChange(item.quantity - 1)}>
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center">{item.quantity}</span>
        <Button variant="outline" size="icon" onClick={() => handleQuantityChange(item.quantity + 1)}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
