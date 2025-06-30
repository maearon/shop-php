"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface HeroBannerProps {
  backgroundClassName?: "bg-hero" | "bg-hero-men" | "bg-hero-women" | null | undefined
  content?: {
    title: string
    description: string
    buttons: Array<{ buttonLabel?: string; href: string }>
  }
}

export default function HeroBanner({
  backgroundClassName = "bg-hero",
  content = {
    title: "A TRUE MIAMI ORIGINAL",
    description: "Dream big and live blue in the iconic Inter Miami CF 2025 Third Jersey.",
    buttons: [{ href: "/inter-miami-cf", buttonLabel: "SHOP NOW" }],
  },
}: HeroBannerProps) {
  const router = useRouter()


  return (
    <section className={cn("relative h-[80vh] bg-cover bg-top text-white", backgroundClassName)}>
      <div className="relative z-10 container mx-auto px-1 sm:px-2 md:px-3 lg:px-10 xl:px-20 2xl:px-20 h-full flex items-end pb-11">
        <div className="max-w-md">
          {/* Title */}
          <h1 className="inline-block bg-white text-black text-base sm:text-lg md:text-xl font-bold px-1.5 py-0.5 mb-2 tracking-tight">
            {content.title}
          </h1>

          {/* Description */}
          <p className="inline-block bg-white text-black text-xs sm:text-sm px-1.5 py-0.5 mb-4 leading-snug">
            {content.description}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 sm:gap-6">
            {content.buttons.map((btn, idx) => (
              <Button
                key={`${btn.href}-${idx}`}
                href={btn.href}
                shadow
              >
                {btn.buttonLabel || "SHOP NOW"}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
