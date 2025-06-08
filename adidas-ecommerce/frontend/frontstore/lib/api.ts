// Mock data for products
export interface Product {
  id: string
  name: string
  slug: string
  price: number
  originalPrice?: number
  image: string
  images: string[]
  category: string
  categorySlug: string
  isNew?: boolean
  sizes: string[]
  colors: Array<{ name: string; value: string }>
  description: string
  specifications: string
  features: string[]
  reviews: Array<{
    id: string
    user: string
    rating: number
    comment: string
    date: string
  }>
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Ultraboost 22",
    slug: "ultraboost-22",
    price: 4500000,
    originalPrice: 5000000,
    image: "/placeholder.svg?height=500&width=500",
    images: [
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
    ],
    category: "Giày chạy bộ",
    categorySlug: "giay-chay-bo",
    isNew: true,
    sizes: ["39", "40", "41", "42", "43", "44"],
    colors: [
      { name: "Đen", value: "#000000" },
      { name: "Trắng", value: "#FFFFFF" },
    ],
    description:
      "Giày chạy bộ cao cấp với công nghệ Boost mang lại cảm giác êm ái và phản hồi năng lượng tuyệt vời cho mỗi bước chạy.",
    specifications: "Upper: Primeknit+ | Midsole: Boost | Outsole: Continental Rubber | Drop: 10mm | Weight: 310g",
    features: ["Công nghệ Boost", "Upper Primeknit", "Đế Continental"],
    reviews: [
      {
        id: "1",
        user: "Nguyễn Văn A",
        rating: 5,
        comment: "Giày rất thoải mái, phù hợp cho chạy bộ đường dài",
        date: "15/12/2023",
      },
      {
        id: "2",
        user: "Trần Thị B",
        rating: 4,
        comment: "Chất lượng tốt, thiết kế đẹp",
        date: "10/12/2023",
      },
    ],
  },
  {
    id: "2",
    name: "Stan Smith",
    slug: "stan-smith",
    price: 2500000,
    image: "/placeholder.svg?height=500&width=500",
    images: [
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
    ],
    category: "Giày lifestyle",
    categorySlug: "giay-lifestyle",
    sizes: ["38", "39", "40", "41", "42", "43"],
    colors: [
      { name: "Trắng/Xanh", value: "#FFFFFF" },
      { name: "Trắng/Đỏ", value: "#FFFFFF" },
    ],
    description: "Giày tennis cổ điển, biểu tượng của adidas với thiết kế tối giản và phong cách vượt thời gian.",
    specifications: "Upper: Leather | Midsole: EVA | Outsole: Rubber | Style: Classic Tennis",
    features: ["Da thật", "Thiết kế cổ điển", "Thoải mái"],
    reviews: [
      {
        id: "3",
        user: "Lê Văn C",
        rating: 5,
        comment: "Giày cổ điển, dễ phối đồ",
        date: "20/12/2023",
      },
    ],
  },
  {
    id: "3",
    name: "NMD R1",
    slug: "nmd-r1",
    price: 3800000,
    image: "/placeholder.svg?height=500&width=500",
    images: [
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
    ],
    category: "Giày lifestyle",
    categorySlug: "giay-lifestyle",
    sizes: ["39", "40", "41", "42", "43"],
    colors: [
      { name: "Đen", value: "#000000" },
      { name: "Xám", value: "#808080" },
    ],
    description:
      "Giày thể thao đường phố với công nghệ Boost và thiết kế hiện đại, lấy cảm hứng từ quá khứ nhưng hướng tới tương lai.",
    specifications: "Upper: Primeknit | Midsole: Boost | Outsole: Rubber | Style: Lifestyle",
    features: ["Công nghệ Boost", "Thiết kế hiện đại", "Thoải mái"],
    reviews: [
      {
        id: "4",
        user: "Phạm Thị D",
        rating: 4,
        comment: "Thiết kế đẹp, đi thoải mái",
        date: "18/12/2023",
      },
      {
        id: "5",
        user: "Hoàng Văn E",
        rating: 5,
        comment: "Rất hài lòng với sản phẩm",
        date: "16/12/2023",
      },
    ],
  },
  {
    id: "4",
    name: "Superstar",
    slug: "superstar",
    price: 2200000,
    image: "/placeholder.svg?height=500&width=500",
    images: [
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
    ],
    category: "Giày lifestyle",
    categorySlug: "giay-lifestyle",
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    colors: [
      { name: "Trắng/Đen", value: "#FFFFFF" },
      { name: "Đen/Trắng", value: "#000000" },
    ],
    description:
      "Giày basketball cổ điển với shell toe đặc trưng, biểu tượng của văn hóa hip-hop và thời trang đường phố.",
    specifications: "Upper: Leather | Midsole: Rubber | Outsole: Rubber | Style: Classic Basketball",
    features: ["Shell toe", "Da thật", "Thiết kế cổ điển"],
    reviews: [
      {
        id: "6",
        user: "Vũ Thị F",
        rating: 5,
        comment: "Giày cổ điển, chất lượng tốt",
        date: "22/12/2023",
      },
    ],
  },
]

export async function getFeaturedProducts(): Promise<Product[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockProducts
}

export async function getProducts(): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockProducts
}

export async function getProduct(slug: string): Promise<Product | null> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockProducts.find((p) => p.slug === slug) || null
}

export async function searchProducts(query: string): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const searchTerm = query.toLowerCase()
  return mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm),
  )
}

export async function getRelatedProducts(categorySlug: string, currentProductId: string): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 400))

  return mockProducts
    .filter((product) => product.categorySlug === categorySlug && product.id !== currentProductId)
    .slice(0, 4)
}
