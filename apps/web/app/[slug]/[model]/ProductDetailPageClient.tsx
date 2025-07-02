// ProductDetailPageClient.tsx
"use client"

import { Product } from "@/types/product"
import Link from "next/link"
import { useState, useEffect } from "react"
import { MainButton } from "@/components/ui/main-button"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ChevronDown, ChevronUp, Heart, ArrowLeft } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { addToCart } from "@/store/cartSlice"
import { toggleWishlist } from "@/store/wishlistSlice"
import ExpandableImageGallery from "@/components/expandable-image-gallery"
import { soccerShoesData } from "@/data/soccer-shoes-data"

type Props = {
  product: Product
}

export default function ProductDetailPageClient({ product }: Props) {
  const dispatch = useAppDispatch()
  const wishlistItems = useAppSelector((state) => state.wishlist.items)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [expandedSections, setExpandedSections] = useState({
    reviews: false,
    description: false,
    details: false,
  })
  const [sizeError, setSizeError] = useState("")
  const [isSticky, setIsSticky] = useState(false)

  const isWishlisted = wishlistItems.some((item) => item.id === product.id.toString())
  const currentVariant = product.variants[selectedVariant]

  // Enhanced sticky sidebar logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 1024) return // Only on desktop

      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      const leftColumn = document.getElementById("left-column")
      const rightColumn = document.getElementById("right-column")
      const footer = document.querySelector("footer")

      if (leftColumn && rightColumn && footer) {
        const leftColumnRect = leftColumn.getBoundingClientRect()
        const leftColumnBottom = leftColumn.offsetTop + leftColumn.offsetHeight
        const footerTop = footer.offsetTop
        const rightColumnHeight = rightColumn.offsetHeight

        const startSticky = 200
        const stopSticky = leftColumnBottom - rightColumnHeight - 100

        // Make sticky when scrolled past start point and before left column ends
        setIsSticky(scrollTop > startSticky && scrollTop < stopSticky)
      }
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  const handleAddToBag = () => {
    if (!selectedSize) {
      setSizeError("Please select your size")
      return
    }

    setSizeError("")
    dispatch(
      addToCart({
        id: product.id.toString(),
        name: product.name,
        price: `$${product.price}`,
        image: currentVariant.image,
        color: currentVariant.colorName,
        size: selectedSize,
      }),
    )
  }

  const handleToggleWishlist = () => {
    dispatch(
      toggleWishlist({
        id: product.id.toString(),
        name: product.name,
        price: `$${product.price}`,
        image: currentVariant.image,
      }),
    )
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => {
      const newSections = {
        reviews: false,
        description: false,
        details: false,
      }
      newSections[section] = !prev[section]
      return newSections
    })
  }

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size)
    setSizeError("")
  }

  const relatedProducts = soccerShoesData.filter((p) => p.id !== product.id).slice(0, 4)
  const youMayLike = soccerShoesData
    .filter((p) => p.id !== product.id && p.collection !== product.collection)
    .slice(0, 4)

  // Mock product details
  const productDetails = {
    rating: 4.8,
    reviewCount: 1247,
    features: ["Get delivery dates", "Free standard shipping with adiClub", "Free 30 day returns"],
    description:
      "A lightweight boot with a soft touch, built to match Leo's fit and feel. Embodying the prestige of the game's ultimate icon. For players with leather-like feet, their flexible Hybridtouch upper comes with a knit 'burrito' tongue for a wider opening and comfortable fit. The Sprintframe 360 outsole is built for quick feet on dry grass surfaces.",
    details: [
      "Regular fit",
      "Lace closure",
      "Hybrid Touch upper",
      "adidas PRIMEKNIT collar",
      "Sprintframe 360 firm ground outsole",
      "Imported",
      `Product color: ${currentVariant.colorName}`,
      `Product code: ${product.modelNumber}`,
    ],
    sizeGuide: "True to size. We recommend ordering your usual size.",
    breadcrumb: "Home / Soccer / Shoes",
    sizes: [
      "4",
      "4.5",
      "5",
      "5.5",
      "6",
      "6.5",
      "7",
      "7.5",
      "8",
      "8.5",
      "9",
      "9.5",
      "10",
      "10.5",
      "11",
      "11.5",
      "12",
      "12.5",
      "13",
      "13.5",
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      
      <main className="container mx-auto px-4 py-4 lg:py-8">
        {/* Mobile Breadcrumb */}
        <nav className="lg:hidden text-sm text-gray-600 mb-4 flex items-center">
          <Link href="/men-soccer-shoes" className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>{productDetails.breadcrumb}</span>
          </Link>
        </nav>

        {/* Desktop Layout - 60:40 Split with Gray Divider */}
        <div className="lg:flex lg:gap-0 lg:items-start">
          {/* Left Column - 60% Width - Images with Overlay Elements */}
          <div id="left-column" className="relative mb-8 lg:mb-0 lg:w-[60%] lg:pr-8 lg:border-r lg:border-gray-200">
            {/* Desktop Breadcrumb - Overlay on Image */}
            <nav className="hidden lg:block absolute top-4 left-4 z-20 text-sm text-gray-700 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-none">
              <Link href="/men-soccer-shoes" className="hover:underline">
                {productDetails.breadcrumb}
              </Link>
            </nav>

            {/* Best Seller Badge - Gray Background, Black Text, Counter-clockwise */}
            {product.badge === "Best seller" && (
              <div className="absolute top-4 right-1 z-20 lg:top-8 lg:right-1">
                <div className="bg-gray-300 text-black text-xs font-bold px-2 py-1 lg:px-3 lg:py-2 lg:transform lg:-rotate-90 lg:origin-center rounded-none">
                  BEST SELLER
                </div>
              </div>
            )}

            <ExpandableImageGallery images={product.images.map((v) => v)} productName={product.name} />
          </div>

          {/* Right Column - 40% Width - Product Info with Enhanced Sticky */}
          <div id="right-column" className="lg:w-[40%] lg:pl-8 lg:relative">
            <div
              className={`lg:transition-all lg:duration-300 ${
                isSticky ? "lg:fixed lg:top-4 lg:w-[calc(40%-4rem)] lg:bg-white lg:z-10 lg:pr-4" : "lg:static lg:w-full"
              }`}
              style={{
                right: isSticky ? `max(1rem, calc(50vw - 640px + 1rem))` : "auto",
              }}
            >
              <div className="space-y-6 lg:max-w-lg">
                {/* Mobile Product Title */}
                <div className="lg:hidden">
                  <h1 className="text-xl font-bold mb-2">{product.name}</h1>
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-xl font-bold">${product.price}</span>
                    {product.badge === "Best seller" && (
                      <Badge className="bg-gray-300 text-black text-xs rounded-none">BEST SELLER</Badge>
                    )}
                  </div>
                </div>

                {/* Desktop Product Title */}
                <div className="hidden lg:block">
                  <p className="text-sm text-gray-600 mb-2">Soccer</p>
                  <h1 className="text-3xl font-bold mb-4 leading-tight">{product.name}</h1>
                  <div className="flex items-center space-x-2 mb-6">
                    <span className="text-2xl font-bold">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-6">Promo codes will not apply to this product.</p>
                </div>

                {/* Rating and Reviews */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < Math.floor(productDetails.rating) ? "fill-green-500 text-green-500" : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold">{productDetails.reviewCount}</span>
                </div>

                {/* Colors */}
                <div>
                  <h3 className="font-bold mb-3">{currentVariant.colorName}</h3>
                  <div className="flex gap-2">
                    {product.variants.map((variant, index) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(index)}
                        className={`w-12 h-12 rounded-none border-2 overflow-hidden ${
                          selectedVariant === index ? "border-black" : "border-gray-300"
                        }`}
                      >
                        <img
                          src={variant.thumbnail || "/placeholder.svg"}
                          alt={variant.colorName}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold">Sizes</h3>
                    <button className="text-sm underline flex items-center">
                      <span className="mr-1">📏</span>
                      Size guide
                    </button>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {productDetails.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => handleSizeSelect(size)}
                        className={`py-3 border text-center font-medium text-sm rounded-none ${
                          selectedSize === size
                            ? "border-black bg-black text-white"
                            : "border-gray-300 hover:border-black"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  {sizeError && <p className="text-red-600 text-sm mt-2 font-medium">{sizeError}</p>}
                  <div className="mt-3 p-3 border border-gray-300 rounded-none">
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">ℹ️</span>
                      <span>
                        <strong>True to size.</strong> We recommend ordering your usual size.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Add to Bag & Wishlist - Side by Side */}
                <div className="flex gap-4">
                  <MainButton
                    onClick={handleAddToBag}
                    fullWidth={true}
                  >
                    ADD TO BAG
                  </MainButton>

                  <button
                    onClick={handleToggleWishlist}
                    className="w-12 h-12 border border-black rounded-none flex items-center justify-center hover:bg-white hover:text-black transition-colors translate-y-[3px]"
                  >
                    <Heart size={20} className={isWishlisted ? "fill-current" : ""} />
                  </button>
                </div>

                <div className="text-center text-sm text-gray-600">
                  <p>From $24.24/month, or 4 payments at 0% interest with</p>
                  <button className="underline font-medium">Klarna Learn more</button>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  {productDetails.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <span className="text-blue-600">📦</span>
                      <span className="underline">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expandable Sections - Full Width Below Main Content */}
        <div className="max-w-none mx-auto space-y-0 my-16 border-t lg:mt-24">
          {/* Reviews */}
          <div className="border-b">
            <button
              onClick={() => toggleSection("reviews")}
              className="w-full flex justify-between items-center py-6 text-left font-bold text-lg"
            >
              <span>Reviews ({productDetails.reviewCount})</span>
              {expandedSections.reviews ? <ChevronUp /> : <ChevronDown />}
            </button>
            {expandedSections.reviews && (
              <div className="pb-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold">{productDetails.rating}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < Math.floor(productDetails.rating) ? "fill-green-500 text-green-500" : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <Button className="mb-4 border-black text-black bg-transparent hover:bg-white hover:text-gray-500 rounded-none">
                  WRITE A REVIEW
                </Button>
                <p className="text-gray-600">Customer reviews and ratings would appear here.</p>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="border-b">
            <button
              onClick={() => toggleSection("description")}
              className="w-full flex justify-between items-center py-6 text-left font-bold text-lg"
            >
              <span>Description</span>
              {expandedSections.description ? <ChevronUp /> : <ChevronDown />}
            </button>
            {expandedSections.description && (
              <div className="pb-6">
                <p className="text-gray-600 leading-relaxed">{productDetails.description}</p>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="border-b">
            <button
              onClick={() => toggleSection("details")}
              className="w-full flex justify-between items-center py-6 text-left font-bold text-lg"
            >
              <span>Details</span>
              {expandedSections.details ? <ChevronUp /> : <ChevronDown />}
            </button>
            {expandedSections.details && (
              <div className="pb-6">
                <ul className="space-y-2">
                  {productDetails.details.map((detail, index) => (
                    <li key={index} className="text-gray-600">
                      • {detail}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Recently Viewed Items */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">RECENTLY VIEWED ITEMS</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.slice(0, 1).map((item) => (
              <div key={item.id} className="relative">
                <div className="relative mb-4">
                  <img
                    src={item.variants[0].image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <button className="absolute top-4 right-4 w-8 h-8 border border-black rounded-none flex items-center justify-center bg-white hover:bg-black hover:text-white">
                    <Heart size={16} />
                  </button>
                </div>
                <div>
                  <p className="font-bold mb-1">${item.price}</p>
                  <h3 className="text-sm text-gray-700 mb-1">{item.name}</h3>
                  <p className="text-xs text-gray-500">{item.collection}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      
    </div>
  )
}
