"use client"

import { useState } from "react"
import { notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductGrid from "@/components/product-grid"
import FiltersSidebar from "@/components/filters-sidebar"
import { Button } from "@/components/ui/button"
import { ChevronDown, SlidersHorizontal } from "lucide-react"
import { categoryConfig } from "@/utils/category-config"

type CategoryPageProps = {
  params: {
    slug: string
  }
}

export default function CategoryPageClient({ params }: CategoryPageProps) {
  const { slug } = params
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState("newest")

  // Kiểm tra xem slug có tồn tại trong config không
  const config = categoryConfig[slug as keyof typeof categoryConfig]

  if (!config) {
    notFound()
  }

  // Mock data cho sản phẩm - trong thực tế sẽ fetch từ API
  const products = generateMockProducts(config.productType, config.subcategory, 48)

  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "popular", label: "Most Popular" },
    { value: "rating", label: "Highest Rated" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-4">
          <span>{config.breadcrumb}</span>
        </nav>

        {/* Page Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">{config.title}</h1>
            <p className="text-gray-600 max-w-2xl">{config.description}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">{config.totalProducts} items</p>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <div className="flex space-x-4">
            <Button variant="outline" className="flex items-center space-x-2" onClick={() => setIsFilterOpen(true)}>
              <SlidersHorizontal size={16} />
              <span>Filter & Sort</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <span>Size</span>
              <ChevronDown size={16} />
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <span>Color</span>
              <ChevronDown size={16} />
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <span>Price</span>
              <ChevronDown size={16} />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Product Grid - Full Width */}
        <div className="mb-8">
          <ProductGrid products={products} columns={4} />

          {/* Load More Button */}
          <div className="text-center mt-8">
            <Button variant="outline" className="px-8">
              Load More Products
            </Button>
          </div>
        </div>

        {/* Recently Viewed */}
        <section className="mt-16">
          <h2 className="text-xl font-bold mb-6">RECENTLY VIEWED ITEMS</h2>
          <div className="grid grid-cols-4 gap-6">
            {generateMockProducts("mixed", "recent", 4).map((product) => (
              <div key={product.id} className="space-y-2">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <h3 className="font-medium text-sm">{product.name}</h3>
                <p className="font-bold">{product.price}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Category Information */}
        <section className="mt-16 grid grid-cols-2 gap-12">
          <div>
            <h2 className="text-xl font-bold mb-4">OUR CLOTHING AND SHOE CATEGORIES</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <h3 className="font-bold mb-2">MEN'S SHOES</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>
                    <a href="#" className="hover:underline">
                      Running Shoes
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Soccer Shoes
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Basketball Shoes
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Lifestyle Shoes
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2">MEN'S CLOTHING</h3>
                <ul className="space-y-1 text-gray-600">
                  <li>
                    <a href="#" className="hover:underline">
                      T-Shirts
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Hoodies
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Pants
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Shorts
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">{config.title.replace("'S", "'S")} GUIDE</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {config.productType === "shoes"
                ? "Find the perfect fit with our comprehensive size guide. Our shoes are designed with the latest technology to provide comfort, performance, and style for every activity."
                : "Discover the perfect style and fit with our clothing collection. Made with premium materials and innovative designs for maximum comfort and performance."}
            </p>
          </div>
        </section>
      </main>

      {/* Filters Sidebar */}
      <FiltersSidebar isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} category={config} />

      <Footer />
    </div>
  )
}

// Hàm tạo dữ liệu mock cho sản phẩm
function generateMockProducts(type: string, subcategory: string, count: number) {
  const products = []

  for (let i = 1; i <= count; i++) {
    let name = ""
    let price = ""

    if (type === "shoes" && subcategory === "soccer") {
      const soccerShoes = [
        "Predator Elite Firm Ground Cleats",
        "X Crazyfast Elite Firm Ground Cleats",
        "Copa Pure Elite Firm Ground Cleats",
        "Nemeziz Messi Elite Firm Ground Cleats",
        "F50 Elite Firm Ground Cleats",
      ]
      name = soccerShoes[i % soccerShoes.length]
      price = `$${Math.floor(Math.random() * 200) + 100}`
    } else if (type === "tops") {
      const tops = [
        "Essentials 3-Stripes T-Shirt",
        "Adicolor Classics Trefoil Tee",
        "Training Tech T-Shirt",
        "Run It 3-Stripes Tee",
        "Badge of Sport Tee",
        "Essentials Linear Logo Hoodie",
        "Adicolor Classics SST Track Top",
        "Training Aeroready Tee",
        "Originals Trefoil Hoodie",
        "Performance Tank Top",
      ]
      name = tops[i % tops.length]
      price = `$${Math.floor(Math.random() * 80) + 20}`
    } else {
      name = `Product ${i}`
      price = `$${Math.floor(Math.random() * 150) + 50}`
    }

    products.push({
      id: i,
      name: name,
      price: price,
      image: "/placeholder.svg?height=300&width=250",
      colors: Math.floor(Math.random() * 5) + 1,
      isNew: Math.random() > 0.8,
      isSale: Math.random() > 0.9,
    })
  }

  return products
}
