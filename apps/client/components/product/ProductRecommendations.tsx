import ProductCard from "./ProductCard"

interface ProductRecommendationsProps {
  currentProductId: number
}

export default function ProductRecommendations({ currentProductId }: ProductRecommendationsProps) {
  // Normally this would come from an API
  const recommendedProducts = [
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
  ].filter((product) => product.id !== currentProductId)

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {recommendedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
