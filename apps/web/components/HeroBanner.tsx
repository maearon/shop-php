"use client"

import { useState } from "react"
import Image from "next/image"

export default function HeroBanner() {
  const [showVideo, setShowVideo] = useState(false)

  return (
    <section className="relative h-screen">
      <Image src="/images/hero-banner.jpg" alt="P.O.D.SYSTEM" fill className="object-cover" priority />

      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-6xl font-bold text-white mb-6">P.O.D.SYSTEM</h1>
            <p className="text-xl text-white mb-8">Một cấu trúc vỏ giày mới kết hợp ba công nghệ di sản trong một.</p>

            <div className="flex gap-4">
              <button className="bg-white text-black px-8 py-3 font-bold hover:bg-gray-200 transition-colors">
                MUA NGAY
              </button>
              <button
                onClick={() => setShowVideo(true)}
                className="border-2 border-white text-white px-8 py-3 font-bold hover:bg-white hover:text-black transition-colors"
              >
                XEM VIDEO
              </button>
            </div>
          </div>
        </div>
      </div>

      {showVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative w-full max-w-4xl aspect-video">
            <iframe
              src="https://www.youtube.com/embed/poNAd-YRK8k?autoplay=1"
              className="w-full h-full"
              allowFullScreen
            />
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-12 right-0 text-white text-4xl hover:text-gray-300"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
