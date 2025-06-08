"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/hooks/useCart"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { formatPrice } from "@/lib/utils"
import { CreditCard, Truck, MapPin } from "lucide-react"
import Breadcrumbs from "@/components/ui/Breadcrumbs"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, total, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [shippingMethod, setShippingMethod] = useState("standard")

  const shipping = total > 1000000 ? 0 : 50000
  const finalTotal = total + shipping

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    postalCode: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Clear cart and redirect to success page
      clearCart()
      router.push("/checkout/success")
    } catch (error) {
      console.error("Payment failed:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const breadcrumbs = [
    { label: "Trang chủ", href: "/" },
    { label: "Giỏ hàng", href: "/cart" },
    { label: "Thanh toán", href: "/checkout" },
  ]

  if (items.length === 0) {
    router.push("/cart")
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={breadcrumbs} />

      <h1 className="mt-8 text-3xl font-bold">Thanh toán</h1>

      <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left Column - Forms */}
        <div className="space-y-8">
          {/* Contact Information */}
          <div>
            <h2 className="text-xl font-bold mb-4">Thông tin liên hệ</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="email@example.com"
                />
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Địa chỉ giao hàng
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="firstName">Họ *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Tên *</Label>
                <Input id="lastName" name="lastName" required value={formData.lastName} onChange={handleInputChange} />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="phone">Số điện thoại *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="0901234567"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="address">Địa chỉ *</Label>
                <Input
                  id="address"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Số nhà, tên đường"
                />
              </div>
              <div>
                <Label htmlFor="city">Tỉnh/Thành phố *</Label>
                <Input id="city" name="city" required value={formData.city} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="district">Quận/Huyện *</Label>
                <Input id="district" name="district" required value={formData.district} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="ward">Phường/Xã *</Label>
                <Input id="ward" name="ward" required value={formData.ward} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="postalCode">Mã bưu điện</Label>
                <Input id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleInputChange} />
              </div>
            </div>
          </div>

          {/* Shipping Method */}
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Phương thức vận chuyển
            </h2>
            <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
              <div className="flex items-center space-x-2 rounded-lg border p-4">
                <RadioGroupItem value="standard" id="standard" />
                <Label htmlFor="standard" className="flex-1 cursor-pointer">
                  <div className="flex justify-between">
                    <div>
                      <div className="font-medium">Giao hàng tiêu chuẩn</div>
                      <div className="text-sm text-gray-600">3-5 ngày làm việc</div>
                    </div>
                    <div className="font-medium">{shipping === 0 ? "Miễn phí" : formatPrice(shipping)}</div>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-lg border p-4">
                <RadioGroupItem value="express" id="express" />
                <Label htmlFor="express" className="flex-1 cursor-pointer">
                  <div className="flex justify-between">
                    <div>
                      <div className="font-medium">Giao hàng nhanh</div>
                      <div className="text-sm text-gray-600">1-2 ngày làm việc</div>
                    </div>
                    <div className="font-medium">{formatPrice(100000)}</div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Payment Method */}
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Phương thức thanh toán
            </h2>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2 rounded-lg border p-4">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex-1 cursor-pointer">
                  <div className="font-medium">Thẻ tín dụng/ghi nợ</div>
                  <div className="text-sm text-gray-600">Visa, Mastercard, JCB</div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-lg border p-4">
                <RadioGroupItem value="momo" id="momo" />
                <Label htmlFor="momo" className="flex-1 cursor-pointer">
                  <div className="font-medium">Ví MoMo</div>
                  <div className="text-sm text-gray-600">Thanh toán qua ví điện tử MoMo</div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-lg border p-4">
                <RadioGroupItem value="cod" id="cod" />
                <Label htmlFor="cod" className="flex-1 cursor-pointer">
                  <div className="font-medium">Thanh toán khi nhận hàng (COD)</div>
                  <div className="text-sm text-gray-600">Thanh toán bằng tiền mặt khi nhận hàng</div>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div>
          <div className="sticky top-8">
            <div className="rounded-lg border p-6">
              <h2 className="text-xl font-bold mb-4">Đơn hàng của bạn</h2>

              <div className="space-y-4">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex justify-between">
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-600">
                        {item.size} | {item.color} | x{item.quantity}
                      </div>
                    </div>
                    <div className="font-medium">{formatPrice(item.price * item.quantity)}</div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Tạm tính</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Phí vận chuyển</span>
                  <span>
                    {shippingMethod === "express"
                      ? formatPrice(100000)
                      : shipping === 0
                        ? "Miễn phí"
                        : formatPrice(shipping)}
                  </span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between text-lg font-bold">
                <span>Tổng cộng</span>
                <span>{formatPrice(total + (shippingMethod === "express" ? 100000 : shipping))}</span>
              </div>

              <Button type="submit" className="w-full mt-6" size="lg" disabled={isProcessing}>
                {isProcessing ? "Đang xử lý..." : "Hoàn tất đơn hàng"}
              </Button>

              <div className="mt-4 text-xs text-gray-500">
                <p>Bằng cách đặt hàng, bạn đồng ý với điều khoản sử dụng của chúng tôi.</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
