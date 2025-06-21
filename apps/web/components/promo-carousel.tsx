"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

const promoSlides = [
  {
    id: 1,
    title: "PAST, PRESENT, FUTURE",
    description: "Explore the Superstar in all its iconic glory, now with more comfort.",
    image: "/placeholder.svg?height=400&width=300",
    cta: "SHOP NOW",
    href: "/superstar",
  },
  {
    id: 2,
    title: "DROPSET 3",
    description: "Rooted in Strength.",
    image: "/placeholder.svg?height=400&width=300",
    cta: "SHOP NOW",
    href: "/dropset",
  },
  {
    id: 3,
    title: "A TRUE MIAMI ORIGINAL",
    description: "Rep the Magic City during every match in this signature blue jersey.",
    image: "/placeholder.svg?height=400&width=300",
    cta: "SHOP NOW",
    href: "/miami",
  },
  {
    id: 4,
    title: "SAMBA",
    description: "Always iconic, always in style.",
    image: "/placeholder.svg?height=400&width=300",
    cta: "SHOP NOW",
    href: "/samba",
  },
]

export default function PromoCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promoSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % promoSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + promoSlides.length) % promoSlides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Carousel Container */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {promoSlides.map((slide) => (
            <div key={slide.id} className="w-full flex-shrink-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Show 4 cards per slide on desktop, 1 on mobile */}
                <div className="relative overflow-hidden h-96 bg-gray-100 group">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                    style={{
                      backgroundImage: `url('${slide.image}')`,
                    }}
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                  </div>
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

                {/* Repeat the same slide for desktop grid view */}
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="hidden lg:block relative overflow-hidden h-96 bg-gray-100 group">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                      style={{
                        backgroundImage: `url('${slide.image}')`,
                      }}
                    >
                      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                    </div>
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
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
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

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {promoSlides.map((_, index) => (
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
