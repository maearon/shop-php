"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import ImageLightbox from "@/components/image-lightbox"
import { ArrowLeft } from "lucide-react"
import { getBreadcrumbTrail } from "@/utils/breadcrumb"
import Link from "next/link"

interface ExpandableImageGalleryProps {
  images: string[]
  productName: string
  slug: string
  tags: string[]
}

export default function ExpandableImageGallery({ images, productName, slug, tags }: ExpandableImageGalleryProps) {
  const [showAllImages, setShowAllImages] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile && lightboxOpen) {
      setLightboxOpen(false)
    }
  }, [isMobile, lightboxOpen])

  const displayImages = showAllImages ? images.slice(0, 10) : images.slice(0, 4)
  const remainingCount = Math.max(0, images.length - 4)

  const openLightbox = (index: number) => {
    if (!isMobile) {
      setLightboxIndex(index)
      setLightboxOpen(true)
    }
  }

  const getZoomCursor = () => {
    return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpath d='M8 8L4 4m0 0v4m0-4h4'/%3E%3Cpath d='M16 8l4-4m0 0v4m0-4h-4'/%3E%3Cpath d='M16 16l4 4m0 0v-4m0 4h-4'/%3E%3Cpath d='M8 16l-4 4m0 0v-4m0 4h4'/%3E%3C/svg%3E") 12 12, auto`
  }

  return (
    <>
      <div className="relative space-y-4">

        {/* ✅ Breadcrumb (cứng) */}
        {/* <nav className="absolute top-4 left-4 z-20 bg-white/80 backdrop-blur-sm px-3 py-1 text-sm text-gray-700 hidden sm:flex items-center">
          <Link href="/women-shoes" className="flex items-center hover:underline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Home / Women / Soccer</span>
          </Link>
        </nav> */}
        <nav className="absolute top-4 left-4 z-20 text-sm hidden sm:flex items-center gap-2 bg-white/50 backdrop-blur-md px-2 py-1 rounded">
        <Link
          href="/"
          className="flex items-center bg-transparent text-gray-700 px-2 py-1 hover:bg-black hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span className="underline-offset-2">Back</span>
        </Link>

        {getBreadcrumbTrail(slug).slice(1).map((crumb, index) => (
          <span key={index} className="flex items-center text-gray-700">
            <span className="mx-1 text-gray-500">/</span>
            <Link
              href={crumb.href}
              className="hover:bg-black hover:text-white hover:underline transition-colors px-2 py-1 rounded"
            >
              {crumb.label}
            </Link>
          </span>
        ))}
        </nav>

        {/* ✅ Badge "BEST SELLER" (cứng) */}
        <div className="absolute top-14 right-3 z-20 text-[10px] sm:text-xs bg-gray-300 text-black font-bold px-3 py-3 transform -rotate-90 origin-center rounded-none">
          {tags?.[0] || "BEST SELLER"}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 gap-1">
          {Array.isArray(displayImages) && displayImages.length > 0 &&
            displayImages.map((image, index) => (
              <div
                key={index}
                className="aspect-square bg-gray-100 overflow-hidden rounded-none group relative"
                onClick={() => openLightbox(index)}
                style={{ cursor: !isMobile ? getZoomCursor() : "default" }}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${productName} view ${index + 1}`}
                  className={`w-full h-full object-cover transition-transform duration-300 ${
                    !isMobile ? "group-hover:scale-110" : ""
                  }`}
                />
              </div>
            ))}
        </div>

        {/* Show More/Less Button */}
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
                <>SHOW LESS <span className="ml-2">↑</span></>
              ) : (
                <>SHOW MORE <span className="ml-2">↓</span></>
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
