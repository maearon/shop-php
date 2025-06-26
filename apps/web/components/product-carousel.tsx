"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"
import { motion, AnimatePresence } from "framer-motion"
import { Product } from "@/types/product"

interface ProductCarouselProps {
  products: Product[]
  title?: string
  showAddToBag?: boolean
  showIndicators?: boolean
  carouselModeInMobile?: boolean
}

export default function ProductCarousel({
  products,
  title,
  showAddToBag = false,
  showIndicators = true,
  carouselModeInMobile = true,
}: ProductCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [hovering, setHovering] = useState(false)
  const [itemsPerView, setItemsPerView] = useState(4)

  useEffect(() => {
    const calculateItemsPerView = () => {
      const width = window.innerWidth
      if (width < 640) setItemsPerView(carouselModeInMobile ? 2 : 8)
      else if (width < 768) setItemsPerView(2)
      else if (width < 1024) setItemsPerView(3)
      else setItemsPerView(4)
    }

    calculateItemsPerView()
    window.addEventListener("resize", calculateItemsPerView)
    return () => window.removeEventListener("resize", calculateItemsPerView)
  }, [carouselModeInMobile])

  const totalSlides = Math.ceil(products.length / itemsPerView)

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide((prev) => prev + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1)
    }
  }

  // Nếu không phải chế độ carousel (hiện grid luôn)
  if (!carouselModeInMobile && itemsPerView >= 8) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} showAddToBag={showAddToBag} />
        ))}
        <div className="col-span-full mt-4 flex justify-center">
          <Button
            variant="link"
            className="text-sm font-bold underline px-0"
            onClick={() => window.location.href = "/new-arrivals"}
          >
            VIEW MORE
          </Button>
        </div>
      </div>
    )
  }

  const start = currentSlide * itemsPerView
  const slicedProducts = products.slice(start, start + itemsPerView)

  return (
    <div
      className="group relative overflow-hidden"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {title && <h2 className="text-xl font-bold mb-8">{title}</h2>}

      <div className="relative min-h-[28rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 absolute inset-0"
          >
            {slicedProducts.map((product) => (
              <ProductCard key={product.id} product={product} showAddToBag={showAddToBag} />
            ))}
          </motion.div>
        </AnimatePresence>
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
        <div className="mt-6 mx-auto w-full max-w-md h-1 bg-gray-200 rounded overflow-hidden hidden sm:block">
          <div
            className="h-full bg-black transition-all duration-300"
            style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
          />
        </div>
      )}
    </div>
  )
}
