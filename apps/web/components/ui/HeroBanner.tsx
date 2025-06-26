"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

export default function HeroBanner() {
  const [showVideo, setShowVideo] = useState(false)

  return (
    // Hero Section
    // <section className="relative h-[90vh] bg-gray-100 overflow-hidden">
    //   <div
    //     className="absolute inset-0 bg-cover bg-center"
    //     style={{
    //       backgroundImage: "url('/placeholder.png?height=500&width=1200')",
    //     }}
    //   >
    //     <div className="absolute inset-0 bg-black bg-opacity-10"></div>
    //   </div>
    //   <div className="relative container mx-auto px-4 h-full flex items-end pb-12">
    //     <div className="text-white">
    //       <h1 className="text-4xl font-bold mb-2">ADIZERO EVO SL</h1>
    //       <p className="text-lg mb-4">Fast feels. For the speed of the city.</p>
    //       <div className="flex space-x-4">
    //         <Link href="/men">
    //           <Button className="bg-white text-black hover:bg-gray-100 font-bold px-6 py-3">SHOP MEN</Button>
    //         </Link>
    //         <Link href="/women">
    //           <Button className="bg-white text-black hover:bg-gray-100 font-bold px-6 py-3">SHOP WOMEN</Button>
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    // </section>

    <section className="relative h-[70vh] bg-gradient-to-r from-black to-gray-800 text-white">
      <div className="absolute inset-0 bg-black/40" />

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/placeholder.png?height=800&width=1200')",
        }}
      />

      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-6">IMPOSSIBLE IS NOTHING</h1>
            <p className="text-xl mb-8">
              Khám phá bộ sưu tập mới nhất từ adidas. Giày dép, quần áo và phụ kiện thể thao chính hãng.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                Mua ngay
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black"
                onClick={() => setShowVideo(true)}
              >
                <Play className="mr-2 h-4 w-4" />
                Xem video
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
            <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
              <p className="text-white">Video demo sẽ được phát ở đây</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
