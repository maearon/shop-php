"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"
import { motion } from "framer-motion"
import { Product } from "@/types/product"
import { Optional } from "@/types/common"

interface ProductCarouselProps {
  products: Product[]
  title?: string
  showAddToBag?: boolean
  showIndicators?: boolean
  carouselModeInMobile?: boolean
  viewMoreHref?: string
  minimalMobileForProductCard?: Optional<boolean>
}

export default function ProductCarousel({
  products,
  title,
  showAddToBag = false,
  showIndicators = true,
  carouselModeInMobile = true,
  viewMoreHref,
  minimalMobileForProductCard = false,
}: ProductCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [hovering, setHovering] = useState(false)
  const [itemsPerView, setItemsPerView] = useState(4)

  useEffect(() => {
    const updateItemsPerView = () => {
      const w = window.innerWidth
      if (w < 640) setItemsPerView(carouselModeInMobile ? 2 : 8)
      else if (w < 768) setItemsPerView(2)
      else if (w < 1024) setItemsPerView(3)
      else setItemsPerView(4)
    }
    updateItemsPerView()
    window.addEventListener("resize", updateItemsPerView)
    return () => window.removeEventListener("resize", updateItemsPerView)
  }, [carouselModeInMobile])

  const totalSlides = Math.ceil(products.length / itemsPerView)
  const containerRef = useRef<HTMLDivElement>(null)

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) setCurrentSlide((prev) => prev + 1)
  }

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide((prev) => prev - 1)
  }

  // 👉 Nếu là mobile và không cần carousel
  if (!carouselModeInMobile && itemsPerView >= 6 && viewMoreHref) {
    return (
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
        {products.slice(0, 6).map((product) => (
          <ProductCard key={product.id} product={product} minimalMobile={minimalMobileForProductCard} />
        ))}
        <div className="col-span-full mt-4 flex justify-center">
          <Button
            variant="outline"
            className="rounded-none border-black text-black font-bold hover:bg-gray-100"
            onClick={() => (window.location.href = viewMoreHref || "/new-arrivals")}
          >
            VIEW ALL
          </Button>
        </div>
      </div>
    )
  }

  const trackWidth = `${(products.length / itemsPerView) * 100}%`
  const itemWidth = `${100 / products.length}%`
  const offset = `-${(100 / products.length) * itemsPerView * currentSlide}%`

  return (
    <div
      className="group relative overflow-hidden"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {title && <h2 className="text-xl font-bold mb-8">{title}</h2>}

      <div className="relative">
        <motion.div
          ref={containerRef}
          className="flex gap-6 transition-transform duration-700 ease-in-out will-change-transform"
          style={{
            width: trackWidth,
            transform: `translateX(${offset})`,
          }}
        >
          {products.map((product) => (
            <div key={product.id} style={{ width: itemWidth }}>
              <ProductCard product={product} showAddToBag={showAddToBag} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      {hovering && totalSlides > 1 && (
        <>
          {currentSlide > 0 && (
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 border border-black bg-gray-50 hover:bg-white rounded-none"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}
          {currentSlide < totalSlides - 1 && (
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 border border-black bg-gray-50 hover:bg-white rounded-none"
              onClick={nextSlide}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          )}
        </>
      )}

      {/* Slide indicator bar (desktop only) */}
      {showIndicators && totalSlides > 1 && (
        <div className="mt-6 mx-auto w-full max-w-md h-1 bg-gray-200 overflow-hidden hidden sm:block">
          <div
            className="h-full bg-black transition-all duration-300"
            style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
          />
        </div>
      )}
    </div>
  )
}
