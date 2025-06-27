"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

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
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  // Lazy-loading image background via IntersectionObserver
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
      { rootMargin: "100px" },
    )

    imageRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [slides])

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, slides.length])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  const goToSlide = (i: number) => setCurrentSlide(i)

  return (
    <section className="container mx-auto px-4 py-0">
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <div className="relative h-[26rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => {
                  const slide = slides[currentSlide]
                  return (
                    <div
                      key={i}
                      ref={(el) => (imageRefs.current[i] = el)}
                      className="relative overflow-hidden h-96 bg-gray-100 group lazy-bg"
                      data-bg={slide.image}
                      style={{
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundImage: "none",
                      }}
                    >
                      <div className="absolute inset-0 bg-black bg-opacity-30" />
                      <div className="relative h-full flex flex-col justify-end p-6 text-white">
                        <h3 className="font-bold text-lg mb-2">{slide.title}</h3>
                        <p className="text-sm mb-4 leading-relaxed">{slide.description}</p>
                        <Link href={slide.href}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-fit bg-white text-black hover:bg-gray-100 font-bold border-0"
                          >
                            {slide.cta}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white border-0 shadow-lg"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white border-0 shadow-lg"
          onClick={nextSlide}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === currentSlide ? "bg-black" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
