"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function HeroBanner() {
  const router = useRouter()
  const [showVideo, setShowVideo] = useState(false)

  return (
    <section className="relative h-[90vh] bg-gradient-to-r from-black to-gray-800 text-white">
      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute inset-0 z-0 w-full h-full">
        <picture className="w-full h-full">
          <source
            media="(min-width: 1024px)"
            srcSet="/assets/lib/originals_fw25_tatemcraesuperstar_bnr_sustain_d_9bf87fca6e.jpg?height=1280"
          />
          <source
            media="(min-width: 768px)"
            srcSet="/assets/lib/originals_fw25_tatemcraesuperstar_bnr_sustain_t_c8212de2ad.jpg?width=1024"
          />
          <source
            media="(min-width: 640px)"
            srcSet="/assets/lib/originals_fw25_tatemcraesuperstar_bnr_sustain_m_1e9e83f7e9.jpg?width=768"
          />
          <img
            src="/assets/lib/originals_fw25_tatemcraesuperstar_bnr_sustain_d_9bf87fca6e.jpg?width=1280"
            alt="Superstar"
            className="w-full h-full object-cover object-top"
            loading="eager"
          />
        </picture>
      </div>


      {/* <div className="relative z-10 flex h-full items-center"> */}
      <div className="relative container mx-auto px-4 h-full flex items-end pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="inline-block bg-white text-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold px-2 py-1 mb-3">
              PAST, PRESENT, FUTURE
            </h1>
            <p className="inline-block bg-white text-black text-sm sm:text-base md:text-lg lg:text-xl px-2 py-1 mb-6">
              Explore the Superstar, now updated for the next generation.
            </p>

            <div className="grid grid-cols-2 gap-2 sm:gap-3 md:flex md:flex-wrap md:gap-4">
              <Button
                size="sm"
                variant="outline"
                className="border border-black text-black font-bold px-3 py-2 text-xs sm:text-sm md:px-4 md:py-2 md:text-base flex items-center gap-1 sm:gap-2 hover:bg-gray-100 hover:text-black transition"
                onClick={() => router.push("/women-superstar")}
              >
                SHOP WOMEN <span aria-hidden>→</span>
              </Button>

              <Button
                size="sm"
                variant="outline"
                className="border border-black text-black font-bold px-3 py-2 text-xs sm:text-sm md:px-4 md:py-2 md:text-base flex items-center gap-1 sm:gap-2 hover:bg-gray-100 hover:text-black transition"
                onClick={() => router.push("/men-superstar")}
              >
                SHOP MEN <span aria-hidden>→</span>
              </Button>

              <Button
                size="sm"
                variant="outline"
                className="border border-black text-black font-bold px-3 py-2 text-xs sm:text-sm md:px-4 md:py-2 md:text-base flex items-center gap-1 sm:gap-2 hover:bg-gray-100 hover:text-black transition"
                onClick={() => router.push("/kids-superstar")}
              >
                SHOP KIDS <span aria-hidden>→</span>
              </Button>

              <Button
                size="sm"
                variant="outline"
                className="border border-black text-black font-bold px-3 py-2 text-xs sm:text-sm md:px-4 md:py-2 md:text-base flex items-center gap-1 sm:gap-2 hover:bg-gray-100 hover:text-black transition"
                onClick={() => setShowVideo(true)}
              >
                <Play className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                Watch video <span aria-hidden>→</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {showVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative max-w-4xl w-full mx-4">
            <button onClick={() => setShowVideo(false)} className="absolute -top-12 right-0 text-white text-2xl">
              ✕
            </button>
            <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center overflow-hidden">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/DM73WSHqY2Q?si=wtWftWG7GOlBGHbF&autoplay=1"
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
