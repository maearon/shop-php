"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProductGalleryProps {
  images: string[]
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  // If no images provided, use placeholder
  const displayImages = images?.length > 0 ? images : ["/placeholder.svg?height=800&width=800"]

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Thumbnails */}
      <div className="col-span-2 space-y-4">
        {displayImages.map((image, index) => (
          <div
            key={index}
            className={cn(
              "aspect-square cursor-pointer overflow-hidden rounded-md border-2",
              selectedImage === index ? "border-black" : "border-transparent",
            )}
            onClick={() => setSelectedImage(index)}
          >
            <div className="relative h-full w-full">
              <Image
                src={image || "/placeholder.svg"}
                alt={`Product thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Main image */}
      <div className="col-span-10">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <Image
            src={displayImages[selectedImage] || "/placeholder.svg"}
            alt="Product image"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  )
}
