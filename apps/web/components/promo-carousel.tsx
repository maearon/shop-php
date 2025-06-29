"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { BaseButton } from "@/components/ui/base-button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

export type Slide = {
  id: number
  title: string
  description: string
  image: string
  cta: string
  href: string
}

interface PromoCarouselProps {
  slides: Slide[]
}

export default function PromoCarousel({ slides }: PromoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  const [itemsPerView, setItemsPerView] = useState(4)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  // Tính số trang (slide page-based, không phải từng item)
  const totalSlides = useMemo(() => {
    return Math.ceil(slides.length / itemsPerView)
  }, [slides.length, itemsPerView])

  // Tự set số lượng item theo width
  useEffect(() => {
    const updateItems = () => {
      const width = window.innerWidth
      if (width < 640) setItemsPerView(1.2) // show 1.2 items like Adidas mobile
      else if (width < 1024) setItemsPerView(2)
      else if (width < 1280) setItemsPerView(3)
      else setItemsPerView(4)
    }

    updateItems()
    window.addEventListener("resize", updateItems)
    return () => window.removeEventListener("resize", updateItems)
  }, [])

  // Reset lại index khi itemsPerView thay đổi
  useEffect(() => {
    setCurrentIndex(0)
  }, [itemsPerView])

  // Lazy-load bg
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement
            const bg = target.dataset.bg
            if (bg) {
              target.style.backgroundImage = `url('${bg}')`
              target.classList.remove("lazy-bg")
              observer.unobserve(target)
            }
          }
        }
      },
      { rootMargin: "100px" }
    )

    imageRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [slides])

  // Auto-play (mặc định là false)
  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, totalSlides - 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  return (
    <section className="container mx-auto px-4 py-0">
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsAutoPlaying(false)}
        // onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <div className="relative">
          <div
            ref={containerRef}
            className="flex transition-transform duration-500 ease-in-out gap-6"
            style={{
              transform: `translateX(-${(100 / slides.length) * itemsPerView * currentIndex}%)`,
              width: `${(100 / itemsPerView) * slides.length}%`,
            }}
          >
            {slides.map((slide, i) => (
              <div
                key={i}
                ref={(el) => (imageRefs.current[i] = el)}
                className="shrink-0 lazy-bg bg-gray-100 relative overflow-hidden"
                data-bg={slide.image}
                style={{
                  width: `${100 / slides.length}%`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundImage: "none",
                  height: "24rem",
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-30" />
                <div className="relative h-full flex flex-col justify-end p-6 text-white">
                  <h3 className="font-bold text-lg mb-2">{slide.title}</h3>
                  <p className="text-sm mb-4 leading-relaxed">{slide.description}</p>
                  <Link href={slide.href}>
                    {/* <Button ...>{slide.cta}</Button> */}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        {currentIndex > 0 && (
          <BaseButton
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 border border-black bg-gray-50 hover:bg-white rounded-none"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-5 w-5" />
          </BaseButton>
        )}
        {currentIndex < totalSlides - 1 && (
          <BaseButton
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 border border-black bg-gray-50 hover:bg-white rounded-none"
            onClick={nextSlide}
          >
            <ChevronRight className="h-5 w-5" />
          </BaseButton>
        )}

        {/* Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === currentIndex ? "bg-black" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
