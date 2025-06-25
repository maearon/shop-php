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

      <picture className="absolute inset-0 z-0">
        <source media="(min-width: 1024px)" srcSet="/assets/lib/originals_fw25_tatemcraesuperstar_bnr_sustain_d_9bf87fca6e.jpg?height=1280" />
        <source media="(min-width: 768px)" srcSet="/assets/lib/originals_fw25_tatemcraesuperstar_bnr_sustain_t_c8212de2ad.jpg?width=1024" />
        <source media="(min-width: 640px)" srcSet="/assets/lib/originals_fw25_tatemcraesuperstar_bnr_sustain_m_1e9e83f7e9.jpg?width=768" />
        <img
          src="/assets/lib/originals_fw25_tatemcraesuperstar_bnr_sustain_d_9bf87fca6e.jpg?width=1280"
          alt="Superstar"
          className="w-full h-full object-contain"
        />
      </picture>

      {/* <div className="relative z-10 flex h-full items-center"> */}
      <div className="relative container mx-auto px-4 h-full flex items-end pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="inline-block bg-white text-black text-5xl font-bold px-2 py-1 mb-4">
              PAST, PRESENT, FUTURE
            </h1>
            <p className="inline-block bg-white text-black text-xl px-2 py-1 mb-8">
              Explore the Superstar, now updated for the next generation.
            </p>
            <div className="grid grid-cols-2 gap-4 md:flex md:flex-wrap">
              {/* <Link href="/women-superstar"> */}
              <Button
                size="sm"
                variant="outline"
                className="border border-black text-black font-bold px-6 py-3 flex items-center gap-2 hover:bg-gray-100 hover:text-black transition"
                onClick={() => router.push("/women-superstar")}
              >
                SHOP WOMEN
                <span aria-hidden>→</span>
              </Button>
            {/* </Link>
            <Link href="/men-superstar"> */}
              <Button
                size="sm"
                variant="outline"
                className="border border-black text-black font-bold px-6 py-3 flex items-center gap-2 hover:bg-gray-100 hover:text-black transition"
                onClick={() => router.push("/men-superstar")}
              >
                SHOP MEN
                <span aria-hidden>→</span>
              </Button>
            {/* </Link>   
            <Link href="/kids-superstar"> */}
              <Button
                size="sm"
                variant="outline"
                className="border border-black text-black font-bold px-6 py-3 flex items-center gap-2 hover:bg-gray-100 hover:text-black transition"
                onClick={() => router.push("/kids-superstar")}
              >
                SHOP KIDS
                <span aria-hidden>→</span>
              </Button>
              {/* </Link> */}
              <Button
                size="sm"
                variant="outline"
                className="border border-black text-black font-bold px-6 py-3 flex items-center gap-2 hover:bg-gray-100 hover:text-black transition"
                onClick={() => setShowVideo(true)}
              >
                <Play className="mr-2 h-4 w-4" />
                Watch video
                <span aria-hidden>→</span>
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
