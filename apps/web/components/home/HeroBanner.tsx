"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { AdidasButton } from "../ui/adidas-button"

export default function HeroBanner() {
  const router = useRouter()

  return (
    <section className="relative h-[80vh] bg-hero bg-cover bg-top text-white">
      <div className="relative z-10 container mx-auto px-1 sm:px-2 md:px-3 lg:px-10 xl:px-20 2xl:px-20 h-full flex items-end pb-11">
        <div className="max-w-md">
          {/* Title */}
          <h1 className="inline-block bg-white text-black text-base sm:text-lg md:text-xl font-bold px-1.5 py-0.5 mb-2 tracking-tight">
            A TRUE MIAMI ORIGINAL
          </h1>

          {/* Description */}
          <p className="inline-block bg-white text-black text-xs sm:text-sm px-1.5 py-0.5 mb-4 leading-snug">
            Dream big and live blue in the iconic Inter Miami CF 2025 Third Jersey.
          </p>

          {/* Buttons */}
          <div className="grid grid-cols-3 gap-1">
            {[
              { label: "SHOP NOW", href: "/inter-miami-cf" },
            ].map(({ label, href }) => (
              // <Button
              //   key={label}
              //   size="sm"
              //   variant="outline"
              //   onClick={() => router.push(href)}
              //   className="border border-black text-black font-bold px-2 py-1 text-[11px] sm:text-xs rounded-none hover:bg-gray-100 transition w-full"
              // >
              //   {label} <span aria-hidden className="px-2 md:px-2">→</span>
              // </Button>
              <AdidasButton href={href}>SHOP NOW</AdidasButton>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
