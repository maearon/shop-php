import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Package, Truck } from "lucide-react"

export default function CheckoutSuccessPage() {
  const orderNumber = "ADI" + Math.random().toString(36).substr(2, 9).toUpperCase()

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <CheckCircle className="mx-auto h-16 w-16 text-green-600 mb-6" />

        <h1 className="text-3xl font-bold mb-4">Đặt hàng thành công!</h1>

        <p className="text-gray-600 mb-8">
          Cảm ơn bạn đã mua sắm tại adidas. Đơn hàng của bạn đã được xác nhận và đang được xử lý.
        </p>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Thông tin đơn hàng</h2>
          <div className="space-y-2 text-left">
            <div className="flex justify-between">
              <span>Mã đơn hàng:</span>
              <span className="font-bold">{orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span>Ngày đặt:</span>
              <span>{new Date().toLocaleDateString("vi-VN")}</span>
            </div>
            <div className="flex justify-between">
              <span>Trạng thái:</span>
              <span className="text-green-600 font-medium">Đã xác nhận</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="text-center p-6 border rounded-lg">
            <Package className="mx-auto h-8 w-8 text-blue-600 mb-3" />
            <h3 className="font-bold mb-2">Đang chuẩn bị</h3>
            <p className="text-sm text-gray-600">Đơn hàng đang được đóng gói và chuẩn bị giao</p>
          </div>

          <div className="text-center p-6 border rounded-lg">
            <Truck className="mx-auto h-8 w-8 text-blue-600 mb-3" />
            <h3 className="font-bold mb-2">Giao hàng</h3>
            <p className="text-sm text-gray-600">Dự kiến giao trong 3-5 ngày làm việc</p>
          </div>
        </div>

        <div className="space-y-4">
          <Link href={`/orders/${orderNumber}`}>
            <Button className="w-full md:w-auto">Theo dõi đơn hàng</Button>
          </Link>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button variant="outline" className="w-full md:w-auto">
                Tiếp tục mua sắm
              </Button>
            </Link>

            <Link href="/account/orders">
              <Button variant="outline" className="w-full md:w-auto">
                Xem tất cả đơn hàng
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>
            Bạn sẽ nhận được email xác nhận đơn hàng trong vài phút tới. Nếu có bất kỳ thắc mắc nào, vui lòng{" "}
            <Link href="/contact" className="text-blue-600 hover:underline">
              liên hệ với chúng tôi
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
