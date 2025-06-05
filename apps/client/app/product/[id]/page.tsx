import Image from "next/image"
import Link from "next/link"
import { formatCurrency } from "@/lib/utils"
import ProductRecommendations from "@/components/product/ProductRecommendations"
import AddToCartButton from "@/components/product/AddToCartButton"

// Normally this would come from an API
const getProductById = (id: string) => {
  const products = {
    "1": {
      id: 1,
      name: "Ultraboost 22",
      price: 4200000,
      images: [
        "/images/products/ultraboost-22.jpg",
        "/images/products/ultraboost-22-2.jpg",
        "/images/products/ultraboost-22-3.jpg",
      ],
      description:
        "Giày chạy bộ Ultraboost 22 với công nghệ đệm Boost mang lại cảm giác êm ái và đàn hồi tối đa. Thiết kế ôm chân với phần upper làm từ chất liệu Primeknit+ co giãn, thoáng khí.",
      features: [
        "Công nghệ đệm Boost",
        "Upper làm từ Primeknit+",
        "Đế ngoài Continental™ Rubber",
        "Trọng lượng: 310g",
        "Chênh lệch độ cao đế: 10mm",
      ],
      sizes: [39, 40, 41, 42, 43, 44, 45],
      colors: ["Đen", "Trắng", "Xanh navy"],
      category: "Giày chạy bộ",
    },
  }

  return products[id as keyof typeof products]
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id)

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Sản phẩm không tồn tại</h1>
        <Link href="/" className="btn-primary">
          Quay lại trang chủ
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Images */}
        <div className="md:w-2/3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.images.map((image, index) => (
              <div key={index} className={`aspect-square relative ${index === 0 ? "md:col-span-2" : ""}`}>
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - Hình ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="md:w-1/3">
          <div className="sticky top-24">
            <p className="text-sm text-gray-500 mb-1">{product.category}</p>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-2xl font-bold mb-6">{formatCurrency(product.price)}</p>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Màu sắc</h3>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button key={color} className="border border-gray-300 px-4 py-2 hover:border-black">
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Kích cỡ</h3>
              <div className="grid grid-cols-3 gap-2">
                {product.sizes.map((size) => (
                  <button key={size} className="border border-gray-300 py-2 hover:border-black">
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <AddToCartButton productId={product.id} />

            {/* Description */}
            <div className="mt-8">
              <h3 className="font-medium mb-2">Mô tả sản phẩm</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>

            {/* Features */}
            <div className="mt-6">
              <h3 className="font-medium mb-2">Đặc điểm</h3>
              <ul className="list-disc pl-5 text-gray-700">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Product Recommendations */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">CÓ THỂ BẠN CŨNG THÍCH</h2>
        <ProductRecommendations currentProductId={product.id} />
      </div>
    </div>
  )
}
