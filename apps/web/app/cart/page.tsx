"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Trash2 } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

// Mock cart data - in a real app, this would come from a server component or API
const initialCartItems = [
  {
    id: 1,
    productId: 1,
    name: "Ultraboost 22",
    price: 4200000,
    image: "/images/products/ultraboost-22.jpg",
    color: "Đen",
    size: 42,
    quantity: 1,
  },
  {
    id: 2,
    productId: 3,
    name: "Áo thun 3 Sọc",
    price: 800000,
    image: "/images/products/tshirt.jpg",
    color: "Trắng",
    size: "L",
    quantity: 2,
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems((items) => items.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (itemId: number) => {
    setCartItems((items) => items.filter((item) => item.id !== itemId))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 50000 : 0
  const total = subtotal + shipping

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Giỏ hàng của bạn</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-medium mb-4">Giỏ hàng của bạn đang trống</h2>
          <p className="text-gray-600 mb-8">Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
          <Link href="/" className="btn-primary">
            Tiếp tục mua sắm
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="border-b pb-4 mb-4 hidden md:grid md:grid-cols-12 gap-4 font-medium">
              <div className="md:col-span-6">Sản phẩm</div>
              <div className="md:col-span-2 text-center">Giá</div>
              <div className="md:col-span-2 text-center">Số lượng</div>
              <div className="md:col-span-2 text-right">Tổng</div>
            </div>

            {cartItems.map((item) => (
              <div key={item.id} className="border-b py-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                {/* Product */}
                <div className="md:col-span-6 flex gap-4">
                  <div className="w-24 h-24 relative flex-shrink-0">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600">Màu: {item.color}</p>
                    <p className="text-sm text-gray-600">Kích cỡ: {item.size}</p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 text-sm flex items-center gap-1 mt-2 md:hidden"
                    >
                      <Trash2 size={16} />
                      Xóa
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="md:col-span-2 text-center">
                  <div className="md:hidden text-sm text-gray-600">Giá:</div>
                  {formatCurrency(item.price)}
                </div>

                {/* Quantity */}
                <div className="md:col-span-2 flex justify-center">
                  <div className="flex items-center">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                      className="w-12 h-8 text-center border-t border-b border-gray-300"
                    />
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="md:col-span-2 text-right flex justify-between md:block">
                  <div className="md:hidden text-sm text-gray-600">Tổng:</div>
                  <div className="flex items-center gap-4">
                    {formatCurrency(item.price * item.quantity)}
                    <button onClick={() => removeItem(item.id)} className="text-red-600 hidden md:block">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-8">
              <Link href="/" className="text-black font-medium flex items-center">
                <span className="mr-2">←</span>
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-gray-50 p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Tóm tắt đơn hàng</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Tạm tính</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí vận chuyển</span>
                  <span>{formatCurrency(shipping)}</span>
                </div>
                <div className="border-t pt-4 font-bold flex justify-between">
                  <span>Tổng cộng</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>

              <Link href="/checkout" className="btn-primary w-full mt-6 text-center">
                Thanh toán
              </Link>

              <div className="mt-6">
                <h3 className="font-medium mb-2">Chúng tôi chấp nhận</h3>
                <div className="flex gap-2">
                  <Image src="/images/payment-visa.png" alt="Visa" width={40} height={25} className="h-6 w-auto" />
                  <Image
                    src="/images/payment-mastercard.png"
                    alt="Mastercard"
                    width={40}
                    height={25}
                    className="h-6 w-auto"
                  />
                  <Image src="/images/payment-momo.png" alt="MoMo" width={40} height={25} className="h-6 w-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
