"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import ImageLightbox from "@/components/image-lightbox"

interface ExpandableImageGalleryProps {
  images: string[]
  productName: string
}

export default function ExpandableImageGallery({ images, productName }: ExpandableImageGalleryProps) {
  const [showAllImages, setShowAllImages] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Close lightbox when switching to mobile
  useEffect(() => {
    if (isMobile && lightboxOpen) {
      setLightboxOpen(false)
    }
  }, [isMobile, lightboxOpen])

  // Show 4 images initially (2x2 grid), then 10 when expanded
  const displayImages = showAllImages ? images.slice(0, 10) : images.slice(0, 4)
  const remainingCount = Math.max(0, images.length - 4)

  const openLightbox = (index: number) => {
    // Only open lightbox on desktop
    if (!isMobile) {
      setLightboxIndex(index)
      setLightboxOpen(true)
    }
  }

  const getZoomCursor = () => {
    // return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23000' strokeWidth='2'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='m21 21-4.35-4.35'/%3E%3Cpath d='M11 8v6'/%3E%3Cpath d='M8 11h6'/%3E%3C/svg%3E") 12 12, zoom-in`
    return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpath d='M8 8L4 4m0 0v4m0-4h4'/%3E%3Cpath d='M16 8l4-4m0 0v4m0-4h-4'/%3E%3Cpath d='M16 16l4 4m0 0v-4m0 4h-4'/%3E%3Cpath d='M8 16l-4 4m0 0v-4m0 4h4'/%3E%3C/svg%3E") 12 12, auto`
  }

  return (
    <>
    <div className="space-y-4">
      {/* Image Grid - 2x2 for first 4, minimal gaps, then expand to show all 10 */}
      <div className="grid grid-cols-2 gap-1">
        {Array.isArray(displayImages) && displayImages.length > 0 ? (
        displayImages?.map((image, index) => (
          <div
            key={index}
            className="aspect-square bg-gray-100 overflow-hidden rounded-none group relative"
            onClick={() => openLightbox(index)}
            style={{
              cursor: !isMobile ? getZoomCursor() : "default", // 
            }}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`${productName} view ${index + 1}`}
              className={`w-full h-full object-cover transition-transform duration-300 ${
                !isMobile ? "group-hover:scale-110" : ""
              }`}
            />
          </div>
        ))
        ): null}
      </div>

      {/* Show More/Less Button - Toggle between 4 and 10 images */}
      {images.length > 4 && (
        <div className="text-center">
          <Button
            shadow={false}
            showArrow={false}
            variant="outline"
            className="border-black text-black hover:bg-white hover:text-gray-500 bg-transparent transition-colors duration-200 rounded-none px-8 py-3"
            onClick={() => setShowAllImages(!showAllImages)}
          >
            {showAllImages ? (
              <>
                SHOW LESS <span className="ml-2">↑</span>
              </>
            ) : (
              <>
                SHOW MORE <span className="ml-2">↓</span>
              </>
            )}
          </Button>
        </div>
      )}

      
    </div>
    {/* Lightbox - Desktop Only */}
      {lightboxOpen && !isMobile && (
        <ImageLightbox
          images={images}
          currentIndex={lightboxIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setLightboxIndex}
          productName={productName}
        />
      )}
      </>
  )
}
