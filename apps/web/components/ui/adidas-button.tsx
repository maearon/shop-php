// components/ui/adidas-button.tsx

"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface AdidasButtonProps {
  href: string
  children: React.ReactNode
  loading?: boolean
  shadow?: boolean
  fullWidth?: boolean // 👈 Thêm dòng này
  className?: string
}

export function AdidasButton({
  href,
  children,
  loading = false,
  shadow = false,
  fullWidth = false, 
  className,
}: AdidasButtonProps) {
  const router = useRouter()

  return (
    <div className={cn("relative group", fullWidth ? "w-full" : "w-fit")}>
      {/* Shadow border layer */}
      {shadow && (
        <span
          className="absolute inset-0 translate-x-[6px] translate-y-[6px] border border-white group-hover:border-gray-400 pointer-events-none z-0 transition-colors"
          aria-hidden="true"
        />
      )}

      {/* Main button */}
      <Button
        onClick={() => router.push(href)}
        disabled={loading}
        variant="ghost"
        className={cn(
          "relative z-10 w-full inline-flex items-center justify-center px-4 h-12 bg-white text-black font-bold text-base uppercase tracking-wide border border-white rounded-none transition-all",
          className
        )}
      >
        {loading ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : (
          <span className="mr-2 -translate-y-[1px]">{children}</span>
        )}
        <span className="text-[22px] font-thin leading-none">⟶</span>
      </Button>
    </div>
  )
}
