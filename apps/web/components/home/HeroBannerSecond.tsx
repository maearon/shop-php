"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import { useRouter } from "next/navigation"

export default function HeroBannerSecond() {
  const router = useRouter()
  const [showVideo, setShowVideo] = useState(false)

  return (
    <section className="relative h-[80vh] bg-hero-second bg-cover bg-top text-white mb-10">
      <div className="relative z-10 container mx-auto px-1 sm:px-2 md:px-3 lg:px-10 xl:px-20 2xl:px-20 h-full flex items-end pb-11">
        <div className="max-w-md">
          {/* Title */}
          <h1 className="inline-block bg-white text-black text-base sm:text-lg md:text-xl font-bold px-1.5 py-0.5 mb-2 tracking-tight">
            PAST, PRESENT, FUTURE
          </h1>

          {/* Description */}
          <p className="inline-block bg-white text-black text-xs sm:text-sm px-1.5 py-0.5 mb-4 leading-snug">
            Explore the Superstar, now updated for the next generation.
          </p>

          {/* Buttons */}
          <div className="grid grid-cols-3 gap-1">
            {[
              { label: "SHOP WOMEN", href: "/women-superstar" },
              { label: "SHOP MEN", href: "/men-superstar" },
              { label: "SHOP KIDS", href: "/kids-superstar" },
            ].map(({ label, href }) => (
              <Button
                key={label}
                size="sm"
                variant="outline"
                onClick={() => router.push(href)}
                className="border border-black text-black font-bold px-2 py-1 text-[11px] sm:text-xs rounded-none hover:bg-gray-100 transition w-full"
              >
                {label} <span aria-hidden className="px-2 md:px-2">→</span>
              </Button>
            ))}
          <Button
              size="sm"
              variant="outline"
              className="border border-black text-black font-bold px-2 py-1 text-[11px] sm:text-xs rounded-none hover:bg-gray-100 transition w-full"
              onClick={() => setShowVideo(true)}
            >
              <Play className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
              WATCH VIDEO <span aria-hidden className="px-2 md:px-2">→</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Popup Video */}
      {showVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative max-w-4xl w-full mx-4">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-12 right-0 text-white text-2xl"
            >
              ✕
            </button>
            <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center overflow-hidden">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/q_7I5ilVax4?si=iqVV3NY5j_cPBe77&autoplay=1"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
