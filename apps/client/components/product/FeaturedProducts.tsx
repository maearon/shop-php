import ProductCard from "./ProductCard"

export default function FeaturedProducts() {
  // Normally this would come from an API
  const featuredProducts = [
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
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {featuredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
