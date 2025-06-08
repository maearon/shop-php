"use client"

import { useCart } from "@/components/Providers"
import CartItem from "@/components/cart/CartItem"
import CartSummary from "@/components/cart/CartSummary"
import EmptyCart from "@/components/cart/EmptyCart"
import Breadcrumbs from "@/components/ui/Breadcrumbs"

export default function CartPage() {
  const { items } = useCart()

  const breadcrumbs = [
    { label: "Trang chủ", href: "/" },
    { label: "Giỏ hàng", href: "/cart" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={breadcrumbs} />

      <h1 className="mt-8 text-3xl font-bold">Giỏ hàng của bạn</h1>

      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem key={`${item.id}-${item.size}-${item.color}`} item={item} />
              ))}
            </div>
          </div>

          <div>
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  )
}
