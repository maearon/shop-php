"use client"

import Link from "next/link"
import Image from "next/image"

export default function PromoBanner() {
  return (
    <Link
      href="/new_to_sale"
      className="block w-full bg-[#e9edf0] hover:opacity-90 transition"
    >
      <div className="relative flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
        <p className="text-sm md:text-base text-gray-800 md:whitespace-nowrap">
          Now’s your chance to score on trending and timeless styles, just added to our sale.
        </p>
        <span className="text-xl">→</span>
      </div>
      <div className="relative w-full h-12 md:h-0 hidden">
        {/* Optional: background image version */}
        <Image
          src="/path-to-banner-desktop.png"
          alt="Promo"
          fill
          className="hidden md:block object-cover"
          priority
        />
        <Image
          src="/path-to-banner-mobile.png"
          alt="Promo"
          fill
          className="md:hidden object-cover"
          priority
        />
      </div>
    </Link>
  )
}
