"use client"

import { useRouter } from "next/navigation"
import { BaseButton, BaseButtonProps } from "@/components/ui/base-button"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface MainButtonProps extends BaseButtonProps {
  href?: string
  children: React.ReactNode
  loading?: boolean
  showArrow?: boolean
  shadow?: boolean
  fullWidth?: boolean
  className?: string
  theme?: "white" | "black" // 👈 NEW
}

export function MainButton({
  href,
  children,
  loading = false,
  showArrow = true,
  shadow = false,
  fullWidth = false,
  className,
  theme = "white", // 👈 default
  ...props
}: MainButtonProps) {
  const router = useRouter()

  const isBlack = theme === "black"
  const bgColor = isBlack ? "bg-black" : "bg-white"
  const textColor = isBlack ? "text-white" : "text-black"
  const borderColor = "border-white"
  const hoverBorder = "group-hover:border-gray-400"

  return (
    <div className={cn("relative group", fullWidth ? "w-full" : "w-fit")}>
      {shadow && (
        <span
          className={cn(
            "absolute inset-0 translate-x-[6px] translate-y-[6px] border pointer-events-none z-0 transition-all",
            borderColor,
            hoverBorder,
            "group-active:translate-x-[4px] group-active:translate-y-[4px]"
          )}
          aria-hidden="true"
        />
      )}

      <BaseButton
        asChild={!!href}
        disabled={loading}
        variant="ghost"
        className={cn(
          "relative z-10 w-full inline-flex items-center justify-center px-4 h-12 font-bold text-base uppercase tracking-wide border rounded-none transition-all",
          bgColor,
          textColor,
          borderColor,
          "active:translate-x-[2px] active:translate-y-[2px]",
          !href && "flex items-center justify-center",
          className
        )}
        {...props}
      >
        {href ? (
          <Link
            href={href}
            onClick={(e) => loading && e.preventDefault()}
            className="w-full h-full flex items-center justify-center"
          >
            {loading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <span className="mr-2 -translate-y-[1px]">{children}</span>
            )}
            {showArrow !== false && (
              <span className="text-[22px] font-thin leading-none">⟶</span>
            )}
          </Link>
        ) : (
          <>
            {loading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <span className="mr-2 -translate-y-[1px]">{children}</span>
            )}
            {showArrow !== false && (
              <span className="text-[22px] font-thin leading-none">⟶</span>
            )}
          </>
        )}
      </BaseButton>
    </div>
  )
}
