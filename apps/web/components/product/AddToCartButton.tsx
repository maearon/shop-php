"use client"

import { useState } from "react"
import { ShoppingBag } from "lucide-react"

interface AddToCartButtonProps {
  productId: number
}

export default function AddToCartButton({ productId }: AddToCartButtonProps) {
  const [loading, setLoading] = useState(false)
  const [added, setAdded] = useState(false)

  const handleAddToCart = async () => {
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    // In a real app, this would call a server action or API endpoint
    // await addToCart(productId)

    setLoading(false)
    setAdded(true)

    // Reset "Added" state after 2 seconds
    setTimeout(() => {
      setAdded(false)
    }, 2000)
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading}
      className={`w-full py-3 px-6 font-bold uppercase flex items-center justify-center gap-2 transition-colors ${
        added ? "bg-green-600 text-white" : "bg-black text-white hover:bg-gray-800"
      } ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
    >
      {loading ? (
        "Đang xử lý..."
      ) : added ? (
        <>Đã thêm vào giỏ hàng</>
      ) : (
        <>
          <ShoppingBag size={18} />
          Thêm vào giỏ hàng
        </>
      )}
    </button>
  )
}
