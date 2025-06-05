import { NextResponse } from "next/server"

// Mô phỏng dữ liệu từ database
const products = [
  {
    id: 1,
    name: "Ultraboost 22",
    price: 4200000,
    image: "/images/products/ultraboost-22.jpg",
    category: "Giày chạy bộ",
  },
  {
    id: 2,
    name: "Stan Smith",
    price: 2500000,
    image: "/images/products/stan-smith.jpg",
    category: "Originals",
  },
  {
    id: 3,
    name: "Áo thun 3 Sọc",
    price: 800000,
    image: "/images/products/tshirt.jpg",
    category: "Quần áo",
  },
  {
    id: 4,
    name: "Quần short Run",
    price: 900000,
    image: "/images/products/shorts.jpg",
    category: "Quần áo",
  },
  {
    id: 5,
    name: "Giày NMD R1",
    price: 3200000,
    image: "/images/products/nmd.jpg",
    category: "Originals",
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  // Tìm kiếm sản phẩm theo tên hoặc danh mục
  const searchResults = products.filter(
    (product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()),
  )

  return NextResponse.json(searchResults)
}
