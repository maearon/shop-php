import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingBag } from "lucide-react"

export default function EmptyCart() {
  return (
    <div className="text-center py-16">
      <ShoppingBag className="h-24 w-24 mx-auto text-gray-400 mb-6" />
      <h2 className="text-2xl font-bold mb-4">Giỏ hàng của bạn đang trống</h2>
      <p className="text-gray-600 mb-8">Hãy khám phá các sản phẩm tuyệt vời của chúng tôi!</p>
      <Link href="/products">
        <Button size="lg">Tiếp tục mua sắm</Button>
      </Link>
    </div>
  )
}
