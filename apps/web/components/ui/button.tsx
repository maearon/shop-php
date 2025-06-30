// components/ui/adidas-button.tsx

"use client"

import { useRouter } from "next/navigation"
import { BaseButton, BaseButtonProps } from "@/components/ui/base-button"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link" // ✅ Thêm dòng này

interface ButtonProps extends BaseButtonProps {
  href?: string // ✅ Cho phép có hoặc không
  children: React.ReactNode
  loading?: boolean
  showArrow?: boolean // 👈 new
  shadow?: boolean
  fullWidth?: boolean // 👈 Thêm dòng này
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined
}

export function Button({
  href,
  children,
  loading = false,
  showArrow = true,
  shadow = false,
  fullWidth = false,
  className,
  variant = "ghost",
  ...props
}: ButtonProps) {
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
      <BaseButton
        asChild={!!href}
        disabled={loading}
        variant={variant}
        className={cn(
          "relative z-10 inline-flex items-center justify-center px-4 h-12 bg-white text-black font-bold text-base uppercase tracking-wide border border-white rounded-none transition-all",
          fullWidth ? "w-full" : "w-fit", // ✅ Thêm điều kiện rõ ràng ở đây
          !href && "flex items-center justify-center",
          className
        )}
        {...props}
      >
        {href ? (
          <Link
            href={href}
            onClick={(e) => loading && e.preventDefault()}
            className="flex items-center justify-center gap-1 px-2 py-1"
          >
            {loading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <span className="-translate-y-[1px]">{children}</span>
            )}
            {showArrow !== false && <span className="text-[22px] font-thin leading-none">⟶</span>}
          </Link>
        ) : (
          <>
            {loading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <span className="-translate-y-[1px]">{children}</span>
            )}
            {showArrow !== false && <span className="text-[22px] font-thin leading-none">⟶</span>}
          </>
        )}
      </BaseButton>
    </div>
  )
}

