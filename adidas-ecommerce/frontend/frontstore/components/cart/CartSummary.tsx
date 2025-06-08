"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/Providers"
import { formatPrice } from "@/lib/utils"

export default function CartSummary() {
  const { total, itemCount } = useCart()
  const shipping = 50000
  const finalTotal = total + shipping

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-bold mb-4">Tóm tắt đơn hàng</h3>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span>Tạm tính ({itemCount} sản phẩm)</span>
          <span>{formatPrice(total)}</span>
        </div>
        <div className="flex justify-between">
          <span>Phí vận chuyển</span>
          <span>{formatPrice(shipping)}</span>
        </div>
        <div className="border-t pt-2 flex justify-between font-bold">
          <span>Tổng cộng</span>
          <span>{formatPrice(finalTotal)}</span>
        </div>
      </div>

      <Link href="/checkout">
        <Button className="w-full" size="lg">
          Thanh toán
        </Button>
      </Link>
    </div>
  )
}
