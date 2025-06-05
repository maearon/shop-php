import { NextResponse } from "next/server"

// Trong thực tế, dữ liệu này sẽ được lưu trong database
let cart = [
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

// Lấy giỏ hàng
export async function GET() {
  return NextResponse.json(cart)
}

// Thêm sản phẩm vào giỏ hàng
export async function POST(request: Request) {
  const data = await request.json()

  // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
  const existingItemIndex = cart.findIndex(
    (item) => item.productId === data.productId && item.color === data.color && item.size === data.size,
  )

  if (existingItemIndex >= 0) {
    // Nếu đã có, tăng số lượng
    cart[existingItemIndex].quantity += data.quantity
  } else {
    // Nếu chưa có, thêm mới
    const newItem = {
      id: Date.now(),
      ...data,
    }
    cart.push(newItem)
  }

  return NextResponse.json({ success: true, cart })
}

// Cập nhật sản phẩm trong giỏ hàng
export async function PUT(request: Request) {
  const data = await request.json()

  cart = cart.map((item) => (item.id === data.id ? { ...item, ...data } : item))

  return NextResponse.json({ success: true, cart })
}

// Xóa sản phẩm khỏi giỏ hàng
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 })
  }

  cart = cart.filter((item) => item.id !== Number.parseInt(id))

  return NextResponse.json({ success: true, cart })
}
