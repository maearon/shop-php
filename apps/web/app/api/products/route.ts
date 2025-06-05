import { NextResponse } from "next/server"

// Mô phỏng dữ liệu từ database
const products = [
  {
    id: 1,
    name: "Ultraboost 22",
    price: 4200000,
    image: "/images/products/ultraboost-22.jpg",
    category: "Giày chạy bộ",
    isNew: true,
  },
  {
    id: 2,
    name: "Stan Smith",
    price: 2500000,
    image: "/images/products/stan-smith.jpg",
    category: "Originals",
    isNew: false,
  },
  {
    id: 3,
    name: "Áo thun 3 Sọc",
    price: 800000,
    image: "/images/products/tshirt.jpg",
    category: "Quần áo",
    isNew: true,
  },
  {
    id: 4,
    name: "Quần short Run",
    price: 900000,
    image: "/images/products/shorts.jpg",
    category: "Quần áo",
    isNew: false,
  },
  {
    id: 5,
    name: "Giày NMD R1",
    price: 3200000,
    image: "/images/products/nmd.jpg",
    category: "Originals",
    isNew: true,
  },
]

export async function GET(request: Request) {
  // Lấy tham số từ URL
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const isNew = searchParams.get("isNew")

  let filteredProducts = [...products]

  // Lọc theo danh mục nếu có
  if (category) {
    filteredProducts = filteredProducts.filter((product) => product.category.toLowerCase() === category.toLowerCase())
  }

  // Lọc theo sản phẩm mới nếu có
  if (isNew === "true") {
    filteredProducts = filteredProducts.filter((product) => product.isNew)
  }

  // Trả về kết quả
  return NextResponse.json(filteredProducts)
}
